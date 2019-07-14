import * as MailComposer from "expo-mail-composer";
import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ListItem } from "react-native-elements";

import { ITheme } from "@types";

import MarkdownModal from "~/components/MarkdownModal";
import changelog from "~/views/Settings/content/changelog";

const Changelog = () => (
  <MarkdownModal name="Changelog">{changelog}</MarkdownModal>
);
import styles from "./styles";

interface IProps {
  theme: ITheme;
}

const sendEmail = async () => {
  await MailComposer.composeAsync({
    recipients: ["me@haseebmajid.com"],
    subject: "Stegappasaurus"
  });
};

const About = ({ theme }: IProps) => (
  <View>
    <ListItem
      containerStyle={{
        backgroundColor: theme.background
      }}
      titleStyle={styles.itemHeader}
      title={<Text style={styles.itemHeaderText}>About</Text>}
    />
    <ListItem
      containerStyle={{
        backgroundColor: theme.background
      }}
      title={<Changelog />}
      topDivider={true}
      bottomDivider={true}
    />

    <ListItem
      containerStyle={{
        backgroundColor: theme.background
      }}
      title={
        <View>
          <TouchableOpacity onPress={() => sendEmail()}>
            <Text style={[styles.itemText, { color: theme.color }]}>Email</Text>
            <Text style={[styles.itemText, styles.itemTextUnder]}>
              me@haseebmajid.com
            </Text>
          </TouchableOpacity>
        </View>
      }
      bottomDivider={true}
    />
  </View>
);

export default About;
