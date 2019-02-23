export type ThemeColors = "#17212D" | "#FFF";

export type BackgroundColors = "000" | "#FFF";

export type PrimaryColor = "#009CFF" | "#E88C0C";

export interface ITheme {
  background: BackgroundColors;
  color: ThemeColors;
  isDark: boolean;
}
