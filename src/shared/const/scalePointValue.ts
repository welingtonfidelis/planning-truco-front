import { SCALE_POINT_NAME } from "../enum/scalePointName";

const { FIBONACCI, FIBONACCI_VARIANT, SEQUENTIAL } = SCALE_POINT_NAME;

export const SCALE_POINT_VALUE = {
  [FIBONACCI]: ['0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89'],
  [FIBONACCI_VARIANT]: ['0', '0.5', '1', '2', '3', '5', '8', '13', '20', '40', '100'],
  [SEQUENTIAL]: ['0', '0.5', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
};
