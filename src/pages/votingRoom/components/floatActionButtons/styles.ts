import { FaTasks, FaUserPlus } from "react-icons/fa";
import styled from "styled-components";

export const Container = styled.div`
    position: relative;
`

export const InviteUserIcon = styled(FaUserPlus)`
  font-size: 2.2rem;
  fill: ${(props) => props.theme.colors.primary};
  position: absolute;
  right: 1rem;
`;

export const TasksIcon = styled(FaTasks)`
  font-size: 2.2rem;
  fill: ${(props) => props.theme.colors.primary};
  position: absolute;
  top: 3.2rem;
  right: 1rem;
`;
