import { View, Text } from "react-native";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import HomeScreen from "../../tabs/home/HomeScreen";
import CoinDetailsScreen from "../../stacks/CoinDetailsScreen";

const Stack = createStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.FadeFromRightAndroid,
        ...TransitionPresets.SlideFromRightIOS,
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
      />
      <Stack.Screen
        name="CoinDetails"
        component={CoinDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
