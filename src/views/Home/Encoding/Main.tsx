import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Config from 'react-native-config';
import {Icon} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import {check, PERMISSIONS, request} from 'react-native-permissions';
import {NavigationScreenProp} from 'react-navigation';

import Snackbar from '~/actions/Snackbar';
import Loader from '~/components/Loader';
import PhotoAlbumList from '~/components/PhotoAlbumList';
import {ITheme} from '~/constants/types';
import styles from './Main/styles';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  screenProps: {
    theme: ITheme;
  };
}

interface IState {
  loading: boolean;
  permissionsChecked: boolean;
}

interface ICatAPI {
  breeds: string[];
  id: string;
  url: string;
  width: number;
  height: number;
}

export default class Main extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: false,
      permissionsChecked: false,
    };
  }

  public render() {
    const {theme} = this.props.screenProps;

    return (
      <View style={[styles.container, {backgroundColor: theme.background}]}>
        <Loader loading={this.state.loading} overlay="#333" />
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            onPress={this.getPhotoFromCamera}
            style={styles.button}>
            <Icon name="camera" iconStyle={styles.icon} type="font-awesome" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.getPhotoFromCameraRoll}
            style={styles.button}>
            <Icon name="photo" iconStyle={styles.icon} type="font-awesome" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.getPhotoFromCatAPI}
            style={styles.button}>
            <Icon
              name="cat"
              iconStyle={styles.icon}
              type="material-community"
            />
          </TouchableOpacity>
        </View>

        {this.state.permissionsChecked && (
          <View style={styles.photoListContainer}>
            <PhotoAlbumList onPhotoPress={this.selectPhotoToEncode} />
          </View>
        )}
      </View>
    );
  }

  public async componentDidMount() {
    let status = await check(PERMISSIONS.ANDROID.CAMERA);
    if (status !== 'blocked') {
      await request(PERMISSIONS.ANDROID.CAMERA);
    }

    status = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    if (status !== 'blocked') {
      await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    }
    this.setState({permissionsChecked: true});
  }

  private getPhotoFromCamera = async () => {
    try {
      ImagePicker.launchCamera({}, response => {
        if (!response.didCancel) {
          this.selectPhotoToEncode(response.uri);
        }
      });
    } catch {
      Snackbar.show({
        text: 'This app does not have permission to access the camera.',
      });
    }
  };

  private getPhotoFromCameraRoll = async () => {
    try {
      ImagePicker.launchImageLibrary(
        {
          mediaType: 'photo',
        },
        response => {
          if (!response.didCancel) {
            this.selectPhotoToEncode(response.uri);
          }
        },
      );
    } catch {
      Snackbar.show({
        text: 'This app does not have permission to access the camera roll.',
      });
    }
  };

  private getPhotoFromCatAPI = async () => {
    this.setState({loading: true});
    const response = await fetch(
      'https://api.thecatapi.com/v1/images/search?mime_types=jpg,png',
      {
        headers: {
          'x-api-key': Config.CAT_API_KEY,
        },
      },
    );
    const data = await response.json();
    const status = response.status;
    if (status === 200) {
      const urls = data as ICatAPI[];
      await Image.prefetch(urls[0].url);
      this.selectPhotoToEncode(urls[0].url);
    } else {
      Snackbar.show({
        text:
          "Failed to get a cat photo, check you're connected to the internet.",
      });
    }

    this.setState({loading: false});
  };

  private selectPhotoToEncode = (uri: string) => {
    this.props.navigation.navigate('EncodingMessage', {uri});
  };
}
