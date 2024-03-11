import { IconButton as IconButtonChakra, Tooltip } from "@chakra-ui/react";
import { Props } from "./types";

export const IconButton = (props: Props) => {
  const { icon, title, titlePlacement, onClick } = props;

  return (
    <Tooltip label={title} placement={titlePlacement} hasArrow>
      <IconButtonChakra
        icon={icon}
        onClick={onClick}
        aria-label=""
        variant="ghost"
      />
    </Tooltip>
  );
};
