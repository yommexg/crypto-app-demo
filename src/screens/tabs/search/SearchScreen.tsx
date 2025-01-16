import { SearchCoin } from "@/utils/cryptoapi";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { debounce } from "lodash";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Image } from "expo-image";
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

const SearchScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);

  const { navigate }: NavigationProp<ScreenNavigationType> = useNavigation();

  const { navigate: navigateHome }: NavigationProp<TabNavigationType> =
    useNavigation();

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
          </View>
        </View>

        <View className="w-[29%] justify-start items-end">
          <Text className="font-bold text-base">{item.symbol}</Text>
          <View className="flex-row justify-center items-center gap-2">
            <Text className="font-medium text-sm text-neutral-500">
              {item?.marketCap?.length > 9
                ? item?.marketCap.slice(0, 9)
                : item?.marketCap}
            </Text>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );

  const handleSearch = async (search: string) => {
    if (search && search?.length > 2) {
      setIsLoading(true);
      try {
        const results = await SearchCoin(search);
        if (results) {
          // @ts-ignore
          setResult(results);
        }
      } catch (error) {
        console.log(error);
        setResult([]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <SafeAreaView className="bg-white flex-1">
      {/* Header */}
      <View className="w-full flex-row justify-between items-center px-4 pb-4">
        <View className="w-3/4 flex-row gap-2">
          <Text className="text-3xl font-bold">Search</Text>
        </View>
      </View>

      {/* Search Input Field */}
      <View className="mx-4 mb-3 flex-row p-1 border-2 justify-between items-center bg-white rounded-lg shadow-sm">
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search for coins"
          placeholderTextColor="gray"
          className="pl-2 flex-1 font-medium text-black tracking-wider"
        />
        <TouchableOpacity onPress={() => navigateHome("Home")}>
          <XMarkIcon
            size={25}
            color="black"
          />
        </TouchableOpacity>
      </View>

      <View>
        {isLoading ? (
          <View>
            <ActivityIndicator
              size="large"
              color="#164bd8"
            />
          </View>
        ) : (
          <FlatList
            //@ts-ignore
            data={result.data?.coins}
            keyExtractor={(item) => item.uuid}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
