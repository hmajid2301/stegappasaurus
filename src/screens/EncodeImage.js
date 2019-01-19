import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Share,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import PercentageCircle from 'react-native-percentage-circle';

import { colors, fonts } from '../util/styles';


const pageWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  encodeImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textPercentageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  textPercentage: {
    color: 'black',
    fontFamily: fonts.body_xl,
    fontSize: 50,
  },
  circularImage: {
    borderRadius: pageWidth * 0.6,
  },
  encodingImage: {
    width: pageWidth * 0.6,
    height: pageWidth * 0.6,
  },
  container: {
    flex: 1,
  },
  selectedImage: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: '100%',
    height: '100%',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userMessage: {
    fontFamily: fonts.body,
    fontSize: 22,
    color: colors.pureWhite,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
});

export default class EncodeImage extends Component {
  constructor(props) {
    const { navigation } = props;
    const uri = navigation.getParam('uri', 'NO-ID');

    super(props);
    this.state = {
      isEncoding: false,
      message: '',
      photo: uri,
      encoded: 0,
    };
  }
  static propTypes = {
    navigation: PropTypes.object.isRequired,
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

  submit = () => {
    this.setState({ isEncoding: true });
    this.interval = setInterval(() => {
      this.incrementCounter();
    }, 50);
  }

  sendImageIcon = () => (
    <View>
      <Icon name='send' type='font-awesome' size={48} />
      <Text style={{ fontSize: 30 }}>Share Image</Text>
    </View>
  );

  encodedPercentage = () => (
    <Text style={styles.textPercentage}>{this.state.encoded}%</Text>
  );

  render() {
    if (this.state.isEncoding) {
      return (
        <View style={styles.encodeImageContainer}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => this.share()}>
            <PercentageCircle
              borderWidth={7}
              color={colors.primary}
              percent={this.state.encoded}
              radius={pageWidth * 0.325}
            >
              <ImageBackground
                imageStyle={styles.circularImage}
                source={{ uri: this.state.photo }}
                style={styles.encodingImage}
              >
                <View style={styles.textPercentageContainer}>
                  { this.state.encoded === 100 ? this.sendImageIcon() : this.encodedPercentage() }
                </View>
              </ImageBackground>
            </PercentageCircle>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <KeyboardAvoidingView behavior='padding' enabled>
        <ImageBackground source={{ uri: this.state.photo }} style={styles.selectedImage}>
          <View style={styles.textContainer}>
            <TextInput
              autoFocus={true}
              blurOnSubmit={true}
              enablesReturnKeyAutomatically={true}
              multiline={true}
              onChangeText={message => this.setState({ message })}
              onSubmitEditing={() => this.submit()}
              placeholder='Enter your message here....'
              style={styles.userMessage}
              underlineColorAndroid='transparent'
            />
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}
