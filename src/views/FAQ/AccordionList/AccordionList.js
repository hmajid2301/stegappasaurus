import { Accordion, Icon } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, View } from 'react-native';

import styles from './styles';


export default class AccordionList extends Component {
  static propTypes = {
    faq: PropTypes.array.isRequired,
    theme: PropTypes.object.isRequired,
  };

  renderHeader = (item, expanded) => (
    <View
      style={[styles.headerContainer,
      expanded ? styles.inactive : styles.active,
      { borderBottomColor: this.props.theme.background }]}
    >
      <Text style={styles.header}>{item.title}</Text>
      <View style={styles.iconContainer}>
        {expanded
          ? <Icon style={styles.icon} type='FontAwesome' name='chevron-up' />
          : <Icon style={styles.icon} type='FontAwesome' name='chevron-down' />}
      </View>
    </View>
  );

  renderContent = item => (
    <View style={styles.contentContainer}>
      <Text style={[styles.content, { color: this.props.theme.color }]}>{item.content}</Text>
    </View>
  );

  render() {
    return (
      <Accordion
        dataArray={this.props.faq}
        renderContent={this.renderContent}
        renderHeader={this.renderHeader}
      />
    );
  }
}
