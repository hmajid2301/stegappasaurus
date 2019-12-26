import React from 'react';
import {View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';

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
    photo: this.props.navigation.getParam('uri', 'NO-ID'),
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
    await this.decodeImage();
  }

  private async decodeImage() {
    const steganography = new Steganography(this.state.photo);
    const timer = setInterval(() => {
      this.setState({progress: steganography.getProgress()});
    }, 50);
    try {
      const decodedMessage = await steganography.decode();
      clearInterval(timer);
      this.success(decodedMessage);
    } catch (error) {
      this.failed(error);
    } finally {
      this.setState({progress: 100});
      clearInterval(timer);
    }
  }

  private success(message: string) {
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
