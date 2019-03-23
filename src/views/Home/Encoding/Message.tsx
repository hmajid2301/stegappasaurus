import { Toast } from "native-base";
import React, { Component } from "react";
import { Image } from "react-native";
import { NavigationScreenProp } from "react-navigation";

import ImageMessage from "~/components/ImageMessage";
import Steganography from "~/services/steganography";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

interface IState {
  photo: string;
}

export default class Message extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const { navigation } = props;
    const uri = navigation.getParam("uri", "NO-ID");

    this.state = {
      photo: uri
    };
  }

  public render() {
    return <ImageMessage action={this.onSubmit} photo={this.state.photo} />;
  }

  private onSubmit = (message: string) => {
    let bitsCanEncode = 0;
    Image.getSize(
      this.state.photo,
      (width, height) => {
        bitsCanEncode = (width * height * 3) / 4;
      },
      () => null
    );

    const binaryMessage = new Steganography(
      "LSB-PNG",
      []
    ).convertMessageToBinary(message);
    const messageLength = binaryMessage.join("").length;

    if (messageLength > bitsCanEncode) {
      Toast.show({
        buttonText: "Okay",
        duration: 5000,
        text: "Message too large to encode in image.",
        type: "danger"
      });
    } else {
      this.props.navigation.navigate("Progress", {
        message,
        uri: this.state.photo
      });
    }
  };
}
