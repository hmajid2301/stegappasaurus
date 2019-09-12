import { shallow, ShallowWrapper } from "enzyme";
import React from "react";

import PhotoAlbumList from "~/components/PhotoAlbumList";

describe("PhotoAlbumList: Match snapshots", () => {
  test("1", () => {
    const component = shallow(
      <PhotoAlbumList onPhotoPress={() => jest.fn()} />
    );
    expect(component).toMatchSnapshot();
  });

  test("2", () => {
    const data = {
      assets: [
        {
          mediaType: "photo",
          modificationTime: 1561754347000,
          creationTime: 1561754346927,
          width: 480,
          uri:
            "file:///storage/emulated/0/DCIM/Camera/IMG_20190628_163906_2.jpg",
          id: "40",
          filename: "IMG_20190628_163906_2.jpg",
          albumId: "-1739773001",
          height: 480,
          duration: 0
        }
      ],
      endCursor: "24"
    };

    const component = shallow(
      <PhotoAlbumList onPhotoPress={() => jest.fn()} />
    );
    expect(component).toMatchSnapshot();
  });
});

describe("PhotoAlbumList: Functions", () => {
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
      expected: []
    },
    {
      data: [{ uri: "a.png" }],
      expected: [{ uri: "a.png" }, { uri: "" }, { uri: "" }]
    },
    {
      data: [{ uri: "a.png" }, { uri: "b.png" }],
      expected: [{ uri: "a.png" }, { uri: "b.png" }, { uri: "" }]
    },
    {
      data: [{ uri: "a.png" }, { uri: "b.png" }, { uri: "c.png" }],
      expected: [{ uri: "a.png" }, { uri: "b.png" }, { uri: "c.png" }]
    }
  ];
  test.each(testData)("padData", ({ data, expected }) => {
    const paddedData = (instance as any).padData(data);
    expect(paddedData).toEqual(expected);
  });

  testData = {
    assets: [
      {
        mediaType: "photo",
        modificationTime: 1561754349000,
        creationTime: 1561754349228,
        width: 480,
        uri: "file:///storage/emulated/0/DCIM/Camera/IMG_20190628_163909.jpg",
        id: "47",
        filename: "IMG_20190628_163909.jpg",
        albumId: "-1739773001",
        height: 480,
        duration: 0
      },
      {
        mediaType: "photo",
        modificationTime: 1561754349000,
        creationTime: 1561754348941,
        width: 480,
        uri: "file:///storage/emulated/0/DCIM/Camera/IMG_20190628_163908_2.jpg",
        id: "46",
        filename: "IMG_20190628_163908_2.jpg",
        albumId: "-1739773001",
        height: 480,
        duration: 0
      },
      {
        mediaType: "photo",
        modificationTime: 1561754348000,
        creationTime: 1561754348528,
        width: 480,
        uri: "file:///storage/emulated/0/DCIM/Camera/IMG_20190628_163908_1.jpg",
        id: "45",
        filename: "IMG_20190628_163908_1.jpg",
        albumId: "-1739773001",
        height: 480,
        duration: 0
      },
      {
        mediaType: "photo",
        modificationTime: 1561754348000,
        creationTime: 1561754348176,
        width: 480,
        uri: "file:///storage/emulated/0/DCIM/Camera/IMG_20190628_163908.jpg",
        id: "44",
        filename: "IMG_20190628_163908.jpg",
        albumId: "-1739773001",
        height: 480,
        duration: 0
      },
      {
        mediaType: "photo",
        modificationTime: 1561754348000,
        creationTime: 1561754347902,
        width: 480,
        uri: "file:///storage/emulated/0/DCIM/Camera/IMG_20190628_163907_2.jpg",
        id: "43",
        filename: "IMG_20190628_163907_2.jpg",
        albumId: "-1739773001",
        height: 480,
        duration: 0
      },
      {
        mediaType: "photo",
        modificationTime: 1561754347000,
        creationTime: 1561754347517,
        width: 480,
        uri: "file:///storage/emulated/0/DCIM/Camera/IMG_20190628_163907_1.jpg",
        id: "42",
        filename: "IMG_20190628_163907_1.jpg",
        albumId: "-1739773001",
        height: 480,
        duration: 0
      },
      {
        mediaType: "photo",
        modificationTime: 1561754347000,
        creationTime: 1561754347328,
        width: 480,
        uri: "file:///storage/emulated/0/DCIM/Camera/IMG_20190628_163907.jpg",
        id: "41",
        filename: "IMG_20190628_163907.jpg",
        albumId: "-1739773001",
        height: 480,
        duration: 0
      },
      {
        mediaType: "photo",
        modificationTime: 1561754347000,
        creationTime: 1561754346927,
        width: 480,
        uri: "file:///storage/emulated/0/DCIM/Camera/IMG_20190628_163906_2.jpg",
        id: "40",
        filename: "IMG_20190628_163906_2.jpg",
        albumId: "-1739773001",
        height: 480,
        duration: 0
      },
      {
        uri: ""
      }
    ],
    endCursor: "24"
  };

  test("morePhotosFromCameraRoll", async () => {
    component.setState({ photos: [] });
    await (instance as any).morePhotosFromCameraRoll();
    expect(component.state("lastPhoto")).toEqual("24");
    expect(component.state("photos")).toEqual(testData.assets);
  });

  test("renderPhotosFromCameraRoll", () => {
    component.setState({ photos: [] });
    const snap = (instance as any).renderPhotosFromCameraRoll({
      item: testData.assets[0]
    });
    const snap2 = (instance as any).renderPhotosFromCameraRoll({
      item: testData.assets[8]
    });
    expect(snap).toMatchSnapshot();
    expect(snap2).toMatchSnapshot();
  });

  test("getPhotosListFromAlbum: granted", async () => {
    component.setState({ photos: [], refreshing: true });
    await (instance as any).getPhotosFromCameraRoll();
    expect(component.state("lastPhoto")).toEqual("24");
    expect(component.state("photos")).toEqual(testData.assets);
    expect(component.state("refreshing")).toEqual(false);
  });
});
