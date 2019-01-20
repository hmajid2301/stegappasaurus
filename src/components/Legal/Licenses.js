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


export default class Licenses extends Component {
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
                #Licenses {'\n\n'}
              </Markdown>

            </View>
          </ScrollView>
        </Modal>

        <TouchableOpacity onPress={() => { this.setModalVisible(true); }}>
          <Text style={styles.text}>Licenses</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
