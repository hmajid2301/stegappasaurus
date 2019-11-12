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
}

export default class PhotoAlbumList extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      finished: false,
      lastPhoto: null,
      photos: [],
      refreshing: false,
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

  private setKey = (item: any, _: number) => {
    return item.node.image.uri;
  };

  private padData(data: PhotoIdentifier[]) {
    const itemsPerColumns = 3;
    const itemsLeftOver = data.length % itemsPerColumns;
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
      const photos = await CameraRoll.getPhotos({
        after: this.state.lastPhoto ? this.state.lastPhoto : undefined,
        first: 15,
      });
      const {end_cursor, has_next_page} = photos.page_info;

      this.setState({
        finished: has_next_page,
        lastPhoto: end_cursor as string,
        photos: [...this.state.photos, ...photos.edges],
      });
    }
  };

  private handleRefresh = async () => {
    this.setState({refreshing: true, finished: false, photos: []});
    await this.getMorePhotos();
    this.setState({refreshing: false});
  };

  private renderPhotos = ({item}: {item: PhotoIdentifier}) => {
    if (item.node.image.uri === '') {
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
