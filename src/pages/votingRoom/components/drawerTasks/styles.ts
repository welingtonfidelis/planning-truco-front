import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ListContent = styled.div`
  display: flex;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  background: ${(props) => props.theme.colors.tertiary};
  color: #fff;
`;

export const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;

  & span:first-child {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
`;

export const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const AddTaskButtonContent = styled.div`
  margin-top: 1rem;

  button {
    width: 100%;
  }
`;

export const FormContainer = styled.div`
  height: 100%;

  & form {
    display: flex;
    height: 100%;
  }

  & button {
    width: 90px;
    margin-left: 0.5rem;
  }
`;

export const CloseButtonContent = styled.div`
  position: relative;

  & button {
    position: absolute;
    right: -11px;
    top: -21px;
  }
`;
