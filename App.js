import React from "react";
import { StyleSheet, View } from "react-native";
import Tabbar from "./components/Tabbar";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Home from "./screens/Home";
import Dashboard from "./screens/Dashboard";
import Detail from "./screens/Detail";
import Profile from "./screens/Profile";
import Settings from "./screens/Settings";

const TabNavigator = createBottomTabNavigator(
  {
    Home: Home,
    Dashboard: Dashboard,
    Detail: Detail,
    Profile: Profile,
    Settings: Settings
  },
  {
    tabBarComponent: props => {
      return (
        <View style={styles.container}>
          <Tabbar {...props} />
        </View>
      );
    }
  }
);

export default createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    backgroundColor: "#ea3345"
  }
});
