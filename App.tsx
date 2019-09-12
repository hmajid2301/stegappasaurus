import AsyncStorage from "@react-native-community/async-storage";
import * as React from "react";
import { StatusBar } from "react-native";
import SplashScreen from "react-native-splash-screen";

import IntroSlider from "~/components/IntroSlider";
import Loader from "~/components/Loader";
import { slides } from "~/data";
import { ITheme } from "~/modules/types";
import MainApp from "~/views/Routes";

interface IProps {
  theme: ITheme;
}

interface IState {
  loading: boolean;
  introShown: boolean | null;
}

export default class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      introShown: false,
      loading: true
    };
  }

  public render() {
    if (this.state.loading) {
      return (
        <StatusBar hidden={true}>
          <Loader loading={this.state.loading} />
        </StatusBar>
      );
    } else if (!this.state.introShown) {
      return <IntroSlider slides={slides} onDone={this.introShownToUser} />;
    }
    return (
      <MainApp
        screenProps={{
          theme: this.props.theme
        }}
      />
    );
  }

  public async componentDidMount() {
    SplashScreen.hide();
    const storedIntroShown = await AsyncStorage.getItem("@IntroShown");
    if (storedIntroShown) {
      const introShown = storedIntroShown === "true" ? true : false;
      this.setState({ introShown });
    }
    this.setState({ loading: false });
  }

  private introShownToUser = async () => {
    await AsyncStorage.setItem("@IntroShown", "true");
    this.setState({ introShown: true });
  };
}
