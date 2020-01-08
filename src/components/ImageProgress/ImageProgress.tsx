import React from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import styled from 'styled-components/native';

import {TabColors, ThemeColors} from '~/constants/types';

interface Props {
  background: ThemeColors;
  innerComponent: JSX.Element;
  onPress?: (...args: any) => void;
  progress: number;
  photo: string;
  primaryColor: TabColors;
}

const pageWidth = Dimensions.get('window').width;

const ImageProgress: React.FunctionComponent<Props> = (props: Props) => (
  <ProgressContainer background={props.background}>
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onPress}
      testID="action">
      <AnimatedCircularProgress
        size={pageWidth * 0.75}
        width={3}
        fill={props.progress}
        tintColor={props.primaryColor}>
        {_ => (
          <BackgroundImage
            imageStyle={{
              borderRadius: pageWidth * 0.75,
              borderWidth: 5,
              overflow: 'hidden',
            }}
            source={{uri: props.photo}}>
            <TextContainer>{props.innerComponent}</TextContainer>
          </BackgroundImage>
        )}
      </AnimatedCircularProgress>
    </TouchableOpacity>
  </ProgressContainer>
);

const ProgressContainer = styled.View<{background: ThemeColors}>`
  align-items: center;
  flex: 1;
  justify-content: center;
  background-color: ${props => props.background};
`;

const BackgroundImage = styled.ImageBackground`
  height: ${pageWidth * 0.75};
  opacity: 0.65;
  width: ${pageWidth * 0.75};
`;

const TextContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default ImageProgress;
