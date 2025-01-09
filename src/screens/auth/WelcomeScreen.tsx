import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import Button from "@/src/components/Button";
import ButtonOutline from "@/src/components/ButtonOutline";
import Breaker from "@/src/components/Breaker";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "expo-image";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const WelcomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 justify-between items-center bg-white">
      <View className="w-full px-4 items-center justify-center gap-8 h-full">
        {/* Logo and Brand Name */}
        <View className="w-full px-4 items-center">
          <Animated.View
            entering={FadeInRight.duration(100).springify()}
            className="flex-row justify-center items-center">
            <View>
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
        </View>

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
            <Button title="Login" />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.duration(100).delay(400).springify()}>
            <ButtonOutline title="Sign Up" />
          </Animated.View>
        </View>

        {/* Breaker Line */}
        <View>
          <Breaker />
        </View>

        {/* Third Party Authentication */}
        <View className="w-full justify-start">
          <Animated.View
            entering={FadeInDown.duration(100).delay(600).springify()}
            className="border border-white pb-4">
            <ButtonOutline title="Continue With Google">
              <AntDesign
                name="google"
                size={20}
                color="grey"
              />
            </ButtonOutline>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.duration(100).delay(700).springify()}
            className="border border-white pb-4">
            <ButtonOutline title="Continue With Apple">
              <AntDesign
                name="apple1"
                size={20}
                color="grey"
              />
            </ButtonOutline>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
