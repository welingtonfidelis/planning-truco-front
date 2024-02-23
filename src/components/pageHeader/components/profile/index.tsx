import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field, FormikHelpers } from "formik";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";

import {
  AvatarContent,
  AvatarIcon,
} from "./styles";
import { formValidate } from "./helper/formValidate";
import { HttpServerMessageEnum } from "../../../../shared/enum/httpServerMessage";
import { FormProps, Props } from "./types";
import { userStore } from "../../../../store/user";
import { Modal } from "../../../modal";
import { Preloader } from "../../../preloader";
import { responseErrorHandler } from "../../../../shared/handlers/responseError";

const { USERNAME_ALREADY_USED, EMAIL_ALREADY_USED } = HttpServerMessageEnum;

export const Profile = (props: Props) => {
  const { isOpen, onClose } = props;
  const { t } = useTranslation();
  const { updateUser, name, id } = userStore();
  const validateFormFields = formValidate();
  const toast = useToast();
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
    updateUser({ ...values });
    handleCloseModal();

    // const formData = new FormData();

    // Object.entries(values).forEach(([key, value]) => {
    //   if (!FORM_VALUES_IGNORE.includes(key)) {
    //     formData.set(key, value);
    //   }
    // });

    // if (localProfileImage) formData.append("file", localProfileImage);

    // if (deleteProfileImage) formData.append("delete_image", "true");

    // updateProfile(formData as any, {
    //   onSuccess() {
    //     toast({
    //       title: t("components.profile.success_request_message"),
    //     });

    //     handleCloseModal();

    //     refetch();
    //   },
    //   onError(error) {
    //     const { message } = responseErrorHandler(error);

    //     if (message === USERNAME_ALREADY_USED.message) {
    //       actions.setErrors({
    //         username: t("components.profile.input_username_already_used"),
    //       });
    //     }

    //     if (message === EMAIL_ALREADY_USED.message) {
    //       actions.setErrors({
    //         email: t("components.profile.input_email_already_used"),
    //       });
    //     }

    //     toast({
    //       title: t("components.profile.error_request_message"),
    //       status: "error",
    //     });
    //   },
    // });
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
