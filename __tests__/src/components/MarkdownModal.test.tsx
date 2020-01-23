import {render, fireEvent} from '@testing-library/react-native';
import React from 'react';

import MarkdownModal from '~/components/MarkdownModal';
import privatePolicy from '~/data/privatePolicy';

describe('MarkdownModal: Functionality', () => {
  test('Open Modal', () => {
    const {getByText} = render(
      <MarkdownModal children={privatePolicy} name="Private Policy" />,
    );

    const text = getByText('Private Policy');
    const openModalTouchable = text.parentNode;
    fireEvent.press(openModalTouchable);
    const policyText = getByText('Haseeb Majid', {exact: false});
    expect(policyText).toBeTruthy();
  });

  test('Close Modal', () => {
    const {getByText, getByTestId} = render(
      <MarkdownModal children={privatePolicy} name="Private Policy" />,
    );

    const text = getByText('Private Policy');
    const openModalTouchable = text.parentNode;
    fireEvent.press(openModalTouchable);
    const closeIcon = getByTestId('close');
    fireEvent.press(closeIcon);
    const policyText = getByText('Private Policy');
    expect(policyText).toBeTruthy;
  });
});
