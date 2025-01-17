import useSupabaseAuth from "@/hooks/useSupabaseAuth";
import Avatar from "@/src/components/Avatar";
import { useUserStore } from "@/store/useUserStore";
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { useState, useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";

const EditProfileScreen = () => {
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [username, setUsername] = useState("");

  const { session } = useUserStore();
  const { getUserProfile } = useSupabaseAuth();

  const navigation = useNavigation();
  const { navigate }: NavigationProp<ProfileNavigationType> = useNavigation();

  useFocusEffect(
    useCallback(() => {
      if (session) {
        handleGetProfile();
      }
    }, [session])
  );

  async function handleGetProfile() {
    try {
      setLoading(true);
      const { data, error, status } = await getUserProfile();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View>
        {/* Header */}
        <View className="flex-row items-center justify-between px-4">
          <View className="bg-gray-100 p-2 rounded-full items-center justify-center">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ChevronLeftIcon
                size={25}
                strokeWidth={3}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text className="text-xl font-bold">Edit Profile</Text>
          </View>
          <View />
        </View>

        <View>
          {/* Avatar */}
          <View className="justify-center items-center py-2">
            <View className="overflow-hidden border-2 border-[#2ab07c] rounded-3xl">
              <Avatar
                size={100}
                url={avatarUrl}
              />
            </View>
            <View className="w-full py-3 items-center">
              <Text className="text-lg font-bold text-white">{username}</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
