import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import Header from '../Header';
import { colors } from '../../common';
import Encoding from '../../screens/Encoding';
import Decoding from '../../screens/Decoding';
import styles from './styles';


const commonTabOptions = color => ({
  activeTintColor: 'white',
  pressColor: colors.pureWhite,
  inactiveTintColor: '#ddd',
  labelStyle: {
    fontFamily: 'RobotoRegular',
    fontSize: 12,
  },
  indicatorStyle: {
    backgroundColor: colors.pureWhite,
  },
  style: {
    backgroundColor: color,
  },
});

const CustomTabNavigator = createMaterialTopTabNavigator({
  Encoding: {
    screen: Encoding,
    navigationOptions: {
      tabBarLabel: 'Encoding',
      tabBarOptions: commonTabOptions(colors.primary),
    },
  },
  Decoding: {
    screen: Decoding,
    navigationOptions: {
      tabBarLabel: 'Decoding',
      tabBarOptions: commonTabOptions(colors.secondary),
    },
  },
}, {
  tabBarPosition: 'bottom',
});


class Home extends Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Icon name='home' type='font-awesome' color={tintColor}/>
    ),
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    color: PropTypes.shape({
      hexCode: PropTypes.string,
    }).isRequired,
  };

  static router = CustomTabNavigator.router;

  render() {
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} color={this.props.color.hexCode}/>
        <CustomTabNavigator navigation={this.props.navigation}/>
      </View>
    );
  }
}


const mapStateToProps = state => ({
  color: state.ToggleTheme.colorData,
});

export default connect(mapStateToProps, null)(Home);
