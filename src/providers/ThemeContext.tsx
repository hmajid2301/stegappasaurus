import React, { Context, createContext, useState } from "react";
import { DARK_THEME, PRIMARY_THEME } from "~/modules";
import { ITheme } from "~/modules/types";

interface IThemeContext {
  theme: ITheme;
  changeTheme: (isDark: boolean) => void;
}

const ThemeContext: Context<IThemeContext> = createContext({
  changeTheme: (_: boolean) => {
    return;
  },
  theme: PRIMARY_THEME
});

const ThemeProvider: React.FC = ({ children }) => {
  const [themeState, setTheme] = useState({
    theme: PRIMARY_THEME
  });

  const changeTheme = (isDark: boolean) => {
    setTheme({
      theme: isDark ? DARK_THEME : PRIMARY_THEME
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        changeTheme,
        theme: themeState.theme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
