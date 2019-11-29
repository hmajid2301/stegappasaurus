import React from 'react';
import {FlatList, Linking, TouchableOpacity} from 'react-native';
import {ListItem} from 'react-native-elements';

import {ThemeColors} from '~/constants/types';
import license from '~/data/licenses.json';

interface IProps {
  background: ThemeColors;
  color: ThemeColors;
}

export default class Licenses extends React.Component<IProps, {}> {
  public render() {
    return (
      <FlatList
        data={this.cleanData()}
        keyExtractor={this.setKey}
        renderItem={this.renderItem}
      />
    );
  }

  private cleanData = () => {
    const data = Object.entries(license).map(item => {
      const [name, value] = item;
      return {name, ...value};
    });

    return data;
  };

  private setKey = (item: any, _: number) => {
    return item.repository;
  };

  private renderItem = (item: any) => (
    <TouchableOpacity onPress={this.openLink.bind(this, item.item.repository)}>
      <ListItem
        title={item.item.name}
        subtitle={item.item.licenses}
        topDivider={true}
        bottomDivider={true}
      />
    </TouchableOpacity>
  );

  private openLink = async (url: string) => {
    await Linking.openURL(url);
  };
}
