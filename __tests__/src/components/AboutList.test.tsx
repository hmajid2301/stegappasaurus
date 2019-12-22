import {render, fireEvent} from '@testing-library/react-native';
import React from 'react';
import {Linking} from 'react-native';
import Rate from 'react-native-rate';

import AboutList from '~/components/AboutList';
import {about} from '~/data';

jest.mock('react-native-rate');

describe('AboutList: Functionality', () => {
  test('Open URL', () => {
    const {getByText} = render(
      <AboutList items={about} color="#17212d" backgroundColor="#ffffff" />,
    );

    const spy = jest
      .spyOn(Linking, 'openURL')
      .mockImplementation(() => Promise.resolve(true));
    const buyCoffeeText = getByText('Buy me a coffee');
    const touchableOpacity = buyCoffeeText.parentNode;
    fireEvent.press(touchableOpacity);

    expect(spy).toHaveBeenCalledWith('https://www.paypal.me/hmajid2301');
  });

  test('Open app store review', () => {
    const {getByText} = render(
      <AboutList items={about} color="#17212d" backgroundColor="#ffffff" />,
    );

    const spy = jest
      .spyOn(Rate, 'rate')
      .mockImplementation(() => Promise.resolve(true));
    const rateAppText = getByText('Rate the app');
    const touchableOpacity = rateAppText.parentNode;
    fireEvent.press(touchableOpacity);

    expect(spy).toHaveBeenCalled();
  });
});
