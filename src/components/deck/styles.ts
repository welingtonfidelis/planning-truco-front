import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  margin: 0.5rem;
  overflow-x: auto;
  max-width: calc(100vw - 1rem);
  align-items: flex-end;
  height: 10rem;
  /* justify-content: center; */
  justify-content: flex-start;

  @media (max-width: 750px) {
    height: 11rem;
  }
`;
