import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field, FormikHelpers, FormikProps } from "formik";
import {
  FormControl,
  FormErrorMessage,
  Input,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";

import { RadioButtonContainer, ScaleExample } from "./styles";
import { formValidate } from "./helper/formValidate";
import { FormProps, Props } from "./types";

import { Preloader } from "../../../../components/preloader";
import { Modal } from "../../../../components/modal";
import { SCALE_POINT_NAME } from "../../../../shared/enum/scalePointName";
import { ApplicationStorage } from "../../../../shared/enum/applicationStorage";
import { storage } from "../../../../services/storage";
import { SCALE_POINT_VALUE } from "../../../../shared/const/scalePointValue";

const { SCALE_POINT } = ApplicationStorage;
const { FIBONACCI, FIBONACCI_VARIANT, SEQUENTIAL, PERSONALIZED } =
  SCALE_POINT_NAME;

export const RoomPreferences = (props: Props) => {
  const { isOpen, onClose, changeScaleType, defaultScaleType } = props;
  const { t } = useTranslation();
  const { set } = storage();
  const validateFormFields = formValidate();
  const formRef = useRef<FormikProps<FormProps>>(null);

  const initialFormValues: FormProps = {
    scale: defaultScaleType.scale,
    personalized: defaultScaleType.personalized,
  };

  const handleCloseModal = () => {
    onClose();
  };

  const handleSubmit = async (
    values: FormProps,
    actions: FormikHelpers<FormProps>
  ) => {
    const { scale, personalized } = values;
    const personalizedUpdated = values.personalized.map((item) =>
      item.trimStart().trimEnd()
    );

    changeScaleType({ scale, personalized: personalizedUpdated });
    set(SCALE_POINT, { scale, personalized: personalizedUpdated });

    handleCloseModal();
  };

  const handleClickSave = () => {
    formRef.current?.setFieldTouched("personalized", true);
    formRef.current?.handleSubmit();
  };

  return (
    <Modal
      title={t("components.room_configuration.title")}
      onConfirm={handleClickSave}
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
          {({ errors, touched, handleChange, setFieldValue }) => (
            <Form>
              <Field name="scale">
                {({ field, value }: any) => (
                  <FormControl isInvalid={!!errors.scale && touched.scale}>
                    <RadioGroup {...field}>
                      <Stack>
                        <RadioButtonContainer>
                          <Radio
                            value={FIBONACCI}
                            onChange={() => setFieldValue("scale", FIBONACCI)}
                          >
                            {t("components.room_configuration.scale_fibonacci")}
                          </Radio>
                          <ScaleExample>
                            {SCALE_POINT_VALUE.FIBONACCI.join(", ")}
                          </ScaleExample>
                        </RadioButtonContainer>

                        <RadioButtonContainer>
                          <Radio
                            value={FIBONACCI_VARIANT}
                            onChange={() =>
                              setFieldValue("scale", FIBONACCI_VARIANT)
                            }
                          >
                            {t(
                              "components.room_configuration.scale_fibonacci_variant"
                            )}
                          </Radio>
                          <ScaleExample>
                            {SCALE_POINT_VALUE.FIBONACCI_VARIANT.join(", ")}
                          </ScaleExample>
                        </RadioButtonContainer>
                        <RadioButtonContainer>
                          <Radio
                            value={SEQUENTIAL}
                            onChange={() => setFieldValue("scale", SEQUENTIAL)}
                          >
                            {t(
                              "components.room_configuration.scale_sequential"
                            )}
                          </Radio>
                          <ScaleExample>
                            {SCALE_POINT_VALUE.SEQUENTIAL.join(", ")}
                          </ScaleExample>
                        </RadioButtonContainer>
                        <RadioButtonContainer>
                          <Radio
                            value={PERSONALIZED}
                            onChange={() =>
                              setFieldValue("scale", PERSONALIZED)
                            }
                          >
                            {t(
                              "components.room_configuration.scale_personalized"
                            )}
                          </Radio>
                        </RadioButtonContainer>
                      </Stack>
                    </RadioGroup>
                    <FormErrorMessage>{errors.scale}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="personalized">
                {({ field }: any) => (
                  <FormControl
                    isInvalid={!!errors.personalized && touched.personalized}
                    mb="2"
                  >
                    <Input
                      {...field}
                      onChange={(e) => {
                        setFieldValue(
                          "personalized",
                          e.target.value.split(",")
                        );
                      }}
                      placeholder={t(
                        "components.room_configuration.personalized_scale"
                      )}
                    />
                    <FormErrorMessage>
                      {errors.personalized?.toString()}
                    </FormErrorMessage>
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
