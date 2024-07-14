import React, { useLayoutEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import { Image, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useArtifyContext } from "../context/Context";

import ArtistCommonScreen from "./ArtistCommonScreen";
import ArtistGallary from "./ArtistGallary";
import ArtistUploadArt from "./ArtistUploadArt";
import ArtistExhibition from "./ArtistExhibition";
import ArtistTraining from "./ArtistTraining";
import ArtistCompetitionsScreen from "./ArtistCompetitionsScreen"; // Import the new screen
import ArtistProfile from "../components/ArtistProfile";

const Tab = createBottomTabNavigator();

const ArtistHomeScreen = () => {
  const { artistUser } = useArtifyContext();
  const navigation = useNavigation();
  const [artistUserProfile, setArtistUserProfile] = useState(false);

  const profilePictureUri = artistUser.profilePicture
    ? artistUser.profilePicture.replace(/\\/g, "/")
    : null;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        height: 120,
        backgroundColor: "#2C3E50", // Rich Navy Blue
        paddingHorizontal: 10,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        overflow: "hidden",
      },
      headerLeft: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 30,
          }}
        >
          {artistUser && profilePictureUri ? (
            <Image
              source={{ uri: `http://10.0.2.2:8000/${profilePictureUri}` }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginRight: 10,
                borderWidth: 2,
                borderColor: "#fff",
              }}
              onError={(error) => console.log("Image load error:", error)}
            />
          ) : null}
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}
              onPress={() => setArtistUserProfile(true)}
            >
              {artistUser.name}
            </Text>
            <Text style={{ fontSize: 14, color: "#f0f0f0" }}>
              Find your arts, join training, & add new art!
            </Text>
          </View>
        </View>
      ),
      headerRight: () => <View></View>, // Empty view for potential future use
      title: "",
    });
  }, [navigation]);

  return (
    <>
      <ArtistProfile
        visible={artistUserProfile}
        onClose={() => setArtistUserProfile(false)}
      />

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let iconSize = focused ? 30 : 20;

            switch (route.name) {
              case "Home":
                iconName = focused ? "home" : "home";
                break;
              case "Gallary":
                iconName = focused ? "image" : "image";
                break;
              case "Upload":
                iconName = focused ? "upload" : "upload";
                break;
              case "Exhibition":
                iconName = focused ? "university" : "university";
                break;
              case "Training":
                iconName = focused ? "book" : "book";
                break;
              case "Competitions": // New screen added
                iconName = focused ? "trophy" : "trophy";
                break;
              default:
                iconName = "circle";
            }

            return <Icon name={iconName} size={iconSize} color={color} />;
          },
          tabBarActiveTintColor: "#2C3E50", // Rich Navy Blue
          tabBarInactiveTintColor: "#4D869C",
          tabBarStyle: {
            backgroundColor: "#F0F4F8", // Light Pastel Blue-Gray
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            height: 55,
            paddingBottom: 5,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "800",
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={ArtistCommonScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Gallary"
          component={ArtistGallary}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Competitions"
          component={ArtistCompetitionsScreen} // New screen added
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Upload"
          component={ArtistUploadArt}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Exhibition"
          component={ArtistExhibition}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Training"
          component={ArtistTraining}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </>
  );
};

export default ArtistHomeScreen;

const styles = StyleSheet.create({});
