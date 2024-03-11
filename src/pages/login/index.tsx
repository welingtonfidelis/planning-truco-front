import { createSearchParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field } from "formik";

import {
  ActionContainer,
  Container,
  Content,
  CreateRoomActionContainer,
  FormContainer,
  LogoContainer,
  PreferenceIcon,
  WellcomeMessageText,
} from "./styles";

import logoImage from "../../assets/logo.png";
import { ApplicationRoutes } from "../../shared/enum/applicationRoutes";
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { formValidate } from "./helper/formValidate";
import { userStore } from "../../store/user";
import { FormProps } from "./types";
import { isEmpty } from "lodash";
import { roomStore } from "../../store/room";
import { urlParams } from "../../services/util/urlParams";
import { useCreateRoom } from "../../services/requests/room";
import { storage } from "../../services/storage";
import { ApplicationStorage } from "../../shared/enum/applicationStorage";
import { useMemo, useState } from "react";
import { RoomPreferences } from "./components/roomPreferences";
import { IconButton } from "../../components/iconButton";
import { SCALE_POINT_NAME } from "../../shared/enum/scalePointName";
import { ScaleType } from "./components/roomPreferences/types";
import { SCALE_POINT_VALUE } from "../../shared/const/scalePointValue";

const { VOTING_ROOM } = ApplicationRoutes;
const { USER, SCALE_POINT } = ApplicationStorage;
const { FIBONACCI, PERSONALIZED } = SCALE_POINT_NAME;

export const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const validateFormFields = formValidate();
  const { create, isLoading } = useCreateRoom();
  const { updateUser } = userStore();
  const { updateRoom } = roomStore();
  const toast = useToast();
  const { getParams } = urlParams();
  const { get, set } = storage();
  const roomId = getParams("roomId") as string;

  const storedUser = get(USER);
  const storedScaleType = get(SCALE_POINT);

  const [scaleType, setScaleType] = useState<ScaleType>({
    scale: storedScaleType.scale ?? FIBONACCI,
    personalized: storedScaleType.personalized ?? [],
  });

  const {
    isOpen: isOpenRoomPreferences,
    onOpen: onOpenRoomPreferences,
    onClose: onCloseRoomPreferences,
  } = useDisclosure();

  const initialFormValues: FormProps = useMemo(() => {
    return {
      name: storedUser.name ?? "",
    };
  }, []);

  const navigateToVotingRoom = (roomId: string) => {
    navigate({
      pathname: VOTING_ROOM,
      search: createSearchParams({ roomId }).toString(),
    });
  };

  const handleEnterExistingRoom = async (values: FormProps) => {
    if (!roomId) return;

    set(USER, values);
    updateUser(values);
    updateRoom({ id: roomId });

    navigateToVotingRoom(roomId);
  };

  const handleCreateRoom = (values: FormProps) => {
    const scale =
      scaleType.scale === PERSONALIZED
        ? scaleType.personalized
        : SCALE_POINT_VALUE[scaleType.scale];

    create(
      { scale },
      {
        onSuccess(data) {
          if (data) {
            const { id } = data;

            set(USER, values);
            updateUser(values);
            updateRoom({ id });

            navigateToVotingRoom(id);
          }
        },
        onError(error) {
          toast({
            title: t("pages.login.error_request_message"),
            status: "error",
            duration: null,
          });
        },
      }
    );
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
            {({ errors, touched, values, setTouched, submitForm }) => (
              <Form
                onKeyDown={async (e) => {
                  if (e.key === "Enter") {
                    if (roomId) return submitForm();

                    await setTouched({ name: true }).then((e) => {
                      if (isEmpty(e)) handleCreateRoom(values);
                    });
                  }
                }}
              >
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

                  <CreateRoomActionContainer>
                    <Button
                      colorScheme="green"
                      isLoading={isLoading}
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
                    <IconButton
                      icon={<PreferenceIcon />}
                      onClick={onOpenRoomPreferences}
                      title={t("pages.login.room_config_tooltip")}
                    />
                  </CreateRoomActionContainer>
                </ActionContainer>
              </Form>
            )}
          </Formik>
        </FormContainer>
      </Content>

      <RoomPreferences
        isOpen={isOpenRoomPreferences}
        onClose={onCloseRoomPreferences}
        defaultScaleType={scaleType}
        changeScaleType={setScaleType}
      />
    </Container>
  );
};
