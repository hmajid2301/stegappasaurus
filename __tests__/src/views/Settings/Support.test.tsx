import {render, fireEvent} from '@testing-library/react-native';
import React from 'react';

import Support from '~/views/Setting/Support';

describe('Support: Functionality', () => {
  test('Open Modal: Private Policy', () => {
    const {getByText} = render(<Support />);

    const text = getByText('Private Policy');
    const openModalTouchable = text.parentNode;
    fireEvent.press(openModalTouchable);
    const policyText = getByText('Haseeb Majid', {exact: false});
    expect(policyText).toBeTruthy();
  });

  test('Open Modal: Terms of Use', () => {
    const {getByText} = render(<Support />);

    const text = getByText('Terms of Use');
    const openModalTouchable = text.parentNode;
    fireEvent.press(openModalTouchable);
    const termsText = getByText('Last revised on 01/02/2019', {exact: false});
    expect(termsText).toBeTruthy();
  });

  test('Open Modal: License', () => {
    const {getByText} = render(<Support />);

    const text = getByText('License');
    const openModalTouchable = text.parentNode;
    fireEvent.press(openModalTouchable);
    const termsText = getByText('1. Definitions', {exact: false});
    expect(termsText).toBeTruthy();
  });
});
