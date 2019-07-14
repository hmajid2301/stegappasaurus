import * as React from "react";
import { View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";

import { AlgorithmNames } from "@types";
import ImageMessage from "~/components/ImageMessage";
import Snackbar from "~/components/Snackbar";
import { IReducerState } from "~/redux/reducers/SelectAlgorithm";

interface IProps {
  algorithm: AlgorithmNames;
  navigation: NavigationScreenProp<any, any>;
}

interface IState {
  limit: number;
  modalVisible: boolean;
  password: string;
  photo: string;
}

class Message extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const { navigation } = props;
    const uri = navigation.getParam("uri", "NO-ID");

    this.state = {
      limit: 15,
      modalVisible: false,
      password: "",
      photo: uri
    };
  }

  public componentDidMount = () => {
    if (this.props.algorithm !== "LSB") {
      this.setState({ modalVisible: true });
    }
  };

  public render() {
    return (
      <View>
        <ImageMessage
          action={this.onSubmit}
          navigation={this.props.navigation}
          editable={true}
          photo={this.state.photo}
        />
      </View>
    );
  }

  private onSubmit = (message: string) => {
    if (message.length === 0) {
      Snackbar.show({
        text: "Message cannot be empty"
      });
    } else {
      this.props.navigation.navigate("Progress", {
        message,
        uri: this.state.photo
      });
    }
  };
}

const mapStateToProps = (state: IReducerState) => ({
  algorithm: state.SelectAlgorithm.algorithm
});

export default connect(
  mapStateToProps,
  null
)(Message);
