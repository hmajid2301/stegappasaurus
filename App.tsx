import AsyncStorage from "@react-native-community/async-storage";
import React, { useContext } from "react";
import { StatusBar } from "react-native";
import SplashScreen from "react-native-splash-screen";

import IntroSlider from "~/components/IntroSlider";
import Loader from "~/components/Loader";
import { slides } from "~/data";
import { DARK_THEME, PRIMARY_THEME } from "~/modules";
import { ITheme } from "~/modules/types";
import { ThemeContext } from "~/providers/ThemeContext";
import MainApp from "~/views/Routes";

interface IState {
  loading: boolean;
  introShown: boolean | null;
  theme: ITheme;
}

export default class App extends React.Component<{}, IState> {
  public static state = {
    introShown: false,
    loading: true,
    theme: PRIMARY_THEME
  };

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
          theme: this.state.theme
        }}
      />
    );
  }

  public async componentDidMount() {
    SplashScreen.hide();
    const [storedIntroShown, storedTheme] = await Promise.all([
      AsyncStorage.getItem("@IntroShown"),
      AsyncStorage.getItem("@Theme")
    ]);

    const { theme, changeTheme } = useContext(ThemeContext);
    let introShown = false;

    if (storedIntroShown) {
      introShown = storedIntroShown === "true" ? true : false;
    }
    if (storedTheme) {
      const isDark = storedTheme === "true" ? true : false;
      changeTheme(isDark);
    }

    this.setState({
      introShown,
      loading: false,
      theme
    });
  }

  private introShownToUser = async () => {
    await AsyncStorage.setItem("@IntroShown", "true");
    this.setState({ introShown: true });
  };
}
