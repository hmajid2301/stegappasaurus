import React from 'react';
import {ImageSourcePropType, StatusBar} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import styled from 'styled-components/native';

import {body, header} from '~/constants/fonts';

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
      <IntroContainer>
        <StatusBar hidden={true} />
        <AppIntroSlider
          onDone={this.props.onDone}
          onSkip={this.props.onDone}
          renderItem={this.renderSlide}
          showSkipButton={true}
          slides={this.props.slides}
        />
      </IntroContainer>
    );
  }

  public renderSlide = ({dimensions, item}: IRenderProps) => (
    <SlideContainer
      background={item.color}
      width={dimensions.width}
      height={dimensions.height}>
      <MainText>{item.title}</MainText>
      <SlideImage source={item.image} />
      <SubtitleText>{item.text}</SubtitleText>
    </SlideContainer>
  );
}

const IntroContainer = styled.View`
  flex: 1;
`;

const SlideContainer = styled.View<{
  height: number;
  width: number;
  background: string;
}>`
  align-items: center;
  flex: 1;
  justify-content: space-around;
  background-color: ${props => props.background};
  height: ${props => props.height};
  width: ${props => props.width};
`;

const MainText = styled.Text`
  background-color: transparent;
  color: white;
  font-family: ${header};
  font-size: 35;
  text-align: center;
`;

const SlideImage = styled.Image`
  height: 400;
  width: 400;
`;

const SubtitleText = styled.Text`
  background-color: transparent;
  color: #f5f0f0;
  font-family: ${body};
  padding-left: 30;
  padding-bottom: 50;
  text-align: center;
`;
