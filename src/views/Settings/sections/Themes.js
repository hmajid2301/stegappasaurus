import {
  Body,
  CheckBox,
  List,
  ListItem,
  Right,
} from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';

import { toggleDarkTheme } from '~/redux/actions';
import { colors } from '~/util/styles';

import styles from './styles';


class Themes extends Component {
  static propTypes = {
    toggleDarkTheme: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
  };

  render() {
    const { theme } = this.props;

    return (
      <List>
        <ListItem itemHeader style={styles.itemHeader}>
          <Text style={styles.itemHeaderText}>Themes</Text>
        </ListItem>

        <ListItem noIndent>
          <Body>
            <Text style={[styles.itemText, { color: theme.color }]}>Dark Mode</Text>
          </Body>
          <Right style={styles.checkbox}>
            <CheckBox
              checked={theme.isDark}
              color={colors.primary}
              onPress={() => this.props.toggleDarkTheme(theme.isDark)}
            />
          </Right>
        </ListItem>
      </List>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  toggleDarkTheme: algorithm => dispatch(toggleDarkTheme(algorithm)),
});

export default connect(null, mapDispatchToProps)(Themes);

