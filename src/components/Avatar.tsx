import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  StyleSheet,
  View,
  Alert,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import useSupabaseAuth from "@/hooks/useSupabaseAuth";

interface AvatarProps {
  size: number;
  url: string | null;
  onUpload: (filePath: string) => void;
  showUpload?: boolean;
}

const Avatar = ({ url, size = 150, onUpload, showUpload }: AvatarProps) => {
  const [uploading, setUploading] = useState(false);

  const { updateUserProfile } = useSupabaseAuth();

  const avatarSize = { height: size, width: size };

  useEffect(() => {
    if (url) {
      downloadImage(url);
    }
  }, [url]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) {
        console.log(error);
      }

      if (data) {
        const fr = new FileReader();
        fr.readAsDataURL(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error downloading Image: ", error.message);
      }
    }
  }

  async function uploadAvatar() {
    try {
      setUploading(true);

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: false, // Can only select one image
        allowsEditing: true, // Allows the user to crop / rotate their photo before uploading it
        quality: 1,
        exif: false, // We don't want nor need that data.
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        console.log("User cancelled image picker.");
        return;
      }

      const image = result.assets[0];

      if (!image.uri) {
        throw new Error("No image uri!");
      }

      const arraybuffer = await fetch(image.uri).then((res) =>
        res.arrayBuffer()
      );

      const fileExt = image.uri?.split(".").pop()?.toLowerCase() ?? "jpeg";
      const path = `${Date.now()}.${fileExt}`;
      const { data, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, arraybuffer, {
          contentType: image.mimeType ?? "image/jpeg",
        });

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(path);

      const { error } = await updateUserProfile({ avatarUrl: publicUrl });
      if (error) {
        console.log(error);
      }

      onUpload(data.path);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      } else {
        throw error;
      }
    } finally {
      setUploading(false);
    }
  }

  return (
    <View>
      {url ? (
        <View className="relative">
          <Image
            source={{ uri: url }}
            accessibilityLabel="Avatar"
            style={[avatarSize, styles.avatar, styles.image]}
          />
        </View>
      ) : (
        <View
          className="justify-center items-center"
          style={[avatarSize, styles.avatar, styles.image]}>
          <Image
            source={require("../../assets/images/avatar.jpg")}
            style={[avatarSize, styles.avatar, styles.image]}
            accessibilityLabel="Default Avatar"
          />
        </View>
      )}

      {showUpload && (
        <View className="absolute right-0 bottom-0">
          {!uploading ? (
            <TouchableOpacity onPress={uploadAvatar}>
              <MaterialIcons
                name="cloud-upload"
                size={30}
                color="black"
              />
            </TouchableOpacity>
          ) : (
            <ActivityIndicator color="white" />
          )}
        </View>
      )}
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  avatar: {
    overflow: "hidden",
    maxWidth: "100%",
    position: "relative",
  },

  image: {
    objectFit: "cover",
    paddingTop: 0,
  },

  noImage: {
    backgroundColor: "gray",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "rgb(200, 200, 200)",
    borderRadius: 20,
  },
});
