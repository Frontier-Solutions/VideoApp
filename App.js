import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as Device from "expo-device";

import { fetchVideoData } from "./util/videoContentLoader";
import ClipList from "./components/ClipList";
import Player from "./components/Player";
import ErrorOverlay from "./components/UI/ErrorOverlay";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("./assets/fonts/Inter-Black.otf"),
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.otf"),
    "Inter-Light": require("./assets/fonts/Inter-Light.otf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.otf"),
  });

  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  const [deviceType, setDeviceType] = useState();
  const [videoData, setVideoData] = useState();
  const [currentClipData, setcurrentClipData] = useState(null);

  const [listIsFocused, setListIsFocused] = useState(false);
  const [videoIsFocused, setVideoIsFocused] = useState(false);

  let firstSection = {};
  let secondSection = {};

  useEffect(() => {
    async function getData() {
      setIsFetching(true);

      try {
        const data = await fetchVideoData();
        setVideoData(data);
      } catch (error) {
        setError("Could not fetch podcast clips!");
      }

      const deviceTypeNum = await Device.getDeviceTypeAsync();
      setDeviceType(deviceTypeNum);

      if (fontsLoaded) {
        setIsFetching(false);
        await SplashScreen.hideAsync();
      }
    }

    getData();

    window.addEventListener("keydown", handleKeyEvent);

    return () => {
      window.removeEventListener("keydown", handleKeyEvent);
    };
  }, [fontsLoaded]);

  function errorHandler() {
    setError(null);
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isFetching) {
    return <Text>Loading...</Text>;
  }

  function handleKeyEvent(event) {
    const { key } = event;

    if (key === "ArrowRight") {
      setListIsFocused(false);
      setVideoIsFocused(true);
    } else if (key === "ArrowLeft") {
      setVideoIsFocused(false);
      setListIsFocused(true);
    }
  }

  function onClipSelected(clip) {
    setcurrentClipData(clip);
  }

  const listContainer = (
    <ClipList
      clips={videoData && videoData.videoClips}
      onSelect={onClipSelected}
      focused={listIsFocused}
      deviceType={deviceType}
    />
  );

  const videoContainer = (
    <Player
      clip={currentClipData}
      deviceType={deviceType}
      focused={videoIsFocused}
    />
  );

  let flexDirection = "";

  if (deviceType == 1) {
    flexDirection = "column";
    firstSection = videoContainer;
    secondSection = listContainer;
  } else if (deviceType == 3) {
    flexDirection = "row";
    firstSection = listContainer;
    secondSection = videoContainer;
  }

  return (
    <>
      <StatusBar style='auto' />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {videoData ? videoData.video.title : "Loading Title"}
          </Text>
          <Text style={styles.description}>
            {videoData ? videoData.video.description : "Loading Description"}
          </Text>
        </View>

        <ScrollView style={styles.mainContentContainer}>
          <View style={{ flexDirection: flexDirection }}>
            {firstSection}
            {secondSection}
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
  },
  titleContainer: {
    width: "100%",
    padding: 8,
    justifyContent: "center",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    backgroundColor: "#000000",
  },
  mainContentContainer: {
    marginLeft: "auto",
    marginRight: "auto",
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
