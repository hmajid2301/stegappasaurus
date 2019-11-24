import React from 'react';
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
  photo: string;
  progress: number;
}

export default class Progress extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const uri = this.props.navigation.getParam('uri', 'NO-ID');

    this.state = {
      photo: uri,
      progress: 0,
    };
  }

  public render() {
    const {theme} = this.props.screenProps;

    return (
      <ImageProgress
        background={theme.background}
        photo={this.state.photo}
        primaryColor={secondary as TabColors}
        progress={this.state.progress}
      />
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
