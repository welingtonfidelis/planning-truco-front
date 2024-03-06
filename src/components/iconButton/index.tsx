import { IconButton as IconButtonChakra } from "@chakra-ui/react";
import { Container } from "./styles";
import { Props } from "./types";

export const IconButton = (props: Props) => {
  const { icon, title, onClick } = props;

  return (
    <Container>
      <IconButtonChakra
        icon={icon}
        onClick={onClick}
        aria-label={title}
        title={title}
        variant="ghost"
      />
    </Container>
  );
};
