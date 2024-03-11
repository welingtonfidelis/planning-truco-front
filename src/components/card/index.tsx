import isNil from "lodash/isNil";
import { SocketEvents } from "../../shared/enum/socketEvents";
import { socketStore } from "../../store/socket";
import {
  CardContentBack,
  CardContentFront,
  CoffeeIcon,
  DoubtIcon,
  FlipCard,
  FlipCardInner,
} from "./styles";
import { Props, SizeCard } from "./types";
import { Tooltip } from "@chakra-ui/react";

const { CLIENT_ROOM_VOTE_TASK } = SocketEvents;

const sizeCardProps = {
  [SizeCard.SMALL]: {
    height: 7,
    width: 4,
  },
  [SizeCard.LARGE]: {
    height: 9,
    width: 6,
  },
};

export const Card = (props: Props) => {
  const {
    cardValue,
    flipCard,
    isSelectedCard,
    useHoverCard = true,
    sizeCard = SizeCard.LARGE,
    isCardOnDeck,
  } = props;
  const { socket } = socketStore();

  const extraCards: { [key: string]: any } = {
    ["-1"]: <DoubtIcon />,
    ["1000"]: <CoffeeIcon />,
  };

  const className = flipCard ? "flipCardFront" : "";
  const cardLabel = (!isNil(cardValue) && extraCards[cardValue]) ?? cardValue;

  const handleSelectCard = (value: string) => {
    socket?.emit(CLIENT_ROOM_VOTE_TASK, value);
  };

  const cardId = `card_id_${cardValue}`;
  const cardLabelElement = document.getElementById(cardId);
  const cardLabelElementHeight = cardLabelElement?.scrollHeight ?? 0;

  const tooltipLabel =
    cardLabelElementHeight / 16 > sizeCardProps[sizeCard].height
      ? cardLabel
      : "";

  return (
    <FlipCard
      height={sizeCardProps[sizeCard].height}
      width={sizeCardProps[sizeCard].width}
    >
      <FlipCardInner className={className}>
        <Tooltip label={tooltipLabel} hasArrow>
          <CardContentFront
            isSelected={!!useHoverCard && isSelectedCard}
            useHover={!!useHoverCard}
            onClick={() => !isNil(cardValue) && handleSelectCard(cardValue)}
          >
            <span id={cardId}>{cardLabel}</span>
          </CardContentFront>
        </Tooltip>
        <CardContentBack
          useBackground={isCardOnDeck || isSelectedCard}
          isSelected={isSelectedCard}
        />
      </FlipCardInner>
    </FlipCard>
  );
};
