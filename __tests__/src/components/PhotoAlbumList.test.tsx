import {shallow, ShallowWrapper} from 'enzyme';
import React from 'react';

import PhotoAlbumList from '~/components/PhotoAlbumList';

describe('PhotoAlbumList: Match snapshots', () => {
  test('1', () => {
    const component = shallow(
      <PhotoAlbumList onPhotoPress={() => jest.fn()} />,
    );
    expect(component).toMatchSnapshot();
  });

  test('2', () => {
    const component = shallow(
      <PhotoAlbumList onPhotoPress={() => jest.fn()} />,
    );
    expect(component).toMatchSnapshot();
  });
});

describe('PhotoAlbumList: Functions', () => {
  let instance: React.Component<{}, {}, any>;
  let component: ShallowWrapper<
    any,
    Readonly<{}>,
    React.Component<{}, {}, any>
  >;

  beforeAll(() => {
    component = shallow(<PhotoAlbumList onPhotoPress={() => jest.fn()} />);
    instance = component.instance();
  });

  let testData: any = [
    {
      data: [],
      expected: [],
    },
    {
      data: [{node: {image: {uri: 'a.png'}}}],
      expected: [
        {node: {image: {uri: 'a.png'}}},
        {node: {image: {uri: ''}}},
        {node: {image: {uri: ''}}},
      ],
    },
    {
      data: [{node: {image: {uri: 'a.png'}}}, {node: {image: {uri: 'b.png'}}}],
      expected: [
        {node: {image: {uri: 'a.png'}}},
        {node: {image: {uri: 'b.png'}}},
        {node: {image: {uri: ''}}},
      ],
    },
    {
      data: [
        {node: {image: {uri: 'a.png'}}},
        {node: {image: {uri: 'b.png'}}},
        {node: {image: {uri: 'c.png'}}},
      ],
      expected: [
        {node: {image: {uri: 'a.png'}}},
        {node: {image: {uri: 'b.png'}}},
        {node: {image: {uri: 'c.png'}}},
      ],
    },
  ];
  test.each(testData)('padData', ({data, expected}) => {
    const paddedData = (instance as any).padData(data);
    expect(paddedData).toEqual(expected);
  });

  testData = {
    edges: [
      {node: {image: {uri: 'a.png'}}},
      {node: {image: {uri: 'b.png'}}},
      {node: {image: {uri: 'c.png'}}},
    ],
    page_info: {
      end_curosr: '1234',
      has_next_page: true,
    },
  };
});
