import { FaCoffee, FaQuestion } from "react-icons/fa";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Card = styled.div<{ showVote: boolean; alreadyVoted: boolean }>`
  height: 7rem;
  width: 5rem;
  border-radius: 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) =>
    props.showVote
      ? `linear-gradient(45deg,#A63774 12%,transparent 0,transparent 88%,#A63774 0),linear-gradient(135deg,transparent 37%,#F2388F 0,#F2388F 63%,transparent 0),linear-gradient(45deg,transparent 37%,#A63774 0,#A63774 63%,transparent 0),#ed82bd;`
      : props.alreadyVoted
      ? props.theme.colors.tertiary
      : props.theme.colors.separator};

  @media (max-height: 700px) {
    height: 6rem;
  }
`;

export const UserVote = styled.span`
  font-size: 3rem;
  font-weight: 600;
  text-shadow: -1px 0 #fff, 0 1px #fff, 1px 0 #fff, 0 -1px #fff;

  & svg {
    stroke-width: 10;
    stroke: white;
  }
`;

export const UserName = styled.span`
  overflow: hidden;
  white-space: nowrap;
  max-width: 4.5rem;
  text-overflow: ellipsis;
`;

export const DoubtIcon = styled(FaQuestion)``;

export const CoffeeIcon = styled(FaCoffee)``;
