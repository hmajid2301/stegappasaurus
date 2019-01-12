import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { ImagePicker, MediaLibrary, Permissions } from 'expo';

import { colors } from '../util/styles';
import { toggleTheme } from '../actions';
import COLORS from '../themes';
import EncodeMessage from './EncodeImage';


const pageWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },

  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    marginRight: 2,
  },

  photoContainer: {
    marginRight: 2,
  },

  button: {
    flex: 1,
    justifyContent: 'center',
    height: (pageWidth / 3),
    backgroundColor: colors.primary,
    marginLeft: 2,
    marginTop: 2,
  },

  photoButton: {
    flex: 1,
  },

  photos: {
    height: (pageWidth / 3),
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
      photos: [],
      loading: false,
      lastPhoto: 0,
    };
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    toggleTheme: PropTypes.func.isRequired,
  }

  async componentDidMount() {
    this.props.navigation.addListener('willFocus', () => {
      this.props.toggleTheme(COLORS.secondary);
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

  formatData = (data) => {
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
        this.selectImage(result.uri);
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
        this.selectImage(result.uri);
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
        this.selectImage(responseJson[0].url);
      })
      .catch();

    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  }

  getMoreAlbumPhotos = async () => {
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

  renderPhoto = ({ item }) => {
    if (item.empty === true) {
      return <View/>;
    }
    return (
      <TouchableOpacity onPress={() => this.selectImage(item.uri)} style={styles.photoButton}>
        <Image source={{ uri: item.uri }} style={styles.photos}/>
      </TouchableOpacity>
    );
  }

  selectImage = (uri) => {
    this.props.navigation.navigate('EncodeImage', { uri });
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.primary} size='large'/>
        </View>
      );
    }

    return (
      <View styles={styles.container}>
        <View style={styles.buttonsRow}>
          <TouchableOpacity onPress={this.getPhotoFromCamera} style={styles.button}>
            <Icon name='camera' iconStyle={styles.icon} type='font-awesome' />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.getPhotoFromCameraRoll} style={styles.button}>
            <Icon name='photo' iconStyle={styles.icon} type='font-awesome'/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.getPhotoFromCatAPI} style={styles.button}>
            <Icon name='cat' iconStyle={styles.icon} type='material-community'/>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.formatData(this.state.photos)}
          keyExtractor={(_, index) => index}
          numColumns={3}
          onEndReached={this.getMoreAlbumPhotos}
          renderItem={this.renderPhoto}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  toggleTheme: color => dispatch(toggleTheme(color)),
});

const EncodeNavigator = createStackNavigator({
  Encoding: {
    screen: connect(null, mapDispatchToProps)(Encoding),
    navigationOptions: {
      header: null,
    },
  },

  EncodeImage: {
    screen: EncodeMessage,
    navigationOptions: {
      header: null,
      tabBarVisible: false,
    },
  },
});

EncodeNavigator.navigationOptions = ({ navigation }) => ({
  tabBarVisible: navigation.state.index === 0,
  swipeEnabled: navigation.state.index === 0,
});

export default EncodeNavigator;
