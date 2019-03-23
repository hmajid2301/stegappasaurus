import { Toast } from "native-base";

import styles from "./styles";

interface IShow {
  text: string;
  buttonText?: string;
  closeAction?: (reason: "user" | "timeout" | "functionCall") => any;
  duration?: number;
}

export default class Snackbar {
  public static show = ({
    buttonText = "Okay",
    duration = 5000,
    text,
    closeAction
  }: IShow) => {
    Toast.show({
      buttonText,
      buttonTextStyle: styles.buttonText,
      duration,
      onClose: closeAction,
      // @ts-ignore
      style: styles.snackbar,
      text,
      textStyle: styles.text
    });
  };

  public static hide = () => {
    Toast.hide();
  };
}
