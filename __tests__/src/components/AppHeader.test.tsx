import {render, fireEvent} from '@testing-library/react-native';
import React from 'react';

import {AppHeader} from '~/components/Header';

const navigation: any = {
  navigate: jest.fn(),
};
describe('AppHeader: Functionality', () => {
  test('Press home icon', () => {
    const {getByTestId} = render(
      <AppHeader navigation={navigation} primary="#009cff" />,
    );

    const spy = jest.spyOn(navigation, 'navigate');
    const homeIcon = getByTestId('home');
    fireEvent.press(homeIcon);
    expect(spy).toHaveBeenCalledWith('Main');
  });

  test('Press home icon: No navigation props', () => {
    const {getByTestId} = render(
      <AppHeader navigation={{} as any} primary="#009cff" />,
    );

    const homeIcon = getByTestId('home');
    try {
      fireEvent.press(homeIcon);
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});
