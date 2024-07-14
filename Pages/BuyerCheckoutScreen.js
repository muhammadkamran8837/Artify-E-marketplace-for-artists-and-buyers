import React, { useLayoutEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useArtifyContext } from "../context/Context";
import Ionicons from "@expo/vector-icons/Ionicons";

const BuyerCheckoutScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { art } = route.params;
  const { buyerUser } = useArtifyContext();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#2C3E50", // Rich Navy Blue
      },
      headerTintColor: "#fff",
      headerLeft: () => (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 20,
            gap: 20,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-sharp" size={28} color={"#fff"} />
          </TouchableOpacity>
          <View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "#fff",
                marginBottom: 2,
              }}
            >
              Checkout
            </Text>
          </View>
        </View>
      ),
    });
  }, [navigation]);

  const handleOrder = async () => {
    if (address.trim() && city.trim() && postalCode.trim()) {
      try {
        const response = await axios.post(
          "http://10.0.2.2:8000/api/Order/placeOrder",
          {
            buyerId: buyerUser.buyerId,
            artId: art._id,
            shippingDetails: {
              address,
              city,
              postalCode,
            },
          }
        );

        Alert.alert("Success", "Order placed successfully!");
        navigation.goBack();
      } catch (error) {
        if (error.response && error.response.status === 400) {
          Alert.alert("Error", error.response.data.message);
          navigation.goBack();
        } else {
          Alert.alert("Error", "Failed to place the order.");
        }
      }
    } else {
      Alert.alert("Error", "All fields are required.");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "#F0F4F8", // Light Pastel Blue-Gray
      }}
    >
      <Text
        style={{
          fontSize: 18,
          marginBottom: 10,
        }}
      >
        Address
      </Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "#ccc",
          borderWidth: 1,
          borderRadius: 5,
          padding: 10,
          marginBottom: 20,
        }}
        placeholder="Enter your address"
        value={address}
        onChangeText={setAddress}
      />

      <Text
        style={{
          fontSize: 18,
          marginBottom: 10,
        }}
      >
        City
      </Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "#ccc",
          borderWidth: 1,
          borderRadius: 5,
          padding: 10,
          marginBottom: 20,
        }}
        placeholder="Enter your city"
        value={city}
        onChangeText={setCity}
      />

      <Text
        style={{
          fontSize: 18,
          marginBottom: 10,
        }}
      >
        Postal Code
      </Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "#ccc",
          borderWidth: 1,
          borderRadius: 5,
          padding: 10,
          marginBottom: 20,
        }}
        placeholder="Enter your postal code"
        value={postalCode}
        onChangeText={setPostalCode}
      />

      <TouchableOpacity
        style={{
          backgroundColor: "#2C3E50", // Rich Navy Blue
          padding: 15,
          borderRadius: 5,
          alignItems: "center",
        }}
        onPress={handleOrder}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Place Order
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BuyerCheckoutScreen;
