import { FetchCryptoNews } from "@/utils/cryptoapi";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { BookmarkSquareIcon } from "react-native-heroicons/outline";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const NewsScreen = () => {
  const { data: newsData, isLoading: isNewsLoading } = useQuery({
    queryKey: ["cryptonews"],
    queryFn: FetchCryptoNews,
  });

  const navigation = useNavigation();

  const handleClick = (item: any) => {
    navigation.navigate("NewsDetails", item);
  };

  const renderItem = ({ item, index }: { item: any; index: string }) => {
    return (
      <TouchableOpacity
        className="mb-4 mx-4 gap-1"
        key={index}
        onPress={() => handleClick(item)}>
        <View className="flex-row justify-start w-[100%] shadow-sm">
          {/* Image */}
          <View className="items-start justify-start w-[20%]">
            <Image
              source={{ uri: item.thumbnail && item.thumbnail }}
              style={{
                height: hp(10),
                width: hp(9),
              }}
              placeholder={{ blurhash }}
              contentFit="cover"
              transition={1000}
              className="rounded-lg"
            />
          </View>

          {/* Content */}
          <View className="w-[70%] pl-4 justify-center gap-1">
            {/* Description */}
            <Text className="text-xs font-bold text-gray-900">
              {item?.description?.length > 20
                ? item?.description.slice(0, 20) + "..."
                : item?.description}
            </Text>

            {/* Title */}
            <Text className="text-neutral-800 capitalize max-w-[90%]">
              {item?.title?.length > 50
                ? item?.title.slice(0, 50) + "..."
                : item?.title}
            </Text>

            {/* Date */}

            <Text className="text-xs text-gray-700">{item?.createdAt}</Text>
          </View>

          {/* Book Mark */}
          <View className="w-10%">
            <BookmarkSquareIcon color="gray" />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="gap-2 bg-white flex-1">
      {/* Header */}
      <View className="w-full flex-row justify-between items-center px-4 pb-4">
        <View className="w-3/4 flex-row gap-2">
          <Text className="text-3xl font-bold">Crypto News</Text>
        </View>
      </View>

      {/* Main News */}
      <View>
        {
          //@ts-ignore
          newsData && newsData?.data?.length > 0 ? (
            <FlatList
              //@ts-ignore
              data={newsData.data}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
            />
          ) : (
            <View>
              <ActivityIndicator
                size="large"
                color="black"
              />
            </View>
          )
        }
      </View>
    </SafeAreaView>
  );
};

export default NewsScreen;
