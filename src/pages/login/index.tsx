import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field } from "formik";

import {
  ActionContainer,
  Container,
  Content,
  FormContainer,
  LogoContainer,
  WellcomeMessageText,
} from "./styles";

import logoImage from "../../assets/logo.png";
import { ApplicationRoutes } from "../../shared/enum/applicationRoutes";
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  useToast,
} from "@chakra-ui/react";
import { formValidate } from "./helper/formValidate";
import { userStore } from "../../store/user";
import { FormProps } from "./types";
import { useLogin } from "../../services/requests/user";
import { responseErrorHandler } from "../../shared/handlers/responseError";
import { HttpServerMessageEnum } from "../../shared/enum/httpServerMessage";
import { isEmpty } from "lodash";
import { roomStore } from "../../store/room";
import { urlParams } from "../../services/util/urlParams";

const { VOTING_ROOM } = ApplicationRoutes;
const { INVALID_USERNAME_OR_EMAIL, INVALID_PASSWORD } = HttpServerMessageEnum;

const initialFormValues = {
  name: "",
};

export const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const validateFormFields = formValidate();
  // const { login, isLoading } = useLogin();
  const { updateUser } = userStore();
  const { updateRoom } = roomStore();
  const toast = useToast();
  const {getParams} = urlParams();
  const roomId = getParams('roomId') as string;

  const navigateToVotingRoom = (roomId: string) => {
    navigate({
      pathname: VOTING_ROOM,
      search: createSearchParams({ roomId }).toString(),
    });
  };

  const handleEnterExistingRoom = async (values: FormProps) => {
    if (!roomId) return;
    // login(values, {
    //   onSuccess(data) {
    //     if (data) {
    //       updateUser(data);
    //       navigate(DASHBOARD);
    //     }
    //   },
    //   onError(error) {
    //     const { message } = responseErrorHandler(error);

    //     if (message === INVALID_USERNAME_OR_EMAIL.message) {
    //       actions.setErrors({
    //         username: t("pages.login.input_user_email_invalid"),
    //       });
    //     }

    //     if (message === INVALID_PASSWORD.message) {
    //       actions.setErrors({
    //         password: t("pages.login.input_password_invalid"),
    //       });
    //     }

    //     toast({
    //       title: t("pages.login.error_request_message"),
    //       status: "error",
    //       duration: null,
    //     });
    //   },
    // });

    const user = { id: "123a", ...values };
    updateUser(user);
    updateRoom({ id: roomId, ownerUserId: user.id, users: [user, { id: "afav", name: "Fulano" }] });

    navigateToVotingRoom(roomId);
  };

  const handleCreateRoom = (values: FormProps) => {
    const user = { id: "123a", ...values };
    updateUser(user);
    updateRoom({ id: "321b", ownerUserId: user.id, users: [user, { id: "afav", name: "Fulano" }] });

    navigateToVotingRoom("321b");
  };

  return (
    <Container>
      <Content>
        <LogoContainer>
          <img src={logoImage} alt="logo image" />
        </LogoContainer>

        <WellcomeMessageText>
          {t("pages.login.welcome_message")}
        </WellcomeMessageText>

        <FormContainer>
          <Formik
            initialValues={initialFormValues}
            validationSchema={validateFormFields}
            onSubmit={handleEnterExistingRoom}
          >
            {({ errors, touched, values, setTouched }) => (
              <Form>
                <Field name="name">
                  {({ field }: any) => (
                    <FormControl
                      isInvalid={!!errors.name && touched.name}
                      mb="2"
                    >
                      <Input
                        {...field}
                        placeholder={t("pages.login.input_user_name")}
                      />
                      <FormErrorMessage>{errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <ActionContainer>
                  {roomId && (
                    <>
                      <Button
                        colorScheme="blue"
                        isLoading={false}
                        type="submit"
                        width="100%"
                      >
                        {t("pages.login.button_login")}
                      </Button>

                      <span>- {t("generic.text_or")} -</span>
                    </>
                  )}

                  <Button
                    colorScheme="green"
                    isLoading={false}
                    width="100%"
                    type="button"
                    onClick={async () => {
                      await setTouched({ name: true }).then((e) => {
                        if (isEmpty(e)) handleCreateRoom(values);
                      });
                    }}
                  >
                    {t("pages.login.button_create_room")}
                  </Button>
                </ActionContainer>
              </Form>
            )}
          </Formik>
        </FormContainer>
      </Content>
    </Container>
  );
};
