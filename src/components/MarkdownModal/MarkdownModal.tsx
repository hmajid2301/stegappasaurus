import * as React from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import Markdown from "react-native-markdown-renderer";
import { connect } from "react-redux";

import { ITheme } from "@types";
import { IReducerState } from "~/redux/reducers/ToggleDarkTheme";

import styles, { markdown } from "./styles";

interface IProps {
  children: React.ReactNode;
  name: string;
  theme: ITheme;
}

interface IState {
  modalVisible: boolean;
}

class MarkdownModal extends React.Component<IProps, IState> {
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
                iconStyle={[styles.icons, { color: theme.color }]}
                name="close"
                type="evil-icons"
              />
            </TouchableOpacity>

            <ScrollView>
              <View style={styles.container}>
                <Markdown
                  style={{
                    ...markdown,
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

const mapStateToProps = (state: IReducerState) => ({
  theme: state.ToggleDarkTheme.theme
});

export default connect(
  mapStateToProps,
  null
)(MarkdownModal);
