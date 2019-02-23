import { FileSystem, MediaLibrary } from "expo";
import React, { Component } from "react";
import { Linking, Platform } from "react-native";
import { NavigationScreenProp } from "react-navigation";

import ImageMessage from "~/components/ImageMessage";
import ImageProgressCircle from "~/components/ImageProgressCircle";
import { ITheme, PrimaryColor } from "~/util/interfaces";
import { colors } from "~/util/styles";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  screenProps: {
    theme: ITheme;
  };
}

interface IState {
  isEncoding: boolean;
  photo: string;
}

export default class EncodeImage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const { navigation } = props;
    const uri = navigation.getParam("uri", "NO-ID");

    this.state = {
      isEncoding: false,
      photo: uri
    };
  }

  public render() {
    const { theme } = this.props.screenProps;
    if (this.state.isEncoding) {
      return (
        <ImageProgressCircle
          action={this.encoded}
          message={"Saved Encoded Photo"}
          snackAction={this.openPhotos}
          photo={this.state.photo}
          primaryColor={colors.primary as PrimaryColor}
          theme={theme}
        />
      );
    }
    return <ImageMessage action={this.isEncoding} photo={this.state.photo} />;
  }

  private isEncoding = () => {
    this.setState({ isEncoding: true });
  };

  private encoded = async () => {
    await FileSystem.writeAsStringAsync(
      `${FileSystem.documentDirectory}tmpimg.jpg`,
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAPzAAAD8wF1XGupAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAJZQTFRF////SUmSQGCfQFWVPVyZOVuZO1eaPFmZO1qYO1mZO1mYO1mYOlmYPFmYO1mYO1mYO1qYO1mYPVuZP1yaQV6bQ2CcR2OeTWmiVG6lVW+mVnCmV3GnWnOoXnerZHytZn2va4Kxcoe1eY65gJS8ipzCi53CkKHFtsHZuMPau8bbwsvf09ro1Nvo1dvp4ubw9vf6/Pz9////XyoQ3AAAABF0Uk5TAAcIGBktSYSXmMHI2uPy8/XVqDFbAAABA0lEQVQ4y4WT2WKDIBBFcYkswbVp9n2pra1N/P+fC5gII5B4n8B7wJlhBiElL6KMpylnNPKQrZAkuVJCQsP2cZb3lGEf+sE4tzQOtD+Kc4fikTrv9AXxvMMH90+/vn/r+tj95REH1v78v5E6d3vc5gfi/2n95qJykdkS7X/chHut/47qCxH1A/VZyOMHGGfioQhs1xJY9zKJEFXrYrqVwGYyKTRAEVPrXdPppAGGuAPYa4Cj1AGsNJACYFlW0q3K8hMC/H0WHATpBBhI0wnQ4ULBUtuAKDV8LBsg/ee2gPa5QcNYADZazgSeLaeb1gDiwGz7YiZU2G0/PDjDozc8vK/H/w603kSHess3kQAAAABJRU5ErkJggg=="
    ).then();
    await MediaLibrary.createAssetAsync(
      `${FileSystem.documentDirectory}tmpimg.jpg`
    );
  };

  private openPhotos = async () => {
    switch (Platform.OS) {
      case "ios":
        await Linking.openURL("photos-redirect://");
        break;
      case "android":
        await Linking.openURL("content://media/internal/images/media");
        break;
      default:
        throw new Error("Could not open gallery app");
    }
  };
}
