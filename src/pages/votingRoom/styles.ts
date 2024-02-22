import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
`;

export const TableContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TableIcon = styled.div`
  width: 24rem;
  height: 14rem;
  background-color: #30d98a;
  border-radius: 10px;
  border: 5px solid #8c3718;
  margin: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
