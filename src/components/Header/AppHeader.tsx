import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {NavigationScreenProp} from 'react-navigation';

import {TabColors} from '~/constants/types';
import {ThemeContext} from '~/providers/ThemeContext';
import Header from './Header';

interface Props {
  navigation: NavigationScreenProp<any, any>;
  primary: TabColors;
}

export default class AppHeader extends React.Component<Props, {}> {
  public static contextType = ThemeContext;
  public context!: React.ContextType<typeof ThemeContext>;

  public render() {
    return <Header {...this.props} left={this.leftComponent()} />;
  }

  private leftComponent = () => (
    <TouchableOpacity onPress={this.toHome} testID="home">
      <Icon
        color={this.context.theme.color}
        name="arrow-back"
        type="material-icons"
        size={30}
      />
    </TouchableOpacity>
  );

  private toHome = () => {
    this.props.navigation.navigate('Main');
  };
}
