import {
  Alert,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Alert.alert("Error", "Please enter all fields");
        return;
      }

      setLoading(true);
      const response = await axios.post(
        "http://10.0.2.2:8000/api/buyerUser/login",
        {
          email,
          password,
        }
      );

      if (response.status >= 200 && response.status < 300) {
        await AsyncStorage.setItem("BuyerUser", JSON.stringify(response.data));
        setEmail("");
        setPassword("");
        navigation.replace("BuyerHome");
      } else {
        Alert.alert("Error", "Failed to login");
      }
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error while login:", error.message);
      Alert.alert("Error", "An error occurred while login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ width: "100%" }}>
      <KeyboardAvoidingView>
        <View>
          <TextInput
            style={{
              borderBottomColor: "gray",
              borderBottomWidth: 1,
              marginVertical: 10,
            }}
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Enter your email"
          />
        </View>
        <View>
          <TextInput
            style={{
              borderBottomColor: "gray",
              borderBottomWidth: 1,
              marginVertical: 10,
            }}
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Enter password"
            secureTextEntry
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity
            onPress={handleLogin}
            style={{
              paddingHorizontal: 30,
              paddingVertical: 5,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 30,
              backgroundColor: "black",
              height: 50,
              alignSelf: "flex-end",
            }}
          >
            <Text style={{ color: "white" }}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
