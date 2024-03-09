import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import { Container, Content, HatIcon, UserName } from "./styles";
import { Card } from "../../../../components/card";
import { SizeCard } from "../../../../components/card/types";
import { Button, Tooltip } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { roomStore } from "../../../../store/room";
import { socketStore } from "../../../../store/socket";
import { SocketEvents } from "../../../../shared/enum/socketEvents";
import { DisableComponent } from "../../../../components/disableComponent";

const { CLIENT_ROOM_SHOW_VOTES, CLIENT_ROOM_RESET_VOTES } = SocketEvents;
export const UserCard = () => {
  const {
    updateRoom,
    users,
    showVotes,
    currentTaskId,
    ownerUserId,
    isLoggedUserOwnerRoom,
  } = roomStore();
  const { socket } = socketStore();
  const { t } = useTranslation();

  const isTotalUsersOdd = users.length % 2 === 0;
  const totalCards = users.length + (isTotalUsersOdd ? 0 : 1);

  function getCardComponentPosition(index: number) {

    const angle = (index / totalCards) * 360;
    const radius = 100; // radius circumference where cards will be positioned

    const left = 50 + radius * Math.cos((angle * Math.PI) / 180);
    const top = 50 + radius * Math.sin((angle * Math.PI) / 180);

    return { left, top };
  }

  const handleShowVotes = (showVotes: boolean) => {
    if (showVotes) return socket?.emit(CLIENT_ROOM_SHOW_VOTES);

    socket?.emit(CLIENT_ROOM_RESET_VOTES);
  };

  return (
    <Container>
      <div>
        {isLoggedUserOwnerRoom &&
          (showVotes ? (
            <Button colorScheme="blue" onClick={() => handleShowVotes(false)}>
              {t("pages.voting_room.button_reset_votes")}
            </Button>
          ) : (
            <DisableComponent
              isDisabled={isEmpty(currentTaskId)}
              message={t(
                "pages.voting_room.disabled_show_votes_button_message"
              )}
            >
              <Button colorScheme="blue" onClick={() => handleShowVotes(true)}>
                {t("pages.voting_room.button_show_votes")}
              </Button>
            </DisableComponent>
          ))}
      </div>

      {users.map((user, index) => {
        const { left, top } = getCardComponentPosition(index);

        return (
          <Content key={user.id} top={top} left={left}>
            {user.id === ownerUserId && (
              <Tooltip
                label={t("components.user_card.adm_room_tooltip")}
                hasArrow
              >
                <div>
                  <HatIcon />
                </div>
              </Tooltip>
            )}
            <Card
              cardValue={user.vote}
              flipCard={showVotes}
              isSelectedCard={!isNil(user.vote)}
              useHoverCard={false}
              sizeCard={SizeCard.SMALL}
              isCardOnDeck={false}
            />
            <Tooltip label={user.name} hasArrow>
              <UserName>{user.name}</UserName>
            </Tooltip>
          </Content>
        );
      })}
    </Container>
  );
};
