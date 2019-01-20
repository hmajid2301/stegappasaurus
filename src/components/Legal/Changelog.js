import React, { Component } from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import { Icon } from 'native-base';
import Markdown from 'react-native-simple-markdown';

import styles from './styles';


export default class Changelog extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View>
        <Modal
          animationType='slide'
          onRequestClose={() => this.setModalVisible(false) }
          transparent={false}
          visible={this.state.modalVisible}
        >

          <TouchableOpacity onPress={() => { this.setModalVisible(!this.state.modalVisible); }}>
            <Icon
              style={styles.icons}
              name='close'
              type='EvilIcons'
            />
          </TouchableOpacity>

          <ScrollView>
            <View style={styles.container}>
              <Markdown styles={styles.markdown}>
                #Changelog {'\n\n'}

                All notable changes to this project will be documented in this file. {'\n\n'}

                The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
                and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html). {'\n\n'}

                ##[Unreleased] {'\n\n'}
              </Markdown>

            </View>
          </ScrollView>
        </Modal>

        <TouchableOpacity onPress={() => { this.setModalVisible(true); }}>
          <Text style={styles.text}>Changelog</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
