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

    let editable = true;
    if (this.props.message) {
      editable = false;
    }

    this.state = {
      message: '',
      editable,
    };
  }

  static propTypes = {
    action: PropTypes.func,
    message: PropTypes.string,
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
              editable={this.state.editable}
              multiline={true}
              onChangeText={message => this.setState({ message })}
              onSubmitEditing={this.props.action}
              placeholder={this.props.message ? this.props.message : 'Enter your message here....'}
              style={styles.userMessage}
              underlineColorAndroid='transparent'
            />
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}
