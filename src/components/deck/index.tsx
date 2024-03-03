import { Card } from "../card";
import { roomStore } from "../../store/room";
import { userStore } from "../../store/user";
import { Container } from "./styles";

const cardPoint = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, -1, 1000];

export const Deck = () => {
  const { id: userId } = userStore();
  const { users, currentTaskId } = roomStore();

  const selectedCard = users.find((user) => user.id === userId)?.vote;

  return (
    <Container>
      {cardPoint.map((cardValue, index) => (
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
