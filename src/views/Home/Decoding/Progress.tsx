import NetInfo from "@react-native-community/netinfo";
import { ApiResponse, CancelToken, create } from "apisauce";
import { CancelTokenSource } from "axios";
import * as FileSystem from "expo-file-system";
import * as React from "react";
import { AppState, View } from "react-native";
import Config from "react-native-config";
import firebase from "react-native-firebase";
// @ts-ignore
import { NotificationsAndroid } from "react-native-notifications";
import {
  NavigationEventSubscription,
  NavigationScreenProp
} from "react-navigation";

import { IAPIError, IDecodingSuccess, ITheme, PrimaryColor } from "@types";
import bugsnag from "~/actions/Bugsnag";
import ImageProgress from "~/components/ImageProgress";
import Snackbar from "~/components/Snackbar";
import { colors } from "~/modules";

export type Decoding = IDecodingSuccess | IAPIError;

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  screenProps: {
    theme: ITheme;
  };
}

interface IState {
  decoding: boolean;
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
      decoding: true,
      photo: uri,
      source
    };
  }

  public render() {
    const { theme } = this.props.screenProps;

    return (
      <View style={{ flex: 1 }}>
        <ImageProgress
          animating={this.state.decoding}
          background={theme.background}
          photo={this.state.photo}
          primaryColor={colors.secondary as PrimaryColor}
        />
      </View>
    );
  }

  public async componentDidMount() {
    const base64Image = await FileSystem.readAsStringAsync(this.state.photo, {
      encoding: FileSystem.EncodingType.Base64
    });

    this.focusListener = this.props.navigation.addListener(
      "willBlur",
      this.cancelRequest
    );
    await this.callDecodeAPI(base64Image);
  }

  public componentWillUnmount() {
    if (this.focusListener) {
      this.focusListener.remove();
    }
  }

  private async callDecodeAPI(base64Image: string) {
    try {
      const userCredentials = await firebase.auth().signInAnonymously();
      const token = await userCredentials.user.getIdToken();
      await this.checkNetworkStatus();

      const api = create({
        baseURL: Config.FIREBASE_API_URL,
        headers: { Authorization: `Bearer ${token}` },
        timeout: 60000
      });
      let response: ApiResponse<Decoding>;
      try {
        response = await api.post(
          "/decode",
          {
            imageData: `data:image/png;base64,${base64Image}`
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

      const { data, ok } = response;
      if (ok) {
        const message = (data as IDecodingSuccess).decoded;
        this.decoded(message);
      } else {
        this.failedResponse();
      }
    } catch (err) {
      bugsnag.notify(err);
    }
  }

  private cancelRequest = () => {
    this.state.source.cancel();
  };

  private async checkNetworkStatus() {
    try {
      const state = await NetInfo.fetch();
      if (!state.isConnected) {
        throw Error("No Internet");
      } else if (state.type === "cellular") {
        Snackbar.show({
          text: "You are using mobile data."
        });
      }
    } catch {
      Snackbar.show({
        text: "You need an internet connection to decode an image."
      });
      this.failedResponse();
    }
  }

  private decoded(message: string) {
    this.sendNotification();
    this.props.navigation.navigate("DecodingMessage", {
      message,
      uri: this.state.photo
    });
  }

  private sendNotification() {
    if (AppState.currentState === "background") {
      NotificationsAndroid.localNotification({
        body: "Your image has been decoded.",
        title: "Decoded"
      });
    }
  }

  private failedResponse() {
    Snackbar.show({
      text: "Failed to decode image, please try again."
    });
    this.props.navigation.goBack();
  }
}
