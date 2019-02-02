import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Body, Button, Icon, Left, List, ListItem } from 'native-base';
import { StoreReview, WebBrowser } from 'expo';
import { connect } from 'react-redux';


import Header from '../components/Header';
import { colors, fonts } from '../util/styles';


const logo = require('../assets/images/logo.png');


const icons = [
  {
    title: 'Version 0.1.0',
    icon: {
      name: 'versions',
      type: 'Octicons',
    },
    color: colors.iconOrange,
    url: 'https://github.com/hmajid2301/Stegappasaurus',
  },
  {
    title: 'Fork this Project on GitHub',
    icon: {
      name: 'code-fork',
      type: 'FontAwesome',
    },
    color: colors.iconBlue,
    url: 'https://github.com/hmajid2301/Stegappasaurus',
  },
  {
    title: 'Personal GitHub',
    icon: {
      name: 'github',
      type: 'FontAwesome',
    },
    color: colors.iconBlack,
    url: 'https://github.com/hmajid2301',
  },
  {
    title: 'Personal Website',
    icon: {
      name: 'web',
      type: 'MaterialCommunityIcons',
    },
    color: colors.iconGreen,
    url: 'https://hmajid2301.github.io',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  textContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  text: {
    fontFamily: fonts.body,
  },
  logoImage: {
    height: 50,
    width: 50,
  },
  about: {
    paddingHorizontal: 20,
    fontFamily: fonts.body,
  },
});

class About extends Component {
  static navigationOptions = {
    drawerLabel: 'About Us',
    drawerIcon: ({ tintColor }) => (
      <Icon name='info' type='Feather' style={{ color: tintColor }}/>
    ),
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };

  renderFAQItem = item => (
    <ListItem icon key={item.title}>
      <Left>
        <Button
          onPress={() => WebBrowser.openBrowserAsync(item.url)}
          style={{ backgroundColor: item.color }}
        >
          <Icon {...item.icon} />
        </Button>
      </Left>
      <Body>
        <TouchableOpacity onPress={() => WebBrowser.openBrowserAsync(item.url)}>
          <Text style={[styles.text, { color: this.props.theme.color }]}>{item.title}</Text>
        </TouchableOpacity>
      </Body>
    </ListItem>
  );

  render() {
    return (
      <View style={[styles.container, { backgroundColor: this.props.theme.backgroundColor }]}>
        <ScrollView>
          <Header
            color={colors.primary}
            navigation={this.props.navigation}
            theme={this.props.theme}
          />

          <View style={styles.textContainer}>
            <Image source={logo} style={styles.logoImage}/>
            <Text style={[styles.about, { color: this.props.theme.color }]}>
              This project involves implementing steganography algorithms. It allows users
              to hide messages within image files, using these algorithms.
              It was originally developed using the Ionic/Apache Cordova framework.{'\n\n'}

              This app is a rewrite of my third year dissertation project.
              This new app is written using Expo/React Native.
              There are numerous improvements that were made during the rewrite.
              For example the new app has a much better UI/UX and
              has some new features such as sharing the encoded images.
            </Text>
          </View>

          <View>
            <List>
              {
                icons.map(item => (
                  this.renderFAQItem(item)
                ))
              }

              <ListItem icon>
                <Left>
                  <Button
                    onPress={() => StoreReview.requestReview()}
                    style={{ backgroundColor: colors.iconRed }}
                  >
                    <Icon name='rate-review' type='MaterialIcons'/>
                  </Button>
                </Left>
                <Body>
                  <TouchableOpacity onPress={() => StoreReview.requestReview()}>
                    <Text
                      style={[styles.text, { color: this.props.theme.color }]}
                    >
                      Rate the App</Text>
                  </TouchableOpacity>
                </Body>
              </ListItem>

            </List>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.ToggleDarkTheme.theme,
});

export default connect(mapStateToProps, null)(About);
