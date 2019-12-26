import React from 'react';
import {Keyboard, View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';

import Snackbar from '~/actions/Snackbar';
import {AppHeader} from '~/components/Header';
import ImageMessage from '~/components/ImageMessage';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

interface IState {
  photo: string;
}

export default class Message extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const {navigation} = props;
    const uri = navigation.getParam('uri', 'NO-ID');

    this.state = {
      photo: uri,
    };
  }

  public render() {
    return (
      <View>
        <AppHeader navigation={this.props.navigation} primary="#009cff" />
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
        text: 'Message cannot be empty',
      });
    } else {
      Keyboard.dismiss();
      this.props.navigation.navigate('Progress', {
        message,
        uri: this.state.photo,
      });
    }
  };
}
