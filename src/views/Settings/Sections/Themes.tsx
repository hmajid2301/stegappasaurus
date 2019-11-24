import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import {Text, View} from 'react-native';
import {ListItem} from 'react-native-elements';

import {primary} from '~/constants/colors';
import {ITheme} from '~/constants/types';
import {ThemeContext} from '~/providers/ThemeContext';
import styles from './styles';

interface IProps {
  theme: ITheme;
}

export default class Themes extends React.Component<IProps, {}> {
  public static contextType = ThemeContext;
  public context!: React.ContextType<typeof ThemeContext>;

  public render() {
    const {theme} = this.props;

    return (
      <View>
        <ListItem
          containerStyle={{
            backgroundColor: theme.background,
          }}
          titleStyle={styles.itemHeader}
          title={<Text style={styles.itemHeaderText}>Themes</Text>}
        />
        <ListItem
          containerStyle={{
            backgroundColor: theme.background,
          }}
          topDivider={true}
          bottomDivider={true}
          titleStyle={[styles.itemText, {color: theme.color}]}
          title="Dark Mode"
          switch={{
            onValueChange: this.setTheme.bind(this, !theme.isDark),
            thumbColor: 'white',
            trackColor: {false: 'gray', true: primary},
            value: theme.isDark,
          }}
        />
      </View>
    );
  }

  private async setTheme(isDark: boolean) {
    this.context.changeTheme(isDark);
    await AsyncStorage.setItem('@Theme', JSON.stringify(isDark));
  }
}
