import React, { Component } from "react";
import {
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import PercentageCircle from "react-native-percentage-circle";
import SnackBar from "react-native-snackbar-component";

import styles from "./styles";

const pageWidth = Dimensions.get("window").width;

interface IProps {
  action: () => void;
  message: string;
  photo: string;
  primaryColor: string;
  theme: {
    background: string;
    color: string;
    isDark: boolean;
  };
  snackAction: () => void;
}

interface IState {
  percentage: number;
}

export default class ImageProgressCircle extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      percentage: 0
    };
  }

  public componentDidMount = () => {
    this.interval = setInterval(() => {
      this.incrementCounter();
    }, 50);
  };

  public componentDidUpdate = () => {
    if (this.state.percentage === 100) {
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
            percent={this.state.percentage}
            radius={pageWidth * 0.334}
          >
            <ImageBackground
              imageStyle={styles.circularImage}
              source={{ uri: this.props.photo }}
              style={styles.encodingImage}
            >
              <View style={styles.textPercentageContainer}>
                <Text style={styles.textPercentage}>
                  {this.state.percentage}%
                </Text>
              </View>
            </ImageBackground>
          </PercentageCircle>
        </TouchableOpacity>
        <SnackBar
          autoHidingTime={2000}
          actionHandler={() => this.props.snackAction()}
          actionText={"OPEN"}
          textMessage={this.props.message}
          visible={this.state.percentage === 100}
        />
      </View>
    );
  }

  private incrementCounter = () => {
    if (this.state.percentage < 100) {
      this.setState({ percentage: this.state.percentage + 1 });
    } else {
      clearInterval(this.interval);
    }
  };
}
