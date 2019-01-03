import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { ImagePicker, Permissions, MediaLibrary } from 'expo';
import Grid from 'react-native-grid-component';

import { colors } from '../common';
import { toggleTheme } from '../actions';
import COLORS from '../themes';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginRight: 2,
  },

  photoContainer: {
    marginRight: 2,
  },

  button: {
    flex: 1,
    justifyContent: 'center',
    height: (Dimensions.get('window').width / 3),
    backgroundColor: colors.primary,
    marginLeft: 2,
    marginTop: 2,
  },

  photoButton: {
    flex: 1,
  },

  photos: {
    height: (Dimensions.get('window').width / 3),
    marginLeft: 2,
    marginTop: 2,
  },

  icon: {
    color: colors.pureWhite,
  },
});

class Encoding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      row: 1,
      column: 1,
      photos: null,
    };
  }
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    toggleTheme: PropTypes.func.isRequired,
  };

  async componentDidMount() {
    this.props.navigation.addListener('willFocus', () => {
      this.props.toggleTheme(COLORS.secondary);
    });
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      const { assets } = await MediaLibrary.getAssetsAsync();
      this.setState({ photos: assets });
    } else {
      throw new Error('Camera Roll permission not granted');
    }
  }

  getCameraPhoto = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      const result = await ImagePicker.launchCameraAsync();
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
    } else {
      throw new Error('Camera permission not granted');
    }
  };

  getCameraAlbum = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
    } else {
      throw new Error('Camera Roll permission not granted');
    }
  };

  getCatAPI = () => {
    const url = 'https://api.thecatapi.com/v1/images/search?mime_types=jpg,png';
    fetch(url)
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({ image: responseJson[0].url });
      })
      .catch();
  };

  getPhoto = (photo) => {
    this.setState({ image: photo });
  }

  renderPhoto = (photo, index) => (
    <TouchableOpacity
      onPress={() => this.getPhoto(photo.uri)}
      style={styles.photoButton}
      key={index}
    >
      <Image style={styles.photos} source={{ uri: photo.uri }}/>
    </TouchableOpacity>
  )

  render() {
    return (
      <ScrollView styles={styles.container}>
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.button} onPress={this.getCameraPhoto}>
            <Icon name='camera' type='font-awesome' iconStyle={styles.icon}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.getCameraAlbum}>
            <Icon name='photo' type='font-awesome' iconStyle={styles.icon}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.getCatAPI}>
            <Icon name='cat' type='material-community' iconStyle={styles.icon}/>
          </TouchableOpacity>
        </View>
        {this.state.image !== null && (
          <Image style={{ height: 150, width: 150 }} source={{ uri: this.state.image }}/>
        )}
        {this.state.photos !== null && (
          <View style={styles.photoContainer}>
            <Grid renderItem={this.renderPhoto} data={this.state.photos} itemsPerRow={3}/>
          </View>
        )}
      </ScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  toggleTheme: color => dispatch(toggleTheme(color)),
});

export default connect(null, mapDispatchToProps)(Encoding);
