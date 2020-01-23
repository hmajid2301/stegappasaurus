import React, {useContext} from 'react';
import {Linking, TouchableOpacity, View} from 'react-native';
import {ListItem} from 'react-native-elements';

import Snackbar from '~/actions/Snackbar';
import MarkdownModal from '~/components/MarkdownModal';
import Modal from '~/components/Modal';
import changelog from '~/data/changelog';
import {ThemeContext} from '~/providers/ThemeContext';
import AboutUs from './About/AboutUs';
import Licenses from './About/Licenses';
import {ItemHeaderText, ItemText} from './common';

const About = () => {
  const {background, color} = useContext(ThemeContext).theme;

  return (
    <View>
      <ListItem
        containerStyle={{
          backgroundColor: background,
        }}
        titleStyle={{
          paddingBottom: 5,
          paddingTop: 20,
        }}
        title={<ItemHeaderText>About</ItemHeaderText>}
      />

      <ListItem
        containerStyle={{
          backgroundColor: background,
        }}
        title={
          <Modal name="About Us">
            <AboutUs />
          </Modal>
        }
        topDivider={true}
      />

      <ListItem
        containerStyle={{
          backgroundColor: background,
        }}
        title={
          <Modal name="Licenses">
            <Licenses />
          </Modal>
        }
        topDivider={true}
        bottomDivider={true}
      />

      <ListItem
        containerStyle={{
          backgroundColor: background,
        }}
        title={<MarkdownModal name="Changelog">{changelog}</MarkdownModal>}
        topDivider={true}
        bottomDivider={true}
      />

      <ListItem
        containerStyle={{
          backgroundColor: background,
        }}
        title={
          <View>
            <TouchableOpacity onPress={sendEmail}>
              <ItemText color={color}>Email</ItemText>
            </TouchableOpacity>
          </View>
        }
        subtitle={<ItemText color="grey">me@haseebmajid.dev</ItemText>}
        bottomDivider={true}
      />
    </View>
  );
};

const sendEmail = async () => {
  try {
    await Linking.openURL('mailto:me@haseebmajid.dev?subject=Stegappasaurus');
  } catch {
    Snackbar.show({
      text: 'Failed to open an email app.',
    });
  }
};

export default About;
