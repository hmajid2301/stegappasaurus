import React from 'react';
import {View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';

import Snackbar from '~/actions/Snackbar';
import {AppHeader} from '~/components/Header';
import ImageMessage from '~/components/ImageMessage';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

interface State {
  photo: string;
}

export default class Message extends React.Component<Props, State> {
  public state = {
    photo: this.props.navigation.getParam('uri', 'NO-ID'),
  };

  private child: ImageMessage | null = null;

  public render() {
    return (
      <View>
        <AppHeader navigation={this.props.navigation} primary="#009cff" />
        <ImageMessage
          action={this.onSubmit}
          navigation={this.props.navigation}
          editable={true}
          photo={this.state.photo}
          ref={ch => (this.child = ch)}
        />
      </View>
    );
  }

  private onSubmit = (message: string) => {
    if (message.length === 0) {
      Snackbar.show({
        text: 'Message cannot be empty',
      });
      setTimeout(() => {
        if (this.child && this.child.textInput.current !== null) {
          this.child.textInput.current.focus();
        }
      }, 50);
    } else {
      this.props.navigation.navigate('Progress', {
        message,
        uri: this.state.photo,
      });
    }
  };
}
