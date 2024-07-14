import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { Image } from "react-native";

const ArtistSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const navigation = useNavigation();

  const handleChooseProfilePicture = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
    }
  };

  const handleSignUp = async () => {
    try {
      if (!name || !email || !password) {
        Alert.alert("Error", "Please enter all fields");
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert("Error", "Passwords do not match");
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);

      if (profilePicture) {
        const fileType = profilePicture.split(".").pop();
        formData.append("profilePicture", {
          uri: profilePicture,
          name: `profilePicture.${fileType}`,
          type: `image/${fileType}`,
        });
      }
      const response = await axios.post(
        "http://10.0.2.2:8000/api/artist/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        Alert.alert("Success", "User registered successfully");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setProfilePicture(null);
        navigation.replace("ArtistHome");
      } else {
        Alert.alert("Error", "Failed to create user");
      }
    } catch (error) {
      console.error("Error registering user:", error.message);
      Alert.alert("Error", "An error occurred while registering user");
    }
  };
  return (
    <View style={{ width: "100%" }}>
      <View>
        <TextInput
          style={{
            borderBottomColor: "gray",
            borderBottomWidth: 1,
            marginVertical: 10,
          }}
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Enter your Name"
        />
      </View>
      <View>
        <TextInput
          style={{
            borderBottomColor: "gray",
            borderBottomWidth: 1,
            marginVertical: 10,
          }}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Enter Email"
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
      <View>
        <TextInput
          style={{
            borderBottomColor: "gray",
            borderBottomWidth: 1,
            marginVertical: 10,
          }}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          placeholder="Confirm password"
        />
      </View>
      {profilePicture && (
        <View style={{ marginTop: 10, alignSelf: "flex-end" }}>
          <Image
            source={{ uri: profilePicture }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
        </View>
      )}
      <View style={{ marginTop: 10 }}>
        <TouchableOpacity
          style={{
            paddingHorizontal: 30,
            paddingVertical: 5,
            justifyContent: "center",
            borderRadius: 30,
            backgroundColor: "white",
            height: 50,
            alignSelf: "flex-end",
            borderWidth: 2,
            borderColor: "black",
          }}
          onPress={handleChooseProfilePicture}
        >
          <Text style={{ color: "black" }}>Choose Profile Picture</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 10 }}>
        <TouchableOpacity
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
          onPress={handleSignUp}
        >
          <Text style={{ color: "white" }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ArtistSignUp;

const styles = StyleSheet.create({});
