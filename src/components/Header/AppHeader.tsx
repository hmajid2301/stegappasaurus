import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {NavigationScreenProp} from 'react-navigation';

import {ITheme, TabColors} from '~/constants/types';
import Header from './Header';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  primary: TabColors;
  theme: ITheme;
}

export default class AppHeader extends React.Component<IProps, {}> {
  public render() {
    return (
      <Header
        {...this.props}
        left={this.leftComponent()}
        styles={{height: 50}}
      />
    );
  }

  private leftComponent = () => (
    <TouchableOpacity onPress={this.toHome} testID="home">
      <Icon
        color={this.props.theme.color}
        name="arrow-back"
        type="material-icons"
      />
    </TouchableOpacity>
  );

  private toHome = () => {
    this.props.navigation.navigate('Main');
  };
}
