import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Button from "@/src/components/Button";
import ButtonOutline from "@/src/components/ButtonOutline";
import Breaker from "@/src/components/Breaker";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/lib/supabase";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { navigate: navigateAuth }: NavigationProp<AuthNavigationType> =
    useNavigation();

  async function signUpWithEmail() {
    setIsLoading(true);
    const {
      data: { session, user },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (!error) {
      const newProfile = {
        id: user?.id.toString(),
      };
      const res = await supabase.from("profiles").insert(newProfile);
      console.log(res);
    }

    if (!session) {
      Alert.alert(
        "Registration Successful!!, Please check your email inbox for verification"
      );
    }

    setIsLoading(false);
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {isLoading && (
        <View className="absolute z-50 w-full justify-center items-center bottom-0 top-0">
          <View className="h-full w-full justify-center items-center bg-black opacity-[0.45]" />
          <View className="absolute">
            <ActivityIndicator
              size="large"
              color="white"
            />
          </View>
        </View>
      )}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust behavior for iOS and Android
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled">
          <View className="justify-center items-center flex-1">
            <View className="justify-center w-full px-4 gap-6">
              {/* Welcome Text */}
              <Animated.View
                className="justify-center items-center"
                entering={FadeInDown.duration(100).springify(100)}>
                <Text
                  className="text-neutral-800 text-2xl leading-[60px]"
                  style={{
                    fontFamily: "PlusJakartaSansBold",
                  }}>
                  Register to join us.
                </Text>
                <Text className="text-neutral-500 text-sm font-medium">
                  Welcome! Please enter your details.
                </Text>
              </Animated.View>

              {/* Text Input for email and password */}
              <Animated.View
                className="py-8 gap-10"
                entering={FadeInDown.duration(100).delay(200).springify()}>
                {/* Email */}
                <View className="border-2 border-gray-400 rounded-lg">
                  <TextInput
                    className="p-4"
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Email"
                    autoCapitalize="none"
                  />
                </View>

                {/* Password */}
                <View className="border-2 border-gray-400 rounded-lg">
                  <TextInput
                    className="p-4"
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Password"
                    autoCapitalize="none"
                    secureTextEntry
                  />
                </View>
              </Animated.View>

              {/* Register Button */}
              <Animated.View
                className="w-full justify-start"
                entering={FadeInDown.duration(100).delay(300).springify()}>
                <View className="pb-6">
                  <Button
                    title="Register"
                    action={signUpWithEmail}
                  />
                </View>
              </Animated.View>

              {/* Breaker Line */}
              <View>
                <Breaker />
              </View>

              {/* Third Party Authentication */}
              <View className="w-full justify-start">
                <Animated.View
                  entering={FadeInDown.duration(100).delay(600).springify()}
                  className="pb-4">
                  <ButtonOutline title="Continue With Google">
                    <AntDesign
                      name="google"
                      size={20}
                      color="grey"
                    />
                  </ButtonOutline>
                </Animated.View>
              </View>

              {/* Register */}
              <Animated.View
                className="flex-row justify-center items-center gap-2"
                entering={FadeInDown.duration(100).delay(700).springify()}>
                <Text
                  className="text-neutral-500 text-lg font-medium leading-[38px] text-center"
                  style={{
                    fontFamily: "PlusJakartaSansMedium",
                  }}>
                  Have an account?
                </Text>
                <TouchableOpacity onPress={() => navigateAuth("Login")}>
                  <Text
                    className="text-neutral-800 text-lg font-medium leading-[38px] text-center"
                    style={{
                      fontFamily: "PlusJakartaSansBold",
                    }}>
                    Login
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
