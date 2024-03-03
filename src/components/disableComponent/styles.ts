import styled from "styled-components";

export const DisabledContent = styled.div<{ isDisabled: boolean }>`
  pointer-events: ${(props) => props.isDisabled && "none"};
`;
