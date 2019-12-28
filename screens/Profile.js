import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  ScrollView
} from "react-native";

MAX_HEADER_HEIGHT = 120;
MIN_HEADER_HEIGHT = 70;
PROFILE_IMAGE_MAX_HEIGHT = 80;
PROFILE_IMAGE_MIN_HEIGHT = 40;

export default function Profile() {
  const [scrollY] = useState(new Animated.Value(0));
  const [headerHeight, setHeaderHeight] = useState(0);
  const [profileImageHeight, setProfileImageHeight] = useState(0);
  const [profileImageMarginTop, setProfileImageMarginTop] = useState(0);
  const [headerZindex, setHeaderZindex] = useState(0);
  const [headerTitleBottom, setHeaderTitleBottom] = useState(0);
  const [opacity, setTitleOpacity] = useState(0);

  useEffect(() => {
    const headerHeight = scrollY.interpolate({
      inputRange: [0, MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT],
      outputRange: [MAX_HEADER_HEIGHT, MIN_HEADER_HEIGHT],
      extrapolate: "clamp"
    });
    const headerZindex = scrollY.interpolate({
      inputRange: [0, MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT],
      outputRange: [0, 1],
      extrapolate: "clamp"
    });
    const headerTitleBottom = scrollY.interpolate({
      inputRange: [
        0,
        MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT,
        MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT + PROFILE_IMAGE_MIN_HEIGHT + 5,
        MAX_HEADER_HEIGHT -
          MIN_HEADER_HEIGHT +
          PROFILE_IMAGE_MIN_HEIGHT +
          5 +
          26
      ],
      outputRange: [-20, -20, -20, 0],
      extrapolate: "clamp"
    });
    const opacity = scrollY.interpolate({
      inputRange: [
        0,
        MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT,
        MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT + PROFILE_IMAGE_MIN_HEIGHT + 5,
        MAX_HEADER_HEIGHT -
          MIN_HEADER_HEIGHT +
          PROFILE_IMAGE_MIN_HEIGHT +
          5 +
          26
      ],
      outputRange: [0, 0, 0, 1],
      extrapolate: "clamp"
    });
    const profileImageHeight = scrollY.interpolate({
      inputRange: [0, MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT],
      outputRange: [PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT],
      extrapolate: "clamp"
    });
    const profileImageMarginTop = scrollY.interpolate({
      inputRange: [0, MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT],
      outputRange: [
        MAX_HEADER_HEIGHT - PROFILE_IMAGE_MAX_HEIGHT / 2,
        MAX_HEADER_HEIGHT
      ],
      extrapolate: "clamp"
    });
    setHeaderHeight(headerHeight);
    setProfileImageHeight(profileImageHeight);
    setProfileImageMarginTop(profileImageMarginTop);
    setHeaderZindex(headerZindex);
    setHeaderTitleBottom(headerTitleBottom);
    setTitleOpacity(opacity);
  }, [scrollY]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "black",
          height: headerHeight,
          zIndex: headerZindex,
          alignItems: "center"
        }}
      >
        <Animated.View
          style={{
            position: "absolute",
            bottom: headerTitleBottom,
            opacity: opacity
          }}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            John Wick
          </Text>
        </Animated.View>
      </Animated.View>
      <ScrollView
        style={{ flex: 1 }}
        scrollEventThrottle={16}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } }
        ])}
      >
        <Animated.View
          style={{
            height: profileImageHeight,
            width: profileImageHeight,
            borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
            borderColor: "white",
            borderWidth: 3,
            overflow: "hidden",
            marginTop: profileImageMarginTop,
            marginLeft: 10
          }}
        >
          <Image
            source={require("../assets/images/penArt.jpg")}
            style={{ flex: 1, height: null, width: null }}
          ></Image>
        </Animated.View>
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 24, paddingLeft: 10 }}>
            John Wick
          </Text>
        </View>
        <View style={{ height: 1000 }}></View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ea3345"
  }
});
