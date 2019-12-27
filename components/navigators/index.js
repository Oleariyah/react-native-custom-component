import React from "react";
import { StyleSheet, View } from "react-native";
import Tabbar from "./BottomTabbar";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Home, Dashboard, Detail, Profile, Settings } from "../../screens";
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
    }
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

export default AppContainer = createAppContainer(AppDrawerNavigator);

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    backgroundColor: "#ea3345"
  }
});
