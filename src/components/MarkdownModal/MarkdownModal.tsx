import React from 'react';
import {ScrollView, View} from 'react-native';
import Markdown from 'react-native-markdown-renderer';

import Modal from '~/components/Modal';
import {ThemeColors} from '~/constants/types';
import styles, {markdown} from './styles';

interface IProps {
  background: ThemeColors;
  color: ThemeColors;
  children: React.ReactNode;
  name: string;
}

export default class MarkdownModal extends React.Component<IProps, {}> {
  public render() {
    const {background, color, children, name} = this.props;
    return (
      <View>
        <Modal background={background} color={color} name={name}>
          <ScrollView>
            <View style={styles.container}>
              <Markdown
                style={{
                  ...markdown,
                  ...{text: {color}},
                }}>
                {children}
              </Markdown>
            </View>
          </ScrollView>
        </Modal>
      </View>
    );
  }
}
