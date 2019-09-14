import * as React from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";
import { ListItem } from "react-native-elements";

import Snackbar from "~/actions/Snackbar";
import MarkdownModal from "~/components/MarkdownModal";
import changelog from "~/data/changelog";
import { ThemeColors } from "~/modules/types";
import styles from "./styles";

interface IProps {
  background: ThemeColors;
  color: ThemeColors;
}

const About = ({ background, color }: IProps) => (
  <View>
    <ListItem
      containerStyle={{
        backgroundColor: background
      }}
      titleStyle={styles.itemHeader}
      title={<Text style={styles.itemHeaderText}>About</Text>}
    />
    <ListItem
      containerStyle={{
        backgroundColor: background
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
        backgroundColor: background
      }}
      title={
        <View>
          <TouchableOpacity onPress={sendEmail}>
            <Text style={[styles.itemText, { color }]}>Email</Text>
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
    await Linking.openURL("mailto:me@haseebmajid.dev?subject=Stegappasaurus");
  } catch {
    Snackbar.show({
      text: "No email client installed on your device, failed to send email."
    });
  }
};

export default About;
