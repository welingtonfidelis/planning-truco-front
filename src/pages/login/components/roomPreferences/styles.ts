import styled from "styled-components";
import { FaUser } from "react-icons/fa";

export const RadioButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ScaleExample = styled.span`
  color: ${(props) => props.theme.colors.disabled_primary};
`