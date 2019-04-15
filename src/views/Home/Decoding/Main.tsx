import { ImagePicker, Permissions } from "expo";
import { Icon } from "native-base";
import React, { Component } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";

import { PRIMARY_COLORS } from "~/common/constants";
import { ITheme, PrimaryColorNames } from "~/common/interfaces";
import { dispatchPrimaryColor } from "~/redux/hoc";

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
      Alert.alert(
        "Permissions",
        "Please grant permission to access your camera roll.",
        [
          {
            text: "ok"
          }
        ]
      );
    }
  };

  private selectPhotoToEncode = (uri: string) => {
    this.props.navigation.navigate("DecodeImage", { uri });
  };
}

export default dispatchPrimaryColor(Main);
