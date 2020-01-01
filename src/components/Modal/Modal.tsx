import React from 'react';
import {Modal, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import styled from 'styled-components/native';

import {bodyLight} from '~/constants/fonts';
import {ThemeColors} from '~/constants/types';
import {ThemeContext} from '~/providers/ThemeContext';

interface Props {
  children: JSX.Element;
  name: string;
}

interface State {
  isVisible: boolean;
}

export default class MyModal extends React.Component<Props, State> {
  public static contextType = ThemeContext;
  public context!: React.ContextType<typeof ThemeContext>;

  public state: State = {
    isVisible: false,
  };

  public render() {
    const {background, color} = this.context.theme;
    return (
      <View>
        <Modal
          animationType="slide"
          onRequestClose={this.setModalVisibility.bind(this, false)}
          transparent={false}
          visible={this.state.isVisible}>
          <ModalContainer background={background}>
            <TouchableIcon
              onPress={this.setModalVisibility.bind(
                this,
                !this.state.isVisible,
              )}
              testID="close">
              <Icon iconStyle={{color}} name="close" type="evil-icons" />
            </TouchableIcon>
            {this.props.children}
          </ModalContainer>
        </Modal>

        <TouchableOpacity onPress={this.setModalVisibility.bind(this, true)}>
          <TouchableText color={color}>{this.props.name}</TouchableText>
        </TouchableOpacity>
      </View>
    );
  }

  private setModalVisibility(visible: boolean) {
    this.setState({isVisible: visible});
  }
}

const TouchableText = styled.Text<{color: ThemeColors}>`
  color: ${props => props.color};
  font-family: ${bodyLight};
`;

const ModalContainer = styled.View<{background: ThemeColors}>`
  flex: 1;
  background-color: ${props => props.background};
`;

const TouchableIcon = styled.TouchableOpacity`
  align-self: flex-end;
  padding: 10px;
`;
