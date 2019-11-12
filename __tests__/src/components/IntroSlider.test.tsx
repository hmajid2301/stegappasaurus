import {shallow} from 'enzyme';
import React from 'react';

import IntroSlider from '~/components/IntroSlider';
import {slides} from '~/data';

describe('IntroSlider: Match snapshots', () => {
  test('1', () => {
    const component = shallow(
      <IntroSlider slides={slides} onDone={() => null} />,
    );
    expect(component).toMatchSnapshot();
  });

  test('2', () => {
    const component = shallow(<IntroSlider slides={[]} onDone={() => null} />);
    expect(component).toMatchSnapshot();
  });
});
