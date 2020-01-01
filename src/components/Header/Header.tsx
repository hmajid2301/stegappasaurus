import React, {useContext} from 'react';
import {StatusBar, StyleProp, View, ViewStyle} from 'react-native';
import {
  Header as ElementsHeader,
  HeaderSubComponent,
} from 'react-native-elements';
import {ThemeContext} from '~/providers/ThemeContext';

import {TabColors} from '~/constants/types';

interface Props {
  center?: HeaderSubComponent;
  left?: HeaderSubComponent;
  primary: TabColors;
  right?: HeaderSubComponent;
  styles?: StyleProp<ViewStyle>;
}

const Header = (props: Props) => {
  const {background, isDark} = useContext(ThemeContext).theme;
  return (
    <View>
      <StatusBar
        backgroundColor={background}
        hidden={false}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      <ElementsHeader
        centerComponent={props.center}
        containerStyle={[
          {
            backgroundColor: background,
            borderBottomColor: props.primary,
            borderBottomWidth: 2,
          },
          props.styles,
        ]}
        leftComponent={props.left}
        rightComponent={props.right}
      />
    </View>
  );
};

export default Header;
