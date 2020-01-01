import React from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Icon, IconType} from 'react-native-elements';
import styled from 'styled-components/native';

import {body} from '~/constants/fonts';
import {TabColors, ThemeColors} from '~/constants/types';

interface Props {
  background: ThemeColors;
  onPress?: (...args: any) => void;
  icon?: {
    color: string;
    name: string;
    size: number;
    type: IconType;
  };
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
        {fill => (
          <BackgroundImage
            imageStyle={{
              borderRadius: pageWidth * 0.75,
              borderWidth: 5,
              overflow: 'hidden',
            }}
            source={{uri: props.photo}}>
            <IconContainer>
              {props.icon && <Icon {...props.icon} />}
              <PercentageText>{Math.ceil(fill)}%</PercentageText>
            </IconContainer>
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

const IconContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const PercentageText = styled.Text`
  color: black;
  font-family: ${body};
  font-size: 50;
`;

export default ImageProgress;
