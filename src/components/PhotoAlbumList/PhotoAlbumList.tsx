import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";

import * as React from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import {
  NavigationEventSubscription,
  NavigationScreenProp
} from "react-navigation";

import Snackbar from "~/components/Snackbar";

import styles from "./styles";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
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
  private focusListener: NavigationEventSubscription | null;

  constructor(props: IProps) {
    super(props);
    this.state = {
      lastPhoto: "",
      photos: [],
      refreshing: false
    };
    this.focusListener = null;
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

  public componentDidMount = async () => {
    this.focusListener = this.props.navigation.addListener(
      "didFocus",
      async () => {
        await this.handleRefresh();
      }
    );
  };

  public componentWillUnmount = () => {
    if (this.focusListener !== null) {
      this.focusListener.remove();
    }
  };

  private padData = (data: IPhoto[]) => {
    const numOfCols = 3;
    const fullRows = Math.floor(data.length / numOfCols);
    let numElementsInFinalRow = data.length - fullRows * numOfCols;

    while (numElementsInFinalRow !== numOfCols && numElementsInFinalRow !== 0) {
      data.push({ uri: "" });
      numElementsInFinalRow += 1;
    }

    return data;
  };

  private morePhotosFromCameraRoll = async () => {
    const { assets, endCursor } = await MediaLibrary.getAssetsAsync({
      after: this.state.lastPhoto,
      first: 9,
      sortBy: ["creationTime"]
    });

    this.setState({
      lastPhoto: endCursor,
      photos: [...this.state.photos, ...assets]
    });
  };

  private handleRefresh = async () => {
    this.setState({ refreshing: true });
    await this.getPhotosListFromAlbum();
  };

  private renderPhotosFromCameraRoll = ({ item }: { item: IPhoto }) => {
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
  };

  private async getPhotosListFromAlbum() {
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
        text: "Grant permissions to access camera roll, to view photos here."
      });
    }
  }
}
