import {render, fireEvent} from '@testing-library/react-native';
import React from 'react';

import Themes from '~/views/Setting/Themes';
import AsyncStorage from '@react-native-community/async-storage';

describe('Theme: Functionality', () => {
  test('Switch on dark mode', async () => {
    const {getByTestId} = render(<Themes />);

    const switchButton = getByTestId('switch');
    fireEvent.valueChange(switchButton, true);
    let isDark = await AsyncStorage.getItem('@Theme');
    expect(isDark).toBe('true');
  });
});
