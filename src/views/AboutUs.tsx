import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';

import AboutList from '~/components/AboutList';
import AppHeader from '~/components/AppHeader';
import {ITheme} from '~/constants/types';
import {about} from '~/data';
import styles from '~/views/AboutUs/styles';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  screenProps: {
    theme: ITheme;
  };
}

export default class AboutUs extends React.Component<IProps, {}> {
  public render() {
    const {theme} = this.props.screenProps;

    return (
      <View style={[styles.container, {backgroundColor: theme.background}]}>
        <ScrollView>
          <AppHeader navigation={this.props.navigation} theme={theme} />

          <View style={styles.textContainer}>
            <Text style={[styles.about, {color: theme.color}]}>
              Stegappasaurus is a free mobile application fully open source,
              built using React Native. This application uses steganography
              algorithms to hide your (text) data within images. This project
              was originally created as third year project for University.
              However this version is a complete rewrite of the application.
            </Text>
          </View>

          <View>
            <AboutList
              items={about}
              backgroundColor={theme.background}
              color={theme.color}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
