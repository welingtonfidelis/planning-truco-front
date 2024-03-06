import { FaTasks, FaUserPlus } from "react-icons/fa";
import styled from "styled-components";

export const Container = styled.div`
  position: relative;
`;

export const ButtonContainer = styled.div<{ topSpace: number }>`
  position: absolute;
  right: 1rem;
  top: ${(props) => props.topSpace}rem;
`;

export const InviteUserIcon = styled(FaUserPlus)`
  font-size: 2.2rem;
  fill: ${(props) => props.theme.colors.primary};
`;

export const TasksIcon = styled(FaTasks)`
  font-size: 2.2rem;
  fill: ${(props) => props.theme.colors.primary};
`;
