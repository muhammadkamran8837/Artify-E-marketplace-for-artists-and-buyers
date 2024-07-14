import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const PostSplashScreen = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        gap: 10,
      }}
    >
      <View
        style={{
          height: "70%",
          borderBottomRightRadius: 250,
          borderBottomLeftRadius: 40,
          overflow: "hidden",
        }}
      >
        <ImageBackground
          source={require("../assets/splash screen.jpg")} // Replace with your image path
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        ></ImageBackground>
      </View>
      <View style={{ height: "30%", paddingHorizontal: 20 }}>
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>Hello!</Text>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            Welcome to ARTIFY
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "column",
            marginTop: 5,
            gap: 10,
          }}
        >
          <TouchableOpacity
            style={{
              paddingHorizontal: 60,
              paddingVertical: 10,
              borderRadius: 10,

              backgroundColor: "#2C3E50",
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("ArtistLoginSignUpScreen")}
          >
            <Text style={{ color: "white", fontSize: 16 }}>Artist</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingHorizontal: 60,
              paddingVertical: 10,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: "black",
              backgroundColor: "white",
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("LoginSignUpScreen")}
          >
            <Text style={{ fontSize: 16 }}>User</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingHorizontal: 60,
              paddingVertical: 10,
              borderRadius: 10,

              backgroundColor: "#2C3E50",
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("AdminLoginScreen")}
          >
            <Text style={{ color: "white", fontSize: 16 }}>Admin</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PostSplashScreen;

const styles = StyleSheet.create({});
