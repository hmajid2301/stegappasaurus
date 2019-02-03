import {
  Body,
  List,
  ListItem,
  Picker,
  Right,
} from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';

import { selectAlgorithm } from '~/redux/actions';

import styles from './styles';


class Algorithms extends Component {
  static propTypes = {
    algorithm: PropTypes.string.isRequired,
    selectAlgorithm: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
  };

  render() {
    const { algorithm, theme } = this.props;

    return (
      <List>
        <ListItem itemHeader style={styles.itemHeader}>
          <Text style={styles.itemHeaderText}>Algorithms</Text>
        </ListItem>

        <ListItem noIndent>
          <Body>
            <Text style={[styles.itemText, { color: theme.color }]}>Encoding Algorithm</Text>
          </Body>
          <Right>
            <Picker
              mode='dropdown'
              note
              onValueChange={value => this.props.selectAlgorithm(value)}
              selectedValue={algorithm}
              style={styles.picker}
            >
              <Picker.Item label='F5' value='F5' />
              <Picker.Item label='LSB PNG' value='LSB-PNG' />
              <Picker.Item label='LSB DCT' value='LSB-DCT' />
            </Picker>
          </Right>
        </ListItem>
      </List>
    );
  }
}


const mapStateToProps = state => ({
  algorithm: state.SelectAlgorithm.algorithm,
});

const mapDispatchToProps = dispatch => ({
  selectAlgorithm: algorithm => dispatch(selectAlgorithm(algorithm)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Algorithms);
