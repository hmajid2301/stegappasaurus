import analytics from '@react-native-firebase/analytics';
import React from 'react';
import {Linking, View} from 'react-native';
import {check, PERMISSIONS, request} from 'react-native-permissions';
import Share from 'react-native-share';
import {NavigationScreenProp} from 'react-navigation';
import RNFetchBlob from 'rn-fetch-blob';

import bugsnag from '~/actions/Bugsnag/Bugsnag';
import Snackbar from '~/actions/Snackbar';
import Steganography from '~/actions/Steganography';
import {AppHeader} from '~/components/Header';
import ImageProgress from '~/components/ImageProgress';
import {primary} from '~/constants/colors';
import {TabColors} from '~/constants/types';
import {ThemeContext} from '~/providers/ThemeContext';
import {getInnerProgressComponent} from '../Common';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

interface State {
  encodedUri: string;
  innerProgressComponent: JSX.Element;
  photo: string;
  progress: number;
}

export default class Progress extends React.Component<Props, State> {
  public static contextType = ThemeContext;
  public context!: React.ContextType<typeof ThemeContext>;

  public state = {
    encodedUri: '',
    innerProgressComponent: <View />,
    photo: this.props.navigation.getParam('uri', 'NO-ID'),
    progress: 0,
  };

  public render() {
    return (
      <View style={{flex: 1}}>
        <AppHeader navigation={this.props.navigation} primary="#009cff" />
        <ImageProgress
          background={this.context.theme.background}
          innerComponent={this.state.innerProgressComponent}
          onPress={this.shareImage}
          photo={this.state.photo}
          progress={this.state.progress}
          primaryColor={primary as TabColors}
        />
      </View>
    );
  }

  public async componentDidMount() {
    const status = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    if (status !== 'blocked') {
      await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    }

    await this.encodeImage();
  }

  private async encodeImage() {
    const message = this.props.navigation.getParam('message', 'NO-ID');
    const steganography = new Steganography(this.state.photo);
    const updater = setInterval(() => {
      const action = steganography.getCurrentAction();
      const progress = steganography.getProgress();
      const progressComponent = getInnerProgressComponent(action, progress);
      this.setState({progress, innerProgressComponent: progressComponent});
    }, 50);

    try {
      const start = new Date().getTime();
      const encodedImage = await steganography.encode(message, {
        algorithm: 'LSBv1',
      });
      const end = new Date().getTime();
      this.success(encodedImage);
      await analytics().logEvent('encoding_success', {time: end - start});
    } catch (error) {
      bugsnag.notify(error, function(report) {
        report.severity = 'error';
      });
      await analytics().logEvent('encoding_failed');
      this.failed();
    } finally {
      const innerProgressComponent = getInnerProgressComponent('done', 100);
      this.setState({progress: 100, innerProgressComponent});
      clearInterval(updater);
    }
  }

  private success(encodedImage: string) {
    Snackbar.show({
      buttonText: 'Open Album',
      onButtonPress: async () => {
        await Linking.openURL('content://media/internal/images/media');
      },
      text: 'Image saved to photo album.',
    });
    this.setState({encodedUri: encodedImage});
  }

  private failed() {
    this.sendUserBackToMain();
  }

  private shareImage = async () => {
    const base64Image = await RNFetchBlob.fs.readFile(
      this.state.encodedUri,
      'base64',
    );

    const response = await Share.open({
      failOnCancel: false,
      message: 'Encoded image shared from stegappasaurus app.',
      url: `data:image/png;base64,${base64Image}`,
    });

    if (response) {
      await analytics().logShare({
        content_type: response.app as string,
        item_id: 'encoding',
      });
    }
  };

  private sendUserBackToMain() {
    Snackbar.show({
      text: 'Failed to encode image, please try again.',
    });
    this.props.navigation.navigate('Main');
  }
}
