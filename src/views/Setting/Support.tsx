import React, {useContext} from 'react';
import {View} from 'react-native';
import {ListItem} from 'react-native-elements';

import MarkdownModal from '~/components/MarkdownModal';
import license from '~/data/license';
import privatePolicy from '~/data/privatePolicy';
import termsOfUse from '~/data/termsOfUse';
import {ThemeContext} from '~/providers/ThemeContext';
import {ItemHeaderText} from './common';

const Support = () => {
  const {background} = useContext(ThemeContext).theme;

  return (
    <View>
      <ListItem
        containerStyle={{
          backgroundColor: background,
        }}
        title={<ItemHeaderText>Support</ItemHeaderText>}
        titleStyle={{
          paddingBottom: 5,
          paddingTop: 20,
        }}
      />

      <ListItem
        containerStyle={{
          backgroundColor: background,
        }}
        title={PrivatePolicy()}
        topDivider={true}
        bottomDivider={true}
      />
      <ListItem
        containerStyle={{
          backgroundColor: background,
        }}
        title={TermsOfUse()}
        bottomDivider={true}
      />
      <ListItem
        containerStyle={{
          backgroundColor: background,
        }}
        title={License()}
        bottomDivider={true}
      />
    </View>
  );
};

const PrivatePolicy = () => (
  <MarkdownModal name="Private Policy">{privatePolicy}</MarkdownModal>
);

const TermsOfUse = () => (
  <MarkdownModal name="Terms of Use">{termsOfUse}</MarkdownModal>
);

const License = () => <MarkdownModal name="License">{license}</MarkdownModal>;

export default Support;
