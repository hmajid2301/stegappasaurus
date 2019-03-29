import { create } from "apisauce";
import { FileSystem, MediaLibrary } from "expo";
import { auth, initializeApp, storage } from "firebase";
import { Toast } from "native-base";
import React, { Component } from "react";
import { Image, Share, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";

import ImageProgressCircle from "~/components/ImageProgressCircle";
import configs from "~/configs";
import { withDispatchAlgorithm } from "~/redux/hoc";
import { AlgorithmNames, ITheme, PrimaryColor } from "~/util/interfaces";
import { colors } from "~/util/styles";

type ImageExtension = "jpg" | "png";

interface IProps {
  algorithm: AlgorithmNames;
  navigation: NavigationScreenProp<any, any>;
  screenProps: {
    theme: ITheme;
  };
}

interface IState {
  base64Image: string;
  extension: ImageExtension;
  filename: string;
  message: string;
  percentage: number;
  photo: string;
  token: string;
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
      extension: imageExtension as ImageExtension,
      filename,
      message,
      percentage: 0,
      photo: uri,
      token: ""
    };
  }

  public componentWillMount = async () => {
    const firebaseConfig = {
      apiKey: configs.FIREBASE_API_KEY,
      authDomain: "stegappasaurus.firebaseapp.com",
      databaseURL: "stegappasaurus.firebaseio.com",
      storageBucket: "stegappasaurus.appspot.com"
    };
    initializeApp(firebaseConfig);
    const userAuth = auth();
    await userAuth.signInAnonymously();
    const currentUser = userAuth.currentUser;
    if (currentUser !== null) {
      const token = await currentUser.getIdToken();
      this.setState({ token });
    }

    const base64Image = await FileSystem.readAsStringAsync(this.state.photo, {
      encoding: FileSystem.EncodingTypes.Base64
    });
    await Image.getSize(
      this.state.photo,
      async (width, height) => {
        const api = create({
          baseURL: "https://us-central1-stegappasaurus.cloudfunctions.net"
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
        this.setState({ base64Image: response.data as string });
      },
      () => null
    );
    await this.encoded();
  };

  public render() {
    const { theme } = this.props.screenProps;
    return (
      <View style={{ flex: 1 }}>
        <ImageProgressCircle
          onPress={this.shareImage}
          message={"Saved Encoded Photo"}
          photo={this.state.photo}
          percentage={this.state.percentage}
          primaryColor={colors.primary as PrimaryColor}
          theme={theme}
        />
      </View>
    );
  }

  public updateProgressBar = (newValue: number) => {
    this.setState({ percentage: newValue });
  };

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
  };

  private async uriToBlob() {
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
  }

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

export default withDispatchAlgorithm(Progress);
