import { create } from "apisauce";
import { ImagePicker, MediaLibrary, Permissions } from "expo";
import { Icon } from "native-base";
import React, { Component } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { CAT_API_KEY } from "react-native-dotenv";
import { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { ITheme, PrimaryColorNames } from "@types";
import { PRIMARY_COLORS } from "~/common/constants";
import Loading from "~/components/Loading";
import Snackbar from "~/components/Snackbar";
import { togglePrimaryColor } from "~/redux/actions";

import styles from "./Main/styles";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  screenProps: {
    theme: ITheme;
  };
  togglePrimaryColor: (primaryColor: PrimaryColorNames) => void;
}

interface IState {
  photos: IPhoto[];
  loading: boolean;
  lastPhoto: number;
}

interface IPhoto {
  uri: string;
}

interface ICatAPI {
  breeds: string[];
  id: string;
  url: string;
  width: number;
  height: number;
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

  public render() {
    const { theme } = this.props.screenProps;

    if (this.state.loading) {
      return <Loading hide={this.state.loading} />;
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
            onEndReached={this.morePhotosFromCameraRoll}
            renderItem={this.renderPhotosFromCameraRoll}
          />
        </View>
      </View>
    );
  }

  public componentDidMount = async () => {
    this.props.navigation.addListener("willFocus", () => {
      this.props.togglePrimaryColor(PRIMARY_COLORS.ORANGE.name);
    });

    const { status } = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (status === "granted") {
      const { assets, endCursor } = await MediaLibrary.getAssetsAsync({
        first: 15,
        sortBy: [MediaLibrary.SortBy.creationTime]
      });
      this.setState({ photos: assets, lastPhoto: endCursor });
    } else {
      Snackbar.show({
        text: "Grant permissions to access camera roll, to view photos here."
      });
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

  private getPhotoFromCamera = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync();
      if (!result.cancelled) {
        this.selectPhotoToEncode(result.uri);
      }
    } catch {
      Snackbar.show({
        text: "This app does not have permission to access the camera."
      });
    }
  };

  private getPhotoFromCameraRoll = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) {
        this.selectPhotoToEncode(result.uri);
      }
    } catch {
      Snackbar.show({
        text: "This app does not have permission to access the camera roll."
      });
    }
  };

  private getPhotoFromCatAPI = async () => {
    this.setState({ loading: true });

    const api = create({
      baseURL: "https://api.thecatapi.com",
      headers: { "x-api-key": CAT_API_KEY }
    });

    const response = await api.get("/v1/images/search?mime_types=jpg,png");
    if (response.ok) {
      const urls = response.data as ICatAPI[];
      await Image.prefetch(urls[0].url);
      this.selectPhotoToEncode(urls[0].url);
    } else {
      Snackbar.show({
        text:
          "Failed to fetch a cat photo, check you're connected to the internet."
      });
    }

    this.setState({ loading: false });
  };

  private morePhotosFromCameraRoll = async () => {
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
    this.props.navigation.navigate("Message", { uri });
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  togglePrimaryColor: (colorName: PrimaryColorNames) =>
    dispatch(togglePrimaryColor({ color: colorName }))
});

export default connect(
  null,
  mapDispatchToProps
)(Main);
