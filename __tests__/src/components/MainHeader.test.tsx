import {shallow} from 'enzyme';
import React from 'react';
import {NavigationScreenProp} from 'react-navigation';

import {MainHeader} from '~/components/Header';

jest.mock('react-navigation');
const navigation: NavigationScreenProp<any, any> = {
  openDrawer: jest.fn(),
  closeDrawer: jest.fn(),
  toggleDrawer: jest.fn(),
  dismiss: jest.fn(),
  goBack: jest.fn(),
  navigate: jest.fn(),
  getParam: jest.fn(),
  setParams: jest.fn(),
  emit: jest.fn(),
  addListener: jest.fn(),
  isFocused: jest.fn(),
  isFirstRouteInParent: jest.fn(),
  dangerouslyGetParent: jest.fn(),
  dispatch: jest.fn(),
  state: {
    routes: [
      {
        key: 'Encoding',
        isTransitioning: false,
        index: 1,
        routes: [
          {routeName: 'Main', key: 'id-1565732047195-0'},
          {
            params: {
              uri:
                'file:/data/user/0/com.stegappasaurus/cache/ImagePicker/a89493b5-e2a5-4546-80f3-4fb13d2461d8.png',
            },
            routeName: 'Message',
            key: 'id-1565732047195-2',
          },
        ],
        routeName: 'Encoding',
      },
      {
        key: 'Decoding',
        isTransitioning: false,
        index: 0,
        routes: [{routeName: 'Main', key: 'id-1565732047195-1'}],
        routeName: 'Decoding',
      },
    ],
    index: 0,
    isTransitioning: false,
    key: 'Home',
    routeName: 'Home',
  },
};

describe('MainHeader: Match snapshots', () => {
  test('1', () => {
    const component = shallow(
      <MainHeader
        navigation={navigation}
        primary="#009CFF"
        theme={{background: '#17212D', color: '#FFF', isDark: false}}
      />,
    );
    expect(component).toMatchSnapshot();
  });

  test('2', () => {
    const component = shallow(
      <MainHeader
        navigation={navigation}
        primary="#E88C0C"
        theme={{background: '#FFF', color: '#17212D', isDark: true}}
      />,
    );
    expect(component).toMatchSnapshot();
  });
});
