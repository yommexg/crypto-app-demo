import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { TransitionPresets } from "@react-navigation/stack";

import HomeNavigation from "./HomeNavigation";
import MarketNavigation from "./MarketNavigation";
import NewsNavigation from "./NewsNavigation";
import ProfileNavigation from "./ProfileNavigation";
import SearchNavigation from "./SearchNavigation";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          let iconName:
            | "home"
            | "stats-chart-outline"
            | "search-outline"
            | "newspaper-outline"
            | "person-outline" = "home";

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Market") {
            iconName = "stats-chart-outline";
          } else if (route.name === "Search") {
            iconName = "search-outline";
          } else if (route.name === "News") {
            iconName = "newspaper-outline";
          } else if (route.name === "Profile") {
            iconName = "person-outline";
          }

          const customizeSize = 25;

          return (
            <Ionicons
              name={iconName}
              size={customizeSize}
              color={focused ? "#164b48" : "gray"}
            />
          );
        },
        tabBarActiveTintColor: "#164b48",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeNavigation}
      />
      <Tab.Screen
        name="Market"
        component={MarketNavigation}
      />
      <Tab.Screen
        name="Search"
        component={SearchNavigation}
      />
      <Tab.Screen
        name="News"
        component={NewsNavigation}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigation}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
