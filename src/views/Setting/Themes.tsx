import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import {View} from 'react-native';
import {ListItem} from 'react-native-elements';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

import {primary} from '~/constants/colors';
import {bodyLight} from '~/constants/fonts';
import {ThemeContext} from '~/providers/ThemeContext';

import {ItemHeaderText} from './common';

export default class Themes extends React.Component<{}, {}> {
  public static contextType = ThemeContext;
  public context!: React.ContextType<typeof ThemeContext>;

  public render() {
    const {background, color, isDark} = this.context.theme;

    return (
      <View>
        <ListItem
          containerStyle={{
            backgroundColor: background,
          }}
          titleStyle={{
            paddingBottom: 5,
            paddingTop: 20,
          }}
          title={<ItemHeaderText>Themes</ItemHeaderText>}
        />
        <ListItem
          containerStyle={{
            backgroundColor: background,
          }}
          topDivider={true}
          bottomDivider={true}
          titleStyle={{color, fontFamily: bodyLight}}
          title="Dark Mode"
          switch={{
            onValueChange: this.setTheme.bind(this, !isDark),
            testID: 'switch',
            thumbColor: 'white',
            trackColor: {false: 'gray', true: primary},
            value: isDark,
          }}
        />
      </View>
    );
  }

  private async setTheme(isDark: boolean) {
    this.context.changeTheme(isDark);
    await AsyncStorage.setItem('@Theme', JSON.stringify(isDark));
    changeNavigationBarColor(
      this.context.theme.isDark ? '#17212d' : '#ffffff',
      !this.context.theme.isDark,
      false,
    );
  }
}
