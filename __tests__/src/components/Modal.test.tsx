import {render, fireEvent} from '@testing-library/react-native';
import React from 'react';

import Modal from '~/components/Modal';
import Licenses from '~/views/Settings/Sections/About/Licenses';

describe('Modal: Functionality', () => {
  test('Open Modal', () => {
    const {getByText, getByTestId} = render(
      <Modal
        background="#17212D"
        color="#FFF"
        children={<Licenses background="#17212D" color="#FFF" />}
        name="Licenses"
      />,
    );

    const text = getByText('Licenses');
    const openModalTouchable = text.parentNode;
    fireEvent.press(openModalTouchable);
    const closeIcon = getByTestId('close');
    expect(closeIcon).toBeTruthy();
  });

  test('Close Modal', () => {
    const {getByText, getByTestId} = render(
      <Modal
        background="#17212D"
        color="#FFF"
        children={<Licenses background="#17212D" color="#FFF" />}
        name="Licenses"
      />,
    );

    let text = getByText('Licenses');
    const openModalTouchable = text.parentNode;
    fireEvent.press(openModalTouchable);
    const closeIcon = getByTestId('close');
    fireEvent.press(closeIcon);
    text = getByText('Licenses');
    expect(text).toBeTruthy;
  });
});
