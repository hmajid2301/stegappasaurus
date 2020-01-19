import analytics from '@react-native-firebase/analytics';
import React from 'react';
import {View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';

import bugsnag from '~/actions/Bugsnag/Bugsnag';
import Snackbar from '~/actions/Snackbar';
import Steganography from '~/actions/Steganography';
import {AppHeader} from '~/components/Header';
import ImageProgress from '~/components/ImageProgress';
import {secondary} from '~/constants/colors';
import {TabColors} from '~/constants/types';
import {ThemeContext} from '~/providers/ThemeContext';
import {getInnerProgressComponent} from '../Common';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

interface State {
  photo: string;
  innerProgressComponent: JSX.Element;
  progress: number;
}

export default class Progress extends React.Component<Props, State> {
  public static contextType = ThemeContext;
  public context!: React.ContextType<typeof ThemeContext>;

  public state = {
    innerProgressComponent: <View />,
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
          innerComponent={this.state.innerProgressComponent}
          photo={this.state.photo}
          primaryColor={secondary as TabColors}
          progress={this.state.progress}
        />
      </View>
    );
  }

  public async componentDidMount() {
    await this.decodeImage();
  }

  private async decodeImage() {
    const steganography = new Steganography(this.state.photo);
    const updater = setInterval(() => {
      const action = steganography.getCurrentAction();
      const progress = steganography.getProgress();
      const progressComponent = getInnerProgressComponent(
        action,
        progress,
        false,
      );
      this.setState({progress, innerProgressComponent: progressComponent});
    }, 50);
    try {
      const start = new Date().getTime();
      const decodedMessage = await steganography.decode();
      const end = new Date().getTime();
      this.success(decodedMessage);
      await analytics().logEvent('decoding_success', {time: end - start});
    } catch (error) {
      this.failed();
      bugsnag.notify(error);
      await analytics().logEvent('decoding_failed');
    } finally {
      const innerProgressComponent = getInnerProgressComponent(
        'done',
        100,
        false,
      );
      this.setState({progress: 100, innerProgressComponent});
      clearInterval(updater);
    }
  }

  private success(message: string) {
    this.props.navigation.navigate('Message', {
      message,
      uri: this.state.photo,
    });
  }

  private failed() {
    Snackbar.show({
      text: 'Failed to decode image, please try again.',
    });
    this.props.navigation.navigate('Main');
  }
}
