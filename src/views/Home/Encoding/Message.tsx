import * as React from "react";
import { Image, Keyboard } from "react-native";
import { NavigationScreenProp } from "react-navigation";

import ImageMessage from "~/components/ImageMessage";
import Snackbar from "~/components/Snackbar";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

interface IState {
  height: number;
  photo: string;
  width: number;
}

export default class Message extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const { navigation } = props;
    const uri = navigation.getParam("uri", "NO-ID");

    this.state = {
      height: 0,
      photo: uri,
      width: 0
    };
  }

  public render() {
    return (
      <ImageMessage
        action={this.onSubmit}
        editable={true}
        photo={this.state.photo}
      />
    );
  }

  public componentWillMount = () => {
    Image.getSize(
      this.state.photo,
      (width, height) => {
        this.setState({ height, width });
      },
      () => null
    );
  };

  private onSubmit = (message: string) => {
    if (message.length === 0) {
      Snackbar.show({
        text: "Message cannot be empty"
      });
    } else {
      this.props.navigation.navigate("Progress", {
        message,
        uri: this.state.photo
      });
    }
  };
}
