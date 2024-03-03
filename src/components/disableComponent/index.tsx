import { Tooltip } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { Props } from "./types";
import { DisabledContent } from "./styles";

export const DisableComponent = (props: PropsWithChildren<Props>) => {
  const { isDisabled, message, children } = props;

  return (
    <Tooltip hasArrow label={isDisabled && message}>
      <div>
        <DisabledContent isDisabled={isDisabled}>{children}</DisabledContent>
      </div>
    </Tooltip>
  );
};
