import { Icon } from 'native-base';
import Markdown from 'react-native-simple-markdown';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';


class MarkdownModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
    theme: PropTypes.object.isRequired,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { theme } = this.props;

    return (
      <View>
        <Modal
          animationType='slide'
          onRequestClose={() => this.setModalVisible(false)}
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View style={[styles.modalContainer, { backgroundColor: theme.background }]}>
            <TouchableOpacity onPress={() => { this.setModalVisible(!this.state.modalVisible); }}>
              <Icon
                style={[styles.icons, { color: theme.color }]}
                name='close'
                type='EvilIcons'
              />
            </TouchableOpacity>

            <ScrollView>
              <View style={styles.container}>
                <Markdown styles={{ ...styles.markdown, ...{ text: { color: theme.color } } }}>
                  {this.props.children}
                </Markdown>
              </View>
            </ScrollView>
          </View>
        </Modal>

        <TouchableOpacity onPress={() => { this.setModalVisible(true); }}>
          <Text style={[styles.buttonText, { color: theme.color }]}>{this.props.name}</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.ToggleDarkTheme.theme,
});


export default connect(mapStateToProps, null)(MarkdownModal);
