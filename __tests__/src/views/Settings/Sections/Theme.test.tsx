import {render, fireEvent} from '@testing-library/react-native';
import React from 'react';

import {ITheme} from '~/constants/types';
import Themes from '~/views/Settings/Sections/Themes';
import AsyncStorage from '@react-native-community/async-storage';

const LIGHT_THEME: ITheme = {
  background: '#FFF',
  color: '#17212D',
  isDark: false,
};

describe('Theme: Functionality', () => {
  test('Switch on dark mode', async () => {
    const {getByTestId} = render(<Themes theme={LIGHT_THEME} />);

    const switchButton = getByTestId('switch');
    fireEvent.valueChange(switchButton, true);
    let isDark = await AsyncStorage.getItem('@Theme');
    expect(isDark).toBe('true');
  });
});
