import * as React from 'react';
import {ScrollView, View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';

import {MainHeader} from '~/components/Header';
import {ITheme} from '~/constants/types';
import {About, Support, Themes} from './Settings/Sections';
import styles from './Settings/styles';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  screenProps: {
    theme: ITheme;
  };
}

export default class Settings extends React.Component<IProps, {}> {
  public render() {
    const {theme} = this.props.screenProps;

    return (
      <ScrollView
        style={[styles.container, {backgroundColor: theme.background}]}>
        <MainHeader
          primary="#009cff"
          navigation={this.props.navigation}
          theme={theme}
        />
        <View>
          <Themes theme={theme} />
          <Support background={theme.background} color={theme.color} />
          <About background={theme.background} color={theme.color} />
        </View>
      </ScrollView>
    );
  }
}
