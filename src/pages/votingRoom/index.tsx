import { ApplicationRoutes } from "../../shared/enum/applicationRoutes";
import { Container, Content, TableContent, TableIcon } from "./styles";
import { userStore } from "../../store/user";
import { roomStore } from "../../store/room";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { PageHeader } from "../../components/pageHeader";
import { FloatActionButtons } from "./components/floatActionButtons";
import { User } from "../../domains/user";
import { Room, UserRoom } from "../../domains/room";
import { UserCard } from "./components/userCard";
import { Button, useToast } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Deck } from "./components/deck";
import { Socket, io } from "socket.io-client";
import { config } from "../../config";
import { KnownError } from "../../domains/knownError";
import { ServerError } from "../../shared/const/serverError";
import { urlParams } from "../../services/util/urlParams";
import { SocketEvents } from "../../shared/enum/socketEvents";
import { socketStore } from "../../store/socket";
import { Task } from "../../domains/task";

const { ROOT } = ApplicationRoutes;
const { INVALID_ROOM, MISSING_ROOM } = ServerError;
const {
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
  CLIENT_ROOM_SHOW_VOTES,
  CLIENT_ROOM_RESET_VOTES,
} = SocketEvents;

enum ChairPositionEnum {
  TOP = "top",
  RIGHT = "right",
  BOTTOM = "bottom",
  LEFT = "left",
}

export const VotingRoom = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { getParams } = urlParams();
  const toast = useToast();

  const { name: userName, updateUser } = userStore();
  const {
    id: roomId,
    showVotes,
    ownerUserId,
    updateRoom,
    users: usersOnStorage,
    addUser,
    removeUser,
    isLoggedUserOwnerRoom,
    addTask,
    removeTask,
    userVoteTask,
    updateUserProfile,
    updateCurrentTask,
    showUserVotes,
    resetVotes,
  } = roomStore();
  const { socket, createSocketConnection } = socketStore();

  const chairOrganize = usersOnStorage.reduce(
    (acc, user) => {
      if (user.id === ownerUserId) acc[ChairPositionEnum.TOP].push(user);
      else acc[ChairPositionEnum.BOTTOM].push(user);

      return acc;
    },
    {
      [ChairPositionEnum.TOP]: [] as UserRoom[],
      [ChairPositionEnum.BOTTOM]: [] as UserRoom[],
    }
  );

  const handleShowVotes = (showVotes: boolean) => {
    if (showVotes) return socket?.emit(CLIENT_ROOM_SHOW_VOTES);

    socket?.emit(CLIENT_ROOM_RESET_VOTES);
  };

  useEffect(() => {
    if (!roomId) {
      const roomIdUrl = getParams("roomId") as string;

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
        query: { userName, roomId },
      })
    );
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
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
        (data: { userId: string; vote: number }) => {
          const { userId, vote } = data;

          userVoteTask(userId, vote);
        }
      );

      // USERS
      socket.on(
        SERVER_USER_UPDATE_PROFILE,
        (data: { userId: string; profileData: Partial<User> }) => {
          const { userId, profileData } = data;

          updateUserProfile(userId, profileData);
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
          <UserCard
            showVotes={showVotes}
            users={chairOrganize[ChairPositionEnum.TOP]}
          />

          <TableIcon>
            {isLoggedUserOwnerRoom &&
              (showVotes ? (
                <Button
                  colorScheme="blue"
                  onClick={() => handleShowVotes(false)}
                  disabled={!isLoggedUserOwnerRoom}
                >
                  {t("pages.voting_room.button_reset_votes")}
                </Button>
              ) : (
                <Button
                  colorScheme="blue"
                  onClick={() => handleShowVotes(true)}
                  disabled={!isLoggedUserOwnerRoom}
                >
                  {t("pages.voting_room.button_show_votes")}
                </Button>
              ))}
          </TableIcon>

          <UserCard
            showVotes={showVotes}
            users={chairOrganize[ChairPositionEnum.BOTTOM]}
          />
        </TableContent>

        <Deck />
      </Content>
    </Container>
  );
};
