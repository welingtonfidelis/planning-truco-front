import {
    Button,
    Drawer as DrawerChakra,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
  } from "@chakra-ui/react";
  import { PropsWithChildren } from "react";
  import { useTranslation } from "react-i18next";
  
  import { Props } from "./types";
  
  export const Drawer = (props: PropsWithChildren<Props>) => {
    const {
      title,
      onConfirmButtonText,
      onCloseButtonText,
      children,
      isOpen,
      onConfirmLoading,
      showActionButtons = true,
      extraActionButton,
      onConfirm,
      onClose,
    } = props;
    const { t } = useTranslation();
  
    return (
      <DrawerChakra onClose={onClose} isOpen={isOpen} size="lg">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader padding={"1rem"}>{title}</DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody padding={"1rem"}>{children}</DrawerBody>
          {showActionButtons && (
            <DrawerFooter>
              {extraActionButton}
              <Button
                onClick={onClose}
                colorScheme="gray"
                type="submit"
              >
                {onCloseButtonText || t("generic.button_cancel")}
              </Button>
              {onConfirm && (
                <Button
                  onClick={onConfirm}
                  colorScheme="blue"
                  marginLeft={2}
                  isLoading={onConfirmLoading}
                >
                  {onConfirmButtonText || t("generic.button_save")}
                </Button>
              )}
            </DrawerFooter>
          )}
        </DrawerContent>
      </DrawerChakra>
    );
  };