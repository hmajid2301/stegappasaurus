import React, {useContext} from 'react';
import {ScrollView, View} from 'react-native';
import styled from 'styled-components/native';

import AboutList from '~/components/AboutList/AboutList';
import {bodyLight} from '~/constants/fonts';
import {ThemeColors} from '~/constants/types';
import {about} from '~/data';
import {ThemeContext} from '~/providers/ThemeContext';

const AboutUs = () => {
  const {background, color} = useContext(ThemeContext).theme;

  return (
    <AboutContainer background={background}>
      <ScrollView>
        <TextContainer>
          <AboutText color={color}>
            Stegappasaurus is a free mobile application fully open source, built
            using React Native. This application uses steganography algorithms
            to hide your (text) data within images. This project was originally
            created as third year project for University. However this version
            is a complete rewrite of the application.
          </AboutText>
        </TextContainer>

        <View>
          <AboutList items={about(color)} />
        </View>
      </ScrollView>
    </AboutContainer>
  );
};

const AboutContainer = styled.View<{background: ThemeColors}>`
  background: ${props => props.background};
  flex: 1;
  flex-direction: column;
`;

const TextContainer = styled.View`
  align-items: center;
  padding: 20px 0;
`;

const AboutText = styled.Text<{color: ThemeColors}>`
  color: ${props => props.color};
  font-family: ${bodyLight};
  padding: 0 20px;
`;

export default AboutUs;
