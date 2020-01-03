import AsyncStorage from '@react-native-community/async-storage';
import analytics from '@react-native-firebase/analytics';
import React from 'react';
import {Alert, StatusBar} from 'react-native';
import {Appearance} from 'react-native-appearance';
import changeNavigationBarColor, {
  HideNavigationBar,
  ShowNavigationBar,
} from 'react-native-navigation-bar-color';
import SplashScreen from 'react-native-splash-screen';

import IntroSlider from '~/components/IntroSlider';
import Loader from '~/components/Loader';
import {slides} from '~/data';
import {ThemeContext} from '~/providers/ThemeContext';
import Main from '~/views/Home';

interface State {
  loading: boolean;
  introShown: boolean | null;
}

export default class App extends React.Component<{}, State> {
  public static contextType = ThemeContext;
  public context!: React.ContextType<typeof ThemeContext>;

  public state = {
    introShown: false,
    loading: true,
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
    return <Main />;
  }

  public async componentDidMount() {
    SplashScreen.hide();
    const [storedIntroShown, storedTheme] = await Promise.all([
      AsyncStorage.getItem('@IntroShown'),
      AsyncStorage.getItem('@Theme'),
    ]);

    this.setTheme(storedTheme);

    let introShown = false;
    if (storedIntroShown) {
      introShown = storedIntroShown === 'true' ? true : false;
    } else {
      HideNavigationBar();
    }

    // @ts-ignore
    changeNavigationBarColor(
      this.context.theme.isDark ? '#17212d' : '#ffffff',
      !this.context.theme.isDark,
      false,
    );

    this.setState({
      introShown,
      loading: false,
    });
  }

  public componentWillUnmount() {
    const subscription = Appearance.addChangeListener(_ => null);
    subscription.remove();
  }

  private setTheme(storedTheme: string | null) {
    let darkTheme = false;
    if (storedTheme) {
      darkTheme = storedTheme === 'true' ? true : false;
    }
    const colorScheme = Appearance.getColorScheme();
    if (colorScheme === 'dark') {
      darkTheme = true;
    }
    this.context.changeTheme(darkTheme);
    Appearance.addChangeListener(({colorScheme: osColorScheme}) => {
      const isDark = osColorScheme === 'dark' ? true : false;
      this.context.changeTheme(isDark);
    });
  }

  private introShownToUser = async () => {
    ShowNavigationBar();
    await AsyncStorage.setItem('@IntroShown', 'true');
    this.setState({introShown: true});

    const storedUsage = await AsyncStorage.getItem('@UsageStatistics');
    if (storedUsage === null) {
      this.showUsageStatsAlert();
    }
  };

  private showUsageStatsAlert() {
    Alert.alert(
      'Usage Statistics',
      'To help us improve the app you send us usage statistics and analytics about the app.',
      [
        {
          onPress: async () => {
            await AsyncStorage.setItem('@UsageStatistics', 'true');
          },
          text: 'Allow',
        },
        {
          onPress: async () => {
            await AsyncStorage.setItem('@UsageStatistics', 'false');
            await analytics().setAnalyticsCollectionEnabled(false);
          },
          style: 'cancel',
          text: 'Do not allow',
        },
      ],
      {cancelable: false},
    );
  }
}
