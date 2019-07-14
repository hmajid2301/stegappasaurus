import * as React from "react";
import { Text, View } from "react-native";
import { ListItem } from "react-native-elements";

import { ITheme } from "@types";
import MarkdownModal from "~/components/MarkdownModal";
import license from "~/views/Settings/content/license";
import privatePolicy from "~/views/Settings/content/privatePolicy";
import termsOfUse from "~/views/Settings/content/termsOfUse";

import styles from "./styles";

interface IProps {
  theme: ITheme;
}

const PrivatePolicy = () => (
  <MarkdownModal name="Private Policy">{privatePolicy}</MarkdownModal>
);

const TermsOfUse = () => (
  <MarkdownModal name="Terms of Use">{termsOfUse}</MarkdownModal>
);

const License = () => <MarkdownModal name="License">{license}</MarkdownModal>;

export default class Support extends React.Component<IProps, {}> {
  public render() {
    const { theme } = this.props;
    return (
      <View>
        <ListItem
          containerStyle={{
            backgroundColor: theme.background
          }}
          title={<Text style={styles.itemHeaderText}>Support</Text>}
          titleStyle={styles.itemHeader}
        />

        <ListItem
          containerStyle={{
            backgroundColor: theme.background
          }}
          title={<PrivatePolicy />}
          topDivider={true}
          bottomDivider={true}
        />
        <ListItem
          containerStyle={{
            backgroundColor: theme.background
          }}
          title={<TermsOfUse />}
          bottomDivider={true}
        />
        <ListItem
          containerStyle={{
            backgroundColor: theme.background
          }}
          title={<License />}
          bottomDivider={true}
        />
      </View>
    );
  }
}
