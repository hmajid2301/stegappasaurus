import PropTypes from 'prop-types';
import { MailComposer } from 'expo';
import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import {
  Body,
  CheckBox,
  Icon,
  List,
  ListItem,
  Picker,
  Right,
} from 'native-base';

import { selectAlgorithm, toggleDarkTheme } from '../actions';
import Header from '../components/Header';
import { Changelog, Licenses, PrivatePolicy, TermsOfUse } from '../components/Legal';
import { colors, fonts } from '../util/styles';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pureWhite,
  },
  picker: {
    height: 30,
    width: 150,
  },
  checkbox: {
    paddingRight: 20,
  },
  itemHeader: {
    paddingBottom: 5,
    paddingTop: 20,
  },
  itemHeaderText: {
    color: colors.primary,
    fontSize: 12,
    fontFamily: fonts.body_xl,
  },
  itemText: {
    fontFamily: fonts.body,
  },
  itemTextUnder: {
    color: 'grey',
  },
});

class Settings extends Component {
  static navigationOptions = {
    drawerLabel: 'Settings',
    drawerIcon: ({ tintColor }) => (
      <Icon name='settings' type='Feather' style={{ color: tintColor }}/>
    ),
  };

  static propTypes = {
    algorithm: PropTypes.string.isRequired,
    navigation: PropTypes.object.isRequired,
    darkTheme: PropTypes.bool.isRequired,
    theme: PropTypes.object.isRequired,
    selectAlgorithm: PropTypes.func.isRequired,
    toggleDarkTheme: PropTypes.func.isRequired,
  }

  sendEmail = () => {
    MailComposer.composeAsync({
      recipient: ['me@haseebmajid.com'],
      subject: 'Stegappasaurus',
    });
  }

  render() {
    return (
      <View style={[styles.container, { backgroundColor: this.props.theme.backgroundColor }]}>
        <Header
          color={colors.primary}
          navigation={this.props.navigation}
          theme={this.props.theme}
        />
        <List>

          <ListItem itemHeader style={styles.itemHeader}>
            <Text style={styles.itemHeaderText}>Algorithms</Text>
          </ListItem>

          <ListItem noIndent>
            <Body>
              <Text style={[styles.itemText, { color: this.props.theme.color }]}>Encoding Algorithm</Text>
            </Body>
            <Right>
              <Picker
                mode='dropdown'
                note
                onValueChange={value => this.props.selectAlgorithm(value)}
                selectedValue={this.props.algorithm}
                style={styles.picker}
              >
                <Picker.Item label='F5' value='F5'/>
                <Picker.Item label='LSB PNG' value='LSB-PNG'/>
                <Picker.Item label='LSB DCT' value='LSB-DCT'/>
              </Picker>
            </Right>
          </ListItem>

          <ListItem itemHeader style={styles.itemHeader}>
            <Text style={styles.itemHeaderText}>Themes</Text>
          </ListItem>

          <ListItem noIndent>
            <Body>
              <Text style={[styles.itemText, { color: this.props.theme.color }]}>Dark Mode</Text>
            </Body>
            <Right style={styles.checkbox}>
              <CheckBox
                checked={this.props.darkTheme}
                color={colors.primary}
                onPress={() => this.props.toggleDarkTheme(this.props.darkTheme)}
              />
            </Right>
          </ListItem>

          <ListItem itemHeader style={styles.itemHeader}>
            <Text style={styles.itemHeaderText}>Support</Text>
          </ListItem>

          <ListItem noIndent>
            <PrivatePolicy theme={this.props.theme}/>
          </ListItem>

          <ListItem noIndent>
            <TermsOfUse theme={this.props.theme}/>
          </ListItem>

          <ListItem noIndent>
            <Licenses theme={this.props.theme}/>
          </ListItem>

          <ListItem itemHeader style={styles.itemHeader}>
            <Text style={styles.itemHeaderText}>About</Text>
          </ListItem>

          <ListItem noIndent>
            <Changelog theme={this.props.theme}/>
          </ListItem>

          <ListItem noIndent>
            <Body>
              <TouchableOpacity onPress={() => this.sendEmail()}>
                <Text style={[styles.itemText, { color: this.props.theme.color }]}>Email</Text>
                <Text style={[styles.itemText, styles.itemTextUnder]}>me@haseebmajid.com</Text>
              </TouchableOpacity>
            </Body>
          </ListItem>

        </List>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  algorithm: state.SelectAlgorithm.algorithm,
  darkTheme: state.ToggleDarkTheme.theme.dark,
  theme: state.ToggleDarkTheme.theme,
});

const mapDispatchToProps = dispatch => ({
  selectAlgorithm: algorithm => dispatch(selectAlgorithm(algorithm)),
  toggleDarkTheme: darkTheme => dispatch(toggleDarkTheme(darkTheme)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
