import {
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import { Link } from "@react-navigation/native";
import ArtistLogin from "../components/LoginSignUp/ArtistLogin";
import ArtistSignUp from "../components/LoginSignUp/ArtistSignUp";

const ArtistLoginSignUpScreen = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
      }}
    >
      <KeyboardAvoidingView>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            gap: 10,
            width: 300,
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            {isLogin ? "Hello!\nWelcome Back. Please Login." : "Sign Up"}
          </Text>
          {isLogin ? <ArtistLogin /> : <ArtistSignUp />}
          <Text style={{ textAlign: "center", marginTop: 30 }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <Text
              style={{ color: "#1679AB", marginRight: 1 }}
              onPress={toggleForm}
            >
              {isLogin ? "Create an account " : "Login"}
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ArtistLoginSignUpScreen;

const styles = StyleSheet.create({});
