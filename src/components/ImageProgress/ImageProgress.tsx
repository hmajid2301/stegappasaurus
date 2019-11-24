import React from 'react';
import {
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Icon, IconType} from 'react-native-elements';

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
      <AnimatedCircularProgress
        size={pageWidth * 0.75}
        width={3}
        fill={props.progress}
        tintColor={props.primaryColor}>
        {fill => (
          <ImageBackground
            imageStyle={styles.circularImage}
            source={{uri: props.photo}}
            style={styles.image}>
            <View style={styles.iconContainer}>
              {props.icon && <Icon {...props.icon} />}
              <Text style={styles.textPercentage}>{Math.ceil(fill)}%</Text>
            </View>
          </ImageBackground>
        )}
      </AnimatedCircularProgress>
    </TouchableOpacity>
  </View>
);

export default ImageProgress;
