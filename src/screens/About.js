import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Icon, List, ListItem } from 'react-native-elements';
import { StoreReview, WebBrowser } from 'expo';
import Header from '../components/Header';
import { colors, fonts } from '../util/styles';


const logo = require('../assets/images/logo.png');


const icons = [
  {
    title: 'Fork this Project on GitHub',
    icon: {
      name: 'code-fork',
      type: 'font-awesome',
      color: colors.iconBlack,
    },
    url: 'https://github.com/hmajid2301/Stegappasaurus',
  },
  {
    title: 'Personal GitHub',
    icon: {
      name: 'github',
      type: 'font-awesome',
      color: colors.iconBlack,
    },
    url: 'https://github.com/hmajid2301',
  },
  {
    title: 'Personal Website',
    icon: {
      name: 'web',
      type: 'material-community',
      color: colors.iconBlack,
    },
    url: 'https://hmajid2301.github.io',
  },
];

const styles = StyleSheet.create({
  listItem: {
    borderBottomColor: colors.listGrey,
    borderBottomWidth: 1,
  },
  listItemNoIconText: {
    marginLeft: 0,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  textContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  logoImage: {
    height: 50,
    width: 50,
  },
  about: {
    paddingHorizontal: 20,
    fontFamily: fonts.body,
  },
  listContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.listGrey,
  },
});

export default class About extends Component {
  static navigationOptions = {
    drawerLabel: 'About Us',
    drawerIcon: ({ tintColor }) => (
      <Icon name='info' type='simple-line-icons' color={tintColor}/>
    ),
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  renderFAQItem = item => (
    <ListItem
      containerStyle={styles.listItem}
      fontFamily={fonts.body}
      hideChevron
      key={item.title}
      leftIcon={{ ...item.icon }}
      onPress={() => WebBrowser.openBrowserAsync(item.url)}
      title={item.title}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Header color={colors.primary} navigation={this.props.navigation}/>

          <View style={styles.textContainer}>
            <Image source={logo} style={styles.logoImage}/>
            <Text style={styles.about}>
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
            <List containerStyle={styles.listContainer}>
                <ListItem
                  containerStyle={styles.listItem}
                  fontFamily={fonts.body}
                  key={'Version 0.1.0'}
                  hideChevron
                  title={'Version 0.1.0'}
                  titleStyle={styles.listItemNoIconText}
                />
              
              {
                icons.map(item => (
                  this.renderFAQItem(item)
                ))
              }
              
              <ListItem
                containerStyle={styles.listItem}
                fontFamily={fonts.body}
                hideChevron
                key={'Rate the App'}
                leftIcon={{ name: 'rate-review', type: 'material-icons', color: colors.iconBlack }}
                onPress={() => StoreReview.requestReview()}
                title={'Rate the app'}
              />
            </List>
          </View>
        </ScrollView>
      </View>
    );
  }
}
