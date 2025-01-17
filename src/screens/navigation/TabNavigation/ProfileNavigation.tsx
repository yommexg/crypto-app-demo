import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";

import ProfileScreen from "../../tabs/profile/ProfileScreen";
import EditProfileScreen from "../../stacks/EditProfileScreen";

const Stack = createStackNavigator();

const ProfileNavigation = () => {
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
        name="ProfileScreen"
        component={ProfileScreen}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigation;
