import * as React from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import Markdown from "react-native-markdown-renderer";

import { ThemeColors } from "~/modules/types";

import styles, { markdown } from "./styles";

interface IProps {
  background: ThemeColors;
  color: ThemeColors;
  children: React.ReactNode;
  name: string;
}

interface IState {
  isVisible: boolean;
}

export default class MarkdownModal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  public render() {
    return (
      <View>
        <Modal
          animationType="slide"
          onRequestClose={() => this.setModalVisible(false)}
          transparent={false}
          visible={this.state.isVisible}
        >
          <View
            style={[
              styles.modalContainer,
              { backgroundColor: this.props.background }
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                this.setModalVisible(!this.state.isVisible);
              }}
            >
              <Icon
                iconStyle={[styles.icons, { color: this.props.color }]}
                name="close"
                type="evil-icons"
              />
            </TouchableOpacity>

            <ScrollView>
              <View style={styles.container}>
                <Markdown
                  style={{
                    ...markdown,
                    ...{ text: { color: this.props.color } }
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
          <Text style={[styles.buttonText, { color: this.props.color }]}>
            {this.props.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  private setModalVisible(visible: boolean) {
    this.setState({ isVisible: visible });
  }
}
