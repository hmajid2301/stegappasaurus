import {
  BackgroundColors,
  ITheme,
  PrimaryColor,
  PrimaryColorNames,
  ThemeColors
} from "~/common/interfaces";
import { colors } from "~/common/styles";

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
