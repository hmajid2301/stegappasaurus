import { FileSystem, MediaLibrary } from "expo";
import { Toast } from "native-base";
import React, { Component } from "react";
import { View } from "react-native";
import Canvas, { Image as CanvasImage, ImageData } from "react-native-canvas";
import uuid from "react-native-uuid";
import { NavigationScreenProp } from "react-navigation";

import ImageProgressCircle from "~/components/ImageProgressCircle";
import { withDispatchAlgorithm } from "~/redux/hoc";
import Steganography from "~/services/steganography";
import { AlgorithmNames, ITheme, PrimaryColor } from "~/util/interfaces";
import { colors } from "~/util/styles";

type ImageExtension = "jpg" | "png";

interface IProps {
  algorithm: AlgorithmNames;
  navigation: NavigationScreenProp<any, any>;
  screenProps: {
    theme: ITheme;
  };
}

interface IState {
  base64Image: string;
  extension: ImageExtension;
  message: string;
  percentage: number;
  photo: string;
}

class Progress extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const { navigation } = props;
    const uri = navigation.getParam("uri", "NO-ID");
    const message = navigation.getParam("message", "NO-ID");

    let imageExtension = "jpg";
    if (this.props.algorithm === "LSB-PNG") {
      imageExtension = "png";
    }

    this.state = {
      base64Image: "",
      extension: imageExtension as ImageExtension,
      message,
      percentage: 0,
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
          percentage={this.state.percentage}
          primaryColor={colors.primary as PrimaryColor}
          theme={theme}
        />
        <Canvas ref={this.encodeData} />
      </View>
    );
  }

  public updateProgressBar = (newValue: number) => {
    this.setState({ percentage: newValue });
  };

  private encoded = async () => {
    const imageName = uuid.v1();
    const imagePath = `${FileSystem.documentDirectory}${imageName}.${
      this.state.extension
    }`;
    await FileSystem.writeAsStringAsync(
      imagePath,
      this.state.base64Image,
      FileSystem.EncodingTypes.Base64
    ).then();

    await MediaLibrary.createAssetAsync(imagePath);
    Toast.show({
      duration: 5000,
      text: "Encoded image saved to gallery."
    });
  };

  private encodeData = (canvas: Canvas) => {
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
    const encodedData = steganography.encode(this.state.message);
    const imgData = new ImageData(
      canvas,
      encodedData,
      image.width,
      image.height
    );
    context.putImageData(imgData, 0, 0);
    this.setState({ base64Image: canvas.toDataURL() });
  };
}

export default withDispatchAlgorithm(Progress);
