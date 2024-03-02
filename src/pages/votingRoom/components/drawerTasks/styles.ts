import { FaTrash } from "react-icons/fa";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ListContent = styled.div<{ isSelected: boolean }>`
  display: flex;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.secondary};
  background: ${(props) => props.isSelected && props.theme.colors.tertiary};
  color: ${(props) => props.isSelected && "#fff"};
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

export const RightContent = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
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

export const DeleteIcon = styled(FaTrash)`
  margin-top: 0.5rem;
  transition: .5s;

  &:hover {
    fill: ${(props) => props.theme.colors.error};
  }
`;
