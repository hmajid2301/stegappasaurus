import React from 'react';
import {View} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';
import {DrawerNavigatorItemsProps} from 'react-navigation-drawer/lib/typescript/src/types';

import Logo from '~/components/Logo';
import {primary, pureWhite} from '~/constants/colors';
import {ITheme} from '~/constants/types';
import styles from './styles';

interface IScreenProps {
  theme: ITheme;
}

const DrawerNavigator: React.FunctionComponent<
  DrawerNavigatorItemsProps
> = props => {
  if (props.screenProps !== undefined) {
    const theme: ITheme = (props.screenProps as IScreenProps).theme;

    return (
      <View style={[styles.container, {backgroundColor: theme.background}]}>
        <View style={[styles.header, {backgroundColor: theme.background}]}>
          <Logo color={theme.color} isDark={theme.isDark} />
        </View>
        <DrawerItems
          activeBackgroundColor={primary}
          activeTintColor={pureWhite}
          iconContainerStyle={styles.icons}
          inactiveTintColor={theme.color}
          labelStyle={styles.text}
          {...props}
        />
      </View>
    );
  }
  return <View />;
};

export default DrawerNavigator;
