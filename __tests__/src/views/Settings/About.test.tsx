import {render, fireEvent} from '@testing-library/react-native';
import React from 'react';
import {Linking} from 'react-native';

import About from '~/views/Setting/About';
import Snackbar from '~/actions/Snackbar';

describe('About: Functionality', () => {
  test('Open Modal: About Us', () => {
    const {getByText} = render(<About />);

    const text = getByText('About Us');
    const openModalTouchable = text.parentNode;
    fireEvent.press(openModalTouchable);
    const aboutUs = getByText('Stegappasaurus is a free mobile application', {
      exact: false,
    });
    expect(aboutUs).toBeTruthy();
  });

  test('Open Email: Success', () => {
    const {getByText} = render(<About />);

    const spy = jest
      .spyOn(Linking, 'openURL')
      .mockImplementation(() => Promise.resolve(true));

    const text = getByText('Email');
    const openEmailTouchable = text.parentNode;
    fireEvent.press(openEmailTouchable);
    expect(spy).toHaveBeenCalledWith(
      'mailto:me@haseebmajid.dev?subject=Stegappasaurus',
    );
  });

  test('Open Email: Error', () => {
    const {getByText} = render(<About />);

    jest.spyOn(Linking, 'openURL').mockImplementation(() => {
      throw new Error();
    });

    const spy = jest.spyOn(Snackbar, 'show').mockImplementation(() => true);

    const text = getByText('Email');
    const openEmailTouchable = text.parentNode;
    fireEvent.press(openEmailTouchable);
    expect(spy).toHaveBeenCalled();
  });
});
