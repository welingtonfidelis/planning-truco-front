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
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { ApplicationRoutes } from "../../shared/enum/applicationRoutes";
import { userStore } from "../../store/user";
import { AlertConfirm } from "../alertConfirm";

import { Container, LogoContainer, TitleContainer } from "./styles";
import { Props } from "./types";
import { Profile } from "./components/profile";

import logoImage from "../../assets/logo.png";
import { roomStore } from "../../store/room";

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
  const { id, name, clearUser } = userStore();
  const { currentTaskId, tasks } = roomStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();
    // logout();
    navigate(ROOT);
  };

  const currentTask = tasks.find((task) => task.id === currentTaskId);

  return (
    <Container>
      <LogoContainer>
        <img src={logoImage} alt="logo image" />

        <TitleContainer>
          <span>{t("components.page_header.current_task_message")}:</span>

          <span>{currentTask?.name ?? "-"}</span>
        </TitleContainer>
      </LogoContainer>

      <Menu>
        <MenuButton>
          <Avatar name={name} size={"sm"} />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={onOpenProfile}>
            {t("components.page_header.menu_item_profile")}
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
    </Container>
  );
};
