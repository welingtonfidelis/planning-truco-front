import isNil from "lodash/isNil";
import { Card, Container, Content, UserName, UserVote } from "./styles";
import { Props } from "./types";

export const UserCard = (props: Props) => {
  const { users, showVotes } = props;

  return (
    <Container>
      {users.map((user) => {
        return (
          <Content key={user.id}>
            <Card showVote={showVotes} alreadyVoted={!isNil(user.vote)}>
              <UserVote>{showVotes ? user.vote : ""}</UserVote>
            </Card>
            <UserName>{user.name}</UserName>
          </Content>
        );
      })}
    </Container>
  );
};
