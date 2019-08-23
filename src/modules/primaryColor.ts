import { PrimaryColor, PrimaryColorNames } from "@types";
import { colors } from "./colors";

interface IPrimaryColor {
  name: PrimaryColorNames;
  color: PrimaryColor;
}

export const PRIMARY_COLOR: IPrimaryColor = {
  color: colors.primary as PrimaryColor,
  name: "BLUE"
};
export const SECONDARY_COLOR: IPrimaryColor = {
  color: colors.secondary as PrimaryColor,
  name: "ORANGE"
};
