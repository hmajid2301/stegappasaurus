import Snackbar from "react-native-snackbar";

import { colors } from "~/constants";

interface IShow {
  text: string;
  buttonText?: string;
  onButtonPress?: () => void;
  duration?: number;
}

export default class CustomSnackbar {
  public static show = ({
    onButtonPress = () => null,
    buttonText = "Okay",
    duration = 5000,
    text
  }: IShow) => {
    Snackbar.show({
      action: {
        color: colors.primary,
        onPress: onButtonPress,
        title: buttonText
      },
      duration,
      title: text
    });
  };
}
