import { Trans, useTranslation } from "react-i18next";

import { Props } from "./types";
import { Modal } from "../../../modal";
import { useToast } from "@chakra-ui/react";
import { copyToClipboard } from "../../../../services/util/copyToClipboard";
import { IconButton } from "../../../iconButton";
import {
  ContactContainer,
  Container,
  CopyIcon,
  DescriptionMessage,
  WelcomeMessage,
} from "./styles";
import { config } from "../../../../config";

const email = "welingtonfidelis@gmail.com";

const { CONTACT_EMAIL } = config;

export const About = (props: Props) => {
  const { isOpen, onClose } = props;
  const { t } = useTranslation();
  const toast = useToast();

  const handleCloseModal = () => {
    onClose();
  };

  const onCopySuccess = () => {
    toast({
      title: t("components.about.email_copied"),
    });
  };

  const handleCopyToClipboard = () => {
    copyToClipboard({ textToCopy: CONTACT_EMAIL, onSuccess: onCopySuccess });
  };

  return (
    <Modal
      title={t("components.about.title")}
      isOpen={isOpen}
      onClose={handleCloseModal}
      onCloseButtonText={t("generic.button_back")}
    >
      <Container>
        <WelcomeMessage>{t("components.about.welcome_message")}</WelcomeMessage>

        <DescriptionMessage>
          <Trans i18nKey="components.about.description_message" />
        </DescriptionMessage>

        <ContactContainer>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <IconButton
            icon={<CopyIcon />}
            onClick={handleCopyToClipboard}
            title={t("components.about.copy_email_tooltip")}
          />
        </ContactContainer>
      </Container>
    </Modal>
  );
};
