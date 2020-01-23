import React from 'react';
import {View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';

import {AppHeader} from '~/components/Header';
import ImageMessage from '~/components/ImageMessage';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

interface State {
  isDecoded: boolean;
  message: string;
  photo: string;
}

export default class Message extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const {navigation} = props;
    const uri = navigation.getParam('uri', 'NO-ID');
    const message = navigation.getParam('message', 'NO-ID');

    this.state = {
      isDecoded: false,
      message,
      photo: uri,
    };
  }

  public render() {
    return (
      <View>
        <AppHeader navigation={this.props.navigation} primary="#e88c0c" />
        <ImageMessage
          editable={false}
          navigation={this.props.navigation}
          message={this.state.message}
          photo={this.state.photo}
        />
      </View>
    );
  }
}
