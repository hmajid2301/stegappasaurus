import actionCreatorFactory from "typescript-fsa";

import { AlgorithmNames, PrimaryColorNames } from "~/common/interfaces";

import {
  FIREBASE_TOKEN,
  RESET_PREFERENCES,
  SELECT_ALGORITHM,
  TOGGLE_AUTOMATIC,
  TOGGLE_DARK_THEME,
  TOGGLE_PRIMARY_COLOR
} from "./actionTypes";

/**
 * All the actions and the data type/arguments they expect to receive to update
 * the store.
 */

const actionCreator = actionCreatorFactory();

/** This action is used to store the firebase token. To auth when
 *  making API requests to Firebase for Encoding/Decoding.
 */
export const firebaseToken = actionCreator<{ token: string }>(FIREBASE_TOKEN);

/** This action is used to reset the user's preferences back to the
 * default values.
 */
export const resetPreferences = actionCreator<{}>(RESET_PREFERENCES);

/** This action is used to select which algorithm should be used for
 * encoding/decoding.
 */
export const selectAlgorithm = actionCreator<{ algorithm: AlgorithmNames }>(
  SELECT_ALGORITHM
);

/** This action is used to set automatic theme to true/false. If set to True,
 * then the theme will automatically change from light/dark when the sunrises/
 * sunsets.
 */
export const toggleAutomaticTheme = actionCreator<{
  isAutomatic: boolean;
}>(TOGGLE_AUTOMATIC);

/** This action is set the dark theme. When set to true the app uses
 * the dark theme, when set to false it uses the light theme.
 */
export const toggleDarkTheme = actionCreator<{ isDark: boolean }>(
  TOGGLE_DARK_THEME
);

/** This action is set the primary colour, on the encoding page this is blue.
 * For the decoding page it's orange.
 */
export const togglePrimaryColor = actionCreator<{ color: PrimaryColorNames }>(
  TOGGLE_PRIMARY_COLOR
);
