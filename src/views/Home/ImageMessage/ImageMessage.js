import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  TextInput,
  View,
} from 'react-native';

import styles from './styles';


export default class ImageMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  static propTypes = {
    action: PropTypes.func.isRequired,
    photo: PropTypes.string.isRequired,
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' enabled>
        <ImageBackground source={{ uri: this.props.photo }} style={styles.selectedImage}>
          <View style={styles.textContainer}>
            <TextInput
              autoFocus={true}
              blurOnSubmit={true}
              enablesReturnKeyAutomatically={true}
              multiline={true}
              onChangeText={message => this.setState({ message })}
              onSubmitEditing={this.props.action}
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
