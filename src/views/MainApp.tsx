import analytics from '@react-native-firebase/analytics';
import React, {useContext} from 'react';
import {createAppContainer, NavigationState} from 'react-navigation';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from 'react-navigation-tabs';
import styled from 'styled-components/native';

import bugsnag from '~/actions/Bugsnag/Bugsnag';
import {primary, pureWhite, secondary} from '~/constants/colors';
import Loader from '~/components/Loader';
import {body} from '~/constants/fonts';
import Decoding from '~/views/Home/Decoding';
import Encoding from '~/views/Home/Encoding';
import {LoadingContext} from '~/providers/LoadingContext';

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
const MainApp = () => {
  const {loading, changeLoading} = useContext(LoadingContext);

  return (
    <MainAppContainer>
      <AppContainer
        onNavigationStateChange={onNavigationChange}
        screenProps={{changeLoading}}
      />
      <Loader loading={loading === 'true' ? true : false} overlay="#222" />
    </MainAppContainer>
  );
};

const onNavigationChange = (
  prevState: NavigationState,
  currentState: NavigationState,
) => {
  const previousRouteName = getActiveRouteName(prevState);
  const currentRouteName = getActiveRouteName(currentState);

  if (previousRouteName !== currentRouteName) {
    analytics()
      .setCurrentScreen(currentRouteName, currentRouteName)
      .then()
      .catch();
    bugsnag.leaveBreadcrumb(currentRouteName, {type: 'navigation'});
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

const MainAppContainer = styled.View`
  flex: 1;
`;

export default MainApp;
