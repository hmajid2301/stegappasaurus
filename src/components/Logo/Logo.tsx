import React, {useContext} from 'react';
import styled from 'styled-components/native';

import logoDark from '~/assets/images/logo-dark.png';
import logoLight from '~/assets/images/logo-light.png';
import {header} from '~/constants/fonts';
import {ThemeContext} from '~/providers/ThemeContext';

const Logo = () => {
  const {color, isDark} = useContext(ThemeContext).theme;

  return (
    <LogoContainer>
      <LogoText color={color}>Steg</LogoText>
      <ImageLogo source={isDark ? logoLight : logoDark} />
      <LogoText color={color}>ppasaurus</LogoText>
    </LogoContainer>
  );
};

const LogoContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const LogoText = styled.Text<{color: string}>`
  color: ${props => props.color};
  font-family: ${header};
  font-size: 20;
`;

const ImageLogo = styled.Image`
  height: 25;
  width: 25;
`;

export default Logo;
