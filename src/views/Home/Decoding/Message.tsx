import * as React from "react";
import { NavigationScreenProp } from "react-navigation";

import ImageMessage from "~/components/ImageMessage";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

interface IState {
  isDecoded: boolean;
  message: string;
  photo: string;
}

class Progress extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const { navigation } = props;
    const uri = navigation.getParam("uri", "NO-ID");
    const message = navigation.getParam("message", "NO-ID");

    this.state = {
      isDecoded: false,
      message,
      photo: uri
    };
  }

  public render() {
    return (
      <ImageMessage
        editable={false}
        message={this.state.message}
        photo={this.state.photo}
      />
    );
  }
}

export default Progress;
