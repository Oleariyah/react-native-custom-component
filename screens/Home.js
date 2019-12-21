import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.textBackground}>
        <Text style={styles.text}>Home</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ea3345"
  },
  textBackground: {
    height: 60,
    width: 100,
    backgroundColor: "black",
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 20,
    textAlign: "center"
  }
});
