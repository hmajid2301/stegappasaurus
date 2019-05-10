import * as React from "react";
import { Text, View } from "react-native";
import { ListItem } from "react-native-elements";

import MarkdownModal from "~/components/MarkdownModal";
import license from "~/views/Settings/content/license";
import privatePolicy from "~/views/Settings/content/privatePolicy";
import termsOfUse from "~/views/Settings/content/termsOfUse";

import styles from "./styles";

const PrivatePolicy = () => (
  <MarkdownModal name="Private Policy">{privatePolicy}</MarkdownModal>
);

const TermsOfUse = () => (
  <MarkdownModal name="Terms of Use">{termsOfUse}</MarkdownModal>
);

const License = () => <MarkdownModal name="License">{license}</MarkdownModal>;

const Support = () => (
  <View>
    <ListItem
      title={<Text style={styles.itemHeaderText}>Support</Text>}
      titleStyle={styles.itemHeader}
    />

    <ListItem
      title={<PrivatePolicy />}
      topDivider={true}
      bottomDivider={true}
    />
    <ListItem title={<TermsOfUse />} bottomDivider={true} />
    <ListItem title={<License />} bottomDivider={true} />
  </View>
);

export default Support;
