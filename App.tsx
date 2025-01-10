import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";

import "./styles/global.css";
import RootNavigation from "./src/screens/navigation/RootNavigation";
import useCachedResources from "./hooks/useCachedResources";
import { useUserStore } from "./store/useUserStore";
import { useEffect } from "react";

const App = () => {
  const isLoadingComplete = useCachedResources();
  const { session, user } = useUserStore();

  useEffect(() => {
    console.log({ user }, { session });
  }, [user, session]);

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <Container>
      <StatusBar style="inverted" />
      <RootNavigation />
    </Container>
  );
};

export default App;

const Container = styled(View)`
  flex: 1;
`;
