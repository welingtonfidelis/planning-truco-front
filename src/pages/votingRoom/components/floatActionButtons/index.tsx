import { useDisclosure, useToast } from "@chakra-ui/react";
import { IconButton } from "../../../../components/iconButton";
import { Container, InviteUserIcon, TasksIcon } from "./styles";
import { useTranslation } from "react-i18next";
import { DrawerTasks } from "../drawerTasks";
import { ApplicationRoutes } from "../../../../shared/enum/applicationRoutes";

const { VOTING_ROOM } = ApplicationRoutes;

export const FloatActionButtons = () => {
  const toast = useToast();
  const { t } = useTranslation();
  const {
    isOpen: isDrawerTasksOpen,
    onOpen: onDrawerTasksOpen,
    onClose: onDrawerTasksClose,
  } = useDisclosure();

  const url = window.location.href.replace(VOTING_ROOM, "");

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: t("components.float_action_buttons.url_copied"),
      });
    });
  };

  return (
    <Container>
      <IconButton
        icon={<InviteUserIcon />}
        onClick={handleCopyToClipboard}
        title=""
      ></IconButton>

      <IconButton
        icon={<TasksIcon />}
        onClick={onDrawerTasksOpen}
        title=""
      ></IconButton>

      <DrawerTasks isOpen={isDrawerTasksOpen} onClose={onDrawerTasksClose} />
    </Container>
  );
};
