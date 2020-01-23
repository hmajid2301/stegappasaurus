import React from 'react';
import {Linking, TouchableOpacity, View} from 'react-native';
import {IconType, ListItem} from 'react-native-elements';
import Rate, {AndroidMarket} from 'react-native-rate';
import styled from 'styled-components/native';

import {bodyLight} from '~/constants/fonts';
import {ThemeContext} from '~/providers/ThemeContext';

interface Props {
  items: AboutItem[];
}

export interface AboutItem {
  title: string;
  icon: {
    color: string;
    name: string;
    type: IconType;
  };
  url?: string;
}

export default class AboutList extends React.Component<Props, {}> {
  public static contextType = ThemeContext;
  public context!: React.ContextType<typeof ThemeContext>;

  public render() {
    return (
      <View>{this.props.items.map(item => this.renderListItem(item))}</View>
    );
  }

  private renderListItem = (item: AboutItem) => (
    <ListItem
      containerStyle={{backgroundColor: this.context.theme.background}}
      key={item.title}
      leftIcon={{
        ...item.icon,
        onPress: this.chooseFunction.bind(this, item),
      }}
      bottomDivider={true}
      title={
        <TouchableOpacity onPress={this.chooseFunction.bind(this, item)}>
          <ListText color={this.context.theme.color}>{item.title}</ListText>
        </TouchableOpacity>
      }
    />
  );

  private async chooseFunction(item: AboutItem) {
    if (item.url === undefined) {
      const options = {
        GooglePackageName: 'com.stegappasaurus',
        openAppStoreIfInAppFails: true,
        preferredAndroidMarket: AndroidMarket.Google,
      };
      Rate.rate(options, () => null);
    } else {
      await Linking.openURL(item.url);
    }
  }
}

const ListText = styled.Text<{color: string}>`
  color: ${props => props.color};
  font-family: ${bodyLight};
`;
