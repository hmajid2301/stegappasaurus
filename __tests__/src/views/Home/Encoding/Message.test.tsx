import {render, fireEvent} from '@testing-library/react-native';
import React from 'react';

import Snackbar from '~/actions/Snackbar';
import Message from '~/views/Home/Encoding/Message';

const navigation: any = {
  addListener: jest.fn(),
  navigate: jest.fn(),
  getParam: jest.fn().mockReturnValue({
    uri: 'file:///storage/emulated/0/Stegappasaurus/1575927505003.png',
  }),
  state: {
    routeName: 'Message',
  },
};

describe('Encoding Message: Functionality', () => {
  test('Message: Hello', () => {
    const {getByTestId} = render(<Message navigation={navigation} />);

    const spy = jest.spyOn(navigation, 'navigate');

    const input = getByTestId('message');
    fireEvent.changeText(input, 'Hello!');
    fireEvent.submitEditing(input);
    expect(spy).toHaveBeenCalledWith('Progress', {
      message: 'Hello!',
      uri: {uri: 'file:///storage/emulated/0/Stegappasaurus/1575927505003.png'},
    });
  });

  test('Message: Empty', () => {
    const {getByTestId} = render(<Message navigation={navigation} />);

    const spy = jest.spyOn(Snackbar, 'show');

    const input = getByTestId('message');
    fireEvent.changeText(input, '');
    fireEvent.submitEditing(input);
    expect(spy).toHaveBeenCalledWith({text: 'Message cannot be empty'});
  });
});
