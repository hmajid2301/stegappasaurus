import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import React from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";

import Snackbar from "~/components/Snackbar";
import styles from "./styles";

interface IProps {
  onPhotoPress: (uri: string) => any;
}

interface IState {
  lastPhoto: string;
  photos: IPhoto[];
  refreshing: boolean;
}

interface IPhoto {
  uri: string;
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
      <FlatList
        data={this.padData(this.state.photos)}
        keyExtractor={(item, index) => item.uri + index}
        numColumns={3}
        onEndReached={this.morePhotosFromCameraRoll}
        onRefresh={this.handleRefresh}
        renderItem={this.renderPhotosFromCameraRoll}
        refreshing={this.state.refreshing}
      />
    );
  }

  public async componentDidMount() {
    await this.handleRefresh();
  }

  private padData(data: IPhoto[]) {
    const itemsPerColumns = 3;
    const itemsLeftOver = data.length % itemsPerColumns;
    const elementsToAdd = itemsLeftOver === 0 ? 0 : 3 - itemsLeftOver;

    for (let i = 0; i < elementsToAdd; i += 1) {
      data.push({ uri: "" });
    }

    return data;
  }

  private async morePhotosFromCameraRoll() {
    const { assets, endCursor } = await MediaLibrary.getAssetsAsync({
      after: this.state.lastPhoto,
      first: 9,
      sortBy: ["creationTime"]
    });

    this.setState({
      lastPhoto: endCursor,
      photos: [...this.state.photos, ...assets]
    });
  }

  private async handleRefresh() {
    this.setState({ refreshing: true });
    await this.getPhotosFromCameraRoll();
  }

  private renderPhotosFromCameraRoll({ item }: { item: IPhoto }) {
    if (item.uri === "") {
      return <View />;
    }

    return (
      <TouchableOpacity
        onPress={() => this.props.onPhotoPress(item.uri)}
        style={styles.photoButton}
      >
        <Image source={{ uri: item.uri }} style={styles.photos} />
      </TouchableOpacity>
    );
  }

  private async getPhotosFromCameraRoll() {
    const { status } = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (status === "granted") {
      const { assets, endCursor } = await MediaLibrary.getAssetsAsync({
        first: 15,
        sortBy: [MediaLibrary.SortBy.creationTime]
      });
      this.setState({
        lastPhoto: endCursor,
        photos: assets,
        refreshing: false
      });
    } else {
      Snackbar.show({
        text: "Permission required to access camera roll, to view photos here."
      });
    }
  }
}
