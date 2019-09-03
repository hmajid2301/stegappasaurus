import ToggleAutomaticTheme from "~/redux/reducers/ToggleAutomaticTheme";
import { TOGGLE_AUTOMATIC_THEME } from "~/redux/actions/actionTypes";

describe("Reducer: ToggleAutomaticTheme", () => {
  let testData: any = [
    {
      expectedState: { isAutomatic: true },
      isAutomatic: true,
      initialState: { isAutomatic: false }
    },
    {
      expectedState: { isAutomatic: true },
      isAutomatic: true,
      initialState: { isAutomatic: true }
    },
    {
      expectedState: { isAutomatic: false },
      isAutomatic: false,
      initialState: { isAutomatic: false }
    },
    {
      expectedState: { isAutomatic: false },
      isAutomatic: false,
      initialState: { isAutomatic: true }
    }
  ];
  test.each(testData)(
    "Correct Type",
    ({ expectedState, isAutomatic, initialState }) => {
      const action = { type: TOGGLE_AUTOMATIC_THEME, payload: { isAutomatic } };

      const newState = ToggleAutomaticTheme(initialState, action);
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
    }
  ];

  test.each(testData)("Invalid Type", ({ initialState, type }) => {
    const action = { type: type, payload: { isAutomatic: true } };
    const state = ToggleAutomaticTheme(initialState, action);
    expect(state).toEqual(initialState);
  });
});
