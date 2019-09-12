import { ITheme, ThemeColors } from "~/modules/types";
import { colors } from "./colors";

export const PRIMARY_THEME: ITheme = {
  background: colors.pureWhite as ThemeColors,
  color: colors.pureBlack as ThemeColors,
  isDark: false
};

export const DARK_THEME: ITheme = {
  background: colors.darkBlue as ThemeColors,
  color: colors.pureWhite as ThemeColors,
  isDark: true
};
