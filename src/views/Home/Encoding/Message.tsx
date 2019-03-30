import { create } from "apisauce";
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
    const messageLength = message.length;
    let canEncode = true;
    await Image.getSize(
      this.state.photo,
      async (width, height) => {
        const api = create({
          baseURL: "https://us-central1-stegappasaurus.cloudfunctions.net"
        });
        const response = await api.post("/api/canEncode", {
          imageData: {
            height,
            width
          },
          message
        });
        canEncode = response.data as boolean;
      },
      () => null
    );

    if (messageLength === 0) {
      Toast.show({
        buttonText: "Okay",
        duration: 3000,
        text: "Please enter a valid message.",
        type: "danger"
      });
    } else if (!canEncode) {
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
