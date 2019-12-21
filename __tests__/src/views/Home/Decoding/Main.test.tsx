import {render, fireEvent, wait} from '@testing-library/react-native';
import React from 'react';
import ImagePicker from 'react-native-image-picker';

import Snackbar from '~/actions/Snackbar';
import {ITheme} from '~/constants/types';
import Main from '~/views/Home/Decoding/Main';

const LIGHT_THEME: ITheme = {
  background: '#FFF',
  color: '#17212D',
  isDark: false,
};

const DARK_THEME: ITheme = {
  background: '#17212D',
  color: '#FFF',
  isDark: false,
};

const navigation: any = {
  addListener: jest.fn(),
  navigate: jest.fn(),
  getParam: jest.fn(),
  state: {
    routeName: 'Main',
  },
};

describe('Decoding Main: Functionality', () => {
  test('Open Camera Roll Pass', async () => {
    const {getByTestId} = render(
      <Main navigation={navigation} screenProps={{theme: DARK_THEME}} />,
    );

    ImagePicker.launchImageLibrary = jest
      .fn()
      .mockImplementation((_, callback) =>
        callback({
          uri: 'file:///storage/emulated/0/Stegappasaurus/1575927505003.png',
        }),
      );

    const spy = jest.spyOn(navigation, 'navigate');
    const touchable = getByTestId('cameraroll');
    fireEvent.press(touchable);

    await wait(() => {
      expect(spy).toHaveBeenCalled();
    });
  });

  test('Open Camera Roll Fail', async () => {
    const {getByTestId} = render(
      <Main navigation={navigation} screenProps={{theme: LIGHT_THEME}} />,
    );

    ImagePicker.launchImageLibrary = jest.fn().mockImplementation(() => {
      throw new Error();
    });

    const spy = jest.spyOn(Snackbar, 'show');
    const touchable = getByTestId('cameraroll');
    fireEvent.press(touchable);

    await wait(() => {
      expect(spy).toHaveBeenCalledWith({
        text: 'This app does not have permission to access the camera roll.',
      });
    });
  });
});
