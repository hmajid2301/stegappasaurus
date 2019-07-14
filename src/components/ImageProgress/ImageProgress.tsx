import LottieView from "lottie-react-native";
import * as React from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";

import { IIcon, ITheme, PrimaryColor } from "@types";
import styles from "./styles";

interface IProps {
  animating: boolean;
  onPress?: (...args: any) => void;
  icon?: IIcon;
  photo: string;
  primaryColor: PrimaryColor;
  theme: ITheme;
}

export default class ImageProgress extends React.Component<IProps, {}> {
  public render() {
    const { theme } = this.props;

    return (
      <View
        style={[
          styles.progressContainer,
          { backgroundColor: theme.background }
        ]}
      >
        {this.props.animating ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <LottieView
              style={{ width: 400, height: 400 }}
              source={require("~/assets/animations/progress.json")}
              autoPlay
              loop
            />
          </View>
        ) : (
          <TouchableOpacity activeOpacity={0.8} onPress={this.props.onPress}>
            <ImageBackground
              imageStyle={[
                styles.circularImage,
                { borderColor: this.props.primaryColor }
              ]}
              source={{ uri: this.props.photo }}
              style={styles.image}
            >
              <View style={styles.iconContainer}>
                {this.props.icon && <Icon {...this.props.icon} />}
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
