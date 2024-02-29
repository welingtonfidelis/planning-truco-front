import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field, FormikHelpers } from "formik";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import { AvatarContent, AvatarIcon } from "./styles";
import { formValidate } from "./helper/formValidate";
import { FormProps, Props } from "./types";
import { userStore } from "../../../../store/user";
import { Modal } from "../../../modal";
import { Preloader } from "../../../preloader";
import { SocketEvents } from "../../../../shared/enum/socketEvents";
import { socketStore } from "../../../../store/socket";

const { CLIENT_USER_UPDATE_PROFILE } = SocketEvents;

export const Profile = (props: Props) => {
  const { isOpen, onClose } = props;
  const { t } = useTranslation();
  const { name, id } = userStore();
  const { socket } = socketStore();
  const validateFormFields = formValidate();
  const formRef = useRef<any>();

  const initialFormValues = {
    name,
  };

  const handleCloseModal = () => {
    onClose();
  };

  const handleSubmit = async (
    values: FormProps,
    actions: FormikHelpers<FormProps>
  ) => {
    socket?.emit(CLIENT_USER_UPDATE_PROFILE, { id, ...values });

    handleCloseModal();
  };

  return (
    <Modal
      title={t("components.profile.title")}
      onConfirm={() => formRef.current?.handleSubmit()}
      isOpen={isOpen}
      onClose={handleCloseModal}
    >
      <Preloader isLoading={false}>
        <Formik
          innerRef={formRef}
          initialValues={initialFormValues}
          validationSchema={validateFormFields}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <AvatarContent>
                <AvatarIcon />
              </AvatarContent>

              <Field name="name">
                {({ field }: any) => (
                  <FormControl isInvalid={!!errors.name && touched.name}>
                    <FormLabel mt="2" mb="0.2">
                      {t("components.profile.input_name")}
                    </FormLabel>
                    <Input
                      {...field}
                      placeholder={t("components.profile.input_name")}
                    />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Form>
          )}
        </Formik>
      </Preloader>
    </Modal>
  );
};
