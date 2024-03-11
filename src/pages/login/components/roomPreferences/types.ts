import { SCALE_POINT_NAME } from "../../../../shared/enum/scalePointName";

export interface ScaleType {
  scale: SCALE_POINT_NAME,
  personalized: string[]
}

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultScaleType: ScaleType,
  changeScaleType: (type: ScaleType) => void;
}

export interface FormProps {
  scale: SCALE_POINT_NAME;
  personalized: string[];
}
