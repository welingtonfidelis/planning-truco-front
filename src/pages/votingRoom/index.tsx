import { ApplicationRoutes } from "../../shared/enum/applicationRoutes";
import { Container } from "./styles";
import { userStore } from "../../store/user";
import { roomStore } from "../../store/room";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { PageHeader } from "../../components/pageHeader";

const { ROOT } = ApplicationRoutes;
export const VotingRoom = () => {
  const navigate = useNavigate();

  const { id: userId, name } = userStore();
  const { id: roomId } = roomStore();

  useEffect(() => {
    if (!roomId) {
      navigate(ROOT);
    }
  }, []);

  return (
    <Container>
      <PageHeader />
    
    </Container>
  );
};
