import { Toast } from "native-base";
import React, { Component } from "react";
import { Image } from "react-native";
import { NavigationScreenProp } from "react-navigation";

import ImageMessage from "~/components/ImageMessage";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

interface IState {
  height: number;
  photo: string;
  width: number;
}

export default class Message extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const { navigation } = props;
    const uri = navigation.getParam("uri", "NO-ID");

    this.state = {
      height: 0,
      photo: uri,
      width: 0
    };
  }

  public componentWillMount = () => {
    Image.getSize(
      this.state.photo,
      (width, height) => {
        this.setState({ height, width });
      },
      () => null
    );
  };

  public render() {
    return <ImageMessage action={this.onSubmit} photo={this.state.photo} />;
  }

  private onSubmit = async (message: string) => {
    // const binaryMessage = new Steganography(
    //   "LSB-PNG",
    //   []
    // ).convertMessageToBinary(message);
    // const messageLength = binaryMessage.join("").length;
    // const encodableBits = (this.state.height * this.state.width * 3) / 4;

    // if (messageLength === 0) {
    //   Toast.show({
    //     buttonText: "Okay",
    //     duration: 3000,
    //     text: "Please enter a valid message.",
    //     type: "danger"
    //   });
    // } else if (messageLength > encodableBits) {
    //   Toast.show({
    //     buttonText: "Okay",
    //     duration: 5000,
    //     text: "Message too large to encode in image.",
    //     type: "danger"
    //   });
    // } else {
    this.props.navigation.navigate("Progress", {
      message,
      uri: this.state.photo
    });
    // }
  };
}
