import { Icon } from "native-base";
import React, { Component, ReactNode } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Markdown from "react-native-markdown-renderer";

import { withTheme } from "~/redux/hoc";
import { ITheme } from "~/util/interfaces";
import styles from "./styles";

interface IProps {
  children: ReactNode;
  name: string;
  theme: ITheme;
}

interface IState {
  modalVisible: boolean;
}

class MarkdownModal extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }

  public render() {
    const { theme } = this.props;

    return (
      <View>
        <Modal
          animationType="slide"
          onRequestClose={() => this.setModalVisible(false)}
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View
            style={[
              styles.modalContainer,
              { backgroundColor: theme.background }
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
            >
              <Icon
                style={[styles.icons, { color: theme.color }]}
                name="close"
                type="EvilIcons"
              />
            </TouchableOpacity>

            <ScrollView>
              <View style={styles.container}>
                <Markdown
                  style={{
                    ...styles.markdown,
                    ...{ text: { color: theme.color } }
                  }}
                >
                  {this.props.children}
                </Markdown>
              </View>
            </ScrollView>
          </View>
        </Modal>

        <TouchableOpacity
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text style={[styles.buttonText, { color: theme.color }]}>
            {this.props.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  private setModalVisible(visible: boolean) {
    this.setState({ modalVisible: visible });
  }
}

export default withTheme(MarkdownModal);
