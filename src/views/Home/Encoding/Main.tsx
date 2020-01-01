import React from 'react';
import {Image} from 'react-native';
import Config from 'react-native-config';
import {Icon} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import {check, PERMISSIONS, request} from 'react-native-permissions';
import {NavigationScreenProp} from 'react-navigation';
import RNFetchBlob from 'rn-fetch-blob';

import Snackbar from '~/actions/Snackbar';
import {MainHeader} from '~/components/Header';
import Loader from '~/components/Loader';
import PhotoAlbumList from '~/components/PhotoAlbumList';
import {primary} from '~/constants/colors';
import {ThemeContext} from '~/providers/ThemeContext';
import {
  ButtonsContainer,
  iconStyle,
  MainContainer,
  PhotoAlbumContainer,
  TouchableButton,
} from '../common';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

interface State {
  loading: boolean;
  permissionsChecked: boolean;
}

interface CatAPIResponse {
  breeds: string[];
  id: string;
  url: string;
  width: number;
  height: number;
}

export default class Main extends React.Component<Props, State> {
  public static contextType = ThemeContext;
  public context!: React.ContextType<typeof ThemeContext>;

  public state = {
    loading: false,
    permissionsChecked: false,
  };

  public render() {
    return (
      <MainContainer
        background={this.context.theme.background}
        testID={'hello'}>
        <MainHeader navigation={this.props.navigation} primary="#009cff" />
        <Loader loading={this.state.loading} overlay="#333" />
        <ButtonsContainer>
          <TouchableButton
            button={primary}
            onPress={this.getPhotoFromCamera}
            testID="camera">
            <Icon name="camera" iconStyle={iconStyle} type="font-awesome" />
          </TouchableButton>
          <TouchableButton
            button={primary}
            onPress={this.getPhotoFromCameraRoll}
            testID="cameraroll">
            <Icon name="photo" iconStyle={iconStyle} type="font-awesome" />
          </TouchableButton>
          <TouchableButton
            button={primary}
            onPress={this.getPhotoFromCatAPI}
            testID="catapi">
            <Icon name="cat" iconStyle={iconStyle} type="material-community" />
          </TouchableButton>
        </ButtonsContainer>

        {this.state.permissionsChecked && (
          <PhotoAlbumContainer>
            <PhotoAlbumList onPhotoPress={this.selectPhotoToEncode} />
          </PhotoAlbumContainer>
        )}
      </MainContainer>
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

  private getPhotoFromCamera = () => {
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

  private getPhotoFromCameraRoll = () => {
    try {
      ImagePicker.launchImageLibrary({}, response => {
        if (!response.didCancel) {
          this.selectPhotoToEncode(response.uri);
        }
      });
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
      const urls = data as CatAPIResponse[];
      const url = urls[0].url;
      await Image.prefetch(url);
      await RNFetchBlob.config({
        fileCache: true,
      })
        .fetch('GET', url, {})
        .then(res => {
          this.selectPhotoToEncode(`file://${res.path()}`);
        });
    } else {
      Snackbar.show({
        text:
          "Failed to get a cat photo, check you're connected to the internet.",
      });
    }

    this.setState({loading: false});
  };

  private selectPhotoToEncode = (uri: string) => {
    this.props.navigation.navigate('Message', {uri});
  };
}
