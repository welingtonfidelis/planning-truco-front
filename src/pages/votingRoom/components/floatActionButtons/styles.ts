import { Tooltip } from "@chakra-ui/react";
import { FaRegShareSquare, FaTasks } from "react-icons/fa";
import styled from "styled-components";

export const Container = styled.div`
  position: relative;
`;

export const ButtonContainer = styled.div<{ topSpace: number }>`
  position: absolute;
  right: 1rem;
  top: ${(props) => props.topSpace}rem;
`;

export const ToolTipStyled = styled(Tooltip)`
  -webkit-animation: heartbeat 2s ease-in-out infinite both;
  animation: heartbeat 2s ease-in-out infinite both;
  
  font-size: 1rem !important;
  max-width: 9rem !important;
`;

export const InviteUserIcon = styled(FaRegShareSquare)`
  font-size: 2.2rem;
  fill: ${(props) => props.theme.colors.primary};
`;

export const TasksIcon = styled(FaTasks)`
  font-size: 2.2rem;
  fill: ${(props) => props.theme.colors.primary};
`;
