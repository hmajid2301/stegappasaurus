import { ImageSourcePropType } from "react-native";

export type ThemeColors = "#17212D" | "#FFF";
export type PrimaryColor = "#009CFF" | "#E88C0C";

export interface ITheme {
  background: ThemeColors;
  color: ThemeColors;
  isDark: boolean;
}

export interface IFAQ {
  content: string;
  title: string;
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

export interface IAPIError {
  code:
    | "MessageTooLong"
    | "InvalidImage"
    | "ImageNotEncoded"
    | "ServerError"
    | "ImageTooSmall";
  message: string;
}

export interface IEncodingSuccess {
  encoded: string;
}

export interface IDecodingSuccess {
  decoded: string;
}

export interface ISlide {
  color: string;
  height?: number;
  image: ImageSourcePropType;
  key: string;
  text: string;
  title: string;
  width?: number;
}
