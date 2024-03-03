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
  } = props;
  const { socket } = socketStore();

  const extraCards: { [key: number]: any } = {
    [-1]: <DoubtIcon />,
    [1000]: <CoffeeIcon />,
  };

  const className = flipCard ? "flipCardFront" : "";
  const cardLabel = (!isNil(cardValue) && extraCards[cardValue]) ?? cardValue;

  const handleSelectCard = (value: number) => {
    socket?.emit(CLIENT_ROOM_VOTE_TASK, value);
  };

  return (
    <FlipCard
      height={sizeCardProps[sizeCard].height}
      width={sizeCardProps[sizeCard].width}
    >
      <FlipCardInner className={className}>
        <CardContentFront
          isSelected={!!useHoverCard && isSelectedCard}
          useHover={!!useHoverCard}
          onClick={() => !isNil(cardValue) && handleSelectCard(cardValue)}
        >
          {cardLabel}
        </CardContentFront>
        <CardContentBack isSelected={!flipCard && isSelectedCard} />
      </FlipCardInner>
    </FlipCard>
  );
};
