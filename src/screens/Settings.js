import PropTypes from 'prop-types';
import { MailComposer } from 'expo';
import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import {
  Body,
  CheckBox,
  Icon,
  List,
  ListItem,
  Picker,
  Right,
} from 'native-base';

import Header from '../components/Header';
import { Changelog, Licenses, PrivatePolicy, TermsOfUse } from '../components/Legal';
import { colors, fonts } from '../util/styles';


const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      algorithm: 'F5',
      darkTheme: false,
    };
  }

  static navigationOptions = {
    drawerLabel: 'Settings',
    drawerIcon: ({ tintColor }) => (
      <Icon name='settings' type='MaterialCommunityIcons' style={{ color: tintColor }}/>
    ),
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  algorithmChange = (value) => {
    this.setState({ algorithm: value });
  }

  toggleDarkTheme = () => {
    this.setState({ darkTheme: !this.state.darkTheme });
  }

  sendEmail = () => {
    MailComposer.composeAsync({
      recipient: ['me@haseebmajid.com'],
      subject: 'Stegappasaurus',
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header color={colors.primary} navigation={this.props.navigation} />
        <List>

          <ListItem itemHeader style={styles.itemHeader}>
            <Text style={styles.itemHeaderText}>Algorithms</Text>
          </ListItem>

          <ListItem noIndent>
            <Body>
              <Text style={styles.itemText}>Encoding Algorithm</Text>
            </Body>
            <Right>
              <Picker
                mode='dropdown'
                note
                onValueChange={value => this.algorithmChange(value)}
                selectedValue={this.state.algorithm}
                style={styles.picker}
                itemTextStyle={{ fontFamily: fonts.body }}
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
              <Text style={styles.itemText}>Dark Mode</Text>
            </Body>
            <Right style={styles.checkbox}>
              <CheckBox
                checked={this.state.darkTheme}
                color={colors.primary}
                onPress={() => this.toggleDarkTheme()}
              />
            </Right>
          </ListItem>

          <ListItem itemHeader style={styles.itemHeader}>
            <Text style={styles.itemHeaderText}>Support</Text>
          </ListItem>

          <ListItem noIndent>
            <PrivatePolicy/>
          </ListItem>

          <ListItem noIndent>
            <TermsOfUse/>
          </ListItem>

          <ListItem noIndent>
            <Licenses/>
          </ListItem>

          <ListItem itemHeader style={styles.itemHeader}>
            <Text style={styles.itemHeaderText}>About</Text>
          </ListItem>

          <ListItem noIndent>
            <Changelog/>
          </ListItem>

          <ListItem noIndent>
            <Body>
              <TouchableOpacity onPress={() => this.sendEmail()}>
                <Text style={styles.itemText}>Email</Text>
                <Text style={[styles.itemText, styles.itemTextUnder]}>me@haseebmajid.com</Text>
              </TouchableOpacity>
            </Body>
          </ListItem>

        </List>
      </View>
    );
  }
}
