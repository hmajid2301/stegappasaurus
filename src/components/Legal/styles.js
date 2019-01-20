import { fonts } from '../../util/styles';


const styles = {
  icons: {
    textAlign: 'right',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  text: {
    fontFamily: fonts.body,
  },
  markdown: {
    heading1: {
      fontSize: 24,
      paddingBottom: 15,
      fontFamily: fonts.body,
    },
    heading2: {
      fontSize: 18,
      paddingBottom: 10,
      fontFamily: fonts.body,
    },
    text: {
      color: 'black',
      fontFamily: fonts.body,
    },
    list: {
      paddingBottom: 10,
    },
    paragraph: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      paddingBottom: 10,
    },
  },
};

export default styles;
