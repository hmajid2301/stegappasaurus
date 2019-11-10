import * as React from 'react';
import {ScrollView, View} from 'react-native';

import FAQList from '~/components/FAQList';
import {ThemeColors} from '~/constants/types';
import {questions} from '~/data';
import styles from './FAQ/styles';

interface IProps {
  background: ThemeColors;
  color: ThemeColors;
}

const FAQ = (props: IProps) => (
  <View style={[styles.container, {backgroundColor: props.background}]}>
    <ScrollView>
      <View style={styles.faqListContainer}>
        <FAQList
          backgroundColor={props.background}
          color={props.color}
          items={questions}
        />
      </View>
    </ScrollView>
  </View>
);

export default FAQ;
