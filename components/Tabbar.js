import React, { useState, Fragment } from "react";
import {
  SafeAreaView,
  Dimensions,
  View,
  StyleSheet,
  Animated
} from "react-native";
import Svg, { Path } from "react-native-svg";
import * as shape from "d3-shape";
import StaticTabbar, { tabHeight as height } from "./StaticTabbar";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const tabs = [
  { name: "grid" },
  { name: "list" },
  { name: "refresh-cw" },
  { name: "box" },
  { name: "user" }
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

export default function Tabbar() {
  translateX = new Animated.Value(-width);

  return (
    <Fragment>
      <View {...{ width, height }}>
        <AnimatedSvg
          width={width * 2.5}
          {...{ height }}
          style={{ transform: [{ translateX }] }}
        >
          <Path {...{ d }} fill="white" />
        </AnimatedSvg>

        <View style={StyleSheet.absoluteFill}>
          <StaticTabbar value={translateX} {...{ tabs }} />
        </View>
      </View>
      <SafeAreaView style={styles.SafeArea} />
    </Fragment>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "white"
  }
});
