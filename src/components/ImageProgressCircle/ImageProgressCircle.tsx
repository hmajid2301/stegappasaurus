import React, { Component } from "react";
import {
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import PercentageCircle from "react-native-percentage-circle";

import { ITheme, PrimaryColor } from "~/util/interfaces";
import styles from "./styles";

const pageWidth = Dimensions.get("window").width;

interface IProps {
  action: () => void;
  message?: string;
  photo: string;
  percentage: number;
  primaryColor: PrimaryColor;
  theme: ITheme;
}

export default class ImageProgressCircle extends Component<IProps, {}> {
  public static defaultProps = {};

  public componentDidUpdate = () => {
    if (this.props.percentage === 100) {
      this.props.action();
    }
  };

  public render() {
    const { theme } = this.props;

    return (
      <View
        style={[
          styles.encodeImageContainer,
          { backgroundColor: theme.background }
        ]}
      >
        <TouchableOpacity activeOpacity={0.8}>
          <PercentageCircle
            borderWidth={5}
            color={this.props.primaryColor}
            percent={this.props.percentage}
            radius={pageWidth * 0.334}
          >
            <ImageBackground
              imageStyle={styles.circularImage}
              source={{ uri: this.props.photo }}
              style={styles.encodingImage}
            >
              <View style={styles.textPercentageContainer}>
                <Text style={styles.textPercentage}>
                  {Math.ceil(this.props.percentage)}%
                </Text>
              </View>
            </ImageBackground>
          </PercentageCircle>
        </TouchableOpacity>
      </View>
    );
  }
}
