import React, {useContext} from 'react';
import {ScrollView} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import styled from 'styled-components/native';

import {MainHeader} from '~/components/Header';
import {ThemeColors} from '~/constants/types';
import {ThemeContext} from '~/providers/ThemeContext';
import {About, Support, Themes} from './Setting';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const Settings = (props: Props) => {
  const {background} = useContext(ThemeContext).theme;

  return (
    <SettingsContainer background={background}>
      <MainHeader primary="#009cff" navigation={props.navigation} />
      <ScrollView>
        <Themes />
        <Support />
        <About />
      </ScrollView>
    </SettingsContainer>
  );
};

const SettingsContainer = styled.View<{background: ThemeColors}>`
  background: ${props => props.background};
  flex: 1;
  flex-direction: column;
`;

export default Settings;
