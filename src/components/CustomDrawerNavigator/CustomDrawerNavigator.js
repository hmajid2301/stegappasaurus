import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import { DrawerItems } from 'react-navigation';
import { connect } from 'react-redux';

import COLORS from '../../themes';
import { changeTheme, toggleTheme } from '../../actions';
import TextLogo from '../TextLogo';
import styles from './styles';


class CustomDrawerNavigator extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    changeTheme: PropTypes.func.isRequired,
    toggleTheme: PropTypes.func.isRequired,
    onItemPress: PropTypes.func.isRequired,
  };
  render() {
    return (
      <View>
        <View style={styles(this.props.color).header}>
          <TextLogo />
        </View>
        <DrawerItems
          {...{
            ...this.props,
            onItemPress: (route) => {
              const routeName = route.route.key;
              this.props.changeTheme(routeName);
              if (routeName === 'Home') {
                this.props.toggleTheme(COLORS.secondary);
              }

              this.props.onItemPress(route);
            },
          }}
        />
      </View >
    );
  }
}

const mapStateToProps = state => ({
  color: state.ChangeTheme.color,
});

const mapDispatchToProps = dispatch => ({
  changeTheme: route => dispatch(changeTheme(route)),
  toggleTheme: color => dispatch(toggleTheme(color)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawerNavigator);
