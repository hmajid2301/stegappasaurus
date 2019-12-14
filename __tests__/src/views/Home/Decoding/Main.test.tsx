import {mount, shallow} from 'enzyme';
import React from 'react';
import {NavigationScreenProp} from 'react-navigation';
import ImagePicker from 'react-native-image-picker';

import Snackbar from '~/actions/Snackbar';
import Main from '~/views/Home/Decoding/Main';

jest.mock('react-native-image-picker');
jest.mock('react-navigation');

const navigate: NavigationScreenProp<any, any> = {
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

describe('Decoding Main: Match Snapshots', () => {
  test('1', () => {
    const component = shallow(
      <Main
        navigation={navigate as any}
        screenProps={{
          theme: {
            background: '#FFF',
            color: '#17212D',
            isDark: false,
          },
        }}
      />,
    );
    expect(component).toMatchSnapshot();
  });

  test('2', () => {
    const component = shallow(
      <Main
        navigation={navigate as any}
        screenProps={{
          theme: {
            background: '#17212D',
            color: '#FFF',
            isDark: false,
          },
        }}
      />,
    );
    expect(component).toMatchSnapshot();
  });
});

describe('Decoding Main: Functions', () => {
  let instance: React.Component<{}, {}, any>;
  beforeAll(() => {
    const component = mount(
      <Main
        navigation={navigate as any}
        screenProps={{
          theme: {
            background: '#17212D',
            color: '#FFF',
            isDark: false,
          },
        }}
      />,
    );
    instance = component.instance();
  });

  test('getPhotoFromCameraRoll: photo taken', async () => {
    ImagePicker.launchImageLibrary = jest
      .fn()
      .mockImplementation((_, callback) =>
        callback({uri: 'file://pixels.jpg'}),
      );
    const spy = jest.spyOn(instance as any, 'selectPhotoToDecode');
    await (instance as any).getPhotoFromCameraRoll();
    expect(spy).toHaveBeenCalled();
  });

  test('getPhotoFromCameraRoll: error', async () => {
    (ImagePicker.launchImageLibrary as jest.Mock).mockImplementation(() => {
      throw new Error();
    });
    const spy = jest.spyOn(Snackbar, 'show');
    await (instance as any).getPhotoFromCameraRoll();
    expect(spy).toHaveBeenCalled();
  });

  test('selectPhotoToDecode', () => {
    const spy = jest.fn();
    navigate['navigate'] = spy;
    (instance as any).selectPhotoToDecode();
    expect(spy).toHaveBeenCalled();
  });
});
