import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import IntroSlider from '~/components/IntroSlider';
import Loader from '~/components/Loader';
import {ITheme} from '~/constants/types';
import {slides} from '~/data';
import {ThemeContext} from '~/providers/ThemeContext';
import MainApp from '~/views/Routes';

interface IProps {
  changeTheme: (_: boolean) => void;
  theme: ITheme;
}

interface IState {
  loading: boolean;
  introShown: boolean | null;
}

export default class App extends React.Component<IProps, IState> {
  public static contextType = ThemeContext;
  public context!: React.ContextType<typeof ThemeContext>;

  constructor(props: IProps) {
    super(props);
    this.state = {
      introShown: false,
      loading: true,
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
          theme: this.context.theme,
        }}
      />
    );
  }

  public async componentDidMount() {
    SplashScreen.hide();
    const [storedIntroShown, storedTheme] = await Promise.all([
      AsyncStorage.getItem('@IntroShown'),
      AsyncStorage.getItem('@Theme'),
    ]);

    let introShown = false;

    if (storedIntroShown) {
      introShown = storedIntroShown === 'true' ? true : false;
    }
    if (storedTheme) {
      const isDark = storedTheme === 'true' ? true : false;
      this.context.changeTheme(isDark);
    }

    this.setState({
      introShown,
      loading: false,
    });
  }

  private introShownToUser = async () => {
    await AsyncStorage.setItem('@IntroShown', 'true');
    this.setState({introShown: true});
  };
}
