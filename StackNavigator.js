import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "./Pages/SplashScreen";
import LoginSignUpScreen from "./Pages/LoginSignUpScreen";
import PostSplashScreen from "./Pages/PostSplashScreen";
import ArtistLoginSignUpScreen from "./Pages/ArtistLoginSignUpScreen";
import ArtistHomeScreen from "./Pages/ArtistHomeScreen";
import AdminLoginScreen from "./Pages/AdminLoginScreen";
import ArtistTraining from "./Pages/ArtistTraining";
import ArtistExhibition from "./Pages/ArtistExhibition";
import ArtistUploadArt from "./Pages/ArtistUploadArt";
import ArtistGallery from "./Pages/ArtistGallary";
import BuyerHomeScreen from "./Pages/BuyerHomeScreen";
import BuyerGallary from "./Pages/BuyerGallary";
import BuyerArtDetailScreen from "./Pages/BuyerArtDetailScreen";
import BuyerCheckoutScreen from "./Pages/BuyerCheckoutScreen";
import BuyerOrders from "./Pages/BuyerOrders";
import BuyerExhibitions from "./Pages/BuyerExhibitions";
import AdminExhibitions from "./Pages/AdminExhibitions";
import AdminCommonScreen from "./Pages/AdminCommonScreen";
import AdminCompetitions from "./Pages/AdminCompetitions"; // Correct spelling here
import ArtistCompetitionsScreen from "./Pages/ArtistCompetitionsScreen";
import BuyerCompetitions from "./Pages/BuyerCompetitions";
import BuyerCompetitionDetail from "./Pages/BuyerCompetitionDetail";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginSignUpScreen"
          component={LoginSignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ArtistLoginSignUpScreen"
          component={ArtistLoginSignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="ArtistHome" component={ArtistHomeScreen} />
        <Stack.Screen name="Training" component={ArtistTraining} />
        <Stack.Screen name="Exhibition" component={ArtistExhibition} />
        <Stack.Screen name="Upload" component={ArtistUploadArt} />
        <Stack.Screen name="Gallary" component={ArtistGallery} />
        <Stack.Screen
          name="Competitions"
          component={ArtistCompetitionsScreen}
        />

        {/* Buyer Pages */}
        <Stack.Screen name="BuyerHome" component={BuyerHomeScreen} />
        <Stack.Screen name="BuyerGallary" component={BuyerGallary} />
        <Stack.Screen name="BuyerArtDetails" component={BuyerArtDetailScreen} />
        <Stack.Screen name="BuyerCheckout" component={BuyerCheckoutScreen} />
        <Stack.Screen name="BuyerOrders" component={BuyerOrders} />
        <Stack.Screen name="BuyerExhibitions" component={BuyerExhibitions} />
        <Stack.Screen name="BuyerCompetitions" component={BuyerCompetitions} />
        <Stack.Screen
          name="BuyerCompetitionDetail"
          component={BuyerCompetitionDetail}
        />
        <Stack.Screen
          name="PostSplash"
          component={PostSplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="AdminExhibitions" component={AdminExhibitions} />
        <Stack.Screen name="AdminCommonScreen" component={AdminCommonScreen} />
        <Stack.Screen name="AdminCompetitions" component={AdminCompetitions} />
        <Stack.Screen
          name="AdminLoginScreen"
          component={AdminLoginScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
