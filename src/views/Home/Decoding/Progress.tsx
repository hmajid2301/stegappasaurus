import * as FileSystem from "expo-file-system";
import * as React from "react";
import { View } from "react-native";
import firebase, { RNFirebase } from "react-native-firebase";
import { NavigationScreenProp } from "react-navigation";

import { ITheme, PrimaryColor } from "@types";
import ImageProgress from "~/components/ImageProgress";
import Snackbar from "~/components/Snackbar";
import { colors } from "~/constants";
import { IDecodingSuccess } from "~/services/models";

interface IProps {
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

export default class Progress extends React.Component<IProps, IState> {
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

  public render() {
    const { theme } = this.props.screenProps;

    return (
      <View style={{ flex: 1 }}>
        <ImageProgress
          animating={this.state.decoding}
          photo={this.state.photo}
          primaryColor={colors.secondary as PrimaryColor}
          theme={theme}
        />
      </View>
    );
  }

  public componentWillMount = async () => {
    let base64Image = await FileSystem.readAsStringAsync(this.state.photo, {
      encoding: FileSystem.EncodingType.Base64
    });

    base64Image = `data:image/png;base64,${base64Image}`;
    await this.callDecodeAPI(base64Image);
  };

  private callDecodeAPI = async (base64Image: string) => {
    const instance = firebase.functions().httpsCallable("decode");

    try {
      const response = await instance({
        imageData: `data:image/png;base64,${base64Image}`
      });
      await this.successfulResponse(response);
    } catch (error) {
      this.failedResponse();
      console.error(error);
    }
  };

  private successfulResponse = async (
    response: RNFirebase.functions.HttpsCallableResult<IDecodingSuccess>
  ) => {
    const data = response.data;
    this.setState({ message: data.decoded, decoding: false });
    this.decoded();
  };

  private failedResponse = () => {
    Snackbar.show({
      text:
        "Failed to decode photo, please check you have an internet connection."
    });
    this.props.navigation.goBack();
  };

  private decoded = () => {
    this.props.navigation.navigate("Message", {
      message: this.state.message,
      uri: this.state.photo
    });
  };
}
