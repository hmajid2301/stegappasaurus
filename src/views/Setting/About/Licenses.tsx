import React from 'react';
import {FlatList, Linking, TouchableOpacity} from 'react-native';
import {ListItem} from 'react-native-elements';

import license from '~/data/licenses.json';
import {ThemeContext} from '~/providers/ThemeContext';

interface License {
  licenses: string;
  repository: string;
  licenseUrl: string;
  parents: string;
  name: string;
}

interface LicenseItem {
  item: License;
}

export default class Licenses extends React.Component<{}, {}> {
  public static contextType = ThemeContext;
  public context!: React.ContextType<typeof ThemeContext>;

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

  private setKey = (item: License) => item.repository;

  private renderItem = (item: LicenseItem) => (
    <TouchableOpacity onPress={this.openLink.bind(this, item.item.repository)}>
      <ListItem
        title={item.item.name}
        subtitle={item.item.licenses}
        containerStyle={{backgroundColor: this.context.theme.background}}
        titleStyle={{color: this.context.theme.color}}
        subtitleStyle={{color: this.context.theme.color}}
        topDivider={true}
        bottomDivider={true}
        testID="license"
      />
    </TouchableOpacity>
  );

  private openLink = async (url: string) => {
    await Linking.openURL(url);
  };
}
