import * as React from 'react';
import {Image, Linking, View} from 'react-native';
import Canvas from 'react-native-canvas';
import Share from 'react-native-share';
import {NavigationScreenProp} from 'react-navigation';
import blob from 'rn-fetch-blob';

import Snackbar from '~/actions/Snackbar';
import Steganography from '~/actions/Steganography/Steganography';
import ImageProgress from '~/components/ImageProgress';
import {primary, pureWhite} from '~/constants/colors';
import {ITheme, TabColors} from '~/constants/types';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  screenProps: {
    theme: ITheme;
  };
}

interface IState {
  encodedUri: string;
  encoding: boolean;
  photo: string;
  progress: number;
}

export default class Progress extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const uri = this.props.navigation.getParam('uri', 'NO-ID');

    this.state = {
      encodedUri: '',
      encoding: true,
      photo: uri,
      progress: 0,
    };
  }

  public render() {
    const {theme} = this.props.screenProps;
    return (
      <View style={{flex: 1}}>
        <ImageProgress
          animating={this.state.encoding}
          background={theme.background}
          icon={{
            color: pureWhite,
            name: 'share',
            size: 130,
            type: 'font-awesome',
          }}
          onPress={this.shareImage}
          photo={this.state.photo}
          progress={this.state.progress}
          primaryColor={primary as TabColors}
        />
        <Canvas ref={this.encodeImage} style={{display: 'none'}} />
      </View>
    );
  }

  private async encodeImage(canvas: Canvas) {
    const message = this.props.navigation.getParam('message', 'NO-ID');
    Image.getSize(
      this.state.photo,
      async (width, height) => {
        try {
          const steganography = new Steganography(
            canvas,
            this.state.photo,
            width,
            height,
          );
          const timer = setInterval(() => {
            this.setState({progress: steganography.getProgress()});
          }, 100);
          const encodedImage = await steganography.encode(message, 'LSBv1');
          await this.success(encodedImage);
          clearInterval(timer);
        } catch (error) {
          this.failed(error);
        }
      },
      () => null,
    );
  }

  private async success(encodedImage: string) {
    const fs = blob.fs;
    Snackbar.show({
      buttonText: 'Open Album',
      onButtonPress: async () => {
        await Linking.openURL('content://media/internal/images/media');
      },
      text: 'Image saved to photo album.',
    });

    await fs.mkdir(fs.dirs.PictureDir + '/Stegappasaurus');
    const path =
      fs.dirs.PictureDir + '/Stegappasaurus' + `/${new Date().toISOString()}`;
    await fs.createFile(path, encodedImage.slice(23), 'base64');
    this.setState({encoding: false, encodedUri: path});
  }

  private failed(_: any) {
    this.sendUserBackToMain();
  }

  private shareImage = async () => {
    await Share.open({
      failOnCancel: false,
      message: 'Encoded image shared from stegappasaurus app.',
      url: this.state.encodedUri,
    });
  };

  private sendUserBackToMain() {
    Snackbar.show({
      text: 'Failed to encode image, please try again.',
    });
    this.props.navigation.navigate('EncodingMain');
  }
}
