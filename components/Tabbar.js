import React, { useState, useEffect, Fragment } from "react";
import {
  SafeAreaView,
  Dimensions,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Animated
} from "react-native";
import Svg, { Path } from "react-native-svg";
import * as shape from "d3-shape";
import ActiveTab, { tabHeight as height } from "./ActiveTab";
import { Feather as Icons } from "@expo/vector-icons";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const tabs = [
  { Home: "grid" },
  { Dashboard: "list" },
  { Detail: "refresh-cw" },
  { Profile: "box" },
  { Settings: "user" }
];
//get screen width
const { width } = Dimensions.get("window");
const tabWidth = width / tabs.length;

//draw left line
const left = shape
  .line()
  .x(d => d.x)
  .y(d => d.y)([
  { x: 0, y: 0 },
  { x: width, y: 0 }
]);

//draw right line
const right = shape
  .line()
  .x(d => d.x)
  .y(d => d.y)([
  { x: width + tabWidth, y: 0 },
  { x: width * 2.5, y: 0 },
  { x: width * 2.5, y: height },
  { x: 0, y: height },
  { x: 0, y: 0 }
]);

//draw tab curve
const tab = shape
  .line()
  .x(d => d.x)
  .y(d => d.y)
  .curve(shape.curveBasis)([
  { x: width - 15, y: 0 },
  { x: width + 5, y: 0 },
  { x: width + 10, y: 10 },
  { x: width + 15, y: height - 15 },
  { x: width + tabWidth - 15, y: height - 15 },
  { x: width + tabWidth - 10, y: 10 },
  { x: width + tabWidth - 5, y: 0 },
  { x: width + 15 + tabWidth, y: 0 }
]);

const d = `${left}${tab}${right}`;

export default function Tabbar(props) {
  const { navigation } = props;
  const { routes } = navigation.state;

  const [translateX] = useState(new Animated.Value(-width));
  const [values] = useState(
    tabs.map((tab, index) => new Animated.Value(index === 0 ? 1 : 0))
  );

  const slideBar = index => {
    Animated.sequence([
      ...values.map(translateX =>
        Animated.timing(translateX, {
          toValue: 0,
          duration: 100,
          userNativeDriver: true
        })
      ),
      Animated.parallel([
        Animated.spring(values[index], {
          toValue: 1,
          userNativeDriver: true
        }),
        Animated.spring(translateX, {
          toValue: -width + tabWidth * index,
          userNativeDriver: true
        })
      ])
    ]).start();
  };

  return (
    <Fragment>
      <View {...{ width, height }}>
        <ActiveTab
          translateX={translateX}
          values={values}
          {...{ tabs, routes }}
        />
        <AnimatedSvg
          width={width * 2.5}
          {...{ height }}
          style={{ transform: [{ translateX }] }}
        >
          <Path {...{ d }} fill="white" />
        </AnimatedSvg>

        <View style={StyleSheet.absoluteFill}>
          <View style={styles.container}>
            {routes.map(({ routeName }, key) => {
              const opacity = translateX.interpolate({
                inputRange: [
                  -width + tabWidth * (key - 1),
                  -width + tabWidth * key,
                  -width + tabWidth * (key + 1)
                ],
                outputRange: [1, 0, 1],
                extrapolate: "clamp"
              });
              return (
                <TouchableWithoutFeedback
                  onPress={() => {
                    slideBar(key);
                    navigation.navigate(routeName);
                  }}
                  {...{ key }}
                >
                  <Animated.View style={[styles.tab, { opacity }]}>
                    <Icons size={28} name={tabs[key][routeName]} color="grey" />
                  </Animated.View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </View>
      </View>
      <SafeAreaView style={styles.SafeArea} />
    </Fragment>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "white"
  },
  container: {
    flexDirection: "row"
  },
  tab: {
    flex: 1,
    height: height,
    justifyContent: "center",
    alignItems: "center"
  }
});
