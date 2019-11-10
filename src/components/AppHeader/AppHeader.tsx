import * as React from 'react';
import {StatusBar, View} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import {NavigationScreenProp} from 'react-navigation';

import Logo from '~/components/Logo';
import {ITheme, TabColors} from '~/constants/types';
import styles from './styles';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  primary: TabColors;
  theme: ITheme;
}

export default class AppHeader extends React.Component<IProps, {}> {
  public render() {
    const {primary, theme} = this.props;
    return (
      <View>
        <StatusBar
          backgroundColor={theme.background}
          hidden={false}
          barStyle={theme.isDark ? 'light-content' : 'dark-content'}
        />
        <Header
          centerComponent={<Logo color={theme.color} isDark={theme.isDark} />}
          containerStyle={[
            styles.container,
            {
              backgroundColor: theme.background as string,
              borderBottomColor: primary,
            },
          ]}
          rightComponent={
            <Icon
              color={theme.color}
              name="settings"
              type="feather"
              onPress={this.toSettings}
            />
          }
        />
      </View>
    );
  }

  private toSettings = () => {
    this.props.navigation.navigate('Settings');
  };
}
