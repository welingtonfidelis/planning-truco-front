import isNil from "lodash/isNil";
import {
  Card,
  CoffeeIcon,
  Container,
  Content,
  DoubtIcon,
  UserName,
  UserVote,
} from "./styles";
import { Props } from "./types";

export const UserCard = (props: Props) => {
  const { users, showVotes } = props;
  const extraCards: {[key: number]: any} = {
    [-1]: <DoubtIcon />,
    [1000]: <CoffeeIcon />,
  };

  return (
    <Container>
      {users.map((user) => {
        const componentVote = user.vote && extraCards[user.vote] ? extraCards[user.vote] : user.vote;

        return (
          <Content key={user.id}>
            <Card showVote={showVotes} alreadyVoted={!isNil(user.vote)}>
              <UserVote>{showVotes ? componentVote : ""}</UserVote>
            </Card>
            <UserName>{user.name}</UserName>
          </Content>
        );
      })}
    </Container>
  );
};
