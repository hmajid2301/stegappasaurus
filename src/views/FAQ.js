import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { Content, Icon } from 'native-base';

import CustomHeader from '~/components/CustomHeader';
import AccordionList from '~/views/FAQ/AccordionList';
import { colors } from '~/util/styles';

import faq from './FAQ/questions';
import styles from './FAQ/styles';


export default class FAQ extends Component {
  static navigationOptions = {
    drawerLabel: 'FAQ',
    drawerIcon: ({ tintColor }) => (
      <Icon name='questioncircleo' type='AntDesign' style={{ color: tintColor }}/>
    ),
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    screenProps: PropTypes.shape({
      theme: PropTypes.shape({
        isDark: PropTypes.bool.isRequired,
        background: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
      }),
    }),
  };

  render() {
    const { theme } = this.props.screenProps;

    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ScrollView>
          <CustomHeader
            primaryColor={colors.primary}
            navigation={this.props.navigation}
            theme={theme}
          />

          <View style={styles.accordionContainer}>
            <Content padder>
              <AccordionList faq={faq} theme={theme}/>
            </Content>
          </View>
        </ScrollView>
      </View>
    );
  }
}
