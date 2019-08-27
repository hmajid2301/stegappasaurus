import * as React from "react";
import { Keyboard, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";

import ImageMessage from "~/components/ImageMessage";
import Snackbar from "~/components/Snackbar";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

interface IState {
  limit: number;
  password: string;
  photo: string;
}

export default class Message extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const { navigation } = props;
    const uri = navigation.getParam("uri", "NO-ID");

    this.state = {
      limit: 15,
      password: "",
      photo: uri
    };
  }

  public render() {
    return (
      <View>
        <ImageMessage
          action={this.onSubmit}
          navigation={this.props.navigation}
          editable={true}
          photo={this.state.photo}
        />
      </View>
    );
  }

  private onSubmit = (message: string) => {
    if (message.length === 0) {
      Snackbar.show({
        text: "Message cannot be empty"
      });
    } else {
      Keyboard.dismiss();
      setTimeout(() => {
        this.props.navigation.navigate("EncodingProgress", {
          message,
          uri: this.state.photo
        });
      }, 100);
    }
  };
}
