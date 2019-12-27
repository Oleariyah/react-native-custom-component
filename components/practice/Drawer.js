import React from "react";
import { View } from "react-native";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import { Home, Dashboard, Detail, Profile, Settings } from "../../screens";

const DrawerNavigator = createDrawerNavigator({
  Home: Home
});

export default Drawer;
