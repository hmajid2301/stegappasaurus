import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {NavigationScreenProp} from 'react-navigation';

import Logo from '~/components/Logo';
import {TabColors} from '~/constants/types';
import {ThemeContext} from '~/providers/ThemeContext';
import Header from './Header';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  primary: TabColors;
}

export default class MainHeader extends React.Component<IProps, {}> {
  public static contextType = ThemeContext;
  public context!: React.ContextType<typeof ThemeContext>;

  public render() {
    return (
      <Header
        {...this.props}
        center={this.centerComponent()}
        right={this.rightComponent()}
      />
    );
  }

  private centerComponent = () => <Logo />;

  private rightComponent = () => {
    const isSettings = this.isSettings();
    if (isSettings) {
      return (
        <TouchableOpacity onPress={this.toSettings} testID="settings">
          <Icon
            color={this.context.theme.color}
            name="settings"
            type="feather"
          />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onPress={this.toHome} testID="home">
        <Icon
          color={this.context.theme.color}
          name="home"
          type="font-awesome"
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

    if (routeName !== 'Settings') {
      isSettingsPage = true;
    }

    return isSettingsPage;
  }
}
