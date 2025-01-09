import { View, Text } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";

const Breaker = () => {
  return (
    <Animated.View
      entering={FadeInRight.duration(100).delay(500).springify()}
      className="flex-row w-full">
      <View className="h-10 w-[40%] justify-center items-center">
        <View className="border-t-2 border-gray-400 w-full" />
      </View>
      <View className="w-[20%] justify-center items-center">
        <Text className="text-base text-neutral-500">Or</Text>
      </View>
      <View className="h-10 w-[40%] justify-center items-center">
        <View className="border-t-2 border-gray-400 w-full" />
      </View>
    </Animated.View>
  );
};

export default Breaker;
