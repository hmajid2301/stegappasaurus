import { ApiResponse, create } from "apisauce";
import * as FileSystem from "expo-file-system";
import * as React from "react";
import { View } from "react-native";
import Config from "react-native-config";
import firebase from "react-native-firebase";
import { NavigationScreenProp } from "react-navigation";

import { ITheme, PrimaryColor } from "@types";
import ImageProgress from "~/components/ImageProgress";
import Snackbar from "~/components/Snackbar";
import { colors } from "~/constants";
import { IAPIError, IDecodingSuccess } from "~/services/models";

type Decoding = IDecodingSuccess | IAPIError;

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  screenProps: {
    theme: ITheme;
  };
}

interface IState {
  decoding: boolean;
  photo: string;
}

export default class Progress extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const { navigation } = props;
    const uri = navigation.getParam("uri", "NO-ID");

    this.state = {
      decoding: true,
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
    const base64Image = await FileSystem.readAsStringAsync(this.state.photo, {
      encoding: FileSystem.EncodingType.Base64
    });
    await this.callDecodeAPI(base64Image);
  };

  private callDecodeAPI = async (base64Image: string) => {
    let token = "";
    await firebase
      .auth()
      .signInAnonymously()
      .then(async userCredentials => {
        token = await userCredentials.user.getIdToken();
      });

    const api = create({
      baseURL: Config.FIREBASE_API_URL,
      headers: { Authorization: `Bearer ${token}` },
      timeout: 120000
    });
    const response: ApiResponse<Decoding> = await api.post("/decode", {
      imageData: `data:image/png;base64,${base64Image}`
    });

    const { data, ok } = response;
    if (ok) {
      this.decoded((data as IDecodingSuccess).decoded);
    } else {
      this.failedResponse();
    }
  };

  private decoded = (message: string) => {
    this.props.navigation.navigate("DecodingMessage", {
      message,
      uri: this.state.photo
    });
  };

  private failedResponse = () => {
    Snackbar.show({
      text:
        "Failed to decode photo, please check you have an internet connection."
    });
    this.props.navigation.goBack();
  };
}
