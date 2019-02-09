import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PercentageCircle from 'react-native-percentage-circle';

import styles from './styles';


const pageWidth = Dimensions.get('window').width;

export default class ImageProgressCircle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percentage: 0,
    };
  }

  componentDidMount = () => {
    this.interval = setInterval(() => {
      this.incrementCounter();
    }, 50);
  }

  componentDidUpdate = () => {
    if (this.state.percentage === 100) {
      this.props.action();
    }
  }

  static propTypes = {
    action: PropTypes.func.isRequired,
    photo: PropTypes.string.isRequired,
    primaryColor: PropTypes.string.isRequired,
    theme: PropTypes.object.isRequired,
  }

  incrementCounter = () => {
    if (this.state.percentage < 100) {
      this.setState({ percentage: this.state.percentage + 1 });
    } else {
      clearInterval(this.interval);
    }
  }

  render() {
    const { theme } = this.props;

    return (
      <View style={[styles.encodeImageContainer, { backgroundColor: theme.background }]}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => this.share()}>
          <PercentageCircle
            borderWidth={5}
            color={this.props.primaryColor}
            percent={this.state.percentage}
            radius={pageWidth * 0.31}
          >
            <ImageBackground
              imageStyle={styles.circularImage}
              source={{ uri: this.props.photo }}
              style={styles.encodingImage}
            >
              <View style={styles.textPercentageContainer}>
                <Text style={styles.textPercentage}>{this.state.percentage}%</Text>
              </View>
            </ImageBackground>
          </PercentageCircle>
        </TouchableOpacity>
      </View>
    );
  }
}
