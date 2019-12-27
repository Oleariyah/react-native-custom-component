import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.textBackground}>
        <Text style={styles.text}>Home</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Drawer" color="green" onPress={() => navigation.openDrawer()} />
        <Button
          title="Switch"
          color="green"
          onPress={() => navigation.navigate("Dashboard")}
        />
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
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 300,
    marginTop: 20,
    maxWidth: "80%"
  }
});
