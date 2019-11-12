import {shallow} from 'enzyme';
import React from 'react';

import Logo from '~/components/Logo';

describe('Logo: Match snapshots', () => {
  test('1', () => {
    const component = shallow(<Logo color="#17212D" isDark={true} />);
    expect(component).toMatchSnapshot();
  });

  test('2', () => {
    const component = shallow(<Logo color="#FFF" isDark={false} />);
    expect(component).toMatchSnapshot();
  });
});
