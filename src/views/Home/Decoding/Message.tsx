import React from 'react';
import {View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';

import {AppHeader} from '~/components/Header';
import ImageMessage from '~/components/ImageMessage';
import {ITheme} from '~/constants/types';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  screenProps: {
    theme: ITheme;
  };
}

interface IState {
  isDecoded: boolean;
  message: string;
  photo: string;
}

export default class Message extends React.Component<IProps, IState> {
  constructor(props: IProps) {
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
    const {theme} = this.props.screenProps;

    return (
      <View>
        <AppHeader
          navigation={this.props.navigation}
          primary="#E88C0C"
          theme={theme}
        />
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
