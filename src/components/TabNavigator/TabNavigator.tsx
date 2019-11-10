import * as React from 'react';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from 'react-navigation-tabs';

import {primary, pureWhite, secondary} from '~/constants/colors';
import {body} from '~/constants/fonts';
import Decoding from '~/views/Home/Decoding';
import Encoding from '~/views/Home/Encoding';

const TabNavigator = createMaterialTopTabNavigator(
  {
    Decoding: {
      navigationOptions: {
        tabBarLabel: 'Decoding',
      },
      screen: Decoding,
    },
    Encoding: {
      navigationOptions: {
        tabBarLabel: 'Encoding',
      },
      screen: Encoding,
    },
  },
  {
    initialRouteName: 'Encoding',
    lazy: true,
    order: ['Encoding', 'Decoding'],
    tabBarComponent: props => (
      <MaterialTopTabBar
        {...props}
        style={{
          backgroundColor:
            props.navigation.state.index === 0 ? primary : secondary,
        }}
      />
    ),
    tabBarOptions: {
      activeTintColor: pureWhite,
      inactiveTintColor: '#DDD',
      indicatorStyle: {
        backgroundColor: pureWhite,
      },
      labelStyle: {
        fontFamily: body,
        fontSize: 12,
      },
      pressColor: pureWhite,
    },
    tabBarPosition: 'bottom',
  },
);

export default TabNavigator;
