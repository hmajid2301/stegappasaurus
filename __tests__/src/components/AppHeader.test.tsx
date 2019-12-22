import {render, fireEvent} from '@testing-library/react-native';
import React from 'react';

import {AppHeader} from '~/components/Header';
import {ITheme} from '~/constants/types';

const LIGHT_THEME: ITheme = {
  background: '#ffffff',
  color: '#17212d',
  isDark: false,
};

const DARK_THEME: ITheme = {
  background: '#17212d',
  color: '#ffffff',
  isDark: false,
};

const navigation: any = {
  navigate: jest.fn(),
};
describe('AppHeader: Functionality', () => {
  test('Press home icon', () => {
    const {getByTestId} = render(
      <AppHeader
        navigation={navigation}
        primary="#009cff"
        theme={LIGHT_THEME}
      />,
    );

    const spy = jest.spyOn(navigation, 'navigate');
    const homeIcon = getByTestId('home');
    fireEvent.press(homeIcon);
    expect(spy).toHaveBeenCalledWith('Main');
  });

  test('Press home icon: No navigation props', () => {
    const {getByTestId} = render(
      <AppHeader navigation={{} as any} primary="#009cff" theme={DARK_THEME} />,
    );

    const homeIcon = getByTestId('home');
    try {
      fireEvent.press(homeIcon);
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});
