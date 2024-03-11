import { IconButton as IconButtonChakra, Tooltip } from "@chakra-ui/react";
import { Container } from "./styles";
import { Props } from "./types";

export const IconButton = (props: Props) => {
  const { icon, title, onClick } = props;

  return (
    <Tooltip label={title} hasArrow>
      <IconButtonChakra
        icon={icon}
        onClick={onClick}
        aria-label=""
        variant="ghost"
      />
    </Tooltip>
  );
};
