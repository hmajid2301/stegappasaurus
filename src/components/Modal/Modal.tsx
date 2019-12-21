import * as React from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';

import {ThemeColors} from '~/constants/types';
import styles from './styles';

interface IProps {
  background: ThemeColors;
  color: ThemeColors;
  children: JSX.Element;
  name: string;
}

interface IState {
  isVisible: boolean;
}

export default class MyModal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  public render() {
    return (
      <View>
        <Modal
          animationType="slide"
          onRequestClose={this.setModalVisibility.bind(this, false)}
          transparent={false}
          visible={this.state.isVisible}>
          <View
            style={[
              styles.container,
              {backgroundColor: this.props.background},
            ]}>
            <TouchableOpacity
              onPress={this.setModalVisibility.bind(
                this,
                !this.state.isVisible,
              )}
              style={styles.iconContainer}
              testID="close">
              <Icon
                iconStyle={{color: this.props.color}}
                name="close"
                type="evil-icons"
              />
            </TouchableOpacity>
            {this.props.children}
          </View>
        </Modal>

        <TouchableOpacity onPress={this.setModalVisibility.bind(this, true)}>
          <Text style={[styles.buttonText, {color: this.props.color}]}>
            {this.props.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  private setModalVisibility(visible: boolean) {
    this.setState({isVisible: visible});
  }
}
