import {render, fireEvent, wait} from '@testing-library/react-native';
import React from 'react';
import ImagePicker from 'react-native-image-picker';

import Snackbar from '~/actions/Snackbar';
import Main from '~/views/Home/Encoding/Main';

const navigation: any = {
  addListener: jest.fn(),
  navigate: jest.fn(),
  getParam: jest.fn(),
  state: {
    routeName: 'Main',
  },
};

describe('Encoding Main: Functionality', () => {
  test('Open Camera Pass', async () => {
    const {getByTestId} = render(<Main navigation={navigation} />);

    ImagePicker.launchCamera = jest.fn().mockImplementation((_, callback) =>
      callback({
        uri: 'file:///storage/emulated/0/Stegappasaurus/1575927505003.png',
      }),
    );

    const spy = jest.spyOn(navigation, 'navigate');
    const touchable = getByTestId('camera');
    fireEvent.press(touchable);

    await wait(() => {
      expect(spy).toHaveBeenCalledWith('Message', {
        uri: 'file:///storage/emulated/0/Stegappasaurus/1575927505003.png',
      });
    });
  });

  test('Open Camera Fail', async () => {
    const {getByTestId} = render(<Main navigation={navigation} />);

    ImagePicker.launchCamera = jest.fn().mockImplementation(() => {
      throw new Error();
    });

    const spy = jest.spyOn(Snackbar, 'show');
    const touchable = getByTestId('camera');
    fireEvent.press(touchable);

    await wait(() => {
      expect(spy).toHaveBeenCalledWith({
        text: 'This app does not have permission to access the camera.',
      });
    });
  });

  test('Open Camera Roll Pass', async () => {
    const {getByTestId} = render(<Main navigation={navigation} />);

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
      expect(spy).toHaveBeenCalledWith('Message', {
        uri: 'file:///storage/emulated/0/Stegappasaurus/1575927505003.png',
      });
    });
  });

  test('Open Camera Roll Fail', async () => {
    const {getByTestId} = render(<Main navigation={navigation} />);

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

  test('Open thecatapi Pass', async () => {
    const {getByTestId} = render(<Main navigation={navigation} />);

    (fetch as jest.Mock).mockReturnValue({
      json: jest.fn().mockReturnValue({
        status: 200,
        data: [
          {
            breeds: 'bengal',
            id: '1',
            url: 'www.example.com/cat.png',
            width: 100,
            height: 100,
          },
        ],
      }),
    });

    const spy = jest.spyOn(navigation, 'navigate');
    const touchable = getByTestId('catapi');
    fireEvent.press(touchable);

    await wait(() => {
      expect(spy).toHaveBeenCalledWith('Message', {
        uri: 'file:///storage/emulated/0/Stegappasaurus/1575927505003.png',
      });
    });
  });

  test('Open thecatapi Fail', async () => {
    const {getByTestId} = render(<Main navigation={navigation} />);

    (fetch as jest.Mock).mockReturnValue({
      json: jest.fn().mockReturnValue({
        status: 404,
      }),
    });

    const spy = jest.spyOn(Snackbar, 'show');
    const touchable = getByTestId('cameraroll');
    fireEvent.press(touchable);

    await wait(() => {
      expect(spy).toHaveBeenCalledWith({
        text:
          "Failed to get a cat photo, check you're connected to the internet.",
      });
    });
  });
});
