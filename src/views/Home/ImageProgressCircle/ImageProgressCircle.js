import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  Share,
  View,
} from 'react-native';
import PercentageCircle from 'react-native-percentage-circle';

import { colors } from '~/util/styles';

import styles from './styles';


const pageWidth = Dimensions.get('window').width;

export default class ImageProgressCircle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      encoded: 0,
    };
  }

  static propTypes = {
    photo: PropTypes.string.isRequired,
    theme: PropTypes.object.isRequired,
  }

  share = () => {
    if (this.state.encoded === 100) {
      Share.share({
        url: this.state.photo,
        message: this.state.photo,
      });
    }
  }

  incrementCounter = () => {
    if (this.state.encoded < 100) {
      this.setState({ encoded: this.state.encoded + 1 });
    } else {
      clearInterval(this.interval);
    }
  }

  sendImageIcon = () => (
    <View>
      <Icon name='send' type='FontAwesome' size={48} />
      <Text style={{ fontSize: 30 }}>Share Image</Text>
    </View>
  );

  encodedPercentage = () => (
    <Text style={styles.textPercentage}>{this.state.encoded}%</Text>
  );

  render() {
    const { theme } = this.props;

    return (
      <View style={[styles.encodeImageContainer, { backgroundColor: theme.background }]}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => this.share()}>
          <PercentageCircle
            borderWidth={7}
            color={colors.primary}
            percent={this.state.encoded}
            radius={pageWidth * 0.31}
          >
            <ImageBackground
              imageStyle={styles.circularImage}
              source={{ uri: this.props.photo }}
              style={styles.encodingImage}
            >
              <View style={styles.textPercentageContainer}>
                {this.state.encoded === 100 ? this.sendImageIcon() : this.encodedPercentage()}
              </View>
            </ImageBackground>
          </PercentageCircle>
        </TouchableOpacity>
      </View>
    );
  }
}
