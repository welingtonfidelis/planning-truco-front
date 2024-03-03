import isNil from "lodash/isNil";
import { Container, Content, UserName } from "./styles";
import { Props } from "./types";
import { Card } from "../../../../components/card";
import { SizeCard } from "../../../../components/card/types";

export const UserCard = (props: Props) => {
  const { users, showVotes } = props;

  return (
    <Container>
      {users.map((user) => {
        return (
          <Content key={user.id}>
            <Card
              cardValue={user.vote}
              flipCard={showVotes}
              isSelectedCard={!isNil(user.vote)}
              useHoverCard={false}
              sizeCard={SizeCard.SMALL}
            />
            <UserName>{user.name}</UserName>
          </Content>
        );
      })}
    </Container>
  );
};
