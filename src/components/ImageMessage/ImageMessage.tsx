import React, { Component } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  TextInput,
  View
} from "react-native";
import styles from "./styles";

interface IProps {
  action: (message: string) => void;
  message: string;
  photo: string;
}

interface IState {
  message: string;
  editable: boolean;
}

export default class ImageMessage extends Component<IProps, IState> {
  public static defaultProps = {
    action: null,
    message: ""
  };

  constructor(props: IProps) {
    super(props);

    let editable = true;
    if (this.props.message) {
      editable = false;
    }

    this.state = {
      editable,
      message: ""
    };
  }

  public render() {
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <ImageBackground
          source={{ uri: this.props.photo }}
          style={styles.selectedImage}
        >
          <View style={styles.textContainer}>
            <TextInput
              autoFocus={true}
              blurOnSubmit={true}
              editable={this.state.editable}
              enablesReturnKeyAutomatically={true}
              multiline={true}
              onChangeText={message => this.setState({ message })}
              onSubmitEditing={() => this.props.action(this.state.message)}
              placeholder={
                this.props.message
                  ? this.props.message
                  : "Enter your message here...."
              }
              style={styles.userMessage}
              underlineColorAndroid="transparent"
            />
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}
