import { View, Text } from "react-native";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import Animated, { FadeInRight } from "react-native-reanimated";
import { Image } from "expo-image";
import { useNavigation, NavigationProp } from "@react-navigation/native";

const SplashScreen = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const { navigate }: NavigationProp<SplashNavigationType> = useNavigation();

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  useEffect(() => {
    setTimeout(() => {
      navigate("Welcome");
    }, 2000);
  }, []);

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white">
      <View className="w-full px-4 items-center">
        <Animated.View
          className="flex-row justify-center items-center"
          entering={FadeInRight.duration(100).springify()}>
          <View className="pr-2">
            <View className="w-20 h-20 overflow-hidden">
              <Image
                source={require("../../../assets/images/logo.png")}
                style={{
                  height: "100%",
                  width: "100%",
                }}
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={1000}
              />
            </View>
          </View>
        </Animated.View>
        <Animated.View
          className="flex-row items-center justify-center"
          entering={FadeInRight.duration(100).delay(200).springify()}>
          <Text
            className="text-neutral-600 text-xl leading-[60px] pl-1"
            style={{
              fontFamily: "PlusJakartaSans",
            }}>
            STACKS
          </Text>
          <Text
            className="text-[#31aca3] text-xl leading-[60px] pl-1"
            style={{
              fontFamily: "PlusJakartaSansBoldItalic",
            }}>
            CRYPTO
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
