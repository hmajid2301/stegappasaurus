import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Dimensions,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { Icon } from 'react-native-elements';

import Header from '../components/Header';
import { colors, fonts } from '../util/styles';


const faq = [
  {
    title: 'What is steganography?',
    content: 'Steganography is the art/science of hiding data in plain sight. In the context of this app, it allows ' +
      'you to hide messages (text) within images. You do this by encoding the image with the text data. You can then share the image ' +
      'with other people and they can decode the image (retrieve the original message) using this app.',
  },
  {
    title: 'So is it the same as encryption?',
    content: 'Not quite, encryption involves obscuring information whereas steganography is concerned with hiding it. ' +
      'With encryption if you have the encrypted message you cannot retrieve the original message. \n\n' +

      'Whereas with steganography if you know where to look you can retrieve the original message, it is not obscured in any way. ' +
      'However, with encryption it is obvious you are trying to hide something but with steganography you can hide your message inside ' +
      'of an "innocent" looking image, with a third party without anyone noticing.\n\n' +

      'You can combine the two "techniques", encrypt your data before encoding it into an image, then simply decrypt the' +
      'message after decoding it from the image, ' +
      'for added security. This involves a shared secret "password" between you and the person you are sending the image to.',
  },
  {
    title: 'How does this app work?',
    content: 'This app uses different steganography algorithms to encode the RGB (Red, Green, Blue) pixel values with the text ' +
      'data in such a way that the original data can be retrieved at a later date.\n\n' +

      'After the image has been encoded you can save the image, then you can share this image and you use this app ' +
      'to decode and get the originally encoded message.\n\n' +

      'In general each algorithm will encode the size of the message, this is so that when decoding the image we know when to stop. ' +
      'It will then encode a separator (£ in ASCII), this is so that again when we decode we know from this point to decode n characters. ' +
      'Each character in the message usually uses 8 bits in the images, this is because we encode it as a the ASCII representation of the letter or symbol.',
  },
  {
    title: 'What Algorithms can you use?',
    content: 'You can use the following algorithms to encode/decode images: \n\n' +
              'Bitmap Least Significant Bit (LSB) \n' +
              'Discrete Cosine Transform (DCT) Least Significant Bit (LSB) \n',
  },
  {
    title: 'How much data can I encode with LSB?',
    content: 'It all depends on the image resolution, the bigger the image the more data you can encode. ' +
      'To find out if your message will fit in the image you should solve Equation 1 shown below where,' +
      '\n\n h = Image Height (in Pixels), \n w = Image Width (in pixels) and \n m is the number of characters in your message\n\n' +

      'To find the maximum number of characters we can encode we must use the same equation above except we = 0 not > 0 and we will solve for "m". ' +
      'Let\'s say our image is 100 x 100, then we have 100 * 100 * 3 = 30,000 - 8 (for separator) = 29,992. So 29,992 = ceil(log2(m)) - 8m = 3747. ' +
      'So using the LSB algorithm we can encode a message with 3747 characters.\n\n' +
      'Note: With LSB we only can encode one bit per byte of data, so that we don\'t completely change the colour of that pixel.' +
      'Equation 1: 3(h * w) - ceil(log2(m)) - 8m -8 > 0',
  },
  {
    title: 'Can you show me an example?',
    content: 'We will use an image 100 x 100 = 10,000 pixels. So 10,000 * 3 * 8 = 30,000 bits we can encode.' +
      'Let\'s say we want to encode "Hello World!", it\'s of length 12 so ceil(log2(12)) = 4 bits for the length of the message. ' +
      'So  4 + 8 = 12 bits required so far. Each character we encode will take 8 bits and we have 12 characters ' +
      '(including blank space) 12 * 8 = 96 bits for the message, so in total 96 + 12 = 108 bits ' +
      'would be required out of 30,000, to encode the message "Hello World!".',
  },
  {
    title: 'Why can we only use one bit out of every byte?',
    content: 'If we used the entire byte, remember per pixel we get 3 bytes (one for each RGB item), we would drastically ' +
      'change the colour of image.',
  },
];

const styles = StyleSheet.create({
  sectionHeaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderBottomColor: colors.pureWhite,
    borderBottomWidth: 1,
  },
  active: {
    backgroundColor: colors.primary,
  },
  inactive: {
    backgroundColor: colors.secondary,
  },
  sectionHeader: {
    color: colors.pureWhite,
    fontFamily: fonts.body,
  },
  sectionContentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionContent: {
    fontFamily: fonts.body,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  accordionContainer: {
    alignItems: 'stretch',
    paddingTop: 20,
  },
  image: {
    width: (Dimensions.get('window').width - 40),
    height: 200,
    resizeMode: 'contain',
  },
});


export default class FAQ extends Component {
  static navigationOptions = {
    drawerLabel: 'FAQ',
    drawerIcon: ({ tintColor }) => (
      <Icon name='question-circle' type='font-awesome' color={tintColor}/>
    ),
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  state = {
    activeSections: [],
    collapsed: true,
  };

  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  setSections = (sections) => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  renderHeader = (section, _, isActive) => (
    <View style={[styles.sectionHeaderContainer, isActive ? styles.inactive : styles.active]}>
      <Text style={styles.sectionHeader}>{section.title}</Text>
    </View>
  );

  renderContent = section => (
    <View style={styles.sectionContentContainer}>
      <Text style={styles.sectionContent}>{section.content}</Text>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Header color={colors.primary} navigation={this.props.navigation}/>

          <View style={styles.accordionContainer}>
            <Accordion
              activeSections={this.state.activeSections}
              duration={200}
              onChange={this.setSections}
              renderContent={this.renderContent}
              renderHeader={this.renderHeader}
              sections={faq}
              touchableComponent={TouchableOpacity}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
