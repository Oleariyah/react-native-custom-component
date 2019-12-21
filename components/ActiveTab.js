import React, { Fragment, useState } from "react";
import { View, Dimensions, StyleSheet, Animated } from "react-native";
import { Feather as Icons } from "@expo/vector-icons";

export const tabHeight = 64;
const { width } = Dimensions.get("window");

export default function ActiveTab(props) {
  const { tabs, translateX, values, routes } = props;
  const tabWidth = width / tabs.length;

  return (
    <View style={styles.container}>
      {routes.map(({ routeName }, key) => {
        const activeValue = values[key];

        const tabOpacity = translateX.interpolate({
          inputRange: [
            -width + tabWidth * (key - 1),
            -width + tabWidth * key,
            -width + tabWidth * (key + 1)
          ],
          outputRange: [0, 1, 0],
          extrapolate: "clamp"
        });

        const translateY = activeValue.interpolate({
          inputRange: [0, 1],
          outputRange: [tabHeight, 0]
        });

        return (
          <Fragment {...{ key }}>
            <Animated.View
              style={[
                {
                  position: "absolute",
                  width: tabWidth,
                  top: -15,
                  left: tabWidth * key,
                  height: tabHeight,
                  justifyContent: "center",
                  alignItems: "center",
                  transform: [{ translateY }]
                },
                { tabOpacity }
              ]}
            >
              <View style={styles.circle}>
                <Icons size={30} name={tabs[key][routeName]} />
              </View>
            </Animated.View>
          </Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  circle: {
    width: 45,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    height: 45,
    borderRadius: 50,
    backgroundColor: "white",
    elevation: 5
  }
});
