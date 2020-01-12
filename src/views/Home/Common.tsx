import React from 'react';
import {Dimensions, TextStyle, View} from 'react-native';
import {Icon} from 'react-native-elements';
import styled from 'styled-components/native';

import {Actions} from '~/actions/Steganography';
import {pureWhite} from '~/constants/colors';
import {body} from '~/constants/fonts';
import {TabColors, ThemeColors} from '~/constants/types';

const pageWidth = Dimensions.get('window').width;

export const getInnerProgressComponent = (
  action: Actions,
  progress: number,
  isEncoding = true,
) => {
  let component = <View />;

  if (action === 'encoding' || action === 'decoding') {
    component = <ProgressText>{Math.ceil(progress)}%</ProgressText>;
  } else if (action === 'done') {
    component = (
      <View>
        {isEncoding || (
          <Icon color={pureWhite} name="share" size={130} type="font-awesome" />
        )}
        <ProgressText>{Math.ceil(progress)}%</ProgressText>
      </View>
    );
  } else if (action === 'getting_image_data') {
    component = <ProgressText>Getting Image Data</ProgressText>;
  } else if (action === 'setting_image_data') {
    component = (
      <View>
        <ProgressText>Saving New Image</ProgressText>
      </View>
    );
  } else {
    component = (
      <View>
        <ProgressText>Starting</ProgressText>
      </View>
    );
  }

  return component;
};

const ProgressText = styled.Text`
  color: black;
  font-family: ${body};
  font-size: 30;
`;

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
