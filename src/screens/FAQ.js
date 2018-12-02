import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import Accordion from 'react-native-collapsible/Accordion';
import MathJax from 'react-native-mathjax';

import CustomHeader from '../components/CustomHeader';
import { colors, fonts }  from '../common';


const faq = [
  {
    title: 'What is steganography?',
    content: 'Steganography is the art/science of hiding data in plain sight. In the context of this app it allows' +
      'you hide text data within images. You do this by encoding the image with the text data. You can then send that image' +
      'and decode it using this app.',
  },
  {
    title: 'How does this app work?',
    content: 'It works by using different steganography algorithms, to encode the RGB (Red, Green, Blue) pixel values with the text ' +
      'data in such a way that the original data can be retrieved at a later date. One algorithm called LSB (Least Significant Bit), which' +
      'changes the last bit of each byte in the image. Each pixel has 4 bytes one for RGB and the last one the Alpha channel.\n\n' +

      'After the image has been encoded you save the newly encoded image, then you can share this image and you use this app ' +
      ' to decode and get the original encoded message.',
  },
  {
    title: 'What Algorithms do you use?',
    content: 'You can use the following algorithms to encode images: \n\n' +
              '- Bitmap Least Significant Bit (LSB) \n' +
              '- Discrete Cosine Transform (DCT) Least Significant Bit (LSB) \n',
  },
  {
    title: 'How much data can I encode with LSB?',
    content: 'It all depends on the image resolution, the bigger the image the more data you can encode in the image.' +
      'To find the out if your message will fit in the image you should solve the following equation' +
      '((h * w) * 3) - (ceil(log2(m))) - 8) - 8 * m > 0' +
      ', where h = Image Height (in Pixels), w = Image Width (in pixels) and m is the number of characters of your message.\n\n' +

      'To find the maximum number of characters we can encode we must use the same equation above except we plug in numbers of w and h, then solve for m.' +
      'Lets say our image is 100 x 100, then  we have 100 * 100 * 3 = 30,000 - 8 (for separator) = 29,992.. So 29,992 = ceil(log2(m)) - 8m = 3747.' +
      'So using the basic LSB we can encode a message with 3747 characters.\n\n' +

      'The reason me multiple message size (number of characters) by 8 is because each character' +
      'takes 1 byte or 8 bits to encode. So in summary we end up encoding the message length, followed by a separator also 8 bits.' +
      'Then we encode the actual message 8 bits for each character.',
  },
  {
    title: 'Can you show me an example?',
    content: 'Let\'s take a look at an example, we will use an image 100 x 100 = 10,000 pixels. Then we have 10,000 * 3 = 30,000 bits we can encode.' +
      'Lets say we want to encode "Hello World!", it\'s of length 12 so ceil(log2(12)) = 4 bits for the length of the image. We then need' +
      '8 bits for the separator so 12 bits. Then we need 12 * 8 = 96 bits for the message, so in total 96 + 12 = 108 bits would be required of 30,000.' +
      'To encode "Hello World!".',
  },
];

export default class App extends Component {
  static navigationOptions = {
    drawerLabel: 'FAQ',
    drawerIcon: ({ tintColor }) => (
      <Icon name='question-circle' type='font-awesome' color={tintColor} />
    ),
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
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

  renderHeader = section => (
    <View style={{ backgroundColor: colors.primary, flex: 1, justifyContent: 'center', alignItems: 'center', height: 50, borderBottomColor: colors.pureWhite, borderBottomWidth: 1 }}>
      <Text style={{ color: colors.pureWhite, fontFamily: 'RobotoLight' }}>{section.title}</Text>
    </View>
  );

  renderContent = section => (
    <View>
      <Text style={{ fontFamily: 'RobotoRegular' }}>{section.content}</Text>
    </View>
  );

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#eeeff3' }}>
        <ScrollView>
          <CustomHeader navigation={this.props.navigation} color={colors.quaternary} />

          <View style={{ alignItems: 'stretch', paddingTop: 20 }}>
            <Accordion
              activeSections={this.state.activeSections}
              sections={faq}
              touchableComponent={TouchableOpacity}
              renderHeader={this.renderHeader}
              renderContent={this.renderContent}
              duration={200}
              onChange={this.setSections}
            />
          </View>
        </ScrollView>
                <MathJax
          html={'Solve the equation $\\frac{x-2}{x+3}=\\frac{x-3}{2}$'}
        />
      </View>
    );
  }
}
