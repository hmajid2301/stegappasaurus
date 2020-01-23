import {render, fireEvent} from '@testing-library/react-native';
import React from 'react';
import {Linking} from 'react-native';

import Licenses from '~/views/Setting/About/Licenses';

describe('Licenses: Functionality', () => {
  test('Open URL', () => {
    const {getAllByTestId} = render(<Licenses />);

    const spy = jest
      .spyOn(Linking, 'openURL')
      .mockImplementation(() => Promise.resolve(true));
    const licenseItems = getAllByTestId('license');
    const touchableOpacity = licenseItems[0].parentNode;

    fireEvent.press(touchableOpacity);
    expect(spy).toHaveBeenCalled();
  });
});
