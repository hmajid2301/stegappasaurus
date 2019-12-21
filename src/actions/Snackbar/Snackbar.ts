import Snackbar from 'react-native-snackbar';

import {primary, pureWhite} from '~/constants/colors';

interface IShow {
  text: string;
  buttonText?: string;
  onButtonPress?: () => void;
  duration?: number;
}

export default class CustomSnackbar {
  public static show({
    onButtonPress = () => null,
    buttonText = 'Okay',
    duration = 5000,
    text,
  }: IShow) {
    Snackbar.show({
      action: {
        color: primary,
        onPress: onButtonPress,
        title: buttonText,
      },
      color: pureWhite,
      duration,
      title: text,
    });
  }
}
