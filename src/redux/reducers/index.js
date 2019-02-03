import { combineReducers } from 'redux';

import TogglePrimaryColor from './TogglePrimaryColor';
import SelectAlgorithm from './SelectAlgorithm';
import ToggleDarkTheme from './ToggleDarkTheme';


export default combineReducers({
  TogglePrimaryColor,
  SelectAlgorithm,
  ToggleDarkTheme,
});
