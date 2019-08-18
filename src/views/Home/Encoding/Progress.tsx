import NetInfo from "@react-native-community/netinfo";
import { ApiResponse, create } from "apisauce";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as React from "react";
import { Linking, View } from "react-native";
import Config from "react-native-config";
import firebase from "react-native-firebase";
import Share from "react-native-share";
import { NavigationScreenProp } from "react-navigation";

import { IAPIError, IEncodingSuccess, ITheme, PrimaryColor } from "@types";
import ImageProgress from "~/components/ImageProgress";
import Snackbar from "~/components/Snackbar";
import { colors } from "~/modules";

type Encoding = IEncodingSuccess | IAPIError;

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  screenProps: {
    theme: ITheme;
  };
}

interface IState {
  encoding: boolean;
  filename: string;
  message: string;
  photo: string;
}

export default class Progress extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const { navigation } = props;
    const message = navigation.getParam("message", "NO-ID");
    const uri = navigation.getParam("uri", "NO-ID");
    const filename = `${new Date().toISOString()}.png`;

    this.state = {
      encoding: true,
      filename,
      message,
      photo: uri
    };
  }

  public render() {
    const { theme } = this.props.screenProps;
    return (
      <View style={{ flex: 1 }}>
        <ImageProgress
          animating={this.state.encoding}
          background={theme.background}
          icon={{
            color: colors.pureWhite,
            name: "share",
            size: 130,
            type: "font-awesome"
          }}
          onPress={this.shareImage}
          photo={this.state.photo}
          primaryColor={colors.primary as PrimaryColor}
        />
      </View>
    );
  }

  public async componentDidMount() {
    const base64Image = await FileSystem.readAsStringAsync(this.state.photo, {
      encoding: FileSystem.EncodingType.Base64
    });

    await this.callEncodeAPI(base64Image);
  }

  private async callEncodeAPI(base64Image: string) {
    const userCredentials = await firebase.auth().signInAnonymously();
    const token = await userCredentials.user.getIdToken();
    await this.checkNetworkStatus();

    const api = create({
      baseURL: Config.FIREBASE_API_URL,
      headers: { Authorization: `Bearer ${token}` },
      timeout: 120000
    });
    const response: ApiResponse<Encoding> = await api.post("/encode", {
      algorithm: "LSB",
      imageData: `data:image/png;base64,${base64Image}`,
      message: this.state.message
    });

    const { data, ok, status } = response;
    if (ok) {
      await this.encoded((data as IEncodingSuccess).encoded);
    } else {
      this.failedResponse(data as IAPIError, status ? status : 500);
    }
  }

  private async checkNetworkStatus() {
    const state = await NetInfo.fetch();
    await NetInfo.fetch();
    if (!state.isConnected) {
      Snackbar.show({
        text: "You need an internet connection to encode an image."
      });
      this.sendUserBackToMain();
    } else if (state.type === "cellular") {
      Snackbar.show({
        text: "You are using mobile data."
      });
    }
  }

  private async encoded(base64Image: string) {
    const imagePath = `${FileSystem.documentDirectory}${this.state.filename}`;
    await FileSystem.writeAsStringAsync(imagePath, base64Image.substring(22), {
      encoding: FileSystem.EncodingType.Base64
    });

    await MediaLibrary.createAssetAsync(imagePath);
    await FileSystem.deleteAsync(imagePath);

    this.setState({ encoding: false });
    Snackbar.show({
      buttonText: "Open Album",
      onButtonPress: this.openAlbum,
      text: "Image saved to photo album."
    });
  }

  private async openAlbum() {
    await Linking.openURL("content://media/internal/images/media");
  }

  private failedResponse(error: IAPIError, status: number) {
    const { code } = error;

    if (status === 500 && code === ("MessageTooLong" as IAPIError["code"])) {
      Snackbar.show({
        text: "Message too large to encode in image."
      });
      this.props.navigation.goBack();
    } else {
      this.sendUserBackToMain();
    }
  }

  private async shareImage() {
    await Share.open({
      url: this.state.filename
    });
  }

  private sendUserBackToMain() {
    Snackbar.show({
      text: "Failed to encode image, please try again."
    });
    this.props.navigation.navigate("Main");
  }
}
