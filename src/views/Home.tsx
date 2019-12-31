import analytics from '@react-native-firebase/analytics';
import React from 'react';
import {
  createAppContainer,
  NavigationAction,
  NavigationState,
} from 'react-navigation';
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

const AppContainer = createAppContainer(TabNavigator);
const App = () => <AppContainer onNavigationStateChange={navChange} />;

const navChange = (
  prevState: NavigationState,
  currentState: NavigationState,
  _: NavigationAction,
) => {
  const previousRouteName = getActiveRouteName(prevState);
  const currentRouteName = getActiveRouteName(currentState);

  if (previousRouteName !== currentRouteName) {
    analytics()
      .setCurrentScreen(currentRouteName, currentRouteName)
      .then()
      .catch();
  }
};

function getActiveRouteName(navigationState: NavigationState): string {
  if (!navigationState) {
    return '';
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}

export default App;
