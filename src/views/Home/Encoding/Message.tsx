import React, { Component } from "react";
import { NavigationScreenProp } from "react-navigation";

import ImageMessage from "~/components/ImageMessage";

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
    this.props.navigation.navigate("Progress", {
      message,
      uri: this.state.photo
    });
  };
}
