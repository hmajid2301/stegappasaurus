import NetInfo from "@react-native-community/netinfo";
import { ApiResponse, CancelToken, create } from "apisauce";
import { CancelTokenSource } from "axios";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as React from "react";
import { AppState, Linking, View } from "react-native";
import Config from "react-native-config";
import firebase from "react-native-firebase";
// @ts-ignore
import { NotificationsAndroid } from "react-native-notifications";
import Share from "react-native-share";
import {
  NavigationEventSubscription,
  NavigationScreenProp
} from "react-navigation";

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
  encodedUri: string;
  encoding: boolean;
  photo: string;
  source: CancelTokenSource;
}

export default class Progress extends React.Component<IProps, IState> {
  private focusListener: NavigationEventSubscription | null;

  constructor(props: IProps) {
    super(props);
    const { navigation } = props;
    const uri = navigation.getParam("uri", "NO-ID");
    const source = CancelToken.source();
    this.focusListener = null;

    this.state = {
      encodedUri: "",
      encoding: true,
      photo: uri,
      source
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
    this.focusListener = this.props.navigation.addListener(
      "willBlur",
      this.cancelRequest
    );
    const base64Image = await FileSystem.readAsStringAsync(this.state.photo, {
      encoding: FileSystem.EncodingType.Base64
    });

    const message = this.props.navigation.getParam("message", "NO-ID");
    await this.callEncodeAPI(base64Image, message);
  }

  public componentWillUnmount() {
    if (this.focusListener) {
      this.focusListener.remove();
    }
  }

  private async callEncodeAPI(base64Image: string, message: string) {
    const userCredentials = await firebase.auth().signInAnonymously();
    const token = await userCredentials.user.getIdToken();
    await this.checkNetworkStatus();

    const api = create({
      baseURL: Config.FIREBASE_API_URL,
      headers: { Authorization: `Bearer ${token}` },
      timeout: 60000
    });

    let response: ApiResponse<Encoding>;
    try {
      response = await api.post(
        "/encode",
        {
          algorithm: "LSB",
          imageData: `data:image/png;base64,${base64Image}`,
          message
        },
        {
          cancelToken: this.state.source.token
        }
      );
    } catch {
      response = {
        data: { code: "ServerError", message: "Server unreachable" },
        ok: false
      } as any;
    }

    const { data, ok, status } = response;
    if (ok) {
      await this.encoded((data as IEncodingSuccess).encoded);
    } else {
      this.failedResponse(data as IAPIError, status ? status : 500);
    }
  }

  private cancelRequest() {
    this.state.source.cancel();
  }

  private async checkNetworkStatus() {
    const state = await NetInfo.fetch();
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
    const filename = `${new Date().toISOString()}.png`;
    const imagePath = `${FileSystem.documentDirectory}${filename}`;
    await FileSystem.writeAsStringAsync(imagePath, base64Image.substring(22), {
      encoding: FileSystem.EncodingType.Base64
    });

    const { uri } = await MediaLibrary.createAssetAsync(imagePath);
    await FileSystem.deleteAsync(imagePath);

    this.setState({ encoding: false, encodedUri: base64Image });
    this.sendNotification();
    Snackbar.show({
      buttonText: "Open Album",
      onButtonPress: async () => {
        await Linking.openURL(uri);
      },
      text: "Image saved to photo album."
    });
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

  private sendNotification() {
    if (AppState.currentState === "background") {
      NotificationsAndroid.localNotification({
        body: "Your image has been encoded.",
        title: "Encoded"
      });
    }
  }

  private shareImage = async () => {
    await Share.open({
      failOnCancel: false,
      message: "Encoded image shared from stegappasaurus app.",
      url: this.state.encodedUri
    });
  };

  private sendUserBackToMain() {
    Snackbar.show({
      text: "Failed to encode image, please try again."
    });
    this.props.navigation.navigate("Main");
  }
}
