import CameraRoll, {PhotoIdentifier} from '@react-native-community/cameraroll';
import React from 'react';
import {Dimensions, FlatList, View} from 'react-native';
import styled from 'styled-components/native';

interface Props {
  onPhotoPress: (uri: string) => any;
}

interface State {
  finished: boolean;
  lastPhoto: string;
  photos: PhotoIdentifier[];
  refreshing: boolean;
  seen: Set<string>;
}

export default class PhotoAlbumList extends React.Component<Props, State> {
  public state = {
    finished: false,
    lastPhoto: '',
    photos: [],
    refreshing: false,
    seen: new Set<string>(),
  };

  public render() {
    return (
      <FlatList
        data={this.padData(this.state.photos)}
        keyExtractor={this.setKey}
        numColumns={3}
        onEndReached={this.getMorePhotos}
        onRefresh={this.handleRefresh}
        renderItem={this.renderPhotos}
        refreshing={this.state.refreshing}
      />
    );
  }

  public async componentDidMount() {
    await this.getMorePhotos();
  }

  private setKey = (item: PhotoIdentifier) => item.node.image.uri;

  private padData(data: PhotoIdentifier[], itemsPerColumn = 3) {
    const itemsLeftOver = data.length % itemsPerColumn;
    const elementsToAdd = itemsLeftOver === 0 ? 0 : 3 - itemsLeftOver;

    const emptyImage = {
      node: {
        image: {
          uri: '',
        },
      },
    };
    for (let i = 0; i < elementsToAdd; i += 1) {
      data.push(emptyImage as any);
    }

    return data;
  }

  private getMorePhotos = async () => {
    if (!this.state.finished) {
      const photosData = await CameraRoll.getPhotos({
        after: this.state.lastPhoto ? this.state.lastPhoto : undefined,
        first: 15,
      });
      const {
        end_cursor: endCursor,
        has_next_page: hasNextPage,
      } = photosData.page_info;
      const {seen, newPhotos} = this.uniqueAssets(photosData.edges);

      this.setState({
        finished: !hasNextPage,
        lastPhoto: endCursor as string,
        photos: [...this.state.photos, ...newPhotos],
        seen,
      });
    }
  };

  private uniqueAssets(photosData: PhotoIdentifier[]) {
    const {seen} = this.state;
    const newPhotos: PhotoIdentifier[] = [];

    for (const photo of photosData) {
      const uri = photo.node.image.uri;
      if (!seen.has(uri)) {
        seen.add(uri);
        newPhotos.push(photo);
      }
    }

    return {seen, newPhotos};
  }

  private handleRefresh = () => {
    this.setState(
      {
        finished: false,
        lastPhoto: '',
        photos: [],
        refreshing: true,
        seen: new Set<string>(),
      },
      () => {
        this.getMorePhotos()
          .then()
          .catch();
      },
    );
    this.setState({refreshing: false});
  };

  private renderPhotos = ({item}: {item: PhotoIdentifier}) => {
    if (item.node.image.filename === '') {
      return <View />;
    }

    return (
      <TouchablePhoto
        onPress={this.props.onPhotoPress.bind(this, item.node.image.uri)}
        accessibilityLabel="photo">
        <AlbumImage source={{uri: item.node.image.uri}} />
      </TouchablePhoto>
    );
  };
}

const pageWidth = Dimensions.get('window').width;

const TouchablePhoto = styled.TouchableOpacity`
  flex: 1;
`;

const AlbumImage = styled.Image`
  height: ${pageWidth / 3};
  margin-left: 2;
  margin-top: 2;
`;
