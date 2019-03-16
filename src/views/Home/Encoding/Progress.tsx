import React, { Component } from "react";
import { View } from "react-native";
import Canvas, { Image as CanvasImage, ImageData } from "react-native-canvas";
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
  photo: string;
}

class Progress extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const { navigation } = props;
    const uri = navigation.getParam("uri", "NO-ID");
    const message = navigation.getParam("message", "NO-ID");

    this.state = {
      message,
      photo: uri
    };
  }

  public render() {
    const { theme } = this.props.screenProps;
    return (
      <View>
        <ImageProgressCircle
          action={this.encoded}
          message={"Saved Encoded Photo"}
          photo={this.state.photo}
          primaryColor={colors.primary as PrimaryColor}
          theme={theme}
        />
        <Canvas ref={this.encodeData} />
      </View>
    );
  }

  private encoded = async () => {
    const a = "";
  };

  private encodeData = async (canvas: Canvas) => {
    const image = new CanvasImage(canvas);
    image.addEventListener("load", () => {
      context.drawImage(image, 0, 0);
    });
    image.src = this.state.photo;
    const context = canvas.getContext("2d");
    const imageData = await context.getImageData(
      0,
      0,
      image.width,
      image.height
    );
    const steganography = new Steganography(this.props.algorithm, imageData);
    const encodedData = steganography.encode(this.state.message);

    const imgData = new ImageData(
      canvas,
      encodedData,
      image.width,
      image.height
    );
    context.putImageData(imgData, 0, 0);
    return canvas.toDataURL();
  };
}

export default withDispatchAlgorithm(Progress);
