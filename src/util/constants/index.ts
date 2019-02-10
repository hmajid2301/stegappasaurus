import { colors } from "~/util/styles";

export const PRIMARY_COLORS = {
  BLUE: { name: "BLUE", color: colors.primary },
  ORANGE: { name: "ORANGE", color: colors.secondary }
};

export const THEMES = {
  DARK_THEME: {
    background: colors.darkColor,
    color: colors.pureWhite,
    isDark: true
  },

  LIGHT_THEME: {
    background: colors.pureWhite,
    color: colors.pureBlack,
    isDark: false
  }
};
