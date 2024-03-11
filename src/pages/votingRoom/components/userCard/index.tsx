import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import {
  Container,
  Content,
  HatIcon,
  PreferenceIcon,
  UserName,
} from "./styles";
import { Card } from "../../../../components/card";
import { SizeCard } from "../../../../components/card/types";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { roomStore } from "../../../../store/room";
import { socketStore } from "../../../../store/socket";
import { SocketEvents } from "../../../../shared/enum/socketEvents";
import { DisableComponent } from "../../../../components/disableComponent";
import { AlertConfirm } from "../../../../components/alertConfirm";
import { useState } from "react";

const {
  CLIENT_ROOM_SHOW_VOTES,
  CLIENT_ROOM_RESET_VOTES,
  CLIENT_KICK_USER,
  CLIENT_OWNER_ROOM_TRANSFER,
} = SocketEvents;
export const UserCard = () => {
  const {
    users,
    showVotes,
    currentTaskId,
    ownerUserId,
    isLoggedUserOwnerRoom,
  } = roomStore();
  const { socket } = socketStore();
  const { t } = useTranslation();
  const [selectedUserId, setSelectedUserId] = useState("");
  const {
    isOpen: isOpenKickUser,
    onOpen: onOpenKickUser,
    onClose: onCloseKickUser,
  } = useDisclosure();
  const {
    isOpen: isOpenOwnerRoomTransfer,
    onOpen: onOpenOwnerRoomTransfer,
    onClose: onCloseOwnerRoomTransfer,
  } = useDisclosure();

  const isTotalUsersOdd = users.length % 2 === 0;
  const totalCards = users.length + (isTotalUsersOdd ? 0 : 1);

  const getCardComponentPosition = (index: number) => {
    const angle = (index / totalCards) * 360;
    const radius = 100; // radius circumference where cards will be positioned

    const left = 50 + radius * Math.cos((angle * Math.PI) / 180);
    const top = 50 + radius * Math.sin((angle * Math.PI) / 180);

    return { left, top };
  };

  const handleShowVotes = (showVotes: boolean) => {
    if (showVotes) return socket?.emit(CLIENT_ROOM_SHOW_VOTES);

    socket?.emit(CLIENT_ROOM_RESET_VOTES);
  };

  const handleOpenAlert = (userId: string, type: "kick" | "ownerRoom") => {
    switch (type) {
      case "kick":
        onOpenKickUser();
        break;

      case "ownerRoom":
        onOpenOwnerRoomTransfer();
        break;
    }

    setSelectedUserId(userId);
  };

  const handleKickUserConfirm = () => {
    if (selectedUserId) socket?.emit(CLIENT_KICK_USER, selectedUserId);

    setSelectedUserId("");
    onCloseKickUser();
  };

  const handleOwnerRoomTransferConfirm = () => {
    if (selectedUserId)
      socket?.emit(CLIENT_OWNER_ROOM_TRANSFER, selectedUserId);

    setSelectedUserId("");
    onCloseOwnerRoomTransfer();
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
            <UserName>
              <Tooltip label={user.name} hasArrow>
                <span>{user.name}</span>
              </Tooltip>

              {isLoggedUserOwnerRoom && user.id !== ownerUserId && (
                <Menu placement="auto">
                  <Tooltip
                    label={t("components.user_card.user_actions_tooltip")}
                    hasArrow
                  >
                    <MenuButton>
                      <PreferenceIcon />
                    </MenuButton>
                  </Tooltip>
                  <MenuList minW="100px">
                    <MenuItem
                      onClick={() => handleOpenAlert(user.id, "ownerRoom")}
                    >
                      {t("components.user_card.button_set_owner_room_user")}
                    </MenuItem>
                    <MenuItem onClick={() => handleOpenAlert(user.id, "kick")}>
                      {t("components.user_card.button_delete_user")}
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}
            </UserName>
          </Content>
        );
      })}

      <AlertConfirm
        title={t("pages.voting_room.alert_title_kick_user")}
        description={t("pages.voting_room.alert_description_kick_user")}
        isOpen={isOpenKickUser}
        onClose={onCloseKickUser}
        onConfirm={handleKickUserConfirm}
      />

      <AlertConfirm
        title={t("pages.voting_room.alert_title_owner_room_transfer")}
        description={t(
          "pages.voting_room.alert_description_owner_room_transfer"
        )}
        isOpen={isOpenOwnerRoomTransfer}
        onClose={onCloseOwnerRoomTransfer}
        onConfirm={handleOwnerRoomTransferConfirm}
      />
    </Container>
  );
};
