import React from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';

const DismissKeyboard = ({children}: {children: React.ReactChild}) => (
  <TouchableWithoutFeedback onPress={dismiss}>
    {children}
  </TouchableWithoutFeedback>
);

const dismiss = () => {
  Keyboard.dismiss();
};
export default DismissKeyboard;
