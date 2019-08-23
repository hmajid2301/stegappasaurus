import LottieView from "lottie-react-native";
import React from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";

import { IIcon, PrimaryColor, ThemeColors } from "@types";
import styles from "./styles";

interface IProps {
  animating: boolean;
  background: ThemeColors;
  onPress?: (...args: any) => void;
  icon?: IIcon;
  photo: string;
  primaryColor: PrimaryColor;
}

const ImageProgress: React.FunctionComponent<IProps> = (props: IProps) => (
  <View
    style={[styles.progressContainer, { backgroundColor: props.background }]}
  >
    {props.animating ? (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <LottieView
          style={{ width: 400, height: 400 }}
          source={require("~/assets/animations/progress.json")}
          autoPlay
          loop
        />
      </View>
    ) : (
      <TouchableOpacity activeOpacity={0.8} onPress={props.onPress}>
        <ImageBackground
          imageStyle={[
            styles.circularImage,
            { borderColor: props.primaryColor }
          ]}
          source={{ uri: props.photo }}
          style={styles.image}
        >
          <View style={styles.iconContainer}>
            {props.icon && <Icon {...props.icon} />}
          </View>
        </ImageBackground>
      </TouchableOpacity>
    )}
  </View>
);

export default ImageProgress;
