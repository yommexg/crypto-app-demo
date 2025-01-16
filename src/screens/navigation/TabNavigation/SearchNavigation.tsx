import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import SearchScreen from "../../tabs/search/SearchScreen";
import CoinDetailsScreen from "../../stacks/CoinDetailsScreen";

const Stack = createStackNavigator();

const SearchNavigation = () => {
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
        name="SearchScreen"
        component={SearchScreen}
      />
      <Stack.Screen
        name="CoinDetails"
        component={CoinDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default SearchNavigation;
