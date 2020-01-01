import React from 'react';
import {Icon} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import {NavigationScreenProp} from 'react-navigation';

import Snackbar from '~/actions/Snackbar';
import {MainHeader} from '~/components/Header';
import PhotoAlbumList from '~/components/PhotoAlbumList';
import {secondary} from '~/constants/colors';
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

export default class Main extends React.Component<Props, {}> {
  public static contextType = ThemeContext;
  public context!: React.ContextType<typeof ThemeContext>;

  public render() {
    return (
      <MainContainer background={this.context.theme.background}>
        <MainHeader navigation={this.props.navigation} primary="#e88c0c" />
        <ButtonsContainer>
          <TouchableButton
            button={secondary}
            onPress={this.getPhotoFromCameraRoll}
            testID="cameraroll">
            <Icon name="photo" iconStyle={iconStyle} type="font-awesome" />
          </TouchableButton>
        </ButtonsContainer>

        <PhotoAlbumContainer>
          <PhotoAlbumList onPhotoPress={this.selectPhotoToDecode} />
        </PhotoAlbumContainer>
      </MainContainer>
    );
  }

  private getPhotoFromCameraRoll = () => {
    try {
      ImagePicker.launchImageLibrary(
        {
          mediaType: 'photo',
        },
        response => {
          if (!response.didCancel) {
            this.selectPhotoToDecode(response.uri);
          }
        },
      );
    } catch {
      Snackbar.show({
        text: 'This app does not have permission to access the camera roll.',
      });
    }
  };

  private selectPhotoToDecode = (uri: string) => {
    this.props.navigation.navigate('Progress', {uri});
  };
}
