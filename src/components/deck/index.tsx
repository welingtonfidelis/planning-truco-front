import { Card } from "../card";
import { roomStore } from "../../store/room";
import { userStore } from "../../store/user";
import { Container } from "./styles";
import { JokerCardValue } from "../../shared/const/jokerCardValue";
import { Tooltip } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export const Deck = () => {
  const { id: userId } = userStore();
  const { users, currentTaskId, scale } = roomStore();
  const { t } = useTranslation();

  const selectedCard = users.find((user) => user.id === userId)?.vote;

  const tooltipLabel = currentTaskId ? "" : t("components.deck.waiting_adm_create_task");

  return (
    <Tooltip label={tooltipLabel} hasArrow>
      <Container>
        {[...scale, ...JokerCardValue].map((cardValue, index) => (
          <Card
            key={index}
            cardValue={cardValue}
            flipCard={!!currentTaskId}
            isCardOnDeck
            isSelectedCard={cardValue === selectedCard}
          />
        ))}
      </Container>
    </Tooltip>
  );
};
