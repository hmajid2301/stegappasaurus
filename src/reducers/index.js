import { combineReducers } from 'redux';

import ChangePrimaryColor from './ChangePrimaryColor';
import SelectAlgorithm from './SelectAlgorithm';
import ToggleDarkTheme from './ToggleDarkTheme';


export default combineReducers({
  ChangePrimaryColor,
  SelectAlgorithm,
  ToggleDarkTheme,
});
