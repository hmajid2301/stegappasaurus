import * as React from 'react';
import {Text, View} from 'react-native';
import {ListItem} from 'react-native-elements';

import MarkdownModal from '~/components/MarkdownModal';
import {ThemeColors} from '~/constants/types';
import license from '~/data/license';
import privatePolicy from '~/data/privatePolicy';
import termsOfUse from '~/data/termsOfUse';

import styles from './styles';

interface IProps {
  background: ThemeColors;
  color: ThemeColors;
}

export default class Support extends React.Component<IProps, {}> {
  public render() {
    const {background} = this.props;
    return (
      <View>
        <ListItem
          containerStyle={{
            backgroundColor: background,
          }}
          title={<Text style={styles.itemHeaderText}>Support</Text>}
          titleStyle={styles.itemHeader}
        />

        <ListItem
          containerStyle={{
            backgroundColor: background,
          }}
          title={this.PrivatePolicy()}
          topDivider={true}
          bottomDivider={true}
        />
        <ListItem
          containerStyle={{
            backgroundColor: background,
          }}
          title={this.TermsOfUse()}
          bottomDivider={true}
        />
        <ListItem
          containerStyle={{
            backgroundColor: background,
          }}
          title={this.License()}
          bottomDivider={true}
        />
      </View>
    );
  }

  private PrivatePolicy = () => (
    <MarkdownModal
      background={this.props.background}
      color={this.props.color}
      name="Private Policy">
      {privatePolicy}
    </MarkdownModal>
  );

  private TermsOfUse = () => (
    <MarkdownModal
      background={this.props.background}
      color={this.props.color}
      name="Terms of Use">
      {termsOfUse}
    </MarkdownModal>
  );

  private License = () => (
    <MarkdownModal
      background={this.props.background}
      color={this.props.color}
      name="License">
      {license}
    </MarkdownModal>
  );
}
