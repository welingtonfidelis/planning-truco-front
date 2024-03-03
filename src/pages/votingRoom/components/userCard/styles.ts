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

export const UserName = styled.span`
  overflow: hidden;
  white-space: nowrap;
  max-width: 4.5rem;
  text-overflow: ellipsis;
`;