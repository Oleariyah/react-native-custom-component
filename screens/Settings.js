import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from "react-native";

const { width } = Dimensions.get("window");

export default function Setting() {
  const [state, setState] = useState({
    active: 0,
    xTabOne: 0,
    xTabTwo: 0,
    translateX: new Animated.Value(0),
    translateXTabOne: new Animated.Value(0),
    translateXTabTwo: new Animated.Value(width),
    translateY: -1000
  });

  const {
    active,
    xTabOne,
    xTabTwo,
    translateX,
    translateXTabTwo,
    translateXTabOne,
    translateY
  } = state;

  useEffect(() => {
    if (active === 0) {
      handleSlide(xTabOne);
    } else {
      handleSlide(xTabTwo);
    }
  }, [active]);

  const handleSlide = type => {
    Animated.spring(translateX, {
      toValue: type,
      duration: 100
    }).start();
    if (active === 0) {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: 0,
          duration: 100
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: width,
          duration: 100
        }).start()
      ]);
    } else {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: -width,
          duration: 100
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: 0,
          duration: 100
        }).start()
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          backgroundColor: "black",
          height: 60
        }}
      >
        <Animated.View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            width: "50%",
            height: "100%",
            borderBottomWidth: 2,
            borderBottomColor: "gold",
            transform: [{ translateX }]
          }}
        />
        <TouchableOpacity
          style={styles.tab}
          onLayout={event =>
            setState({ ...state, xTabOne: event.nativeEvent.layout.x })
          }
          onPress={() => {
            setState({
              ...state,
              active: 0
            });
            handleSlide(xTabOne);
          }}
        >
          <Text
            style={[styles.text, { color: active === 0 ? "gold" : "white" }]}
          >
            Tab One
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onLayout={event =>
            setState({ ...state, xTabTwo: event.nativeEvent.layout.x })
          }
          onPress={() => {
            setState({
              ...state,
              active: 1
            });
            handleSlide(xTabTwo);
          }}
        >
          <Text
            style={[styles.text, { color: active === 1 ? "gold" : "white" }]}
          >
            Tab Two
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.content}>
          <Animated.View
            style={[
              styles.textBackground,
              { transform: [{ translateX: translateXTabOne }] }
            ]}
            onLayout={event =>
              setState({
                ...state,
                translateY: event.nativeEvent.layout.height
              })
            }
          >
            <Text style={styles.text}>Setting One</Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.textBackground,
              {
                transform: [
                  { translateX: translateXTabTwo },
                  { translateY: -translateY }
                ]
              }
            ]}
          >
            <Text style={styles.text}>Setting Two</Text>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ea3345"
  },
  content: {
    flex: 1,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  textBackground: {
    height: 60,
    width: 150,
    backgroundColor: "black",
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 20,
    textAlign: "center"
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
