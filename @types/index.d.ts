export type AlgorithmNames = "F5" | "LSB-PNG" | "LSB-DCT";
export type BackgroundColors = "000" | "#FFF";
export type ThemeColors = "#17212D" | "#FFF";
export type PrimaryColor = "#009CFF" | "#E88C0C";
export type PrimaryColorNames = "ORANGE" | "BLUE";
export type PossibleAppStates = "inactive" | "background" | "active";

export interface ITheme {
  background: BackgroundColors;
  color: ThemeColors;
  isDark: boolean;
}
