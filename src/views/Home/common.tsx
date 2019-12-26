import {Dimensions, TextStyle} from 'react-native';
import styled from 'styled-components/native';

import {pureWhite} from '~/constants/colors';
import {TabColors, ThemeColors} from '~/constants/types';

const pageWidth = Dimensions.get('window').width;

export const MainContainer = styled.View<{background: ThemeColors}>`
  flex: 1;
  background-color: ${props => props.background};
`;

export const ButtonsContainer = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin-right: 2;
  margin-top: 2;
`;

export const TouchableButton = styled.TouchableOpacity<{button: TabColors}>`
  background-color: ${props => props.button};
  flex: 1;
  height: ${pageWidth / 3};
  justify-content: center;
  margin-left: 2;
  margin-top: 2;
`;

export const PhotoAlbumContainer = styled.View`
  flex: 1;
  margin-right: 2;
`;

export const iconStyle: TextStyle = {
  color: pureWhite,
  fontSize: 40,
  textAlign: 'center',
};
