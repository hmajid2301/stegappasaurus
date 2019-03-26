import { create } from "apisauce";
import { FileSystem, MediaLibrary } from "expo";
import { Toast } from "native-base";
import React, { Component } from "react";
import { Image, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";

import ImageProgressCircle from "~/components/ImageProgressCircle";
import { withDispatchAlgorithm } from "~/redux/hoc";
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

  public componentWillMount = async () => {
    const base64Image = await FileSystem.readAsStringAsync(
      this.state.photo,
      FileSystem.EncodingTypes.Base64
    );
    await Image.getSize(
      this.state.photo,
      async (width, height) => {
        const api = create({
          baseURL: "https://us-central1-stegappasaurus.cloudfunctions.net"
        });
        const response = await api.post("/encode", {
          algorithm: this.props.algorithm,
          imageData: {
            base64Image,
            height,
            width
          },
          message: this.state.message
        });
        console.log(JSON.stringify(response));
      },
      () => null
    );
  };

  public render() {
    const { theme } = this.props.screenProps;
    return (
      <View style={{ flex: 1 }}>
        <ImageProgressCircle
          action={this.encoded}
          message={"Saved Encoded Photo"}
          photo={this.state.photo}
          percentage={this.state.percentage}
          primaryColor={colors.primary as PrimaryColor}
          theme={theme}
        />
      </View>
    );
  }

  public updateProgressBar = (newValue: number) => {
    this.setState({ percentage: newValue });
  };

  private encoded = async () => {
    const imageName = new Date().toISOString();
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
      buttonText: "Okay",
      duration: 5000,
      text: "Encoded image saved to gallery."
    });
  };
}

export default withDispatchAlgorithm(Progress);
