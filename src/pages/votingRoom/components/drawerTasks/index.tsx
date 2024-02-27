import { useTranslation } from "react-i18next";
import { Drawer } from "../../../../components/drawer";
import { FormProps, Props } from "./types";
import {
  AddTaskButtonContent,
  CloseButtonContent,
  Container,
  FormContainer,
  LeftContent,
  ListContent,
  RightContent,
} from "./styles";
import {
  Button,
  CloseButton,
  FormControl,
  FormErrorMessage,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { roomStore } from "../../../../store/room";
import { Field, Form, Formik } from "formik";
import { formValidate } from "./helper/formValidate";
import { SocketEvents } from "../../../../shared/enum/socketEvents";
import { socketStore } from "../../../../store/socket";

const {
  CLIENT_ROOM_NEW_TASK,
  CLIENT_ROOM_DELETE_TASK,
  CLIENT_ROOM_SELECT_VOTING_TASK,
} = SocketEvents;

export const DrawerTasks = (props: Props) => {
  const { isOpen, onClose } = props;
  const { t } = useTranslation();
  const { currentTaskId, tasks, isLoggedUserOwnerRoom, updateRoom } =
    roomStore();
  const { socket } = socketStore();
  const validateFormFields = formValidate();
  const {
    isOpen: isOpenNewTask,
    onOpen: onOpenNewTask,
    onClose: onCloseNewTask,
  } = useDisclosure();

  const initialFormValues: FormProps = {
    name: "",
  };

  const handleAddTask = (values: FormProps) => {
    const newTask = { ...values, points: 0 };
    socket?.emit(CLIENT_ROOM_NEW_TASK, newTask);

    onCloseNewTask();
  };

  const handleRemoveTask = (id: string) => {
    socket?.emit(CLIENT_ROOM_DELETE_TASK, id);
  };

  const handleVoteNow = (id: string) => {
    socket?.emit(CLIENT_ROOM_SELECT_VOTING_TASK, id);
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={t("components.drawer_tasks.title")}
      onCloseButtonText={t("generic.button_exit")}
    >
      <Container>
        {tasks.map((task) => {
          const isCurrentTask = currentTaskId === task.id;

          return (
            <ListContent key={task.id}>
              <LeftContent>
                <span>{task.name}</span>
                <strong>{task.points}</strong>
              </LeftContent>

              <RightContent>
                {isLoggedUserOwnerRoom && (
                  <CloseButtonContent>
                    <CloseButton
                      size="sm"
                      onClick={() => handleRemoveTask(task.id)}
                    />
                  </CloseButtonContent>
                )}

                {isLoggedUserOwnerRoom ? (
                  <Button
                    disabled={isCurrentTask}
                    colorScheme={isCurrentTask ? "gray" : "facebook"}
                    onClick={() => handleVoteNow(task.id)}
                  >
                    {isCurrentTask
                      ? t("components.drawer_tasks.voting")
                      : t("components.drawer_tasks.vote_now")}
                  </Button>
                ) : (
                  <span>
                    {isCurrentTask && t("components.drawer_tasks.voting")}
                  </span>
                )}
              </RightContent>
            </ListContent>
          );
        })}

        {isOpenNewTask ? (
          <FormContainer>
            <Formik
              initialValues={initialFormValues}
              validationSchema={validateFormFields}
              onSubmit={handleAddTask}
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
                          placeholder={t(
                            "components.drawer_tasks.input_task_name"
                          )}
                        />
                        <FormErrorMessage>{errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Button
                    colorScheme="blue"
                    isLoading={false}
                    type="submit"
                    width="100%"
                  >
                    {t("generic.button_save")}
                  </Button>
                </Form>
              )}
            </Formik>
          </FormContainer>
        ) : (
          isLoggedUserOwnerRoom && (
            <AddTaskButtonContent onClick={onOpenNewTask}>
              <Button colorScheme="blue">
                {t("components.drawer_tasks.button_new_task")}
              </Button>
            </AddTaskButtonContent>
          )
        )}
      </Container>
    </Drawer>
  );
};
