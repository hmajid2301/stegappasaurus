import {render, fireEvent} from '@testing-library/react-native';
import React from 'react';
import {Linking} from 'react-native';

import Licenses from '~/views/Settings/Sections/About/Licenses';

describe('Licenses: Functionality', () => {
  test('Open URL', () => {
    const {getAllByTestId} = render(
      <Licenses color="#17212d" background="#ffffff" />,
    );

    const spy = jest
      .spyOn(Linking, 'openURL')
      .mockImplementation(() => Promise.resolve(true));
    const licenseItems = getAllByTestId('license');
    const touchableOpacity = licenseItems[0].parentNode;

    fireEvent.press(touchableOpacity);
    expect(spy).toHaveBeenCalled();
  });
});
