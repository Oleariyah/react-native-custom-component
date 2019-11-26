import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Tabbar from "./components/Tabbar";

export default function App() {
  return (
    <View style={styles.container}>
      <Tabbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#ea3345"
  }
});
