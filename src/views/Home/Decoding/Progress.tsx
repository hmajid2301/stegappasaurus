import * as React from "react";
import { AppState, View } from "react-native";
import {
  NavigationEventSubscription,
  NavigationScreenProp
} from "react-navigation";

import bugsnag from "~/actions/Bugsnag";
import Notification from "~/actions/Notification";
import Snackbar from "~/actions/Snackbar";
import ImageProgress from "~/components/ImageProgress";
import { colors } from "~/modules";
import { ITheme, PrimaryColor } from "~/modules/types";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  screenProps: {
    theme: ITheme;
  };
}

interface IState {
  decoding: boolean;
  photo: string;
}

export default class Progress extends React.Component<IProps, IState> {
  private focusListener: NavigationEventSubscription | null;

  constructor(props: IProps) {
    super(props);
    const uri = this.props.navigation.getParam("uri", "NO-ID");
    this.focusListener = null;

    this.state = {
      decoding: true,
      photo: uri
    };
  }

  public render() {
    const { theme } = this.props.screenProps;

    return (
      <View style={{ flex: 1 }}>
        <ImageProgress
          animating={this.state.decoding}
          background={theme.background}
          photo={this.state.photo}
          primaryColor={colors.secondary as PrimaryColor}
        />
      </View>
    );
  }

  public async componentDidMount() {
    await this.callDecodeAPI(this.state.photo);
  }

  public componentWillUnmount() {
    if (this.focusListener) {
      this.focusListener.remove();
    }
  }

  private async callDecodeAPI(base64Image: string) {
    this.sendNotification();
  }

  private decoded(message: string) {
    this.sendNotification();
  }

  private sendNotification() {
    if (AppState.currentState === "background") {
      Notification.localNotification({
        message: "Your image has been decoded."
      });
    }
  }

  private failedResponse() {
    Snackbar.show({
      text: "Failed to decode image, please try again."
    });
    this.props.navigation.goBack();
  }
}
