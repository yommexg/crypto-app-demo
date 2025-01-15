import useSupabaseAuth from "@/hooks/useSupabaseAuth";
import Avatar from "@/src/components/Avatar";
import { useUserStore } from "@/store/useUserStore";
import { Ionicons } from "@expo/vector-icons";
import {
  useFocusEffect,
  useNavigation,
  NavigationProp,
} from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useQuery } from "@tanstack/react-query";
import { FetchAllCoins } from "@/utils/cryptoapi";
import Animated, { FadeInDown } from "react-native-reanimated";
import numeral from "numeral";

interface Coin {
  uuid: string;
  name: string;
  symbol: string;
  iconUrl: string;
  price: string;
  change: number;
  marketCap: string;
}

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const HomeScreen = () => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const { session } = useUserStore();
  const { getUserProfile } = useSupabaseAuth();

  const { navigate }: NavigationProp<ScreenNavigationType> = useNavigation();

  const { data: coinsData, isLoading: isAllCoinsLoading } = useQuery({
    queryKey: ["allCoins"],
    queryFn: FetchAllCoins,
  });

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

  const renderItem = ({ item, index }: { item: Coin; index: number }) => (
    <TouchableOpacity
      className="flex-row w-full p-4 items-center"
      onPress={() => navigate("CoinDetails", { coinUuid: item.uuid })}>
      <Animated.View
        entering={FadeInDown.duration(100)
          .delay(index * 200)
          .springify()}
        className="w-full flex-row items-center">
        <View className="w-[16%]">
          <View>
            <View className="w-10 h-10">
              <Image
                source={{ uri: item.iconUrl }}
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
        </View>

        <View className="w-[55%] justify-start items-start">
          <Text className="font-bold text-lg">{item.name}</Text>
          <View className="flex-row justify-center items-center gap-2">
            <Text className={`font-medium text-sm text-neutral-500`}>
              {numeral(parseFloat(item?.price)).format("$0,0.00")}
            </Text>
            <Text
              className={`font-medium text-sm ${
                item.change < 0
                  ? "text-red-600"
                  : item.change > 0
                  ? "text-green-600"
                  : "text-gray-600"
              }`}>
              {item.change}%
            </Text>
          </View>
        </View>

        <View className="w-[29%] justify-start items-end">
          <Text className="font-bold text-base">{item.symbol}</Text>
          <View className="flex-row justify-center items-center gap-2">
            <Text className="font-medium text-sm text-neutral-500">
              {item.marketCap.length > 9
                ? item.marketCap.slice(0, 9)
                : item.marketCap}
            </Text>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="relative">
        {/* Header */}
        <View className="w-full flex-row justify-between items-center px-4">
          <View className="w-3/4 flex-row gap-2">
            <View className="justify-center items-center">
              <View className="h-12 w-12 rounded-2xl overflow-hidden">
                <Avatar
                  url={avatarUrl}
                  size={50}
                  onUpload={() => ({})}
                />
              </View>
            </View>
            <View>
              <Text className="text-lg font-bold">
                Hi, {username ? username : "User"}
              </Text>
              <Text className="text-sm text-neutral-500">Have a good day</Text>
            </View>
          </View>
          <View className="py-6">
            <View className="bg-neutral-700 rounded-lg p-1">
              <Ionicons
                name="menu"
                size={24}
                color="white"
              />
            </View>
          </View>
        </View>

        {/* Balance */}
        <View className="mx-4 bg-neutral-800 rounded-[34px] overflow-hidden my-4">
          <View className="bg-[#0DD69E] justify-center items-center py-6 rounded-[34px]">
            <Text className="text-sm font-medium text-neutral-700">
              Total Balance
            </Text>
            <Text className="text-3xl font-extrabold">$2,430.00</Text>
          </View>

          <View className="justify-between items-center flex-row py-4">
            {/* Send to */}
            <View className="w-1/4 justify-center items-center gap-2">
              <View className="w-10 h-10 overflow-hidden bg-[#3B363F] rounded-full p-2">
                <Image
                  source={require("../../../../assets/images/money-send.png")}
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                  placeholder={{ blurhash }}
                  contentFit="cover"
                  transition={1000}
                />
              </View>
              <Text className="text-white">Send to</Text>
            </View>

            {/* Request  */}
            <View className="w-1/4 justify-center items-center gap-2">
              <View className="w-10 h-10 overflow-hidden bg-[#3B363F] rounded-full p-2">
                <Image
                  source={require("../../../../assets/images/money-receive.png")}
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                  placeholder={{ blurhash }}
                  contentFit="cover"
                  transition={1000}
                />
              </View>
              <Text className="text-white">Request</Text>
            </View>

            {/* Top up */}
            <View className="w-1/4 justify-center items-center gap-2">
              <View className="w-10 h-10 overflow-hidden bg-[#3B363F] rounded-full p-2">
                <Image
                  source={require("../../../../assets/images/card-add.png")}
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                  placeholder={{ blurhash }}
                  contentFit="cover"
                  transition={1000}
                />
              </View>
              <Text className="text-white">Top Up</Text>
            </View>

            {/* More */}
            <View className="w-1/4 justify-center items-center gap-2">
              <View className="w-10 h-10 overflow-hidden bg-[#3B363F] rounded-full p-2">
                <Image
                  source={require("../../../../assets/images/more.png")}
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                  placeholder={{ blurhash }}
                  contentFit="cover"
                  transition={1000}
                />
              </View>
              <Text className="text-white">More</Text>
            </View>
          </View>
        </View>

        {/* Coins */}
        <ScrollView
          contentContainerStyle={{ paddingBottom: 300 }}
          showsVerticalScrollIndicator={false}>
          {isAllCoinsLoading ? (
            <ActivityIndicator
              size="large"
              color="black"
            />
          ) : (
            <FlatList
              nestedScrollEnabled={true}
              scrollEnabled={false}
              //@ts-ignore
              data={coinsData?.data?.coins}
              keyExtractor={(item) => item.uuid}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
