import { ImagePicker, MediaLibrary, Permissions } from 'expo';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import { togglePrimaryColor } from '~/redux/actions';
import { PRIMARY_COLORS } from '~/util/constants';
import { colors } from '~/util/styles';

import styles from './Main/styles';


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      loading: false,
      lastPhoto: 0,
    };
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    screenProps: PropTypes.shape({
      theme: PropTypes.shape({
        isDark: PropTypes.bool.isRequired,
        background: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
      }),
    }),
    togglePrimaryColor: PropTypes.func.isRequired,
  }

  componentDidMount = async () => {
    this.props.navigation.addListener('willFocus', () => {
      this.props.togglePrimaryColor(PRIMARY_COLORS.ORANGE.name);
    });

    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      const { assets, endCursor } = await MediaLibrary.getAssetsAsync({
        first: 15,
        sortBy: [MediaLibrary.SortBy.creationTime],
      });
      this.setState({ photos: assets, lastPhoto: endCursor });
    } else {
      throw new Error('Camera Roll permission not granted');
    }
  }

  padData = (data) => {
    const numOfCols = 3;
    const fullRows = Math.floor(data.length / numOfCols);
    let numElementsInFinalRow = data.length - (fullRows * numOfCols);

    while (numElementsInFinalRow !== numOfCols && numElementsInFinalRow !== 0) {
      data.push({ empty: true });
      numElementsInFinalRow += 1;
    }

    return data;
  };

  getPhotoFromCamera = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      const result = await ImagePicker.launchCameraAsync();
      if (!result.cancelled) {
        this.selectPhotoToEncode(result.uri);
      }
    } else {
      throw new Error('Camera permission not granted');
    }
  }

  getPhotoFromCameraRoll = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) {
        this.selectPhotoToEncode(result.uri);
      }
    } else {
      throw new Error('Camera Roll permission not granted');
    }
  }

  getPhotoFromCatAPI = () => {
    this.setState({ loading: true });

    const url = 'https://api.thecatapi.com/v1/images/search?mime_types=jpg,png';
    fetch(url)
      .then(response => response.json())
      .then((responseJson) => {
        this.selectPhotoToEncode(responseJson[0].url);
      })
      .catch();

    setTimeout(() => {
      this.setState({ loading: false });
    }, 3000);
  }

  getMorePhotosFromCameraRoll = async () => {
    const { assets, endCursor } = await MediaLibrary.getAssetsAsync({
      first: 9,
      sortBy: [MediaLibrary.SortBy.creationTime],
      after: this.state.lastPhoto,
    });

    this.setState({
      photos: [...this.state.photos, ...assets],
      photoEnd: endCursor,
    });
  }

  renderPhotosFromCameraRoll = ({ item }) => {
    if (item.empty === true) {
      return <View/>;
    }
    return (
      <TouchableOpacity
        onPress={() => this.selectPhotoToEncode(item.uri)}
        style={styles.photoButton}
      >
        <Image source={{ uri: item.uri }} style={styles.photos}/>
      </TouchableOpacity>
    );
  }

  selectPhotoToEncode = (uri) => {
    this.props.navigation.navigate('EncodeImage', { uri });
  }

  render() {
    const { theme } = this.props.screenProps;

    if (this.state.loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.primary} size='large'/>
        </View>
      );
    }

    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.buttonsRow}>
          <TouchableOpacity onPress={this.getPhotoFromCamera} style={styles.button}>
            <Icon name='camera' style={styles.icon} type='FontAwesome' />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.getPhotoFromCameraRoll} style={styles.button}>
            <Icon name='photo' style={styles.icon} type='FontAwesome'/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.getPhotoFromCatAPI} style={styles.button}>
            <Icon name='cat' style={styles.icon} type='MaterialCommunityIcons'/>
          </TouchableOpacity>
        </View>
        <View style={styles.photoListContainer}>
          <FlatList
            data={this.padData(this.state.photos)}
            keyExtractor={(_, index) => index}
            numColumns={3}
            onEndReached={this.getMorePhotosFromCameraRoll}
            renderItem={this.renderPhotosFromCameraRoll}
          />
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  togglePrimaryColor: color => dispatch(togglePrimaryColor(color)),
});

export default connect(null, mapDispatchToProps)(Main);
