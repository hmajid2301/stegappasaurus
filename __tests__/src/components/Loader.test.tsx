import {shallow} from 'enzyme';
import React from 'react';

import Loader from '~/components/Loader';

describe('Loader: Match snapshots', () => {
  test('1', () => {
    const component = shallow(<Loader loading={true} />);
    expect(component).toMatchSnapshot();
  });

  test('2', () => {
    const component = shallow(<Loader loading={false} />);
    expect(component).toMatchSnapshot();
  });
});
