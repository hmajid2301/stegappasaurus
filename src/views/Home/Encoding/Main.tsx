import { ImagePicker, MediaLibrary, Permissions } from "expo";
import { Icon } from "native-base";
import React, { Component } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  View
} from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { togglePrimaryColor } from "~/redux/actions";
import { PRIMARY_COLORS } from "~/util/constants";
import { ITheme, PrimaryColor } from "~/util/interfaces";
import { colors } from "~/util/styles";

import styles from "./Main/styles";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  screenProps: {
    theme: ITheme;
  };
  togglePrimaryColor: (primaryColor: string) => void;
}

interface IDispatchFromProps {
  togglePrimaryColor: (primaryColor: string) => void;
}

interface IState {
  photos: IPhoto[];
  loading: boolean;
  lastPhoto: number;
}

interface IPhoto {
  uri: string;
}

class Main extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      lastPhoto: 0,
      loading: false,
      photos: []
    };
  }

  public componentDidMount = async () => {
    this.props.navigation.addListener("willFocus", () => {
      this.props.togglePrimaryColor(PRIMARY_COLORS.ORANGE.name);
    });

    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      const { assets, endCursor } = await MediaLibrary.getAssetsAsync({
        first: 15,
        sortBy: [MediaLibrary.SortBy.creationTime]
      });
      this.setState({ photos: assets, lastPhoto: endCursor });
    } else {
      throw new Error("Camera Roll permission not granted");
    }
  };

  public render() {
    const { theme } = this.props.screenProps;

    if (this.state.loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      );
    }

    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            onPress={this.getPhotoFromCamera}
            style={styles.button}
          >
            <Icon name="camera" style={styles.icon} type="FontAwesome" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.getPhotoFromCameraRoll}
            style={styles.button}
          >
            <Icon name="photo" style={styles.icon} type="FontAwesome" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.getPhotoFromCatAPI}
            style={styles.button}
          >
            <Icon
              name="cat"
              style={styles.icon}
              type="MaterialCommunityIcons"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.photoListContainer}>
          <FlatList
            data={this.padData(this.state.photos)}
            keyExtractor={(item, index) => item.uri + index}
            numColumns={3}
            onEndReached={this.getMorePhotosFromCameraRoll}
            renderItem={this.renderPhotosFromCameraRoll}
          />
        </View>
      </View>
    );
  }

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

  private getPhotoFromCamera = async () => {
    const { status } = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (status === "granted") {
      const result = await ImagePicker.launchCameraAsync();
      if (!result.cancelled) {
        this.selectPhotoToEncode(result.uri);
      }
    } else {
      throw new Error("Camera permission not granted");
    }
  };

  private getPhotoFromCameraRoll = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) {
        this.selectPhotoToEncode(result.uri);
      }
    } else {
      throw new Error("Camera Roll permission not granted");
    }
  };

  private getPhotoFromCatAPI = () => {
    this.setState({ loading: true });

    const url = "https://api.thecatapi.com/v1/images/search?mime_types=jpg,png";
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.selectPhotoToEncode(responseJson[0].url);
      })
      .catch();

    setTimeout(() => {
      this.setState({ loading: false });
    }, 3000);
  };

  private getMorePhotosFromCameraRoll = async () => {
    const { assets } = await MediaLibrary.getAssetsAsync({
      after: this.state.lastPhoto,
      first: 9,
      sortBy: [MediaLibrary.SortBy.creationTime]
    });

    this.setState({
      photos: [...this.state.photos, ...assets]
    });
  };

  private renderPhotosFromCameraRoll = ({ item }: { item: IPhoto }) => {
    if (item.uri === "") {
      return <View />;
    }
    return (
      <TouchableOpacity
        onPress={() => this.selectPhotoToEncode(item.uri)}
        style={styles.photoButton}
      >
        <Image source={{ uri: item.uri }} style={styles.photos} />
      </TouchableOpacity>
    );
  };

  private selectPhotoToEncode = (uri: string) => {
    this.props.navigation.navigate("EncodeImage", { uri });
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  togglePrimaryColor: (color: string) => dispatch(togglePrimaryColor(color))
});

export default connect<{}, IDispatchFromProps>(
  null,
  mapDispatchToProps
)(Main);
