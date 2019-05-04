import { ApiResponse, create } from "apisauce";
import { FileSystem, MediaLibrary } from "expo";
import { storage } from "firebase";
import { Base64 } from "js-base64";
import React, { Component } from "react";
import { Image, Share, View } from "react-native";
import { FIREBASE_API_URL } from "react-native-dotenv";
import { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import Sentry from "sentry-expo";

import { AlgorithmNames, ITheme, PrimaryColor } from "@types";
import { colors } from "~/common/styles";
import ImageProgress from "~/components/ImageProgress";
import Snackbar from "~/components/Snackbar";
import { selectAlgorithm } from "~/redux/actions";
import { IReducerState as IReducerFireBase } from "~/redux/reducers/FirebaseToken";
import { IReducerState as IReducerSelectAlgorithm } from "~/redux/reducers/SelectAlgorithm";
import { IEncodingError, IEncodingSuccess } from "~/services/web/models";

type Encoding = IEncodingSuccess | IEncodingError;

interface IReducerState extends IReducerSelectAlgorithm, IReducerFireBase {}

interface IProps {
  algorithm: AlgorithmNames;
  navigation: NavigationScreenProp<any, any>;
  screenProps: {
    theme: ITheme;
  };
  token: string;
}

interface IState {
  encoding: boolean;
  filename: string;
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
    if (this.props.algorithm === "LSB") {
      imageExtension = "png";
    }
    const filename = `${new Date().toISOString()}.${imageExtension}`;

    this.state = {
      encoding: true,
      filename,
      message,
      percentage: 0,
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
    console.log(this.props.screenProps);
    const base64Image = await FileSystem.readAsStringAsync(this.state.photo, {
      encoding: FileSystem.EncodingTypes.Base64
    });

    (global as any).btoa = Base64.btoa;
    (global as any).atob = Base64.atob;
    await this.callEncodeAPI(base64Image);
  };

  private callEncodeAPI = async (base64Image: string) => {
    await Image.getSize(
      this.state.photo,
      async (width, height) => {
        const api = create({
          baseURL: FIREBASE_API_URL,
          headers: { Authorization: `Bearer ${this.props.token}` }
        });
        const response = await api.post("/encode", {
          algorithm: this.props.algorithm,
          imageData: {
            base64Image: `data:image/png;base64,${base64Image}`,
            height,
            width
          },
          message: this.state.message
        });
        await this.handleResponse(response);
      },
      () => null
    );
  };

  private handleResponse = async (response: ApiResponse<{}>) => {
    if (response.data !== undefined) {
      const data = response.data as Encoding;
      const status = response.status;
      console.log(response.data);

      if (status === 200 && this.isSuccess(data)) {
        await this.encoded(data.encoded);
      } else if (
        status === 500 &&
        !this.isSuccess(data) &&
        data.code === ("MessageTooLong" as IEncodingError["code"])
      ) {
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
      Sentry.captureMessage(JSON.stringify(response));
    }
  };

  private isSuccess = (data: Encoding): data is IEncodingSuccess => {
    if ((data as IEncodingSuccess).encoded) {
      return true;
    }
    return false;
  };

  private encoded = async (base64Image: string) => {
    const imagePath = `${FileSystem.documentDirectory}${this.state.filename}`;
    await FileSystem.writeAsStringAsync(imagePath, base64Image.substring(22), {
      encoding: FileSystem.EncodingTypes.Base64
    });

    await MediaLibrary.createAssetAsync(imagePath);
    const blob = await this.uriToBlob(imagePath);
    await FileSystem.deleteAsync(imagePath);

    const ref = storage()
      .ref()
      .child(`images/${this.state.filename}`);

    ref.put(blob);
    this.setState({ encoding: false });
  };

  private uriToBlob = async (uri: string) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = () => {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  };

  private shareImage = async () => {
    const url = await storage()
      .ref()
      .child(`images/${this.state.filename}`)
      .getDownloadURL();

    await Share.share({
      message: url
    });
  };
}

const mapStateToProps = (state: IReducerState) => ({
  algorithm: state.SelectAlgorithm.algorithm,
  token: state.FirebaseToken.token
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectAlgorithm: (algorithm: AlgorithmNames) =>
    dispatch(selectAlgorithm({ algorithm }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Progress);
