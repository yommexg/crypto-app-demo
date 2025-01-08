import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import Button from "@/src/components/Button";
import ButtonOutline from "@/src/components/ButtonOutline";

const WelcomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 justify-between items-center bg-white">
      <View className="w-full px-4 items-center justify-center space-y-6 h-full">
        {/* Welcome Text */}
        <View className="justify-center items-center">
          <Animated.Text
            entering={FadeInDown.duration(100).delay(100).springify()}
            className="text-neutral-800 text-3xl font-medium leading-[60px]"
            style={{
              fontFamily: "PlusJakartaSansBold",
            }}>
            Welcome
          </Animated.Text>
        </View>

        {/* Login and Signup Button */}
        <View className="w-full justify-start">
          <Animated.View
            entering={FadeInDown.duration(100).delay(300).springify()}
            className="pb-6">
            <Button />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.duration(100).delay(300).springify()}
            className="pb-6">
            <ButtonOutline />
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
