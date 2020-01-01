import React, {useContext} from 'react';
import {ScrollView, View} from 'react-native';
import Markdown from 'react-native-markdown-renderer';
import styled from 'styled-components/native';

import Modal from '~/components/Modal';
import {bodyLight} from '~/constants/fonts';
import {ThemeContext} from '~/providers/ThemeContext';

interface Props {
  children: React.ReactNode;
  name: string;
}

const MarkdownModal = (props: Props) => {
  const {color} = useContext(ThemeContext).theme;
  return (
    <View>
      <Modal name={props.name}>
        <ScrollView>
          <MarkdownContainer>
            <Markdown
              style={{
                ...markdown,
                ...{text: {color}},
              }}>
              {props.children}
            </Markdown>
          </MarkdownContainer>
        </ScrollView>
      </Modal>
    </View>
  );
};

const MarkdownContainer = styled.View`
  padding: 20px;
`;
const markdown = {
  heading1: {
    fontFamily: bodyLight,
    fontSize: 24,
    paddingBottom: 15,
  },

  heading2: {
    fontFamily: bodyLight,
    fontSize: 18,
    paddingBottom: 10,
  },

  text: {
    fontFamily: bodyLight,
  },

  list: {
    paddingBottom: 10,
  },

  paragraph: {
    paddingBottom: 10,
  },
};

export default MarkdownModal;
