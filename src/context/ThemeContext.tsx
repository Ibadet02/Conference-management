import React, { createContext, useContext, useState } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { theme as initialTheme } from "../data/Theme";
import { Theme } from "../types/default/types";

// Create a context to hold the theme object and update function
const ThemeContext = createContext<
  | {
      theme: Theme;
      updateTheme: (callback: (prevTheme: Theme) => Theme) => void;
    }
  | undefined
>(undefined);

// Custom hook to access the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// Theme provider component
export const ThemeProvider: React.FC<any> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  // Function to update the theme object
  const updateTheme = (callback: (prevTheme: Theme) => Theme) => {
    setTheme(prevTheme => callback(prevTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Styled Components ThemeProvider wrapper
export const StyledThemeProviderWrapper: React.FC<any> = ({ children }) => {
  const context = useTheme();

  return (
    <StyledThemeProvider theme={context?.theme}>{children}</StyledThemeProvider>
  );
};
