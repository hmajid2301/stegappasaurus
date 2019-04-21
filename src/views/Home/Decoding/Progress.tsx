import { ApiResponse, create } from "apisauce";
import { FileSystem } from "expo";
import React, { Component } from "react";
import { Alert, Image, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { AlgorithmNames, ITheme, PrimaryColor } from "~/common/interfaces";
import { colors } from "~/common/styles";
import ImageProgress from "~/components/ImageProgress";
import { selectAlgorithm } from "~/redux/actions";
import { IReducerState as IReducerFireBase } from "~/redux/reducers/FirebaseToken";
import { IReducerState as IReducerSelectAlgorithm } from "~/redux/reducers/SelectAlgorithm";

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
      <View>
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
    const base64Image = await FileSystem.readAsStringAsync(
      this.state.photo,
      FileSystem.EncodingTypes.Base64
    );
    await this.callDecodeAPI(base64Image);
    this.decoded();
  };

  private callDecodeAPI = async (base64Image: string) => {
    await Image.getSize(
      this.state.photo,
      async (width, height) => {
        const api = create({
          baseURL: "https://us-central1-stegappasaurus.cloudfunctions.net/api",
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

  private handleResponse(response: ApiResponse<{}>) {
    if (response.status === 200) {
      this.setState({ message: response.data as string, decoding: false });
    } else if (response.status === 200 && response.data === "invalid_message") {
      this.props.navigation.navigate("Main");
      Alert.alert("Invalid image could not decode.");
    } else {
      Alert.alert(
        "Decoding Failure",
        "Failed to decode photo, please check you have an internet connection.",
        [
          {
            text: "ok"
          }
        ]
      );
    }
  }

  private decoded = () => {
    this.props.navigation.navigate("Progress", {
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
