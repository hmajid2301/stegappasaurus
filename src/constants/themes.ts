import {ITheme, ThemeColors} from '~/constants/types';
import {darkBlue, pureBlack, pureWhite} from './colors';

export const LIGHT_THEME: ITheme = {
  background: pureWhite as ThemeColors,
  color: pureBlack as ThemeColors,
  isDark: false,
};

export const DARK_THEME: ITheme = {
  background: darkBlue as ThemeColors,
  color: pureWhite as ThemeColors,
  isDark: true,
};
