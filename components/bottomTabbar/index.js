import React from "react";
import { StyleSheet, View } from "react-native";
import Tabbar from "./Tabbar";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Home, Dashboard, Detail, Profile, Settings } from "../../screens";

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

export default AppContainer = createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    backgroundColor: "#ea3345"
  }
});
