import {mount, shallow} from 'enzyme';
import React from 'react';

import Modal from '~/components/Modal';
import AboutUs from '~/views/Settings/Sections/About/AboutUs';

describe('odal: Match snapshots', () => {
  test('1', () => {
    const component = shallow(
      <Modal background="#17212D" color="#FFF" name="About Us">
        <AboutUs background="#17212D" color="#FFF" />
      </Modal>,
    );
    expect(component).toMatchSnapshot();
  });
});

describe('Modal Props', () => {
  test('Modal: onRequestClose', () => {
    const component = mount(
      <Modal background="#17212D" color="#FFF" name="FAQ">
        <AboutUs background="#17212D" color="#FFF" />
      </Modal>,
    );

    (component
      .find('Modal')
      .first()
      .props() as any).onRequestClose();
    expect(component.state('isVisible')).toEqual(false);
  });

  test('TouchableOpacity: onPress', () => {
    const component = mount(
      <Modal background="#17212D" color="#FFF" name="FAQ">
        <AboutUs background="#17212D" color="#FFF" />
      </Modal>,
    );

    (component
      .find('TouchableOpacity')
      .first()
      .props() as any).onPress();
    expect(component.state('isVisible')).toEqual(true);
  });

  test('TouchableOpacity2: onPress', () => {
    const component = mount(
      <Modal background="#17212D" color="#FFF" name="FAQ">
        <AboutUs background="#17212D" color="#FFF" />
      </Modal>,
    );

    (component
      .find('TouchableOpacity')
      .last()
      .props() as any).onPress();
    expect(component.state('isVisible')).toEqual(true);
  });
});
