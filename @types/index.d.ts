export type AlgorithmNames = "LSB" | "JSteg" | "F5";
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

export interface IIcon {
  color: string;
  name: string;
  size?: number;
  type:
    | "material"
    | "material-community"
    | "font-awesome"
    | "octicon"
    | "ionicon"
    | "foundation"
    | "evilicon"
    | "simple-line-icon"
    | "zocial"
    | "entypo"
    | "feather"
    | "antdesign";
}

declare module "*.png";
