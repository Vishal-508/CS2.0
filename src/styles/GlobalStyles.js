import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
  
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, 
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.light};

      &::-webkit-scrollbar {
    display: none;
  }

  // scrollbar-width: none;
  // -ms-overflow-style: none;
  }

      html, body {
    margin: 0;
    padding: 0;
    overflow-x: hidden; /* 🔥 Prevent horizontal scroll */
    overflow-y: auto;   /* Allow vertical scroll only if content exceeds */
    width: 100%;
    height: auto;
    box-sizing: border-box;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .leaflet-container {
    height: 100%;
    width: 100%;
  }
`;

export default GlobalStyles;