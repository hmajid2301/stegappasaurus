import * as React from 'react';
import {View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';

import AppHeader from '~/components/AppHeader';
import TabNavigator from '~/components/TabNavigator';
import {ITheme} from '~/constants/types';
import styles from './Home/styles';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  screenProps: {
    theme: ITheme;
  };
}

export default class Home extends React.Component<IProps, {}> {
  public static router = TabNavigator.router;

  public render() {
    const {theme} = this.props.screenProps;

    return (
      <View style={styles.container}>
        <AppHeader navigation={this.props.navigation} theme={theme} />
        <TabNavigator
          navigation={this.props.navigation}
          screenProps={{theme}}
        />
      </View>
    );
  }
}
