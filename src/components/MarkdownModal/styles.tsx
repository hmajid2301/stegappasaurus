import { fonts } from "~/common/styles";

const styles = {
  icons: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlign: "right"
  },

  container: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },

  modalContainer: {
    flex: 1
  },

  buttonText: {
    fontFamily: fonts.body
  },

  markdown: {
    heading1: {
      fontFamily: fonts.body,
      fontSize: 24,
      paddingBottom: 15
    },

    heading2: {
      fontFamily: fonts.body,
      fontSize: 18,
      paddingBottom: 10
    },

    text: {
      fontFamily: fonts.body
    },

    list: {
      paddingBottom: 10
    },

    paragraph: {
      paddingBottom: 10
    }
  }
};

export default styles;
