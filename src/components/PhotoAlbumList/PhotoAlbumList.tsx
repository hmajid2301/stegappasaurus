import CameraRoll, {
  PhotoIdentifier
} from "@react-native-community/cameraroll";
import React from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";

import styles from "./styles";

interface IProps {
  onPhotoPress: (uri: string) => any;
}

interface IState {
  lastPhoto: string;
  photos: PhotoIdentifier[];
  refreshing: boolean;
}

export default class PhotoAlbumList extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      lastPhoto: "",
      photos: [],
      refreshing: false
    };
  }

  public render() {
    return (
      <View>
        <FlatList
          data={this.padData(this.state.photos)}
          keyExtractor={(item, index) => item.node.image.uri + index}
          numColumns={3}
          onEndReached={async () => {
            await this.getPhotosFromCameraRoll();
          }}
          onRefresh={this.handleRefresh}
          renderItem={this.renderPhotosFromCameraRoll}
          refreshing={this.state.refreshing}
        />
      </View>
    );
  }

  public async componentDidMount() {
    await this.getPhotosFromCameraRoll(15, "0");
  }

  private padData(data: PhotoIdentifier[]) {
    const itemsPerColumns = 3;
    const itemsLeftOver = data.length % itemsPerColumns;
    const elementsToAdd = itemsLeftOver === 0 ? 0 : 3 - itemsLeftOver;

    const emptyImage = {
      node: {
        group_name: "na",
        image: {
          filename: "test",
          height: 100,
          playableDuration: 0,
          uri: "",
          width: 100
        },
        timestamp: 0,
        type: "image"
      }
    };
    for (let i = 0; i < elementsToAdd; i += 1) {
      data.push(emptyImage);
    }

    return data;
  }

  private handleRefresh = async () => {
    this.setState({ refreshing: true });
    await this.getPhotosFromCameraRoll(15, "0");
    this.setState({ refreshing: false });
  };

  private getPhotosFromCameraRoll = async (
    first = 9,
    after = this.state.lastPhoto
  ) => {
    const photos = await CameraRoll.getPhotos({
      after,
      first
    });

    let lastPhoto = "0";
    if (photos.page_info.end_cursor) {
      lastPhoto = photos.page_info.end_cursor;
    }

    this.setState({
      lastPhoto,
      photos: [...this.state.photos, ...photos.edges]
    });
  };

  private renderPhotosFromCameraRoll = ({
    item
  }: {
    item: PhotoIdentifier;
  }) => {
    if (item.node.image.uri === "") {
      return <View />;
    }

    return (
      <TouchableOpacity
        onPress={() => this.props.onPhotoPress(item.node.image.uri)}
        style={styles.photoButton}
      >
        <Image source={{ uri: item.node.image.uri }} style={styles.photos} />
      </TouchableOpacity>
    );
  };
}
