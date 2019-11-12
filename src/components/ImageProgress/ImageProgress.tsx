import React from 'react';
import {
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon, IconType} from 'react-native-elements';
import PercentageCircle from 'react-native-percentage-circle';

import {TabColors, ThemeColors} from '~/constants/types';
import styles from './styles';

interface IProps {
  background: ThemeColors;
  onPress?: (...args: any) => void;
  icon?: {
    color: string;
    name: string;
    size: number;
    type: IconType;
  };
  progress: number;
  photo: string;
  primaryColor: TabColors;
}

const pageWidth = Dimensions.get('window').width;

const ImageProgress: React.FunctionComponent<IProps> = (props: IProps) => (
  <View style={[styles.progressContainer, {backgroundColor: props.background}]}>
    <TouchableOpacity activeOpacity={0.8} onPress={props.onPress}>
      <PercentageCircle
        borderWidth={5}
        color={props.primaryColor}
        percent={props.progress}
        radius={pageWidth * 0.334}>
        <ImageBackground
          imageStyle={[styles.circularImage, {borderColor: props.primaryColor}]}
          source={{uri: props.photo}}
          style={styles.image}>
          <View style={styles.iconContainer}>
            {props.icon && <Icon {...props.icon} />}
            <Text style={styles.textPercentage}>{props.progress}%</Text>
          </View>
        </ImageBackground>
      </PercentageCircle>
    </TouchableOpacity>
  </View>
);

export default ImageProgress;
