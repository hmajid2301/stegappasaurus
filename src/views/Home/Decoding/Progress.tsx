import analytics from '@react-native-firebase/analytics';
import React from 'react';
import {View} from 'react-native';
// @ts-ignore
import ShareExtension from 'react-native-share-extension';
import {NavigationScreenProp} from 'react-navigation';

import bugsnag from '~/actions/Bugsnag/Bugsnag';
import Snackbar from '~/actions/Snackbar';
import Steganography from '~/actions/Steganography';
import {AppHeader} from '~/components/Header';
import ImageProgress from '~/components/ImageProgress';
import {secondary} from '~/constants/colors';
import {TabColors} from '~/constants/types';
import {ThemeContext} from '~/providers/ThemeContext';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

interface IState {
  photo: string;
  progress: number;
}

export default class Progress extends React.Component<IProps, IState> {
  public static contextType = ThemeContext;
  public context!: React.ContextType<typeof ThemeContext>;

  public state = {
    photo: this.props.navigation
      ? this.props.navigation.getParam('uri', 'NO-ID')
      : '',
    progress: 0,
  };

  public render() {
    return (
      <View style={{flex: 1}}>
        <AppHeader navigation={this.props.navigation} primary="#e88c0c" />
        <ImageProgress
          background={this.context.theme.background}
          photo={this.state.photo}
          primaryColor={secondary as TabColors}
          progress={this.state.progress}
        />
      </View>
    );
  }

  public async componentDidMount() {
    const {value} = await ShareExtension.data();
    if (value) {
      this.setState({photo: value});
    }
    await this.decodeImage();
  }

  private async decodeImage() {
    const steganography = new Steganography(this.state.photo);
    const timer = setInterval(() => {
      this.setState({progress: steganography.getProgress()});
    }, 50);
    try {
      const start = new Date().getTime();
      const decodedMessage = await steganography.decode();
      const end = new Date().getTime();
      clearInterval(timer);
      await this.success(decodedMessage);
      await analytics().logEvent('decoding_success', {time: end - start});
    } catch (error) {
      this.failed(error);
      bugsnag.notify(error);
      await analytics().logEvent('decoding_failed');
    } finally {
      this.setState({progress: 100});
      clearInterval(timer);
    }
  }

  private async success(message: string) {
    this.props.navigation.navigate('Message', {
      message,
      uri: this.state.photo,
    });
  }

  private failed(_: any) {
    Snackbar.show({
      text: 'Failed to decode image, please try again.',
    });
    this.props.navigation.navigate('Main');
  }
}
