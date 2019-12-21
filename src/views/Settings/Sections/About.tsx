import React from 'react';
import {Linking, Text, TouchableOpacity, View} from 'react-native';
import {ListItem} from 'react-native-elements';

import Snackbar from '~/actions/Snackbar';
import MarkdownModal from '~/components/MarkdownModal';
import Modal from '~/components/Modal';
import {ThemeColors} from '~/constants/types';
import changelog from '~/data/changelog';

import AboutUs from './About/AboutUs';
import Licenses from './About/Licenses';
import styles from './styles';

interface IProps {
  background: ThemeColors;
  color: ThemeColors;
}

const About = ({background, color}: IProps) => (
  <View>
    <ListItem
      containerStyle={{
        backgroundColor: background,
      }}
      titleStyle={styles.itemHeader}
      title={<Text style={styles.itemHeaderText}>About</Text>}
    />

    <ListItem
      containerStyle={{
        backgroundColor: background,
      }}
      title={
        <Modal background={background} color={color} name="About Us">
          <AboutUs background={background} color={color} />
        </Modal>
      }
      topDivider={true}
    />

    <ListItem
      containerStyle={{
        backgroundColor: background,
      }}
      title={
        <Modal background={background} color={color} name="Licenses">
          <Licenses background={background} color={color} />
        </Modal>
      }
      topDivider={true}
      bottomDivider={true}
    />

    <ListItem
      containerStyle={{
        backgroundColor: background,
      }}
      title={
        <MarkdownModal background={background} color={color} name="Changelog">
          {changelog}
        </MarkdownModal>
      }
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
            <Text style={[styles.itemText, {color}]}>Email</Text>
            <Text style={[styles.itemText, styles.itemTextUnder]}>
              me@haseebmajid.dev
            </Text>
          </TouchableOpacity>
        </View>
      }
      bottomDivider={true}
    />
  </View>
);

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
