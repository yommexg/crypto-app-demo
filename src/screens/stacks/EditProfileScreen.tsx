import useSupabaseAuth from "@/hooks/useSupabaseAuth";
import Avatar from "@/src/components/Avatar";
import { useUserStore } from "@/store/useUserStore";
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from "react-native-elements";
import Button from "@/src/components/Button";

const EditProfileScreen = () => {
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");

  const { session } = useUserStore();
  const { getUserProfile, updateUserProfile } = useSupabaseAuth();

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
        setFullName(data?.full_name);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateProfile() {
    try {
      setLoading(true);

      const { error } = await updateUserProfile(username, fullName, avatarUrl);
      if (error) {
        console.log(error);
        Alert.alert(`Profile Update Failed ${error}`);
      } else {
        Alert.alert(`Profile Updated Successfully`);
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

        {/* Avatar */}
        <View>
          <View className="justify-center items-center py-2">
            <View className="overflow-hidden border-2 border-[#2ab07c] rounded-3xl">
              <Avatar
                size={100}
                url={avatarUrl}
                showUpload
                onUpload={(url: string) => {
                  setAvatarUrl(url);
                }}
              />
            </View>
          </View>
        </View>

        {/* User Details */}
        <View className="px-4 pt-2">
          <View>
            <Input
              label="email"
              value={session?.user.email}
              disabled
            />
          </View>

          {/* UserName */}
          <View className="gap-1">
            <Input
              label="Username"
              value={username || ""}
              onChangeText={(text) => setUsername(text)}
            />
          </View>

          {/* FullName */}
          <View className="gap-1">
            <Input
              label="Fullname"
              value={fullName || ""}
              onChangeText={(text) => setFullName(text)}
            />
          </View>

          {/* Buttons */}
          <Button
            title={loading ? <ActivityIndicator color="white" /> : "Update"}
            action={() => handleUpdateProfile()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
