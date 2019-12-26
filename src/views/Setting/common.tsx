import styled from 'styled-components/native';

import {primary} from '~/constants/colors';
import {body, bodyLight} from '~/constants/fonts';

export const ItemText = styled.Text<{color: string}>`
  color: ${props => props.color};
  font-family: ${bodyLight};
`;

export const ItemHeaderText = styled.Text`
  color: ${primary};
  font-family: ${body};
  font-size: 12;
`;
