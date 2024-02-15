import { I18nextProvider } from "react-i18next";
import { ThemeProvider } from "styled-components";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

import { AppRouter } from "./AppRouter";
import i18n from "./config/18n";
import { Preloader } from "./components/preloader";

import { GlobalStyles } from "./global.styles";
import { light } from "./config/styles/styled-component-theme";
import { theme } from "./config/styles/chackra-ui-theme";

export const App = () => {
  const queryClient = new QueryClient();

  return (
    <ChakraProvider
      theme={theme}
      toastOptions={{
        defaultOptions: {
          position: "top-right",
          isClosable: true,
          duration: 5000,
          status: "success",
          containerStyle: { maxWidth: '300px'}
        },
      }}
    >
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={light}>
          <QueryClientProvider client={queryClient}>
            <GlobalStyles />
            <Preloader isLoading={false}>
              <AppRouter />
            </Preloader>
          </QueryClientProvider>
        </ThemeProvider>
      </I18nextProvider>
    </ChakraProvider>
  );
};
