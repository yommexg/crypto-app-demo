import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import numeral from "numeral";
import { FetchCoinDetails, FetchCoinHistory } from "@/utils/cryptoapi";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import { Circle, useFont } from "@shopify/react-native-skia";
import Animated, { SharedValue } from "react-native-reanimated";

const CoinDetailsScreen = () => {
  const {
    params: { coinUuid },
  } = useRoute<RouteProp<ScreenNavigationType>>();

  const [lineData, setLineData] = useState<any>([]);
  const [item, setItem] = useState<any>({});

  const navigation = useNavigation();

  const font = useFont(
    require("../../../assets/fonts/PlusJakartaSans-Regular.ttf"),
    12
  );

  const { state, isActive } = useChartPressState({
    x: 0,
    y: { price: 0 },
  } as const);

  function ToolTip({
    x,
    y,
  }: {
    x: SharedValue<number>;
    y: SharedValue<number>;
  }) {
    return (
      <Circle
        cx={x}
        cy={y}
        r={8}
        color={"red"}
      />
    );
  }

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  const { data: coinDetails, isLoading: isCoinDetailsLoading } = useQuery({
    queryKey: ["coinDetails", coinUuid],
    queryFn: () => coinUuid && FetchCoinDetails(coinUuid),
  });

  const { data: coinHistory, isLoading: isCoinHistoryLoading } = useQuery({
    queryKey: ["coinHistory", coinUuid],
    queryFn: () => coinUuid && FetchCoinHistory(coinUuid),
  });

  useEffect(() => {
    //@ts-ignore
    if (coinHistory && coinHistory.data.history) {
      // @ts-ignore
      const datasets = coinHistory.data.history.map((item: any) => ({
        price: parseFloat(item.price),
        timestamp: item.timestamp,
      }));

      setLineData(datasets);
    }

    // @ts-ignore
    if (coinDetails && coinDetails.data.coin) {
      //@ts-ignore
      setItem(coinDetails.data.coin);
    }
  }, [coinUuid, coinDetails, coinHistory]);

  return (
    <View className="flex-1 bg-white py-4">
      {isCoinDetailsLoading || isCoinHistoryLoading ? (
        <View className="absolute z-50 w-full justify-center items-center bottom-0 top-0">
          <View className="h-full w-full justify-center items-center bg-black opacity-[0.45]" />
          <View className="absolute">
            <ActivityIndicator
              size="large"
              color="white"
            />
          </View>
        </View>
      ) : (
        <SafeAreaView>
          <View className="flex flex-row items-center justify-between px-4">
            <TouchableOpacity
              className="border-2 border-neutral-500 rounded-full p-1"
              onPress={() => navigation.goBack()}>
              <MaterialIcons
                name="keyboard-arrow-left"
                size={24}
                color="gray"
              />
            </TouchableOpacity>
            <View>
              <Text className="font-bold text-lg">{item.symbol}</Text>
            </View>
            <View className="border-2 border-neutral-500 rounded-full p-1">
              <Entypo
                name="dots-three-horizontal"
                size={24}
                color="gray"
              />
            </View>
          </View>
          <View className="px-4 justify-center items-center py-2">
            <Text className={`font-extrabold text-2xl`}>
              {numeral(parseFloat(item?.price)).format("$0,0.00")}
            </Text>
          </View>
          {item && (
            <View className="flex-row justify-center items-center px-4 py-2">
              <View className="flex-row w-full py-4 gap-4 items-center">
                <View className="w-16%">
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
                <View className="w-[29%] justify-start items-end  pr-4">
                  <Text className="font-bold text-base">{item.symbol}</Text>
                  <View className="flex-row justify-center items-center gap-2">
                    <Text className="font-medium text-sm text-neutral-500">
                      {item?.marketCap
                        ? item?.marketCap.length > 9
                          ? item?.marketCap.slice(0, 9)
                          : item?.marketCap
                        : ""}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          <View style={{ height: 400, paddingHorizontal: 10 }}>
            {lineData && lineData.length > 0 ? (
              <CartesianChart
                //@ts-ignore
                chartPressState={state}
                axisOptions={{
                  font,
                  tickCount: 8,
                  labelOffset: { x: -1, y: 0 },
                  labelColor: "green",
                  formatXLabel: (ms) => format(new Date(ms * 1000), "dd-MM"),
                }}
                //@ts-ignore
                xKey={"timestamp"}
                //@ts-ignore
                yKeys={["price"]}
                data={lineData}>
                {({ points }) => (
                  <>
                    <Line
                      //@ts-ignore
                      points={points.price}
                      color="green"
                      strokeWidth={2}
                    />
                    {isActive && (
                      <ToolTip
                        x={state.x.position}
                        y={state.y.price.position}
                      />
                    )}
                  </>
                )}
              </CartesianChart>
            ) : (
              <Text>No data available</Text>
            )}
          </View>

          <View className="px-4 py-4">
            {/* All Time High */}
            <View className="flex-row justify-between">
              <Text className="text-base font-bold text-neutral-500">
                All Time High
              </Text>
              <Text className={`font-bold text-`}>
                {numeral(parseFloat(item?.allTimeHigh?.price)).format(
                  "$0,0.00"
                )}
              </Text>
            </View>

            {/* Number of Markets */}
            <View className="flex-row justify-between">
              <Text className="text-base font-bold text-neutral-500">
                Number of Markets
              </Text>
              <Text className={`font-bold text-`}>
                {numeral(parseFloat(item?.numberOfMarkets)).format("$0,0.00")}
              </Text>
            </View>

            {/* Number of Excahanges */}
            <View className="flex-row justify-between">
              <Text className="text-base font-bold text-neutral-500">
                Number of Excahanges
              </Text>
              <Text className={`font-bold text-lg`}>
                {numeral(parseFloat(item?.numberOfExchanges)).format("$0,0.00")}
              </Text>
            </View>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
};

export default CoinDetailsScreen;
