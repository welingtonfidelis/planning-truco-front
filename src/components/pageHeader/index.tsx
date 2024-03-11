import {
  Avatar,
  Divider,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { ApplicationRoutes } from "../../shared/enum/applicationRoutes";
import { userStore } from "../../store/user";
import { AlertConfirm } from "../alertConfirm";

import { Container, LogoContainer, TitleContainer } from "./styles";
import { Props } from "./types";
import { Profile } from "./components/profile";

import logoImage from "../../assets/logo-2.svg";
import { roomStore } from "../../store/room";
import { socketStore } from "../../store/socket";
import { About } from "./components/about";

const { ROOT } = ApplicationRoutes;

export const PageHeader = (props: Props) => {
  const {} = props;
  const { t } = useTranslation();
  const {
    isOpen: isOpenLogout,
    onOpen: onOpenLogout,
    onClose: onCloseLogout,
  } = useDisclosure();
  const {
    isOpen: isOpenProfile,
    onOpen: onOpenProfile,
    onClose: onCloseProfile,
  } = useDisclosure();
  const {
    isOpen: isOpenAbout,
    onOpen: onOpenAbout,
    onClose: onCloseAbout,
  } = useDisclosure();
  const { name, clearUser } = userStore();
  const { currentTaskId, tasks } = roomStore();
  const { destroySocketConnection } = socketStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();
    destroySocketConnection();
    navigate(ROOT);
  };

  const currentTask = tasks.find((task) => task.id === currentTaskId);

  return (
    <Container zIndex="dropdown">
      <LogoContainer>
        <img src={logoImage} alt="logo image" />

        <TitleContainer>
          <span>{t("components.page_header.current_task_message")}:</span>

          <span>{currentTask?.name ?? "-"}</span>
        </TitleContainer>
      </LogoContainer>

      <Menu>
        <MenuButton padding={'0.5rem'}>
          <Avatar name={name} size={"md"} bg='pink.500' />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={onOpenProfile}>
            {t("components.page_header.menu_item_profile")}
          </MenuItem>
          <Divider />
          <MenuItem onClick={onOpenAbout}>
            {t("components.page_header.menu_item_about")}
          </MenuItem>
          <Divider />
          <MenuItem onClick={onOpenLogout} color="red">
            {t("components.page_header.menu_item_logout")}
          </MenuItem>
        </MenuList>
      </Menu>

      <AlertConfirm
        title={t("components.page_header.alert_title_logout")}
        description={t("components.page_header.alert_description_logout")}
        isOpen={isOpenLogout}
        onClose={onCloseLogout}
        onConfirm={handleLogout}
      />

      <Profile isOpen={isOpenProfile} onClose={onCloseProfile} />

      <About isOpen={isOpenAbout} onClose={onCloseAbout} />
    </Container>
  );
};
