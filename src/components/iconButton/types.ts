import { PlacementWithLogical } from "@chakra-ui/react";

export interface Props {
  icon: React.ReactElement;
  onClick: () => void;
  title: string;
  titlePlacement?: PlacementWithLogical;
}
