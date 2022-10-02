// Note que até os arquivos css normais serão .ts, não usamos .css quando trabalhamos com styled-components.

import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:focus-visible {
    outline: 0;
    box-shadow: 0 0 0 2px ${({ theme }) => theme["green-500"]};
}

body {
    background-color: ${({ theme }) => theme["gray-900"]};
    color: ${({ theme }) => theme["gray-300"]};
}

body, input, textarea, button {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 1rem;
    -webkit-font-smoothing: antialiased;
}
`;

// isso vai criar o css global
