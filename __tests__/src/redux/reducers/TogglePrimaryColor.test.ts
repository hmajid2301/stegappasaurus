import { PrimaryColor, PrimaryColorNames } from "@types";
import { colors } from "~/modules";
import TogglePrimaryColor from "~/redux/reducers/TogglePrimaryColor";
import { TOGGLE_PRIMARY_COLOR } from "~/redux/actions/actionTypes";

describe("Reducer: TogglePrimaryColor", () => {
  let testData: any = [
    {
      expectedState: {
        colorData: { name: "ORANGE", color: colors.secondary as PrimaryColor }
      },
      color: "ORANGE",
      initialState: {
        name: "BLUE",
        color: colors.primary as PrimaryColor
      }
    },
    {
      expectedState: {
        colorData: { name: "ORANGE", color: colors.secondary as PrimaryColor }
      },
      color: "ORANGE",
      initialState: { name: "ORANGE", color: colors.secondary as PrimaryColor }
    },
    {
      expectedState: {
        colorData: { name: "BLUE", color: colors.primary as PrimaryColor }
      },
      color: "BLUE",
      initialState: { name: "ORANGE", color: colors.secondary as PrimaryColor }
    },
    {
      expectedState: {
        colorData: { name: "BLUE", color: colors.primary as PrimaryColor }
      },
      color: "BLUE",
      initialState: { name: "BLUE", color: colors.primary as PrimaryColor }
    }
  ];
  test.each(testData)(
    "Correct Type",
    ({ expectedState, color, initialState }) => {
      const action = { type: TOGGLE_PRIMARY_COLOR, payload: { color } };

      const newState = TogglePrimaryColor(initialState, action);
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
    const action = {
      type: type,
      payload: { color: "ORANGE" as PrimaryColorNames }
    };
    const state = TogglePrimaryColor(initialState, action);
    expect(state).toEqual(initialState);
  });
});
