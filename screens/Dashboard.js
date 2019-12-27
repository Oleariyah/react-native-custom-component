import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function Dashboard({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.textBackground}>
        <Text style={styles.text}>Dashboard</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Drawer"
          color="green"
          onPress={() => navigation.openDrawer()}
        />
        <Button
          title="Switch"
          color="green"
          onPress={() => navigation.navigate("Home")}
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
    width: 120,
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
