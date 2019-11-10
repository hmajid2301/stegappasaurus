import React from 'react';
import {Image, ImageSourcePropType, StatusBar, Text, View} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

import styles from './styles';

export interface ISlide {
  color: string;
  height?: number;
  image: ImageSourcePropType;
  key: string;
  text: string;
  title: string;
  width?: number;
}

interface IProps {
  slides: ISlide[];
  onDone: () => void;
}

interface IRenderProps {
  dimensions: {
    height: number;
    width: number;
  };
  item: ISlide;
}

export default class IntroSlider extends React.Component<IProps, {}> {
  public render() {
    return (
      <View style={styles.contentContainer}>
        <StatusBar hidden={true} />
        <AppIntroSlider
          onDone={this.props.onDone}
          onSkip={this.props.onDone}
          renderItem={this.renderSlide}
          showSkipButton={true}
          slides={this.props.slides}
        />
      </View>
    );
  }

  public renderSlide = ({dimensions, item}: IRenderProps) => (
    <View
      style={[
        styles.container,
        {
          backgroundColor: item.color,
          height: dimensions.height,
          width: dimensions.width,
        },
      ]}>
      <Text style={styles.title}>{item.title}</Text>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );
}
