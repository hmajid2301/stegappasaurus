import React, { Component } from "react";
import { NavigationScreenProp } from "react-navigation";

import ImageMessage from "~/components/ImageMessage";
import ImageProgressCircle from "~/components/ImageProgressCircle";
import { ITheme, PrimaryColor } from "~/util/interfaces";
import { colors } from "~/util/styles";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  screenProps: {
    theme: ITheme;
  };
}

interface IState {
  isDecoded: boolean;
  photo: string;
}

export default class DecodeImage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const { navigation } = props;
    const uri = navigation.getParam("uri", "NO-ID");

    this.state = {
      isDecoded: false,
      photo: uri
    };
  }

  public render() {
    const { theme } = this.props.screenProps;

    if (this.state.isDecoded) {
      return <ImageMessage message={"Temp"} photo={this.state.photo} />;
    }

    return (
      <ImageProgressCircle
        action={this.decoded}
        photo={this.state.photo}
        primaryColor={colors.secondary as PrimaryColor}
        theme={theme}
      />
    );
  }

  private decoded = () => {
    this.setState({ isDecoded: true });
  };
}
