import useSupabaseAuth from "@/hooks/useSupabaseAuth";
import Avatar from "@/src/components/Avatar";
import { useUserStore } from "@/store/useUserStore";
import { MaterialIcons } from "@expo/vector-icons";
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { useCallback, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const ProfileScreen = () => {
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [username, setUsername] = useState("");

  const { session } = useUserStore();
  const { getUserProfile, signOut } = useSupabaseAuth();

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

  async function handleSignOut() {
    await signOut();
  }

  return (
    <View className="flex-1 bg-white">
      <View>
        {/* Avatar */}
        <View className="justify-center items-center py-14 pb-20 bg-[#2ab07c]">
          <View className="overflow-hidden border-2 border-white rounded-3xl">
            <Avatar
              size={100}
              url={avatarUrl}
              onUpload={() => ({})}
            />
          </View>
          <View className="w-full py-3 items-center">
            <Text className="text-lg font-bold text-white">{username}</Text>
          </View>
        </View>
        <View
          className="bg-white px-4 py-6 -mt-11"
          style={{
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}>
          <Text className="text-lg font-bold px-2">Account Overview</Text>
        </View>
        <View className="px-4 py-3 bg-gray-300 rounded-xl border-2 border-gray-300 my-3 mx-2">
          {/* Edit Profile */}
          <TouchableOpacity
            className="flex-row justify-between items-center"
            onPress={() => navigate("EditProfileScreen")}>
            <View className="flex-row justify-center items-center gap-2">
              <View className="bg-[#2ab07c] p-1 rounded-lg">
                <MaterialIcons
                  name="person-4"
                  size={24}
                  color="white"
                />
              </View>
              <Text className="text-lg text-gray-600 font-semibold">
                Edit My Profile
              </Text>
            </View>
            <MaterialIcons
              name="arrow-forward-ios"
              size={20}
              color="black"
            />
          </TouchableOpacity>
        </View>

        {/* Change Password */}
        <View className="px-4 py-3 bg-gray-300 rounded-xl border-2 border-gray-300 my-3 mx-2">
          <TouchableOpacity
            className="flex-row justify-between items-center"
            onPress={() => {}}>
            <View className="flex-row justify-center items-center gap-2">
              <View className="bg-[#2ab07c] p-1 rounded-lg">
                <MaterialIcons
                  name="password"
                  size={24}
                  color="white"
                />
              </View>
              <Text className="text-lg text-gray-600 font-semibold">
                Change Password
              </Text>
            </View>
            <MaterialIcons
              name="arrow-forward-ios"
              size={20}
              color="black"
            />
          </TouchableOpacity>
        </View>

        {/* Log Out */}
        <View className="px-4 py-3 bg-gray-300 rounded-xl border-2 border-gray-300 my-3 mx-2">
          <TouchableOpacity
            className="flex-row justify-between items-center"
            onPress={() => handleSignOut()}>
            <View className="flex-row justify-center items-center gap-2">
              <View className="bg-[#2ab07c] p-1 rounded-lg">
                <MaterialIcons
                  name="logout"
                  size={24}
                  color="white"
                />
              </View>
              <Text className="text-lg text-gray-600 font-semibold">
                Log Out
              </Text>
            </View>
            <MaterialIcons
              name="arrow-forward-ios"
              size={20}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
