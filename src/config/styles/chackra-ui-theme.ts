import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme ({
    colors: {
        blue: {
          500: "#084963",
          600: "#0A6174",
        },
        pink: {
          500: "#F2388F", 
          600: "#A63774", 
        }
      }
});

export { theme };