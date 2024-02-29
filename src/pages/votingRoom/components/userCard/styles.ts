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

export const Card = styled.div<{ showVote: boolean; alreadyVoted: boolean }>`
  height: 7rem;
  width: 5rem;
  border-radius: 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) =>
    props.showVote
      ? props.theme.colors.primary
      : props.alreadyVoted
      ? `radial-gradient(circle, ${props.theme.colors.primary} 40%, ${props.theme.colors.success});`
      : props.theme.colors.separator};

  @media (max-height: 700px) {
    height: 6rem;
  }
`;

export const UserVote = styled.span`
  font-size: 2rem;
`;

export const UserName = styled.span`
  overflow: hidden;
  white-space: nowrap;
  max-width: 4.5rem;
  text-overflow: ellipsis;
`;
