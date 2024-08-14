import { ApplicationRoutes } from "../../shared/enum/applicationRoutes";
import { Container, Content, TableContent } from "./styles";
import { userStore } from "../../store/user";
import { roomStore } from "../../store/room";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { PageHeader } from "../../components/pageHeader";
import { FloatActionButtons } from "./components/floatActionButtons";
import { User } from "../../domains/user";
import { Room } from "../../domains/room";
import { UserCard } from "./components/userCard";
import { useToast } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Deck } from "../../components/deck";
import { io } from "socket.io-client";
import { config } from "../../config";
import { KnownError } from "../../domains/knownError";
import { ServerError } from "../../shared/const/serverError";
import { urlParams } from "../../services/util/urlParams";
import { SocketEvents } from "../../shared/enum/socketEvents";
import { socketStore } from "../../store/socket";
import { Task } from "../../domains/task";
import { storage } from "../../services/storage";
import { ApplicationStorage } from "../../shared/enum/applicationStorage";

const { ROOT } = ApplicationRoutes;
const { INVALID_ROOM, MISSING_ROOM } = ServerError;
const {
  CONNECT,
  DISCONNECT,
  EXCEPTION,
  SERVER_ROOM_DATA,
  SERVER_ROOM_NEW_USER,
  SERVER_ROOM_USER_LOGOUT,
  SERVER_ROOM_NEW_USER_OWN,
  SERVER_ROOM_NEW_TASK,
  SERVER_ROOM_DELETE_TASK,
  SERVER_ROOM_SELECT_VOTING_TASK,
  SERVER_ROOM_VOTE_TASK,
  SERVER_ROOM_SHOW_VOTES,
  SERVER_ROOM_RESET_VOTES,
  SERVER_USER_UPDATE_PROFILE,
  SERVER_OWNER_ROOM_TRANSFER,
  SERVER_KICK_USER,
} = SocketEvents;

const { USER } = ApplicationStorage;

export const VotingRoom = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { getParams } = urlParams();
  const toast = useToast();

  const { name: userName, updateUser, id: userId, clearUser } = userStore();
  const {
    id: roomId,
    updateRoom,
    addUser,
    removeUser,
    addTask,
    removeTask,
    userVoteTask,
    updateUserProfile,
    updateCurrentTask,
    showUserVotes,
    resetVotes,
  } = roomStore();
  const { socket, createSocketConnection, destroySocketConnection } =
    socketStore();
  const { get, set } = storage();
  const roomIdUrl = getParams("roomId") as string;

  useEffect(() => {
    if (!roomId) {
      if (roomIdUrl) {
        navigate({
          pathname: ROOT,
          search: createSearchParams({ roomId: roomIdUrl }).toString(),
        });

        return;
      }

      navigate(ROOT);

      return;
    }

    createSocketConnection(
      io(config.REST_API_URL, {
        transports: ["websocket"],
        query: { userName, roomId },
      })
    );
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on(CONNECT, () => {
      updateUser({ id: socket.id });

      // ROOM
      socket.on(SERVER_ROOM_DATA, (data: Room) => {
        const isLoggedUserOwnerRoom = socket.id === data.ownerUserId;

        updateRoom({ ...data, isLoggedUserOwnerRoom });
      });

      // USERS
      socket.on(SERVER_ROOM_NEW_USER, (data: User) => {
        addUser(data);
      });

      socket.on(SERVER_ROOM_USER_LOGOUT, (data: string) => {
        removeUser(data);
      });

      socket.on(SERVER_ROOM_NEW_USER_OWN, (data: string) => {
        const isLoggedUserOwnerRoom = socket.id === data;

        updateRoom({ ownerUserId: data, isLoggedUserOwnerRoom });
      });

      socket.on(
        SERVER_USER_UPDATE_PROFILE,
        (data: { userId: string; profileData: Partial<User> }) => {
          const { userId, profileData } = data;

          updateUserProfile(userId, profileData);

          if (userId === socket.id) {
            const storedUser = get(USER) ?? {};
            set(USER, { ...storedUser, ...data.profileData });
            updateUser(data.profileData);
          }
        }
      );

      socket.on(SERVER_OWNER_ROOM_TRANSFER, (data: string) => {
        const isLoggedUserOwnerRoom = socket.id === data;

        updateRoom({ ownerUserId: data, isLoggedUserOwnerRoom });
      });

      socket.on(SERVER_KICK_USER, (data: string) => {
        removeUser(data);

        if (data === socket.id) {
          toast({
            title: t("pages.voting_room.error_disconnect_message"),
            status: "error",
            duration: null,
          });

          clearUser();
          destroySocketConnection();

          navigate({
            pathname: ROOT,
            search: createSearchParams({ roomId: roomIdUrl }).toString(),
          });
        }
      });

      // TASKS
      socket.on(SERVER_ROOM_NEW_TASK, (data: Task) => {
        addTask(data);
      });

      socket.on(SERVER_ROOM_DELETE_TASK, (data: string) => {
        removeTask(data);
      });

      // VOTES
      socket.on(SERVER_ROOM_SELECT_VOTING_TASK, (data: string) => {
        updateCurrentTask(data);
      });

      socket.on(SERVER_ROOM_SHOW_VOTES, (data: { points: number }) => {
        const { points } = data;

        showUserVotes(points);
      });

      socket.on(SERVER_ROOM_RESET_VOTES, () => {
        resetVotes();
      });

      socket.on(
        SERVER_ROOM_VOTE_TASK,
        (data: { userId: string; vote: string }) => {
          const { userId, vote } = data;

          userVoteTask(userId, vote);
        }
      );

      // EXCEPTION
      socket.on(EXCEPTION, (data: KnownError) => {
        if (
          data.name === MISSING_ROOM.name ||
          data.name === INVALID_ROOM.name
        ) {
          toast({
            title: t("pages.voting_room.error_request_invalid_room_message"),
            status: "error",
            duration: null,
          });

          navigate(ROOT);
        }
      });

      socket.on(DISCONNECT, () => {
        navigate({
          pathname: ROOT,
          search: createSearchParams({ roomId: roomIdUrl }).toString(),
        });
      });
    });
  }, [socket]);

  return (
    <Container>
      <PageHeader />

      <FloatActionButtons />

      <Content>
        {/* TODO improve css to align tableContent on center without this empty div */}
        <div></div>

        <TableContent>
          <UserCard />
        </TableContent>

        <Deck />
      </Content>
    </Container>
  );
};
