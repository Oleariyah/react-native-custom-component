import React from "react";
import { StyleSheet, View } from "react-native";
import Tabbar from "./BottomTabbar";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import {
  Loading,
  Home,
  Dashboard,
  Detail,
  Profile,
  Settings
} from "../../screens";
import { Feather as Icons } from "@expo/vector-icons";

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
    },
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return { headerTitle: routeName };
    },
    animatedEnable: true
  }
);

const AppStackNavigator = createStackNavigator({
  TabNavigator: TabNavigator
});

const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: AppStackNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Icons
            name="menu"
            size={30}
            style={{ paddingLeft: 30 }}
            onPress={() => navigation.openDrawer()}
          />
        )
      };
    }
  }
);

const AppSwitchNavigator = createSwitchNavigator({
  Loading: Loading,
  Dashboard: AppDrawerNavigator
});

export default AppContainer = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    backgroundColor: "#ea3345"
  }
});
