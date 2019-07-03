import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as React from "react";
import { View } from "react-native";
import firebase, { RNFirebase } from "react-native-firebase";
import Share from "react-native-share";
import { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";

import { AlgorithmNames, ITheme, PrimaryColor } from "@types";
import ImageProgress from "~/components/ImageProgress";
import Snackbar from "~/components/Snackbar";
import { colors } from "~/constants";
import { IReducerState } from "~/redux/reducers/SelectAlgorithm";
import { IAPIError, IEncodingSuccess } from "~/services/models";

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
  metadata: any;
  percentage: number;
  photo: string;
}

class Progress extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const { navigation } = props;
    const metadata = navigation.getParam("metadata", "NO-ID");
    const message = navigation.getParam("message", "NO-ID");
    const uri = navigation.getParam("uri", "NO-ID");
    const filename = `${new Date().toISOString()}.png`;

    this.state = {
      encoding: true,
      filename,
      message,
      metadata,
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
      encoding: FileSystem.EncodingType.Base64
    });

    await this.callEncodeAPI(
      this.props.algorithm,
      base64Image,
      this.state.metadata
    );
  };

  private callEncodeAPI = async (
    algorithm: AlgorithmNames,
    base64Image: string,
    metadata: any
  ) => {
    const instance = firebase.functions().httpsCallable("encode");

    try {
      const response = await instance({
        algorithm,
        imageData: `data:image/png;base64,${base64Image}`,
        message: this.state.message,
        metadata
      });
      await this.successfulResponse(response);
    } catch (error) {
      this.failedResponse(error);
      console.error(error);
    }
  };

  private successfulResponse = async (
    response: RNFirebase.functions.HttpsCallableResult<IEncodingSuccess>
  ) => {
    const data = response.data;
    console.log(response.data);
    await this.encoded(data.encoded);
  };

  private failedResponse = (response: RNFirebase.functions.HttpsError) => {
    if (response.message === ("MessageTooLong" as IAPIError["code"])) {
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

  private encoded = async (base64Image: string) => {
    const imagePath = `${FileSystem.documentDirectory}${this.state.filename}`;
    await FileSystem.writeAsStringAsync(imagePath, base64Image.substring(22), {
      encoding: FileSystem.EncodingType.Base64
    });

    await MediaLibrary.createAssetAsync(imagePath);
    await FileSystem.deleteAsync(imagePath);
    this.setState({ encoding: false });
  };

  private shareImage = async () => {
    Share.open({
      url: this.state.filename
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
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
