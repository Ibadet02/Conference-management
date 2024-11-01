import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./assets/global.css";
import { BrowserRouter } from "react-router-dom";
import {
  StyledThemeProviderWrapper,
  ThemeProvider,
} from "./context/ThemeContext.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <StyledThemeProviderWrapper>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StyledThemeProviderWrapper>
    </ThemeProvider>
  </React.StrictMode>
);
