import { ImagePicker, Permissions } from "expo";
import { Icon } from "native-base";
import React, { Component } from "react";
import { TouchableOpacity, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";

import { dispatchPrimaryColor } from "~/redux/hoc";
import { PRIMARY_COLORS } from "~/util/constants";
import { ITheme, PrimaryColorNames } from "~/util/interfaces";

import styles from "./Main/styles";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  screenProps: {
    theme: ITheme;
  };
  togglePrimaryColor: (primaryColor: PrimaryColorNames) => void;
}

class Main extends Component<IProps, {}> {
  public componentDidMount = () => {
    this.props.navigation.addListener("willFocus", () => {
      this.props.togglePrimaryColor(PRIMARY_COLORS.BLUE.name);
    });
  };

  public render() {
    const { theme } = this.props.screenProps;
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <TouchableOpacity
          onPress={this.getPhotoFromCameraRoll}
          style={styles.button}
        >
          <Icon name="photo" style={styles.icon} type="FontAwesome" />
        </TouchableOpacity>
      </View>
    );
  }

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

  private selectPhotoToEncode = (uri: string) => {
    this.props.navigation.navigate("DecodeImage", { uri });
  };
}

export default dispatchPrimaryColor(Main);
