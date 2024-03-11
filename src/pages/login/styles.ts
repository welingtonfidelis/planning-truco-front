import styled from "styled-components";
import { FaGear } from "react-icons/fa6";

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
`;

export const Content = styled.div`
  min-height: 24rem;
  width: 100%;
  border: 1px solid ${(props) => props.theme.colors.separator};
  box-shadow: 1px 0px 12px 2px rgba(0, 0, 0, 0.35);
  border-radius: ${(props) => props.theme.border.radius};
  background: #fff;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;

  @media (min-width: 800px) {
    width: 30rem;
    min-height: 26rem;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 7rem;
  }

  @media (min-width: 800px) {
    img {
      width: 8rem;
    }
  }
`;

export const WellcomeMessageText = styled.span`
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;

export const FormContainer = styled.div`
  height: 100%;
  & form {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;

export const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: 1rem;
  justify-content: space-around;
  align-items: center;
`;

export const CreateRoomActionContainer = styled.div`
  display: flex;
  width: 100%;

  button:last-of-type {
    margin-left: .5rem;
  }
`;

export const PreferenceIcon = styled(FaGear)`
  fill: ${(props) => props.theme.colors.primary};
`;
