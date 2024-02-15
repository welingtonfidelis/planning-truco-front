import styled from "styled-components";
import { FaUser } from "react-icons/fa";

export const AvatarContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const AvatarIcon = styled(FaUser)`
  font-size: 8rem;
  border: 1px solid ${(props) => props.theme.colors.primary};
  border-radius: 50%;
  padding: 0.5rem;
`;
