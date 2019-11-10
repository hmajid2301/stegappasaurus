import {Dimensions, StyleSheet} from 'react-native';

const pageWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 2,
  },

  photoButton: {
    flex: 1,
  },

  photos: {
    height: pageWidth / 3,
    marginLeft: 2,
    marginTop: 2,
  },
});

export default styles;
