import {shallow} from 'enzyme';
import React from 'react';

import MarkdownModal from '~/components/MarkdownModal';
import privatePolicy from '~/data/privatePolicy';

describe('MarkdownModal: Match snapshots', () => {
  test('1', () => {
    const component = shallow(
      <MarkdownModal background="#17212D" color="#FFF" name="Private Policy">
        {privatePolicy}
      </MarkdownModal>,
    );
    expect(component).toMatchSnapshot();
  });
});
