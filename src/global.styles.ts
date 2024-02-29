import { createGlobalStyle } from "styled-components";
import "./animations.css";

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400;
    box-sizing: border-box;
    
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }
  
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 3px 3px #fff;
    border: solid 3px transparent;
  }

  ::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 4px 4px gray;
    border: solid 3px transparent;
    border-radius: 10px;
  }

  body {
    background: ${(props) => props.theme.colors.background};
    /* max-width: ${(props) => props.theme.size.maxWidthPage}; */
    height: 100vh;
    display: flex;
    margin: auto;
    box-sizing: inherit;
    margin: auto;

    & #root {
      flex: 1;
    }
  }
`;
