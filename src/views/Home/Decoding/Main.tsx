import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import ShareMenu from "react-native-share-menu";
import {
  NavigationEventSubscription,
  NavigationScreenProp
} from "react-navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { ITheme, PrimaryColorNames } from "@types";
import PhotoAlbumList from "~/components/PhotoAlbumList";
import Snackbar from "~/components/Snackbar";
import { PRIMARY_COLORS } from "~/constants";
import { togglePrimaryColor } from "~/redux/actions";

import styles from "./Main/styles";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  screenProps: {
    theme: ITheme;
  };
  togglePrimaryColor: (primaryColor: PrimaryColorNames) => void;
}

class Main extends React.Component<IProps, {}> {
  private focusListener: NavigationEventSubscription | null;

  constructor(props: IProps) {
    super(props);
    this.focusListener = null;
  }

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
          <PhotoAlbumList
            onPhotoPress={this.selectPhotoToEncode}
            navigation={this.props.navigation}
          />
        </View>
      </View>
    );
  }

  public componentDidMount = () => {
    this.focusListener = this.props.navigation.addListener("willFocus", () => {
      this.props.togglePrimaryColor(PRIMARY_COLORS.BLUE.name);
    });

    ShareMenu.getSharedText((data: string) => {
      if (data.startsWith("content://media/")) {
        this.selectPhotoToEncode(data);
      }
    });
  };

  public componentWillUnmount = () => {
    if (this.focusListener !== null) {
      this.focusListener.remove();
    }
  };

  private getPhotoFromCameraRoll = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images
      });
      if (!result.cancelled) {
        this.selectPhotoToEncode(result.uri);
      }
    } else {
      Snackbar.show({
        text: "This app does not have permission to access the camera roll."
      });
    }
  };

  private selectPhotoToEncode = (uri: string) => {
    this.props.navigation.navigate("DecodingProgress", { uri });
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
