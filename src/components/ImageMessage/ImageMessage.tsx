import * as React from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  TextInput,
  View
} from "react-native";
import {
  NavigationEventSubscription,
  NavigationScreenProp
} from "react-navigation";

import DismissKeyboard from "~/components/DismissKeyboard";
import { colors } from "~/modules";
import styles from "./styles";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  action: (message: string) => void;
  editable: boolean;
  message?: string;
  photo: string;
}

interface IState {
  message: string;
}

export default class ImageMessage extends React.Component<IProps, IState> {
  public static defaultProps = {
    action: null,
    message: ""
  };

  private focusListener: NavigationEventSubscription | null;
  private textInput: TextInput | null;

  constructor(props: IProps) {
    super(props);
    this.state = {
      message: ""
    };
    this.textInput = null;
    this.focusListener = null;
  }

  public componentDidMount() {
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      if (this.textInput !== null) {
        this.textInput.focus();
      }
    });
  }

  public componentWillUnmount() {
    if (this.focusListener) {
      this.focusListener.remove();
    }
  }

  public render() {
    return (
      <KeyboardAvoidingView behavior="height">
        <DismissKeyboard>
          <ImageBackground
            source={{ uri: this.props.photo }}
            style={styles.backgroundImage}
          >
            <View style={styles.textInputContainer}>
              <TextInput
                blurOnSubmit={true}
                editable={this.props.editable}
                enablesReturnKeyAutomatically={true}
                multiline={true}
                onChangeText={message => this.setState({ message })}
                onSubmitEditing={() => this.props.action(this.state.message)}
                placeholder={
                  this.props.message
                    ? this.props.message
                    : "Enter your message here"
                }
                placeholderTextColor={colors.pureWhite}
                ref={ref => {
                  this.textInput = ref;
                }}
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
