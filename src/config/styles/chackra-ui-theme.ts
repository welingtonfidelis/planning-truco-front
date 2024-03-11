import { extendTheme } from "@chakra-ui/react";

const zIndices = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1850,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1900,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
};

const colors = {
  blue: {
    500: "#084963",
    600: "#0A6174",
  },
  pink: {
    500: "#F2388F",
    600: "#A63774",
  },
};

const theme = extendTheme({
  colors,
  zIndices,
});

export { theme };
