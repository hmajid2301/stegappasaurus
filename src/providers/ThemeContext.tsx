import React, {Context, createContext, useState} from 'react';
import {DARK_THEME, LIGHT_THEME} from '~/constants/themes';
import {ITheme} from '~/constants/types';

interface IThemeContext {
  theme: ITheme;
  changeTheme: (isDark: boolean) => void;
}

const ThemeContext: Context<IThemeContext> = createContext({
  changeTheme: (_: boolean) => {
    return;
  },
  theme: LIGHT_THEME,
});

const ThemeProvider: React.FC = ({children}) => {
  const [themeState, setTheme] = useState({
    theme: LIGHT_THEME,
  });

  const changeTheme = (isDark: boolean) => {
    setTheme({
      theme: isDark ? DARK_THEME : LIGHT_THEME,
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        changeTheme,
        theme: themeState.theme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export {ThemeProvider, ThemeContext};
