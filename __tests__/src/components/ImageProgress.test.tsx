import {render, fireEvent} from '@testing-library/react-native';
import React from 'react';

import ImageProgress from '~/components/ImageProgress';

describe('ImageProgress: Functionality', () => {
  test('Action called on press', () => {
    const action = {
      func: jest.fn(),
    };

    const {getByTestId} = render(
      <ImageProgress
        background="#17212d"
        icon={{
          color: '#ffffff',
          name: 'share',
          size: 130,
          type: 'font-awesome',
        }}
        onPress={action.func}
        photo="file://example-uri.png"
        progress={20}
        primaryColor="#009cff"
      />,
    );

    const touchable = getByTestId('action');
    fireEvent.press(touchable);
    expect(action.func).toHaveBeenCalled();
  });
});
