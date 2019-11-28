import React from 'react';
import {StatusBar, StyleProp, View, ViewStyle} from 'react-native';
import {
  Header as ElementsHeader,
  HeaderSubComponent,
} from 'react-native-elements';
import {NavigationScreenProp} from 'react-navigation';

import {ITheme, TabColors} from '~/constants/types';
import styles from './styles';

interface IProps {
  center?: HeaderSubComponent;
  navigation: NavigationScreenProp<any, any>;
  left?: HeaderSubComponent;
  primary: TabColors;
  right?: HeaderSubComponent;
  styles?: StyleProp<ViewStyle>;
  theme: ITheme;
}

export default class Header extends React.Component<IProps, {}> {
  public render() {
    const {primary, theme} = this.props;
    return (
      <View>
        <StatusBar
          backgroundColor={theme.background}
          hidden={false}
          barStyle={theme.isDark ? 'light-content' : 'dark-content'}
        />
        <ElementsHeader
          centerComponent={this.props.center}
          containerStyle={[
            styles.container,
            {
              backgroundColor: theme.background as string,
              borderBottomColor: primary,
            },
            this.props.styles,
          ]}
          leftComponent={this.props.left}
          rightComponent={this.props.right}
        />
      </View>
    );
  }
}
