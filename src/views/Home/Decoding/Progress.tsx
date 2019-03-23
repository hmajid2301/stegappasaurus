import React, { Component } from "react";
import { View } from "react-native";
import Canvas, { Image as CanvasImage } from "react-native-canvas";
import { NavigationScreenProp } from "react-navigation";

import ImageProgressCircle from "~/components/ImageProgressCircle";
import { withDispatchAlgorithm } from "~/redux/hoc";
import Steganography from "~/services/steganography";
import { AlgorithmNames, ITheme, PrimaryColor } from "~/util/interfaces";
import { colors } from "~/util/styles";

interface IProps {
  algorithm: AlgorithmNames;
  navigation: NavigationScreenProp<any, any>;
  screenProps: {
    theme: ITheme;
  };
}

interface IState {
  message: string;
  percentage: number;
  photo: string;
}

class Progress extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const { navigation } = props;
    const uri = navigation.getParam("uri", "NO-ID");

    this.state = {
      message: "",
      percentage: 0,
      photo: uri
    };
  }

  public render() {
    const { theme } = this.props.screenProps;

    return (
      <View>
        <ImageProgressCircle
          action={this.decoded}
          photo={this.state.photo}
          percentage={this.state.percentage}
          primaryColor={colors.secondary as PrimaryColor}
          theme={theme}
        />
        <Canvas ref={this.decodeData} />
      </View>
    );
  }

  public updateProgressBar = (newValue: number) => {
    this.setState({ percentage: newValue });
  };

  private decoded = () => {
    this.props.navigation.navigate("Progress", {
      message: this.state.message,
      uri: this.state.photo
    });
  };

  private decodeData = (canvas: Canvas) => {
    const image = new CanvasImage(canvas);
    image.addEventListener("load", () => {
      context.drawImage(image, 0, 0);
    });
    image.src = this.state.photo;
    const context = canvas.getContext("2d");
    const imageData = context.getImageData(0, 0, image.width, image.height);
    const steganography = new Steganography(
      this.props.algorithm,
      imageData.data,
      this.updateProgressBar
    );
    const decodedMessage = steganography.decode();
    this.setState({ message: decodedMessage });
  };
}

export default withDispatchAlgorithm(Progress);
