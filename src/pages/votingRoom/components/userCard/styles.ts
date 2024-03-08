import { FaHatCowboy } from "react-icons/fa";
import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  background: green;
  width: 32rem;
  height: 14rem;
  background-color: ${(props) => props.theme.colors.success};
  border-radius: 10px;
  border: 5px solid #8c3718;
  margin: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1200px) {
    width: 28rem;
  }

  @media (max-width: 950px) {
    width: 20rem;
  }

  @media (max-width: 750px) {
    width: 16rem;
  }

  @media (max-height: 750px) {
    height: 12rem;
  }

  @media (max-width: 600px) {
    width: 10rem;
  }

  @media (max-height: 650px) {
    height: 8rem;
  }
`;

export const Content = styled.div<{ top: number; left: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  transform: translate(-50%, -50%);
  top: ${(props) => props.top}%;
  left: ${(props) => props.left}%;
`;

export const UserName = styled.span`
  overflow: hidden;
  white-space: nowrap;
  max-width: 4.5rem;
  text-overflow: ellipsis;
`;

export const HatIcon = styled(FaHatCowboy)`
  font-size: 2.2rem;
  fill: ${(props) => props.theme.colors.primary};

  :hover {
    cursor: pointer;
  }
`;
