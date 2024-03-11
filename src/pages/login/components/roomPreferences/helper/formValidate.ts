import * as Yup from "yup";
import i18n from "i18next";
import { SCALE_POINT_NAME } from "../../../../../shared/enum/scalePointName";

const { PERSONALIZED } = SCALE_POINT_NAME;

export const formValidate = () => {
  return Yup.object().shape({
    personalized: Yup.array().when("scale", {
      is: (val: any) => val === PERSONALIZED,
      then: Yup.array()
        .of(
          Yup.string()
            .trim()
            .strict(true)
            .min(
              1,
              i18n.t("components.room_configuration.personalized_scale_invalid")
            )
            .required(i18n.t("generic.required_input_value"))
        )
        .min(1),
    }),
  });
};
