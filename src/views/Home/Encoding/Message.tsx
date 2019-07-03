import * as React from "react";
import {
  Button,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View
} from "react-native";
import { Slider } from "react-native-elements";
import Modal from "react-native-modal";
import { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";

import { AlgorithmNames } from "@types";
import ImageMessage from "~/components/ImageMessage";
import Snackbar from "~/components/Snackbar";
import { colors } from "~/constants";
import { IReducerState } from "~/redux/reducers/SelectAlgorithm";
import styles from "./Message/styles";

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
    console.log(this.props.algorithm);
    if (this.props.algorithm !== "LSB") {
      this.setState({ modalVisible: true });
    }
  };

  public render() {
    return (
      <View>
        <ImageMessage
          action={this.onSubmit}
          editable={true}
          photo={this.state.photo}
        />

        <Modal isVisible={this.state.modalVisible}>
          <KeyboardAvoidingView
            enabled
            behavior="padding"
            keyboardVerticalOffset={20}
            style={styles.container}
          >
            <Text style={styles.modalHeader}>Extra Settings</Text>
            <View style={styles.sliderContainer}>
              <Text style={styles.modalText}>
                DCT Limit: {this.state.limit}
              </Text>
              <Slider
                value={this.state.limit}
                onValueChange={limit => this.setState({ limit })}
                minimumTrackTintColor={colors.primary}
                minimumValue={1}
                maximumValue={255}
                step={1}
              />
            </View>

            {this.props.algorithm === "F5" && (
              <View style={styles.passwordContainer}>
                <Text style={styles.modalText}>Password:</Text>
                <TextInput
                  maxLength={8}
                  onChangeText={password => this.setState({ password })}
                  secureTextEntry={true}
                  textContentType="password"
                  placeholder="Enter password here (maximum 8 characters)."
                  style={[styles.passwordTextInput, styles.modalText]}
                />
              </View>
            )}
            <View style={styles.buttonContainer}>
              <Button
                onPress={() => {
                  this.setState({ modalVisible: false });
                }}
                title="Submit"
                accessibilityLabel="Submit metadata values."
              />
            </View>
          </KeyboardAvoidingView>
        </Modal>
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
        metadata: {
          limit: this.state.limit,
          password: this.state.password.padStart(8, "0")
        },
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
