import * as React from "react";
import { AppState, Image, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";

import Notification from "~/actions/Notification";
import Snackbar from "~/actions/Snackbar";
import Steganography from "~/actions/Steganography/Steganography";
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
  constructor(props: IProps) {
    super(props);
    const uri = this.props.navigation.getParam("uri", "NO-ID");

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

  private async callDecodeAPI(imageURI: string) {
    Image.getSize(
      imageURI,
      async (width, height) => {
        try {
          const steganography = new Steganography(imageURI, width, height);
          const decodedMessage = await steganography.decode();
          this.decoded(decodedMessage);
        } catch (error) {
          this.failedResponse(error);
        }
      },
      () => null
    );
    this.sendNotification();
  }

  private decoded(message: string) {
    this.props.navigation.navigate("DecodingMessage", {
      message,
      uri: this.state.photo
    });
  }

  private sendNotification() {
    if (AppState.currentState === "background") {
      Notification.localNotification({
        message: "Your image has been decoded."
      });
    }
  }

  private failedResponse(error: any) {
    Snackbar.show({
      text: "Failed to decode image, please try again."
    });
    this.props.navigation.goBack();
  }
}
