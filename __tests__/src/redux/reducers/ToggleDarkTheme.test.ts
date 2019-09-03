import { ThemeColors } from "@types";
import { colors } from "~/modules";
import ToggleDarkTheme from "~/redux/reducers/ToggleDarkTheme";
import { TOGGLE_DARK_THEME } from "~/redux/actions/actionTypes";

describe("Reducer: ToggleDarkTheme", () => {
  let testData: any = [
    {
      expectedState: {
        theme: {
          background: colors.darkBlue as ThemeColors,
          color: colors.pureWhite as ThemeColors,
          isDark: true
        }
      },
      isDark: true,
      initialState: {
        background: colors.pureWhite as ThemeColors,
        color: colors.pureBlack as ThemeColors,
        isDark: false
      }
    },
    {
      expectedState: {
        theme: {
          background: colors.darkBlue as ThemeColors,
          color: colors.pureWhite as ThemeColors,
          isDark: true
        }
      },
      isDark: true,
      initialState: {
        background: colors.darkBlue as ThemeColors,
        color: colors.pureWhite as ThemeColors,
        isDark: true
      }
    },
    {
      expectedState: {
        theme: {
          background: colors.pureWhite as ThemeColors,
          color: colors.pureBlack as ThemeColors,
          isDark: false
        }
      },
      isDark: false,
      initialState: {
        background: colors.pureWhite as ThemeColors,
        color: colors.pureBlack as ThemeColors,
        isDark: false
      }
    },
    {
      expectedState: {
        theme: {
          background: colors.pureWhite as ThemeColors,
          color: colors.pureBlack as ThemeColors,
          isDark: false
        }
      },
      isDark: false,
      initialState: {
        background: colors.darkBlue as ThemeColors,
        color: colors.pureWhite as ThemeColors,
        isDark: true
      }
    }
  ];
  test.each(testData)(
    "Correct Type",
    ({ expectedState, isDark, initialState }) => {
      const action = { type: TOGGLE_DARK_THEME, payload: { isDark } };

      const newState = ToggleDarkTheme(initialState, action);
      expect(newState).toEqual(expectedState);
    }
  );

  testData = [
    {
      initialState: { isAutomatic: true },
      type: "dummy_type"
    },
    {
      initialState: { isAutomatic: false },
      type: "IS_A_RANDOM_TYPE"
    },
    {
      initialState: { isAutomatic: true },
      type: "TOGGLE_AUTOMATIC_THEME"
    }
  ];

  test.each(testData)("Invalid Type", ({ initialState, type }) => {
    const action = { type: type, payload: { isDark: false } };
    const state = ToggleDarkTheme(initialState, action);
    expect(state).toEqual(initialState);
  });
});
