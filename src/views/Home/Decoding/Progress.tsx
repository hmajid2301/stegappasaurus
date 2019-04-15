import { create } from "apisauce";
import { FileSystem } from "expo";
import React, { Component } from "react";
import { Alert, Image, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";

import { AlgorithmNames, ITheme, PrimaryColor } from "~/common/interfaces";
import { colors } from "~/common/styles";
import ImageProgress from "~/components/ImageProgress";
import { withDispatchAlgorithm } from "~/redux/hoc";

interface IProps {
  algorithm: AlgorithmNames;
  navigation: NavigationScreenProp<any, any>;
  screenProps: {
    theme: ITheme;
  };
}

interface IState {
  decoding: boolean;
  message: string;
  photo: string;
}

class Progress extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const { navigation } = props;
    const uri = navigation.getParam("uri", "NO-ID");

    this.state = {
      decoding: true,
      message: "",
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
        const response = await api.post("/api/decode", {
          algorithm: this.props.algorithm,
          imageData: {
            base64Image,
            height,
            width
          }
        });
        if (response.ok) {
          this.setState({ message: response.data as string, decoding: false });
        } else {
          Alert.alert(
            "Encoding Failure",
            "Failed to decode photo, please check you have an internet connection.",
            [
              {
                text: "ok"
              }
            ]
          );
        }
      },
      () => null
    );
    this.decoded();
  };

  public render() {
    const { theme } = this.props.screenProps;

    return (
      <View>
        <ImageProgress
          animating={this.state.decoding}
          photo={this.state.photo}
          primaryColor={colors.secondary as PrimaryColor}
          theme={theme}
        />
      </View>
    );
  }

  private decoded = () => {
    this.props.navigation.navigate("Progress", {
      message: this.state.message,
      uri: this.state.photo
    });
  };
}

export default withDispatchAlgorithm(Progress);
