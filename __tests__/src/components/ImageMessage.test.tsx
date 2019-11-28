import {mount, shallow} from 'enzyme';
import React from 'react';
import {NavigationScreenProp} from 'react-navigation';

import ImageMessage from '~/components/ImageMessage';

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

describe('ImageMessage: Match snapshots', () => {
  test('1', () => {
    const component = shallow(
      <ImageMessage
        action={() => null}
        navigation={navigation}
        editable={true}
        photo={'images.png'}
      />,
    );
    expect(component).toMatchSnapshot();
  });

  test('2', () => {
    const component = shallow(
      <ImageMessage
        action={() => null}
        navigation={navigation}
        editable={true}
        message="Hello"
        photo={'images.png'}
      />,
    );
    expect(component).toMatchSnapshot();
  });
});

describe('ImageMessage Props', () => {
  test('onChangeText', () => {
    const component = mount(
      <ImageMessage
        action={() => {
          console.log('Test');
        }}
        navigation={navigation}
        editable={true}
        photo={'images.png'}
      />,
    );

    (component
      .find('TextInput')
      .first()
      .props() as any).onChangeText('Hello');

    expect(component.state('message')).toEqual('Hello');
  });

  test('onSubmitEditting', () => {
    const action = jest.fn();
    const component = mount(
      <ImageMessage
        action={action}
        navigation={navigation as any}
        editable={true}
        photo={'images.png'}
      />,
    );

    (component
      .find('TextInput')
      .first()
      .props() as any).onSubmitEditing('Hello');

    expect(action).toHaveBeenCalled();
  });
});
