import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useState } from "react";
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

const MarketScreen = () => {
  const [topGainers, setTopGainers] = useState([]);
  const [topLosers, setTopLosers] = useState([]);
  const [active, setActive] = useState("all");

  const allCoins = () => {
    setActive("all");
  };

  const calculateTopGainers = () => {
    setActive("gainers");

    //@ts-ignore
    const gainers = coinsData?.data.coins.filter(
      //@ts-ignore
      (coin) => parseFloat(coin.change) > 0
    );

    setTopGainers(gainers);
  };

  const calculateTopLosers = () => {
    setActive("losers");

    //@ts-ignore
    const losers = coinsData?.data.coins.filter(
      //@ts-ignore
      (coin) => parseFloat(coin.change) < 0
    );

    setTopLosers(losers);
  };

  const { navigate }: NavigationProp<ScreenNavigationType> = useNavigation();

  const { data: coinsData, isLoading: isAllCoinsLoading } = useQuery({
    queryKey: ["allCoins"],
    queryFn: FetchAllCoins,
  });

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
        <View className="w-full flex-row items-center px-4 pb-4">
          <View className="w-3/4 flex-row gap-2">
            <View>
              <Text className="text-3xl font-bold">Market</Text>
            </View>
          </View>
        </View>

        <View className="px-4 flex-row justify-between items-center pb-4">
          {/*  ALl */}
          <TouchableOpacity
            className={`w-1/4 justify-center items-center py-1 ${
              active === "all" ? "border-b-4 border-blue-500" : ""
            }`}
            onPress={allCoins}>
            <Text
              className={`text-lg ${active === "all" ? "font-extrabold" : ""}`}>
              All
            </Text>
          </TouchableOpacity>

          {/* Gainers */}
          <TouchableOpacity
            className={`w-1/4 justify-center items-center py-1 ${
              active === "gainers" ? "border-b-4 border-blue-500" : ""
            }`}
            onPress={calculateTopGainers}>
            <Text
              className={`text-lg ${
                active === "gainers" ? "font-extrabold" : ""
              }`}>
              Gainers
            </Text>
          </TouchableOpacity>

          {/* Losers */}
          <TouchableOpacity
            className={`w-1/4 justify-center items-center py-1 ${
              active === "losers" ? "border-b-4 border-blue-500" : ""
            }`}
            onPress={calculateTopLosers}>
            <Text
              className={`text-lg ${
                active === "losers" ? "font-extrabold" : ""
              }`}>
              Losers
            </Text>
          </TouchableOpacity>
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
              data={
                active === "all"
                  ? //@ts-ignore
                    coinsData?.data?.coins
                  : active === "gainers"
                  ? topGainers
                  : topLosers
              }
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

export default MarketScreen;
