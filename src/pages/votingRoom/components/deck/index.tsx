import { roomStore } from "../../../../store/room";
import { userStore } from "../../../../store/user";
import { CardContent, CoffeeIcon, Container, DoubtIcon } from "./styles";

const cardPoint = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

export const Deck = () => {
  const { id: userId } = userStore();
  const { updateRoom, users } = roomStore();

  const handleSelectCard = (value: number) => {
    console.log("value: ", value);
    const newUsers = users.map((user) => {
      if (user.id === userId) return { ...user, vote: value };

      return user;
    });

    updateRoom({ users: newUsers });
  };

  const parseCards = () => {
    const cards = cardPoint.map((card) => ({ value: card, label: `${card}` }));
    const extraCards = [
      { value: 999, label: <DoubtIcon /> },
      { value: 1000, label: <CoffeeIcon /> },
    ];

    return [...cards, ...extraCards];
  };

  return (
    <Container>
      {parseCards().map((card) => {
        return (
          <CardContent
            totalCards={cardPoint.length}
            onClick={() => handleSelectCard(card.value)}
            key={card.value}
          >
            {card.label}
          </CardContent>
        );
      })}
    </Container>
  );
};
