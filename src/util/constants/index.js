import { colors } from '~/util/styles';


export const PRIMARY_COLORS = {
  BLUE: { name: 'BLUE', color: colors.primary },
  ORANGE: { name: 'ORANGE', color: colors.secondary },
};

export const THEMES = {
  LIGHT_THEME: { isDark: false, background: colors.pureWhite, color: colors.pureBlack },
  DARK_THEME: { isDark: true, background: colors.darkColor, color: colors.pureWhite },
};
