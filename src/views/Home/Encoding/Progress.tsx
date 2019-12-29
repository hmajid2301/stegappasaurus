import analytics from '@react-native-firebase/analytics';
import React from 'react';
import {Linking, View} from 'react-native';
import {check, PERMISSIONS, request} from 'react-native-permissions';
import Share from 'react-native-share';
import {NavigationScreenProp} from 'react-navigation';

import bugsnag from '~/actions/Bugsnag/Bugsnag';
import Snackbar from '~/actions/Snackbar';
import Steganography from '~/actions/Steganography';
import {AppHeader} from '~/components/Header';
import ImageProgress from '~/components/ImageProgress';
import {primary, pureWhite} from '~/constants/colors';
import {TabColors} from '~/constants/types';
import {ThemeContext} from '~/providers/ThemeContext';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

interface IState {
  encodedUri: string;
  photo: string;
  progress: number;
}

export default class Progress extends React.Component<IProps, IState> {
  public static contextType = ThemeContext;
  public context!: React.ContextType<typeof ThemeContext>;

  public state = {
    encodedUri: '',
    photo: this.props.navigation.getParam('uri', 'NO-ID'),
    progress: 0,
  };

  public render() {
    return (
      <View style={{flex: 1}}>
        <AppHeader navigation={this.props.navigation} primary="#009cff" />
        <ImageProgress
          background={this.context.theme.background}
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
      const start = new Date().getTime();
      const encodedImage = await steganography.encode(message, {
        algorithm: 'LSBv1',
      });
      const end = new Date().getTime();
      await this.success(encodedImage);
      await analytics().logEvent('encoding_success', {time: end - start});
    } catch (error) {
      this.failed(error);
      bugsnag.notify(error);
      await analytics().logEvent('encoding_failed');
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
    const response = await Share.open({
      failOnCancel: false,
      message: 'Encoded image shared from stegappasaurus app.',
      url: this.state.encodedUri,
    });
    await analytics().logShare({
      content_type: response.app as string,
      item_id: 'encoding',
    });
  };

  private sendUserBackToMain() {
    Snackbar.show({
      text: 'Failed to encode image, please try again.',
    });
    this.props.navigation.navigate('Main');
  }
}
