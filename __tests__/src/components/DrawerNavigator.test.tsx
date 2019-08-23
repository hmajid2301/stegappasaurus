import { shallow } from "enzyme";
import React from "react";

import DrawerNavigator from "~/components/DrawerNavigator";

describe("DrawerNavigator: Match snapshots", () => {
  test("1", () => {
    const component = shallow(
      // @ts-ignore
      <DrawerNavigator
        activeItemKey="Home"
        drawerPosition="left"
        items={[
          {
            routes: [
              {
                key: "Encoding",
                isTransitioning: false,
                index: 0,
                routes: [],
                routeName: "Encoding"
              },
              {
                key: "Decoding",
                isTransitioning: false,
                index: 0,
                routes: [],
                routeName: "Decoding"
              }
            ],
            index: 0,
            isTransitioning: false,
            key: "Home",
            routeName: "Home"
          }
        ]}
        navigation={
          {
            state: {
              routes: [
                {
                  routes: [
                    {
                      key: "Encoding",
                      isTransitioning: false,
                      index: 0,
                      routes: [],
                      routeName: "Encoding"
                    },
                    {
                      key: "Decoding",
                      isTransitioning: false,
                      index: 0,
                      routes: [],
                      routeName: "Decoding"
                    }
                  ],
                  index: 0,
                  isTransitioning: false,
                  key: "Home",
                  routeName: "Home"
                }
              ],
              index: 0,
              isTransitioning: false,
              isDrawerOpen: false,
              key: "Hello",
              params: { car_id: 123 }
            }
          } as any
        }
        screenProps={{
          theme: {
            background: "#FFF",
            color: "#000",
            isDark: false
          }
        }}
      />
    );
    expect(component).toMatchSnapshot();
  });

  test("2", () => {
    const component = shallow(
      // @ts-ignore
      <DrawerNavigator
        activeItemKey="Home"
        drawerPosition="left"
        items={[
          {
            routes: [
              {
                key: "Encoding",
                isTransitioning: false,
                index: 0,
                routes: [],
                routeName: "Encoding"
              },
              {
                key: "Decoding",
                isTransitioning: false,
                index: 0,
                routes: [],
                routeName: "Decoding"
              }
            ],
            index: 0,
            isTransitioning: false,
            key: "Home",
            routeName: "Home"
          }
        ]}
        navigation={
          {
            state: {
              routes: [
                {
                  routes: [
                    {
                      key: "Encoding",
                      isTransitioning: false,
                      index: 0,
                      routes: [],
                      routeName: "Encoding"
                    },
                    {
                      key: "Decoding",
                      isTransitioning: false,
                      index: 0,
                      routes: [],
                      routeName: "Decoding"
                    }
                  ],
                  index: 0,
                  isTransitioning: false,
                  key: "Home",
                  routeName: "Home"
                }
              ],
              index: 0,
              isTransitioning: false,
              isDrawerOpen: false,
              key: "Hello",
              params: { car_id: 123 }
            }
          } as any
        }
      />
    );
    expect(component).toMatchSnapshot();
  });
});
