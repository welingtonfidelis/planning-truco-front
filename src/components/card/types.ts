export interface Props {
    cardValue?: string | null;
    flipCard: boolean;
    isSelectedCard: boolean;
    useHoverCard?: boolean;
    sizeCard?: SizeCard;
}

export enum SizeCard {
    SMALL = 'small',
    LARGE = 'large'
}