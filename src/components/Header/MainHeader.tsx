import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {NavigationScreenProp} from 'react-navigation';

import Logo from '~/components/Logo';
import {ITheme, TabColors} from '~/constants/types';
import Header from './Header';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  primary: TabColors;
  theme: ITheme;
}

export default class MainHeader extends React.Component<IProps, {}> {
  public render() {
    return (
      <Header
        {...this.props}
        center={this.centerComponent()}
        right={this.rightComponent()}
      />
    );
  }

  private centerComponent = () => (
    <Logo color={this.props.theme.color} isDark={this.props.theme.isDark} />
  );

  private rightComponent = () => {
    const isSettings = this.isSettings();
    if (isSettings) {
      return (
        <TouchableOpacity>
          <Icon
            color={this.props.theme.color}
            name="settings"
            type="feather"
            onPress={this.toSettings}
          />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity>
        <Icon
          color={this.props.theme.color}
          name="home"
          type="font-awesome"
          onPress={this.toHome}
        />
      </TouchableOpacity>
    );
  };

  private toSettings = () => {
    this.props.navigation.navigate('Settings');
  };

  private toHome = () => {
    this.props.navigation.navigate('Main');
  };

  private isSettings() {
    const routeName = this.props.navigation.state.routeName;
    let isSettingsPage = false;

    if (!routeName.startsWith('Settings')) {
      isSettingsPage = true;
    }

    return isSettingsPage;
  }
}
