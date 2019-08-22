import { ITheme, PrimaryColorNames } from "@types";
import { create } from "apisauce";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import Config from "react-native-config";
import { Icon } from "react-native-elements";
import {
  NavigationEventSubscription,
  NavigationScreenProp
} from "react-navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import Loader from "~/components/Loader";
import PhotoAlbumList from "~/components/PhotoAlbumList";
import Snackbar from "~/components/Snackbar";
import { PRIMARY_COLOR } from "~/modules";
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
  loading: boolean;
}

interface ICatAPI {
  breeds: string[];
  id: string;
  url: string;
  width: number;
  height: number;
}

export class Main extends React.Component<IProps, IState> {
  private focusListener: NavigationEventSubscription | null;

  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: false
    };

    this.focusListener = null;
  }

  public render() {
    const { theme } = this.props.screenProps;

    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Loader loading={this.state.loading} />
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            onPress={this.getPhotoFromCamera}
            style={styles.button}
          >
            <Icon name="camera" iconStyle={styles.icon} type="font-awesome" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.getPhotoFromCameraRoll}
            style={styles.button}
          >
            <Icon name="photo" iconStyle={styles.icon} type="font-awesome" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.getPhotoFromCatAPI}
            style={styles.button}
          >
            <Icon
              name="cat"
              iconStyle={styles.icon}
              type="material-community"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.photoListContainer}>
          <PhotoAlbumList onPhotoPress={this.selectPhotoToEncode} />
        </View>
      </View>
    );
  }

  public async componentDidMount() {
    this.focusListener = this.props.navigation.addListener("willFocus", () => {
      this.props.togglePrimaryColor(PRIMARY_COLOR.name);
    });
  }

  public componentWillUnmount() {
    if (this.focusListener !== null) {
      this.focusListener.remove();
    }
  }

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
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images
      });
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
      headers: { "x-api-key": Config.CAT_API_KEY }
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

  private selectPhotoToEncode = (uri: string) => {
    this.props.navigation.navigate("EncodingMessage", { uri });
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
