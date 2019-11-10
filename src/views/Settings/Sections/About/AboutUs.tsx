import React from 'react';
import {ScrollView, Text, View} from 'react-native';

import AboutList from '~/components/AboutList';
import {ThemeColors} from '~/constants/types';
import {about} from '~/data';
import styles from './AboutUs/styles';

interface IProps {
  background: ThemeColors;
  color: ThemeColors;
}

const AboutUs = (props: IProps) => (
  <View style={[styles.container, {backgroundColor: props.background}]}>
    <ScrollView>
      <View style={styles.textContainer}>
        <Text style={[styles.about, {color: props.color}]}>
          Stegappasaurus is a free mobile application fully open source, built
          using React Native. This application uses steganography algorithms to
          hide your (text) data within images. This project was originally
          created as third year project for University. However this version is
          a complete rewrite of the application.
        </Text>
      </View>

      <View>
        <AboutList
          items={about}
          backgroundColor={props.background}
          color={props.color}
        />
      </View>
    </ScrollView>
  </View>
);

export default AboutUs;
