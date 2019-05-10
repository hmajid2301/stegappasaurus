import {
  BackgroundColors,
  ITheme,
  PrimaryColor,
  PrimaryColorNames,
  ThemeColors
} from "@types";

interface IThemes {
  DARK_THEME: ITheme;
  LIGHT_THEME: ITheme;
}

interface IPrimaryColor {
  BLUE: {
    name: PrimaryColorNames;
    color: PrimaryColor;
  };
  ORANGE: {
    name: PrimaryColorNames;
    color: PrimaryColor;
  };
}

export const fonts = {
  body: "Roboto",
  bodyLight: "Roboto-Light",
  header: "Roboto-Thin"
};

export const colors = {
  darkColor: "#17212D",
  iconBlack: "#222",
  iconBlue: "#007CFE",
  iconGreen: "#4CDA64",
  iconLightGreen: "#25AE88",
  iconOrange: "#FF9501",
  iconRed: "#FD3C2D",
  primary: "#009CFF",
  pureBlack: "#000",
  pureWhite: "#FFF",
  secondary: "#E88C0C"
};

export const PRIMARY_COLORS: IPrimaryColor = {
  BLUE: { name: "BLUE", color: colors.primary as PrimaryColor },
  ORANGE: { name: "ORANGE", color: colors.secondary as PrimaryColor }
};

export const THEMES: IThemes = {
  DARK_THEME: {
    background: colors.darkColor as BackgroundColors,
    color: colors.pureWhite as ThemeColors,
    isDark: true
  },

  LIGHT_THEME: {
    background: colors.pureWhite as BackgroundColors,
    color: colors.pureBlack as ThemeColors,
    isDark: false
  }
};
