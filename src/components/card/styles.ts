import { FaCoffee, FaQuestion } from "react-icons/fa";
import styled, { css } from "styled-components";

import backgroundCard from "../../assets/background-card-1.png";

export const FlipCard = styled.div<{ height: number; width: number }>`
  background-color: transparent;
  height: ${(props) => props.height}rem;
  width: ${(props) => props.width}rem;
  perspective: 6rem;
  margin: 0 0.2rem;

  ${css`
    .flipCardFront {
      transform: rotateY(180deg);
    }
  `}

  @media (max-width: 750px) {
    flex-shrink: 0;
  }
`;

export const FlipCardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
`;

export const CardContentFront = styled.div<{
  isSelected: boolean;
  useHover: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 0.2rem;
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border: 1px solid ${(props) => props.theme.colors.secondary};
  transform: rotateY(180deg);
  bottom: ${(props) => props.isSelected && "16px"};
  overflow: hidden;

  span {
    font-size: 2.5rem;
    font-weight: 600;
    word-break: break-all;
  }

  :hover {
    cursor: pointer;
    bottom: ${(props) => props.useHover && "16px"};
  }

  @media (max-width: 950px) {
    span {
      font-size: 2rem;
    }
  }
`;

export const CardContentBack = styled.div<{
  isSelected: boolean;
  useBackground: boolean;
}>`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 0.2rem;
  background-image: ${(props) =>
    props.useBackground ? `url(${backgroundCard})` : ""};
  background-repeat: no-repeat;
  background-position: center;
  border: 1px solid ${(props) => props.theme.colors.secondary};
`;

export const DoubtIcon = styled(FaQuestion)``;

export const CoffeeIcon = styled(FaCoffee)``;
