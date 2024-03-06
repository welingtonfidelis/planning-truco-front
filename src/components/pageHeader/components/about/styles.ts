import styled from "styled-components";
import { FaRegCopy, FaUser } from "react-icons/fa";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const WelcomeMessage = styled.span`
  font-weight: 600;
  margin-bottom: 1rem;
`

export const DescriptionMessage = styled.span`
  margin-bottom: 2rem;
`

export const ContactContainer = styled.div`
  display: flex;
  align-items: center;

  & svg {
    margin-left: .5rem;
  }
`;

export const CopyIcon = styled(FaRegCopy)`
  fill: ${(props) => props.theme.colors.primary};
`;
