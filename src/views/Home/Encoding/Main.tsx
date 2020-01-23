import {create} from 'apisauce';
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
import PhotoAlbumList from '~/components/PhotoAlbumList';
import {primary} from '~/constants/colors';
import {ThemeContext} from '~/providers/ThemeContext';
import {
  ButtonsContainer,
  iconStyle,
  MainContainer,
  PhotoAlbumContainer,
  TouchableButton,
} from '../Common';

interface Props {
  navigation: NavigationScreenProp<any, any>;
  screenProps: {
    changeLoading: (isLoading: boolean) => any;
  };
}

interface State {
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
    permissionsChecked: false,
  };

  public render() {
    return (
      <MainContainer
        background={this.context.theme.background}
        testID={'hello'}>
        <MainHeader navigation={this.props.navigation} primary="#009cff" />
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
    this.props.screenProps.changeLoading(true);
    try {
      const api = create({
        baseURL: 'https://api.thecatapi.com',
        headers: {'x-api-key': Config.CAT_API_KEY},
        timeout: 10000,
      });

      const response = await api.get('/v1/images/search?mime_types=jpg,png');
      if (!response.ok) {
        throw new Error('cat_api_network');
      }

      const urls = response.data as CatAPIResponse[];
      const url = urls[0].url;

      await Image.prefetch(url);
      await RNFetchBlob.config({
        fileCache: true,
      })
        .fetch('GET', url, {})
        .then(res => {
          this.selectPhotoToEncode(`file://${res.path()}`);
        });
    } catch {
      Snackbar.show({
        text:
          "Failed to get a cat photo, check you're connected to the internet.",
      });
    }
    this.props.screenProps.changeLoading(false);
  };

  private selectPhotoToEncode = (uri: string) => {
    this.props.navigation.navigate('Message', {uri});
  };
}
