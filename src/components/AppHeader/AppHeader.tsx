import * as React from 'react';
import {StatusBar, View} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import {NavigationLeafRoute, NavigationScreenProp} from 'react-navigation';

import Logo from '~/components/Logo';
import {primary, secondary} from '~/constants/colors';
import {ITheme} from '~/constants/types';
import styles from './styles';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  theme: ITheme;
}

export default class AppHeader extends React.Component<IProps, {}> {
  public render() {
    const {navigation, theme} = this.props;
    return (
      <View>
        <StatusBar
          backgroundColor={theme.background}
          hidden={false}
          barStyle={theme.isDark ? 'light-content' : 'dark-content'}
        />
        <Header
          leftComponent={
            <Icon
              color={theme.color}
              name="menu"
              onPress={navigation.toggleDrawer.bind(this)}
              type="simple-line-icon"
            />
          }
          centerComponent={<Logo color={theme.color} isDark={theme.isDark} />}
          containerStyle={[
            styles.container,
            {
              backgroundColor: theme.background as string,
              borderBottomColor: this.primaryColor(navigation),
            },
          ]}
          rightComponent={
            this.homeIconColor(navigation) ? (
              <Icon
                color={theme.color}
                name="home"
                type="antdesign"
                onPress={this.goToMainView.bind(this, navigation)}
              />
            ) : (
              <View />
            )
          }
        />
      </View>
    );
  }

  private primaryColor(navigation: NavigationScreenProp<any, any>) {
    const viewName = this.getCurrentViewName(navigation.state) as any;
    let primaryColor = primary;

    if (viewName.startsWith('Decoding')) {
      primaryColor = secondary;
    }

    return primaryColor;
  }

  private homeIconColor(navigation: NavigationScreenProp<any, any>) {
    const viewName = this.getCurrentViewName(navigation.state) as any;
    let showHomeIcon = false;

    if (
      (viewName.startsWith('Encoding') || viewName.startsWith('Decoding')) &&
      !viewName.includes('Main')
    ) {
      showHomeIcon = true;
    }

    return showHomeIcon;
  }

  private goToMainView(navigation: NavigationScreenProp<any, any>) {
    const viewName = this.getCurrentViewName(navigation.state);

    if (viewName.startsWith('Encoding')) {
      navigation.navigate('EncodingMain');
    } else if (viewName.startsWith('Decoding')) {
      navigation.navigate('DecodingMain');
    }
  }

  private getCurrentViewName(route: NavigationLeafRoute): string {
    if (
      !route.routes ||
      route.routes.length === 0 ||
      route.index >= route.routes.length
    ) {
      return route.routeName;
    }

    const childActiveRoute = route.routes[route.index];
    return this.getCurrentViewName(childActiveRoute);
  }
}
