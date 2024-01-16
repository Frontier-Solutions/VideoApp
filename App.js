import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { fetchVideoData } from "./util/videoContentLoader";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("./assets/fonts/Inter-Black.otf"),
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.otf"),
    "Inter-Light": require("./assets/fonts/Inter-Light.otf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.otf"),
  });

  const [isLoading, setIsLoading] = useState(true);
  const [videoData, setVideoData] = useState();

  useEffect(() => {
    async function getData() {
      const data = await fetchVideoData();
      setVideoData(data);

      if (fontsLoaded) {
        await SplashScreen.hideAsync();
        setIsLoading(false);
      }
    }

    getData();
  }, [fontsLoaded]);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          {videoData ? videoData.video.title : "Loading Title"}
        </Text>
        <Text style={styles.description}>
          {videoData ? videoData.video.description : "Loading Description"}
        </Text>
      </View>

      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    padding: 8,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#000000",
  },
  title: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
    color: "#ffff",
  },
  description: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: "#ffff",
  },
});
