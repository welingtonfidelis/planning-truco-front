import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  background: ${(props) => props.theme.colors.primary};
`;

export const LogoContainer = styled.div`
  display: flex;
  flex: 1;

  img {
    width: 4rem;
  }
`;

export const TitleContainer = styled.div`
  color: #fff;
  display: flex;
  align-items: flex-start;
  font-weight: 500;
  font-size: 1rem;
  flex-direction: column;
  justify-content: center;

  & span:first-child {
    color: ${(props) => props.theme.colors.separator};
  }

  & span:last-child {
    font-weight: 600;
  }
`;
