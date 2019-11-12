import {shallow} from 'enzyme';
import React from 'react';

import AboutUs from '~/views/Settings/Sections/About/AboutUs';

describe('AboutUs: Match Snapshots', () => {
  test('1', () => {
    const component = shallow(<AboutUs color="#17212D" background="#FFF" />);
    expect(component).toMatchSnapshot();
  });

  test('2', () => {
    const component = shallow(<AboutUs background="#17212D" color="#FFF" />);
    expect(component).toMatchSnapshot();
  });
});
