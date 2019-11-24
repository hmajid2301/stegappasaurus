import * as React from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  TextInput,
  View,
} from 'react-native';
import {
  NavigationEventSubscription,
  NavigationScreenProp,
} from 'react-navigation';

import DismissKeyboard from '~/components/DismissKeyboard';
import {pureWhite} from '~/constants/colors';
import styles from './styles';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  action?: (message: string) => void;
  editable: boolean;
  message?: string;
  photo: string;
}

interface IState {
  message: string;
}

export default class ImageMessage extends React.Component<IProps, IState> {
  public static defaultProps = {
    action: () => null,
    message: 'Enter your message here',
  };

  private focusListener: NavigationEventSubscription | null;
  private textInput: TextInput | null;

  constructor(props: IProps) {
    super(props);
    this.state = {
      message: '',
    };
    this.textInput = null;
    this.focusListener = null;
  }

  public render() {
    return (
      <KeyboardAvoidingView behavior="height">
        <DismissKeyboard>
          <ImageBackground
            source={{uri: this.props.photo}}
            style={styles.backgroundImage}>
            <View style={styles.textInputContainer}>
              <TextInput
                autoFocus={true}
                blurOnSubmit={true}
                editable={this.props.editable}
                enablesReturnKeyAutomatically={true}
                multiline={true}
                onChangeText={this.updateText}
                onSubmitEditing={
                  this.props.action !== undefined
                    ? this.props.action.bind(this, this.state.message)
                    : () => null
                }
                placeholder={this.props.message}
                placeholderTextColor={pureWhite}
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

  public componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
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

  private updateText = (message: string) => {
    this.setState({message});
  };
}
