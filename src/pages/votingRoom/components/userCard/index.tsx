import isNil from "lodash/isNil";
import { Container, Content, HatIcon, UserName } from "./styles";
import { Props } from "./types";
import { Card } from "../../../../components/card";
import { SizeCard } from "../../../../components/card/types";
import { Tooltip } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export const UserCard = (props: Props) => {
  const { users, showVotes, userIdOwnerRoom } = props;
  const { t } = useTranslation();

  return (
    <Container>
      {users.map((user) => {
        return (
          <Content key={user.id}>
            {user.id === userIdOwnerRoom && (
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
