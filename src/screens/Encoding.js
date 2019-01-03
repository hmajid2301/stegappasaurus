import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { ImagePicker } from 'expo';

import { colors } from '../common';
import { toggleTheme } from '../actions';
import COLORS from '../themes';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginLeft: 5,
  },

  photos: {
    flex: 1,
    backgroundColor: 'rgba(117, 199, 255, 0.8)',
    marginRight: 5,
    justifyContent: 'center',
    height: 75,
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
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  getSplashBase = () => {
    const url = 'http://www.splashbase.co/api/v1/images/random';
    fetch(url)
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          image: responseJson.url,
        });
      })
      .catch();
  };

  getCatAPI = () => {
    const url = 'https://api.thecatapi.com/v1/images/search?mime_types=jpg,png';
    fetch(url)
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          image: responseJson[0].url,
        });
      })
      .catch();
  };


  render() {
    return (
      <View styles={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.photos}>
            <Icon name='camera' type='font-awesome' iconStyle={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.photos} onPress={this._pickImage}>
            <Icon name='photo' type='font-awesome' iconStyle={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.photos} onPress={this.getSplashBase}>
            <Icon name='random' type='font-awesome' iconStyle={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.photos} onPress={this.getCatAPI}>
            <Icon name='cat' type='material-community' iconStyle={styles.icon} />
          </TouchableOpacity>
        </View>
        {this.state.image !== null && (
          <Image style={{ height: 150, width: 150 }} source={{ uri: this.state.image }} />
        )}
      </View>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  toggleTheme: color => dispatch(toggleTheme(color)),
});

export default connect(null, mapDispatchToProps)(Encoding);
