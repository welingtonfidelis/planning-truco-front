import { ApplicationRoutes } from "../../shared/enum/applicationRoutes";
import { Container, Content, TableContent, TableIcon } from "./styles";
import { userStore } from "../../store/user";
import { roomStore } from "../../store/room";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { PageHeader } from "../../components/pageHeader";
import { FloatActionButtons } from "./components/floatActionButtons";
import { User } from "../../domains/user";
import { UserRoom } from "../../domains/room";
import { UserCard } from "./components/userCard";
import { Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const { ROOT } = ApplicationRoutes;

enum ChairPositionEnum {
  TOP = "top",
  RIGHT = "right",
  BOTTOM = "bottom",
  LEFT = "left",
}

export const VotingRoom = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { id: userId, name } = userStore();
  const { id: roomId, showVotes, ownerUserId, updateRoom } = roomStore();

  useEffect(() => {
    if (!roomId) {
      navigate(ROOT);
    }
  }, []);

  const usersMock = [
    { name: "Fulano A", id: "1", vote: 0 },
    { name: "Fulano nome longo longo longo B", id: "2", vote: 0 },
    { name: "Fulano C", id: "3", vote: 0 },
    { name: "Fulano D", id: "4", vote: 0 },
    { name: "Fulano E", id: "5", vote: 0 },
    { name: "Fulano F", id: "6", vote: 0 },
    // { name: "Fulano G", id: "7", vote: 0 },
    // { name: "Fulano H", id: "8", vote: 0 },
    // { name: "Fulano nome maior I", id: "9", vote: 0 },
    // { name: "Fulano J", id: "10", vote: 0 },
    // { name: "Fulano K", id: "11", vote: 0 },
    // { name: "Fulano G", id: "12", vote: 0 },
    // { name: "Fulano H", id: "13", vote: 0 },
    // { name: "Fulano nome maior I", id: "14", vote: 0 },
    // { name: "Fulano J", id: "15", vote: 0 },
    // { name: "Fulano K", id: "16", vote: 0 },
    { name, id: userId, vote: 0 },
  ];

  const chairOrganize = useMemo(() => {
    return usersMock.reduce(
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
  }, [usersMock]);

  const handleShowVotes = (showVotes: boolean) => {
    updateRoom({ showVotes });
  };

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

        <div>test</div>
      </Content>
    </Container>
  );
};
