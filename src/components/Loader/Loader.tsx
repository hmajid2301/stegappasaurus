import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import styled from 'styled-components/native';

import {primary} from '~/constants/colors';

interface Props {
  loading: boolean;
  overlay?: string;
}

const Loader = ({loading, overlay}: Props) => {
  if (loading) {
    return (
      <LoaderContainer overlay={overlay ? overlay : 'transparent'}>
        <ActivityIndicator color={primary} size={'large'} />
      </LoaderContainer>
    );
  }

  return <View />;
};

const LoaderContainer = styled.View<{overlay: string}>`
  align-items: center;
  background-color: ${props => props.overlay};
  bottom: 0;
  flex: 1;
  justify-content: center;
  left: 0;
  opacity: 0.75;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 2;
`;

export default Loader;
