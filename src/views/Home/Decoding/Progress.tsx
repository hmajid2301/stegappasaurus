import { ApiResponse, create } from "apisauce";
import { FileSystem } from "expo";
import React, { Component } from "react";
import { Image, View } from "react-native";
import { FIREBASE_API_URL } from "react-native-dotenv";
import { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { AlgorithmNames, ITheme, PrimaryColor } from "@types";
import { colors } from "~/common/styles";
import ImageProgress from "~/components/ImageProgress";
import Snackbar from "~/components/Snackbar";
import { selectAlgorithm } from "~/redux/actions";
import { IReducerState as IReducerFireBase } from "~/redux/reducers/FirebaseToken";
import { IReducerState as IReducerSelectAlgorithm } from "~/redux/reducers/SelectAlgorithm";
import { IDecodingError, IDecodingSuccess } from "~/services/web/models";

type Decoding = IDecodingSuccess | IDecodingError;

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
  decoding: boolean;
  message: string;
  photo: string;
}

class Progress extends Component<IProps, IState> {
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
      encoding: FileSystem.EncodingTypes.Base64
    });
    let mimeType = "image/jpeg";
    if (this.props.algorithm === "LSB-PNG") {
      mimeType = "image/png";
    }

    base64Image = `data:${mimeType};base64,${base64Image}`;
    await this.callDecodeAPI(base64Image);
  };

  private callDecodeAPI = async (base64Image: string) => {
    await Image.getSize(
      this.state.photo,
      async (width, height) => {
        const api = create({
          baseURL: FIREBASE_API_URL,
          headers: { Authorization: `Bearer ${this.props.token}` }
        });
        const response = await api.post("/decode", {
          algorithm: this.props.algorithm,
          imageData: {
            base64Image,
            height,
            width
          }
        });
        this.handleResponse(response);
      },
      () => null
    );
  };

  private handleResponse = (response: ApiResponse<{}>) => {
    if (response.data !== undefined) {
      const data = response.data as Decoding;
      const status = response.status;

      if (status === 200 && this.isSuccess(data)) {
        this.setState({ message: data.decoded, decoding: false });
        this.decoded();
      } else {
        Snackbar.show({
          text:
            "Failed to decode photo, please check you have an internet connection."
        });
        this.props.navigation.goBack();
      }
    }
  };

  private isSuccess = (data: Decoding): data is IDecodingSuccess => {
    if ((data as IDecodingSuccess).decoded) {
      return true;
    }
    return false;
  };

  private decoded = () => {
    this.props.navigation.navigate("Message", {
      message: this.state.message,
      uri: this.state.photo
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
