import React, { Component } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  TextInput,
  View
} from "react-native";

import DismissKeyboard from "~/components/DismissKeyboard";

import styles from "./styles";

interface IProps {
  action: (message: string) => void;
  editable: boolean;
  message?: string;
  photo: string;
}

interface IState {
  message: string;
}

export default class ImageMessage extends Component<IProps, IState> {
  public static defaultProps = {
    action: null,
    message: ""
  };

  constructor(props: IProps) {
    super(props);

    this.state = {
      message: ""
    };
  }

  public render() {
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <DismissKeyboard>
          <ImageBackground
            source={{ uri: this.props.photo }}
            style={styles.backgroundImage}
          >
            <View style={styles.textInputContainer}>
              <TextInput
                autoFocus={true}
                blurOnSubmit={true}
                editable={this.props.editable}
                enablesReturnKeyAutomatically={true}
                multiline={true}
                onChangeText={message => this.setState({ message })}
                onSubmitEditing={() => this.props.action(this.state.message)}
                placeholder={
                  this.props.message
                    ? this.props.message
                    : "Enter your message here ...."
                }
                style={styles.message}
                underlineColorAndroid="transparent"
              />
            </View>
          </ImageBackground>
        </DismissKeyboard>
      </KeyboardAvoidingView>
    );
  }
}
