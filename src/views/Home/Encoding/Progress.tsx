import React from 'react';
import {Linking, View} from 'react-native';
import {check, PERMISSIONS, request} from 'react-native-permissions';
import Share from 'react-native-share';
import {NavigationScreenProp} from 'react-navigation';

import Snackbar from '~/actions/Snackbar';
import Steganography from '~/actions/Steganography';
import {AppHeader} from '~/components/Header';
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
  photo: string;
  progress: number;
}

export default class Progress extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const uri = this.props.navigation.getParam('uri', 'NO-ID');

    this.state = {
      encodedUri: '',
      photo: uri,
      progress: 0,
    };
  }

  public render() {
    const {theme} = this.props.screenProps;

    return (
      <View style={{flex: 1}}>
        <AppHeader
          navigation={this.props.navigation}
          primary="#009cff"
          theme={theme}
        />
        <ImageProgress
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
      </View>
    );
  }

  public async componentDidMount() {
    status = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    if (status !== 'blocked') {
      await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    }

    await this.encodeImage();
  }

  private async encodeImage() {
    const message = this.props.navigation.getParam('message', 'NO-ID');
    const steganography = new Steganography(this.state.photo);
    const timer = setInterval(() => {
      this.setState({progress: steganography.getProgress()});
    }, 50);
    try {
      const encodedImage = await steganography.encode(message, {
        algorithm: 'LSBv1',
      });
      await this.success(encodedImage);
    } catch (error) {
      this.failed(error);
    } finally {
      this.setState({progress: 100});
      clearInterval(timer);
    }
  }

  private async success(encodedImage: string) {
    Snackbar.show({
      buttonText: 'Open Album',
      onButtonPress: async () => {
        await Linking.openURL('content://media/internal/images/media');
      },
      text: 'Image saved to photo album.',
    });
    this.setState({encodedUri: encodedImage});
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
    this.props.navigation.navigate('Main');
  }
}
