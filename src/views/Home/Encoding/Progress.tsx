import { ApiResponse, create } from "apisauce";
import { FileSystem, MediaLibrary } from "expo";
import { storage } from "firebase";
import { Toast } from "native-base";
import React, { Component } from "react";
import { Alert, Image, Share, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { AlgorithmNames, ITheme, PrimaryColor } from "~/common/interfaces";
import { colors } from "~/common/styles";
import ImageProgress from "~/components/ImageProgress";
import { selectAlgorithm } from "~/redux/actions";
import { IReducerState as IReducerFireBase } from "~/redux/reducers/FirebaseToken";
import { IReducerState as IReducerSelectAlgorithm } from "~/redux/reducers/SelectAlgorithm";

type ImageExtension = "jpg" | "png";

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
  base64Image: string;
  encoding: boolean;
  extension: ImageExtension;
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
    const filename = new Date().toISOString();
    const message = navigation.getParam("message", "NO-ID");

    let imageExtension = "jpg";
    if (this.props.algorithm === "LSB-PNG") {
      imageExtension = "png";
    }

    this.state = {
      base64Image: "",
      encoding: true,
      extension: imageExtension as ImageExtension,
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
    const base64Image = await FileSystem.readAsStringAsync(this.state.photo, {
      encoding: FileSystem.EncodingTypes.Base64
    });

    await this.callEncodeAPI(base64Image);
    await this.encoded();
  };

  private callEncodeAPI = async (base64Image: string) => {
    await Image.getSize(
      this.state.photo,
      async (width, height) => {
        const api = create({
          baseURL: "https://us-central1-stegappasaurus.cloudfunctions.net/api",
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
        this.handleResponse(response);
      },
      () => null
    );
  };

  private handleResponse(response: ApiResponse<{}>) {
    if (response.status === 200) {
      this.setState({ base64Image: response.data as string });
    } else if (
      response.status === 200 &&
      response.data === "message_too_large"
    ) {
      this.props.navigation.goBack();
      Alert.alert("Message too large to encode in image.");
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
  }

  private encoded = async () => {
    const imagePath = `${FileSystem.documentDirectory}${this.state.filename}.${
      this.state.extension
    }`;
    await FileSystem.writeAsStringAsync(imagePath, this.state.base64Image, {
      encoding: FileSystem.EncodingTypes.Base64
    }).then();

    await MediaLibrary.createAssetAsync(imagePath);
    Toast.show({
      buttonText: "Okay",
      duration: 5000,
      text: "Encoded image saved to gallery."
    });

    const blob = await this.uriToBlob();
    const ref = storage()
      .ref()
      .child(`images/${this.state.filename}`);
    ref.put(blob);
    setTimeout(() => {
      this.setState({ encoding: false });
    }, 1000);
  };

  private uriToBlob = async () => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = () => {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", this.state.photo, true);
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
