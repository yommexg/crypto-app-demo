import { XRapidAPIHost, XRapidAPIHostNews, XRapidAPIKey } from "./api";
import axios, { AxiosRequestConfig } from "axios";

// Endpoints
const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL!;

const coinsUrl = `${apiBaseUrl}/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0`;

interface Params {
  [key: string]: string | number | boolean | undefined;
}

interface ApiResponse {
  data: any;
}

// Function to make the API call
const CryptoApiCall = async (
  endpoints: string,
  params?: Params
): Promise<ApiResponse | {}> => {
  const options: AxiosRequestConfig = {
    method: "GET",
    url: endpoints,
    params: params ? params : {},
    headers: {
      "X-RapidAPI-Key": XRapidAPIKey,
      "X-RapidAPI-Host": XRapidAPIHost,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const FetchAllCoins = async (): Promise<ApiResponse | {}> => {
  return await CryptoApiCall(coinsUrl);
};
