import { Card } from "../card";
import { roomStore } from "../../store/room";
import { userStore } from "../../store/user";
import { Container } from "./styles";
import { JokerCardValue } from "../../shared/const/jokerCardValue";

export const Deck = () => {
  const { id: userId } = userStore();
  const { users, currentTaskId, scale } = roomStore();

  const selectedCard = users.find((user) => user.id === userId)?.vote;

  return (
    <Container>
      {[...scale, ...JokerCardValue].map((cardValue, index) => (
        <Card
          key={index}
          cardValue={cardValue}
          flipCard={!!currentTaskId}
          isSelectedCard={cardValue === selectedCard}
        />
      ))}
    </Container>
  );
};
