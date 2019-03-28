import { create } from "apisauce";
import { FileSystem } from "expo";
import React, { Component } from "react";
import { Image, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";

import ImageProgressCircle from "~/components/ImageProgressCircle";
import { withDispatchAlgorithm } from "~/redux/hoc";
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
        const response = await api.post("/decode", {
          algorithm: this.props.algorithm,
          imageData: {
            base64Image,
            height,
            width
          }
        });
        console.log(JSON.stringify(response));
      },
      () => null
    );
  };

  public render() {
    const { theme } = this.props.screenProps;

    return (
      <View>
        <ImageProgressCircle
          photo={this.state.photo}
          percentage={this.state.percentage}
          primaryColor={colors.secondary as PrimaryColor}
          theme={theme}
        />
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
}

export default withDispatchAlgorithm(Progress);
