import { colors } from '../styles';


export const PRIMARY_COLORS = {
  blue: { name: 'blue', hexCode: colors.primary },
  orange: { name: 'orange', hexCode: colors.secondary },
};

export const THEMES = {
  LIGHT_THEME: { dark: false, backgroundColor: colors.pureWhite, color: colors.pureBlack },
  DARK_THEME: { dark: true, backgroundColor: colors.darkColor, color: colors.pureWhite },
};
