import React from 'react';
import {KeyboardAvoidingView, TextInput} from 'react-native';
import {
  NavigationEventSubscription,
  NavigationScreenProp,
} from 'react-navigation';
import styled from 'styled-components/native';

import {pureWhite} from '~/constants/colors';
import {bodyLight} from '~/constants/fonts';

interface Props {
  navigation: NavigationScreenProp<any, any>;
  action?: (message: string) => void;
  editable: boolean;
  message?: string;
  photo: string;
}

interface State {
  message: string;
}

export default class ImageMessage extends React.Component<Props, State> {
  public static defaultProps = {
    action: () => null,
    message: 'Enter your message here',
  };
  public textInput = React.createRef<TextInput>();

  private focusListener: NavigationEventSubscription | null;

  constructor(props: Props) {
    super(props);
    this.state = {
      message: '',
    };
    this.focusListener = null;
  }

  public render() {
    return (
      <KeyboardAvoidingView behavior="height">
        <BackgroundImage source={{uri: this.props.photo}}>
          <InputContainer>
            <Input
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
              ref={this.textInput}
              testID="message"
              underlineColorAndroid="transparent"
            />
          </InputContainer>
        </BackgroundImage>
      </KeyboardAvoidingView>
    );
  }

  public componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      if (this.textInput.current !== null) {
        this.textInput.current.focus();
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

const BackgroundImage = styled.ImageBackground`
  height: 100%;
  width: 100%;
`;

const InputContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Input = styled.TextInput`
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-family: ${bodyLight};
  font-size: 22;
  padding-left: 20;
  height: 100%;
  width: 100%;
`;
