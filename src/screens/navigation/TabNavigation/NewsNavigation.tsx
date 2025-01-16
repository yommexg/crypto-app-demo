import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import NewsScreen from "../../tabs/news/NewsScreen";
import NewsDetailsScreen from "../../stacks/NewsDetailsScreen";

const Stack = createStackNavigator();

const NewsNavigation = () => {
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
        name="NewsScreen"
        component={NewsScreen}
      />
      <Stack.Screen
        name="NewsDetails"
        component={NewsDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default NewsNavigation;
