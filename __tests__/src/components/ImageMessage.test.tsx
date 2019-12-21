import {render, fireEvent} from '@testing-library/react-native';
import React from 'react';

import ImageMessage from '~/components/ImageMessage';

let navigation: any = {
  navigate: jest.fn(),
  addListener: jest.fn(),
};

describe('ImageMessage: Functionality', () => {
  test('Change Text', () => {
    const {getByTestId} = render(
      <ImageMessage
        action={() => {
          console.log('Hello');
        }}
        navigation={navigation}
        editable={true}
        photo="file://example-uri.png"
      />,
    );

    const messageInput = getByTestId('message');
    expect(fireEvent.changeText(messageInput, 'Encode Message')).toBeTruthy();
  });
});
