import { create } from "apisauce";
import { Toast } from "native-base";
import React, { Component } from "react";
import { Alert, Image } from "react-native";
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

  public render() {
    return (
      <ImageMessage
        action={this.onSubmit}
        editable={true}
        photo={this.state.photo}
      />
    );
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

  private onSubmit = (message: string) => {
    this.props.navigation.navigate("Progress", {
      message,
      uri: this.state.photo
    });
  };
}
