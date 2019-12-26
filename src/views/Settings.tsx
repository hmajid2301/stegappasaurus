import React, {useContext} from 'react';
import {View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import styled from 'styled-components/native';

import {MainHeader} from '~/components/Header';
import {ThemeColors} from '~/constants/types';
import {ThemeContext} from '~/providers/ThemeContext';
import {About, Support, Themes} from './Setting';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

const Settings = (props: IProps) => {
  const {background} = useContext(ThemeContext).theme;

  return (
    <SettingsContainer background={background}>
      <MainHeader primary="#009cff" navigation={props.navigation} />
      <View>
        <Themes />
        <Support />
        <About />
      </View>
    </SettingsContainer>
  );
};

const SettingsContainer = styled.View<{background: ThemeColors}>`
  background: ${props => props.background};
  flex: 1;
  flex-direction: column;
`;

export default Settings;
