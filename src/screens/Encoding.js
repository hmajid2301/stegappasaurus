import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { Icon } from 'react-native-elements';

import Canvas from '../components/Canvas/Canvas';
import CustomHeader from '../components/CustomHeader';
import styles from '../components/Common/styles';


export default class Encoding extends Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Icon name='home' type='font-awesome' color={tintColor} />
    ),
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  encode = () => {
    this.canvas.getPixelData();
  }

  render() {
    return (
      <View style={styles.showCanvas}>
        <CustomHeader navigation={this.props.navigation}/>
         <Button onPress={this.encode} title={'GELO'} />
        <Canvas
          ref={(canvas) => { this.canvas = canvas; }}
          blob='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAPzAAAD8wF1XGupAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAJZQTFRF////SUmSQGCfQFWVPVyZOVuZO1eaPFmZO1qYO1mZO1mYO1mYOlmYPFmYO1mYO1mYO1qYO1mYPVuZP1yaQV6bQ2CcR2OeTWmiVG6lVW+mVnCmV3GnWnOoXnerZHytZn2va4Kxcoe1eY65gJS8ipzCi53CkKHFtsHZuMPau8bbwsvf09ro1Nvo1dvp4ubw9vf6/Pz9////XyoQ3AAAABF0Uk5TAAcIGBktSYSXmMHI2uPy8/XVqDFbAAABA0lEQVQ4y4WT2WKDIBBFcYkswbVp9n2pra1N/P+fC5gII5B4n8B7wJlhBiElL6KMpylnNPKQrZAkuVJCQsP2cZb3lGEf+sE4tzQOtD+Kc4fikTrv9AXxvMMH90+/vn/r+tj95REH1v78v5E6d3vc5gfi/2n95qJykdkS7X/chHut/47qCxH1A/VZyOMHGGfioQhs1xJY9zKJEFXrYrqVwGYyKTRAEVPrXdPppAGGuAPYa4Cj1AGsNJACYFlW0q3K8hMC/H0WHATpBBhI0wnQ4ULBUtuAKDV8LBsg/ee2gPa5QcNYADZazgSeLaeb1gDiwGz7YiZU2G0/PDjDozc8vK/H/w603kSHess3kQAAAABJRU5ErkJggg=='
          options={{ height: 32, width: 32 }}
        />
      </View>
    );
  }
}
