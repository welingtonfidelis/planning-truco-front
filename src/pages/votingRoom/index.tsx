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
import { ServerError } from "../../shared/enum/serverError";
import { urlParams } from "../../services/util/urlParams";
import { SocketEvents } from "../../shared/enum/socketEvents";

const { ROOT } = ApplicationRoutes;
const { INVALID_ROOM, MISSING_ROOM } = ServerError;
const {
  EXCEPTION,
  ROOM_DATA,
  ROOM_NEW_USER,
  ROOM_USER_LOGOUT,
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

  const { id: userId, name: userName } = userStore();
  const {
    id: roomId,
    showVotes,
    ownerUserId,
    updateRoom,
    users: usersOnRoom,
    addUser,
    removeUser,
  } = roomStore();

  let socketIo: Socket;

  const chairOrganize = usersOnRoom.reduce(
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
    updateRoom({ showVotes });
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

    socketIo = io(config.REST_API_URL, {
      query: { userName, roomId },
    });

    socketIo.on("connect", () => {
      socketIo.on(ROOM_DATA, (data: Room) => {
        updateRoom(data);
      });

      socketIo.on(ROOM_NEW_USER, (data: User) => {
        console.log("data: ", data);
        addUser(data);
      });

      socketIo.on(ROOM_USER_LOGOUT, (data: string) => {
        console.log("data: ", data);
        removeUser(data);
      });

      socketIo.on(EXCEPTION, (data: KnownError) => {
        console.log("data: ", data.name);

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
  }, []);

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
            {showVotes ? (
              <Button colorScheme="blue" onClick={() => handleShowVotes(false)}>
                {t("pages.voting_room.button_reset_votes")}
              </Button>
            ) : (
              <Button colorScheme="blue" onClick={() => handleShowVotes(true)}>
                {t("pages.voting_room.button_show_votes")}
              </Button>
            )}
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
