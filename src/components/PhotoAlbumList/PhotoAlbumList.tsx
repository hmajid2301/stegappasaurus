import CameraRoll, {PhotoIdentifier} from '@react-native-community/cameraroll';
import React from 'react';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';

import styles from './styles';

interface IProps {
  onPhotoPress: (uri: string) => any;
}

interface IState {
  finished: boolean;
  lastPhoto: string | null;
  photos: PhotoIdentifier[];
  refreshing: boolean;
  seen: Set<string>;
}

export default class PhotoAlbumList extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      finished: false,
      lastPhoto: null,
      photos: [],
      refreshing: false,
      seen: new Set(),
    };
  }

  public render() {
    return (
      <View>
        <FlatList
          data={this.padData(this.state.photos)}
          keyExtractor={this.setKey}
          numColumns={3}
          onEndReached={this.getMorePhotos}
          onRefresh={this.handleRefresh}
          renderItem={this.renderPhotos}
          refreshing={this.state.refreshing}
        />
      </View>
    );
  }

  public async componentDidMount() {
    await this.getMorePhotos();
  }

  private setKey = (item: PhotoIdentifier, _: number) => {
    return item.node.image.uri;
  };

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
      const {end_cursor, has_next_page} = photosData.page_info;
      const {seen, newPhotos} = this.uniqueAssets(photosData.edges);

      this.setState({
        finished: !has_next_page,
        lastPhoto: end_cursor as string,
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

  private handleRefresh = async () => {
    this.setState(
      {
        finished: false,
        lastPhoto: null,
        photos: [],
        refreshing: true,
        seen: new Set(),
      },
      async () => this.getMorePhotos(),
    );
    this.setState({refreshing: false});
  };

  private renderPhotos = ({item}: {item: PhotoIdentifier}) => {
    if (item.node.image.filename === '') {
      return <View />;
    }

    return (
      <TouchableOpacity
        onPress={this.props.onPhotoPress.bind(this, item.node.image.uri)}
        style={styles.photoButton}>
        <Image source={{uri: item.node.image.uri}} style={styles.photos} />
      </TouchableOpacity>
    );
  };
}
