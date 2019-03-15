import { FileSystem, MediaLibrary } from "expo";
import React, { Component } from "react";
import { View } from "react-native";
import Canvas, { Image as CanvasImage, ImageData } from "react-native-canvas";
import { NavigationScreenProp } from "react-navigation";

import ImageMessage from "~/components/ImageMessage";
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
  isEncoding: boolean;
  message: string;
  photo: string;
}

class EncodeImage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const { navigation } = props;
    const uri = navigation.getParam("uri", "NO-ID");

    this.state = {
      isEncoding: false,
      message: "",
      photo: uri
    };
  }

  public render() {
    const { theme } = this.props.screenProps;
    if (this.state.isEncoding) {
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
    return <ImageMessage action={this.isEncoding} photo={this.state.photo} />;
  }

  private isEncoding = (message: string) => {
    this.setState({ isEncoding: true, message });
  };

  private encoded = async () => {
    await FileSystem.writeAsStringAsync(
      `${FileSystem.documentDirectory}tmpimg.jpg`,
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAPzAAAD8wF1XGupAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAJZQTFRF////SUmSQGCfQFWVPVyZOVuZO1eaPFmZO1qYO1mZO1mYO1mYOlmYPFmYO1mYO1mYO1qYO1mYPVuZP1yaQV6bQ2CcR2OeTWmiVG6lVW+mVnCmV3GnWnOoXnerZHytZn2va4Kxcoe1eY65gJS8ipzCi53CkKHFtsHZuMPau8bbwsvf09ro1Nvo1dvp4ubw9vf6/Pz9////XyoQ3AAAABF0Uk5TAAcIGBktSYSXmMHI2uPy8/XVqDFbAAABA0lEQVQ4y4WT2WKDIBBFcYkswbVp9n2pra1N/P+fC5gII5B4n8B7wJlhBiElL6KMpylnNPKQrZAkuVJCQsP2cZb3lGEf+sE4tzQOtD+Kc4fikTrv9AXxvMMH90+/vn/r+tj95REH1v78v5E6d3vc5gfi/2n95qJykdkS7X/chHut/47qCxH1A/VZyOMHGGfioQhs1xJY9zKJEFXrYrqVwGYyKTRAEVPrXdPppAGGuAPYa4Cj1AGsNJACYFlW0q3K8hMC/H0WHATpBBhI0wnQ4ULBUtuAKDV8LBsg/ee2gPa5QcNYADZazgSeLaeb1gDiwGz7YiZU2G0/PDjDozc8vK/H/w603kSHess3kQAAAABJRU5ErkJggg=="
    ).then();
    await MediaLibrary.createAssetAsync(
      `${FileSystem.documentDirectory}tmpimg.jpg`
    );
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

export default withDispatchAlgorithm(EncodeImage);
