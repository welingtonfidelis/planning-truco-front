export interface Props {
    cardValue?: number | null;
    flipCard: boolean;
    isSelectedCard: boolean;
    useHoverCard?: boolean;
    sizeCard?: SizeCard;
}

export enum SizeCard {
    SMALL = 'small',
    LARGE = 'large'
}