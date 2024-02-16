import styled from "styled-components";

export const Container = styled.div`
  & svg {
    transition: 0.5s;

    :hover {
      cursor: pointer;
      filter: brightness(1.2);
    }
  }
`;
