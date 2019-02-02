import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { Icon } from 'native-base';
import { connect } from 'react-redux';

import Header from '../components/Header';
import { colors, fonts } from '../util/styles';
import Encoding from './Encoding';
import Decoding from './Decoding';


const commonTabOptions = color => ({
  activeTintColor: colors.pureWhite,
  pressColor: colors.pureWhite,
  inactiveTintColor: '#DDD',
  labelStyle: {
    fontFamily: fonts.body_xl,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class Home extends Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Icon name='home' type='FontAwesome' style={{ color: tintColor }}/>
    ),
  };

  static propTypes = {
    color: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };

  static router = CustomTabNavigator.router;

  render() {
    return (
      <View style={styles.container}>
        <Header
          color={this.props.color.hexCode}
          navigation={this.props.navigation}
          theme={this.props.theme}
        />
        <CustomTabNavigator
          screenProps={{ theme: this.props.theme }}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  color: state.ChangePrimaryColor.colorData,
  theme: state.ToggleDarkTheme.theme,
});

export default connect(mapStateToProps, null)(Home);
