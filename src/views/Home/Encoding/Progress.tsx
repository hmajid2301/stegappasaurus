import { ApiResponse, create } from "apisauce";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as React from "react";
import { Linking, View } from "react-native";
import Config from "react-native-config";
import firebase from "react-native-firebase";
import Share from "react-native-share";
import { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";

import { AlgorithmNames, ITheme, PrimaryColor } from "@types";
import ImageProgress from "~/components/ImageProgress";
import Snackbar from "~/components/Snackbar";
import { colors } from "~/constants";
import { IReducerState } from "~/redux/reducers/SelectAlgorithm";
import { IAPIError, IEncodingSuccess } from "~/services/models";

type Encoding = IEncodingSuccess | IAPIError;

interface IProps {
  algorithm: AlgorithmNames;
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

class Progress extends React.Component<IProps, IState> {
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
          onPress={this.shareImage}
          photo={this.state.photo}
          primaryColor={colors.primary as PrimaryColor}
          theme={theme}
        />
      </View>
    );
  }

  public componentWillMount = async () => {
    const base64Image = await FileSystem.readAsStringAsync(this.state.photo, {
      encoding: FileSystem.EncodingType.Base64
    });

    await this.callEncodeAPI(this.props.algorithm, base64Image);
  };

  private callEncodeAPI = async (
    algorithm: AlgorithmNames,
    base64Image: string
  ) => {
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
    const response: ApiResponse<Encoding> = await api.post("/encode", {
      algorithm,
      imageData: `data:image/png;base64,${base64Image}`,
      message: this.state.message
    });

    const { data, ok, status } = response;
    if (ok) {
      await this.encoded((data as IEncodingSuccess).encoded);
    } else {
      this.failedResponse(data as IAPIError, status ? status : 500);
    }
  };

  private encoded = async (base64Image: string) => {
    const imagePath = `${FileSystem.documentDirectory}${this.state.filename}`;
    await FileSystem.writeAsStringAsync(imagePath, base64Image.substring(22), {
      encoding: FileSystem.EncodingType.Base64
    });

    await MediaLibrary.createAssetAsync(imagePath);
    await FileSystem.deleteAsync(imagePath);
    this.setState({ encoding: false });
    Snackbar.show({
      buttonText: "PhotoAlbum",
      onButtonPress: this.openAlbum,
      text: "Encoded image saved to photo album."
    });
  };

  private openAlbum = async () => {
    await Linking.openURL("content://media/internal/images/media");
  };

  private failedResponse = (error: IAPIError, status: number) => {
    const { code } = error;

    if (status === 500 && code === ("MessageTooLong" as IAPIError["code"])) {
      Snackbar.show({
        text: "Message too large to encode in image."
      });
      this.props.navigation.goBack();
    } else {
      Snackbar.show({
        text:
          "Failed to encode photo, please check you have an internet connection."
      });
      this.props.navigation.navigate("Main");
    }
  };

  private shareImage = async () => {
    await Share.open({
      url: this.state.filename
    });
  };
}

const mapStateToProps = (state: IReducerState) => ({
  algorithm: state.SelectAlgorithm.algorithm
});

export default connect(
  mapStateToProps,
  null
)(Progress);
