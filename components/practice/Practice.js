import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { Home, Dashboard, Detail, Profile, Settings } from "../../screens";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Feather as Icons } from "@expo/vector-icons";

const DashboardTabNavigator = createBottomTabNavigator(
  {
    Dashboard: Dashboard,
    Detail: Detail,
    Profile: Profile,
    Settings: Settings
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return { headerTitle: routeName };
    }
  }
);

const DashboardStack = createStackNavigator({
  DashboardTabNavigator: DashboardTabNavigator
});

const DrawerNavigator = createDrawerNavigator(
  {
    Dashboard: DashboardStack
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

const SwitchNavigator = createSwitchNavigator({
  Home: Home,
  Dashboard: DrawerNavigator
});

export default AppContainer = createAppContainer(SwitchNavigator);
