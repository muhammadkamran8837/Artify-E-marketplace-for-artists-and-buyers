import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { useArtifyContext } from "../context/Context";

const ArtistUploadArt = () => {
  const [artName, setArtName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const { artistUser } = useArtifyContext();

  const handleChooseArt = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!artName || !description || !price || !imageUri) {
      Alert.alert("Error", "Please fill all fields and choose an image.");
      return;
    }

    const formData = new FormData();
    formData.append("artistId", artistUser.artistId);
    formData.append("title", artName); // Use 'title' instead of 'name'
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", {
      uri: imageUri,
      type: "image/jpeg",
      name: "art.jpg",
    });

    try {
      const response = await axios.post(
        "http://10.0.2.2:8000/api/artist/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Upload Response:", response.data);
      setArtName("");
      setDescription("");
      setPrice(""); // Clear price input
      setImageUri("");

      Alert.alert("Success", "Art uploaded successfully!");
    } catch (error) {
      console.error(
        "Error uploading art:",
        error.response?.data || error.message
      );
      Alert.alert("Error", "Failed to upload art.");
    }
  };

  const handleCancelImage = () => {
    setImageUri(null);
  };

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 10,
          paddingTop: 5,
          backgroundColor: "#F0F4F8",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 10,
            color: "#2C3E50",
          }}
        >
          Upload New Art
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            padding: 10,
            borderRadius: 5,
            marginBottom: 20,
            backgroundColor: "#fff",
          }}
          placeholder="Art Name"
          value={artName}
          onChangeText={setArtName}
        />
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            padding: 10,
            borderRadius: 5,
            height: 100,
            marginBottom: 20,
            backgroundColor: "#fff",
          }}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            padding: 10,
            borderRadius: 5,
            marginBottom: 20,
            backgroundColor: "#fff",
          }}
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={{
            padding: 15,
            borderRadius: 5,
            alignItems: "center",
            marginBottom: 10,
            borderWidth: 1,
            borderColor: "#0E46A3",
          }}
          onPress={handleChooseArt}
        >
          <Text style={{ color: "#0E46A3", fontSize: 16, fontWeight: "bold" }}>
            Choose Photo
          </Text>
        </TouchableOpacity>
        {imageUri && (
          <View>
            <TouchableOpacity
              style={{ alignItems: "flex-end" }}
              onPress={handleCancelImage}
            >
              <Icon name="times-circle" size={30} color="#2C3E50" />
            </TouchableOpacity>
            <Image
              source={{ uri: imageUri }}
              style={{
                width: "100%",
                height: 200,
                borderRadius: 5,
                marginBottom: 20,
              }}
            />
          </View>
        )}
        <TouchableOpacity
          style={{
            backgroundColor: "#2C3E50",
            padding: 15,
            borderRadius: 5,
            alignItems: "center",
          }}
          onPress={handleSubmit}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ArtistUploadArt;
