import {shallow} from 'enzyme';
import React from 'react';

import Support from '~/views/Settings/Sections/Support';
describe('Support: Match Snapshots', () => {
  test('1', () => {
    const component = shallow(<Support color="#17212D" background="#FFF" />);
    expect(component).toMatchSnapshot();
  });

  test('2', () => {
    const component = shallow(<Support background="#17212D" color="#FFF" />);
    expect(component).toMatchSnapshot();
  });
});
