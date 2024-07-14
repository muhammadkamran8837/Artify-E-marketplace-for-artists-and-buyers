import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("PostSplash");
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground
      source={require("../assets/splash screen.jpg")} // Replace with your image path
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Animatable.Text
        animation="slideInDown"
        iterationCount={1}
        style={{
          color: "black",
          fontSize: 50,
          fontWeight: "bold",
        }}
        duration={2000}
      >
        ARTIFY
      </Animatable.Text>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
