import Snackbar from "react-native-snackbar";

interface IShow {
  text: string;
  buttonText?: string;
  action?: () => void;
  duration?: number;
}

export default class CustomSnackbar {
  public static show = ({
    action = () => null,
    buttonText = "Okay",
    duration = 5000,
    text
  }: IShow) => {
    Snackbar.show({
      action: {
        onPress: action,
        title: buttonText
      },
      duration,
      title: text
    });
  };
}
