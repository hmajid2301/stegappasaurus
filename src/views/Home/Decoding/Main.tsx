import { ITheme } from "@types";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import ShareMenu from "react-native-share-menu";
import { NavigationScreenProp } from "react-navigation";

import PhotoAlbumList from "~/components/PhotoAlbumList";
import Snackbar from "~/components/Snackbar";
import styles from "./Main/styles";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  screenProps: {
    theme: ITheme;
  };
}

export default class Main extends React.Component<IProps, {}> {
  public render() {
    const { theme } = this.props.screenProps;
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            onPress={this.getPhotoFromCameraRoll}
            style={styles.button}
          >
            <Icon name="photo" iconStyle={styles.icon} type="font-awesome" />
          </TouchableOpacity>
        </View>

        <View style={styles.photoListContainer}>
          <PhotoAlbumList onPhotoPress={this.selectPhotoToDecode} />
        </View>
      </View>
    );
  }

  public componentDidMount() {
    ShareMenu.getSharedText((data: string) => {
      if (data.startsWith("content://media/")) {
        this.selectPhotoToDecode(data);
      }
    });
  }

  private getPhotoFromCameraRoll = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images
      });
      if (!result.cancelled) {
        this.selectPhotoToDecode(result.uri);
      }
    } else {
      Snackbar.show({
        text: "This app does not have permission to access the camera roll."
      });
    }
  };

  private selectPhotoToDecode = (uri: string) => {
    this.props.navigation.navigate("DecodingProgress", { uri });
  };
}
