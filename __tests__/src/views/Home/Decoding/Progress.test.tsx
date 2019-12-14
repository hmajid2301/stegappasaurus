import {mount, shallow} from 'enzyme';
import React from 'react';

import Snackbar from '~/actions/Snackbar';
import Steganography from '~/actions/Steganography';
import Progress from '~/views/Home/Decoding/Progress';

jest.mock('~/actions/Steganography');

const navigate = {
  navigate: jest.fn(),
  getParam: jest.fn(),
  goBack: jest.fn(),
};

describe('Decoding Progress: Match Snapshots', () => {
  test('1', () => {
    const component = shallow(
      <Progress
        navigation={navigate as any}
        screenProps={{
          theme: {
            background: '#FFF',
            color: '#17212D',
            isDark: false,
          },
        }}
      />,
    );
    expect(component).toMatchSnapshot();
  });

  test('2', () => {
    const component = shallow(
      <Progress
        navigation={navigate as any}
        screenProps={{
          theme: {
            background: '#17212D',
            color: '#FFF',
            isDark: false,
          },
        }}
      />,
    );
    expect(component).toMatchSnapshot();
  });
});

describe('Decoding Progress: Functions', () => {
  let instance: React.Component<{}, {}, any>;
  beforeAll(() => {
    const component = mount(
      <Progress
        navigation={navigate as any}
        screenProps={{
          theme: {
            background: '#17212D',
            color: '#FFF',
            isDark: false,
          },
        }}
      />,
    );
    instance = component.instance();
  });

  test('decodeImage', async () => {
    const spy = jest.spyOn(Snackbar, 'show');
    (Steganography as jest.Mock).mockImplementation(() => ({
      decode: 'abcdef',
    }));
    await (instance as any).decodeImage();
    expect(spy).toHaveBeenCalled();
  });

  test('success', async () => {
    const spy = jest.fn();
    navigate['navigate'] = spy;
    await (instance as any).success();
    expect(spy).toHaveBeenCalled();
  });

  test('failed ', () => {
    const spy = jest.spyOn(Snackbar, 'show');
    (instance as any).failed();
    expect(spy).toHaveBeenCalled();
  });
});
