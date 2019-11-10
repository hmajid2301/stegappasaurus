import * as React from 'react';
import {Image, View} from 'react-native';
import Canvas from 'react-native-canvas';
import {NavigationScreenProp} from 'react-navigation';

import Snackbar from '~/actions/Snackbar';
import Steganography from '~/actions/Steganography/Steganography';
import ImageProgress from '~/components/ImageProgress';
import {secondary} from '~/constants/colors';
import {ITheme, TabColors} from '~/constants/types';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  screenProps: {
    theme: ITheme;
  };
}

interface IState {
  decoding: boolean;
  photo: string;
  progress: number;
}

export default class Progress extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const uri = this.props.navigation.getParam('uri', 'NO-ID');

    this.state = {
      decoding: true,
      photo: uri,
      progress: 0,
    };
  }

  public render() {
    const {theme} = this.props.screenProps;

    return (
      <View style={{flex: 1}}>
        <ImageProgress
          animating={this.state.decoding}
          background={theme.background}
          photo={this.state.photo}
          primaryColor={secondary as TabColors}
          progress={this.state.progress}
        />
        <Canvas ref={this.decodeImage} style={{display: 'none'}} />
      </View>
    );
  }

  private async decodeImage(canvas: Canvas) {
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
          const decodedMessage = await steganography.decode();
          clearInterval(timer);
          this.success(decodedMessage);
        } catch (error) {
          this.failed(error);
        }
      },
      () => null,
    );
  }

  private success(message: string) {
    this.props.navigation.navigate('DecodingMessage', {
      message,
      uri: this.state.photo,
    });
  }

  private failed(_: any) {
    Snackbar.show({
      text: 'Failed to decode image, please try again.',
    });
    this.props.navigation.goBack();
  }
}
