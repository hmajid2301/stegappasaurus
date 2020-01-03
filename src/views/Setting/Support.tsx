import AsyncStorage from '@react-native-community/async-storage';
import analytics from '@react-native-firebase/analytics';
import React from 'react';
import {View} from 'react-native';
import {Icon, ListItem} from 'react-native-elements';

import MarkdownModal from '~/components/MarkdownModal';
import license from '~/data/license';
import privatePolicy from '~/data/privatePolicy';
import termsOfUse from '~/data/termsOfUse';
import {ThemeContext} from '~/providers/ThemeContext';
import {ItemHeaderText, ItemText} from './common';

interface State {
  usage: boolean;
}

export default class Support extends React.Component<{}, State> {
  public static contextType = ThemeContext;
  public context!: React.ContextType<typeof ThemeContext>;

  public state = {
    usage: false,
  };

  public render() {
    const {background, color} = this.context.theme;

    return (
      <View>
        <ListItem
          containerStyle={{
            backgroundColor: background,
          }}
          title={<ItemHeaderText>Support</ItemHeaderText>}
        />

        <ListItem
          containerStyle={{
            backgroundColor: background,
          }}
          topDivider={true}
          bottomDivider={true}
          title={<ItemText color={color}>Usage Statistics</ItemText>}
          subtitle={
            <ItemText color={color}>
              To help us improve the app you send us usage statistics and
              analytics about the app.
            </ItemText>
          }
          checkBox={{
            checked: this.state.usage,
            checkedIcon: (
              <Icon
                type="material-community"
                name="checkbox-marked-outline"
                color={color}
              />
            ),
            onPress: this.setUsage,
            size: 35,
            uncheckedIcon: (
              <Icon
                type="material-community"
                name="checkbox-blank-outline"
                color={color}
              />
            ),
          }}
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

  public async componentDidMount() {
    const storedUsage = await AsyncStorage.getItem('@UsageStatistics');
    const usage = storedUsage === 'true' ? true : false;
    await analytics().setAnalyticsCollectionEnabled(usage);
    this.setState({usage});
  }

  private setUsage = async () => {
    const usage = !this.state.usage;
    this.setState({usage});
    await AsyncStorage.setItem('@UsageStatistics', JSON.stringify(usage));
    await analytics().setAnalyticsCollectionEnabled(usage);
  };

  private PrivatePolicy = () => (
    <MarkdownModal name="Private Policy">{privatePolicy}</MarkdownModal>
  );

  private TermsOfUse = () => (
    <MarkdownModal name="Terms of Use">{termsOfUse}</MarkdownModal>
  );

  private License = () => (
    <MarkdownModal name="License">{license}</MarkdownModal>
  );
}
