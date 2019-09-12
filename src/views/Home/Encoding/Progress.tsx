import * as React from "react";
import { AppState, Linking, View } from "react-native";
import Share from "react-native-share";
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
  encodedUri: string;
  encoding: boolean;
  photo: string;
}

export default class Progress extends React.Component<IProps, IState> {
  private focusListener: NavigationEventSubscription | null;

  constructor(props: IProps) {
    super(props);
    const uri = this.props.navigation.getParam("uri", "NO-ID");
    this.focusListener = null;

    this.state = {
      encodedUri: "",
      encoding: true,
      photo: uri
    };
  }

  public render() {
    const { theme } = this.props.screenProps;
    return (
      <View style={{ flex: 1 }}>
        <ImageProgress
          animating={this.state.encoding}
          background={theme.background}
          icon={{
            color: colors.pureWhite,
            name: "share",
            size: 130,
            type: "font-awesome"
          }}
          onPress={this.shareImage}
          photo={this.state.photo}
          primaryColor={colors.primary as PrimaryColor}
        />
      </View>
    );
  }

  public async componentDidMount() {
    const message = this.props.navigation.getParam("message", "NO-ID");
    await this.callEncodeAPI(this.state.photo, message);
  }

  public componentWillUnmount() {
    if (this.focusListener) {
      this.focusListener.remove();
    }
  }

  private async callEncodeAPI(base64Image: string, message: string) {
    this.sendNotification();
  }

  private async encoded(base64Image: string) {
    this.setState({ encoding: false, encodedUri: base64Image });
    Snackbar.show({
      buttonText: "Open Album",
      onButtonPress: async () => {
        await Linking.openURL("content://media/internal/images/media");
      },
      text: "Image saved to photo album."
    });
    this.sendNotification();
  }

  private sendNotification() {
    if (AppState.currentState === "background") {
      Notification.localNotification({
        message: "Your image has been encoded."
      });
    }
  }

  private failedResponse(error: any, status: number) {
    this.sendNotification();
  }

  private shareImage = async () => {
    await Share.open({
      failOnCancel: false,
      message: "Encoded image shared from stegappasaurus app.",
      url: this.state.encodedUri
    });
  };

  private sendUserBackToMain() {
    Snackbar.show({
      text: "Failed to encode image, please try again."
    });
    this.props.navigation.navigate("EncodingMain");
  }
}
