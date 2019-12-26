import {render, wait} from '@testing-library/react-native';
import React from 'react';

import Steganography from '~/actions/Steganography';
import Snackbar from '~/actions/Snackbar';
import Progress from '~/views/Home/Decoding/Progress';

jest.mock('~/actions/Steganography');

const navigation: any = {
  addListener: jest.fn(),
  navigate: jest.fn(),
  getParam: jest.fn().mockReturnValue({
    uri: 'file:///storage/emulated/0/Stegappasaurus/1575927505003.png',
  }),
  state: {
    routeName: 'Progress',
  },
};

describe('Decoding Progress: Functionality', () => {
  test('Success', async () => {
    Steganography.prototype.decode = jest.fn().mockResolvedValue('Hello!');

    const spy = jest.spyOn(navigation, 'navigate');

    render(<Progress navigation={navigation} />);

    await wait(() => {
      expect(spy).toHaveBeenCalledWith('Message', {
        message: 'Hello!',
        uri: {
          uri: 'file:///storage/emulated/0/Stegappasaurus/1575927505003.png',
        },
      });
    });
  });

  test('Failed', async () => {
    Steganography.prototype.decode = jest.fn().mockImplementation(() => {
      throw new Error();
    });

    const snackSpy = jest.spyOn(Snackbar, 'show');
    const navSpy = jest.spyOn(navigation, 'navigate');

    render(<Progress navigation={navigation} />);

    await wait(() => {
      expect(snackSpy).toHaveBeenCalledWith({
        text: 'Failed to decode image, please try again.',
      });

      expect(navSpy).toHaveBeenCalledWith('Main');
    });
  });
});
