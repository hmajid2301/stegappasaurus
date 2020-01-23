import {Theme, ThemeColors} from '~/constants/types';
import {darkBlue, pureBlack, pureWhite} from './colors';

export const LIGHT_THEME: Theme = {
  background: pureWhite as ThemeColors,
  color: pureBlack as ThemeColors,
  isDark: false,
};

export const DARK_THEME: Theme = {
  background: darkBlue as ThemeColors,
  color: pureWhite as ThemeColors,
  isDark: true,
};
