import {
  Dimensions,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Alert,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useArtifyContext } from "../context/Context";
import HorizontalLine from "./HorizontalLine";

const ArtistProfile = ({ visible, onClose }) => {
  const navigation = useNavigation();
  const { artistUser } = useArtifyContext();
  const [orders, setOrders] = useState([]);

  const LogoutFunc = async () => {
    try {
      await AsyncStorage.removeItem("ArtistUser");
      navigation.replace("PostSplash");
    } catch (error) {
      console.error("Error during logout:", error.message);
      Alert.alert("Error", "An error occurred during logout");
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:8000/api/artist/artistOrders/${artistUser.artistId}`
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching artist orders:", error.message);
    }
  };
  useEffect(() => {
    if (visible) {
      fetchOrders();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
      transparent
      statusBarTranslucent={true}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <TouchableWithoutFeedback>
            <View
              style={{
                width: "70%",
                height: "100%",
                backgroundColor: "#F0F4F8",
              }}
            >
              {/* UPPER PORTION */}
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: "40%",
                  backgroundColor: "#2C3E50",
                  gap: 10,
                }}
              >
                <Image
                  source={{
                    uri: `http://10.0.2.2:8000/${artistUser.profilePicture.replace(
                      /\\/g,
                      "/"
                    )}`,
                  }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                  }}
                />
                <Text
                  style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}
                >
                  {artistUser.name}
                </Text>
                <Text style={{ color: "#fff", marginBottom: 10 }}>
                  {artistUser.email}
                </Text>

                <Ionicons name="trophy-outline" size={60} color="#FFA823" />
                <Text style={{ color: "#D6EFD8", fontWeight: "bold" }}>
                  Emerging Talent
                </Text>
              </View>

              {/* LOWER PORTION */}
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  gap: 20,
                  height: "50%",
                  backgroundColor: "#F0F4F8",
                }}
              >
                <View style={{ flexDirection: "row", gap: 20 }}>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    Notifications
                  </Text>
                  <Ionicons
                    name="notifications-outline"
                    size={20}
                    color="#2C3E50"
                  />
                </View>

                {orders.length > 0 ? (
                  <FlatList
                    data={orders}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                      <View
                        style={{
                          backgroundColor: "#fff",
                          padding: 10,
                          marginVertical: 5,
                          borderRadius: 5,
                          shadowColor: "#000",
                          shadowOffset: {
                            width: 0,
                            height: 2,
                          },
                          shadowOpacity: 0.25,
                          shadowRadius: 3.84,
                          elevation: 5,
                        }}
                      >
                        <Text style={{ fontWeight: "bold" }}>
                          Art Title: {item.art.title}
                        </Text>
                        <Text>Price: ${item.art.price}</Text>
                        <Text>Buyer: {item.buyer.name}</Text>
                        <Text>
                          Order Date:
                          {new Date(item.orderDate).toLocaleDateString()}
                        </Text>
                        <Text>
                          Address: {item.shippingDetails.address}{" "}
                          {item.shippingDetails.city}{" "}
                          {item.shippingDetails.postalCode}
                        </Text>
                        <Text>Email: {item.buyer.email}</Text>
                      </View>
                    )}
                  />
                ) : (
                  <Text>No new notifications</Text>
                )}
              </View>

              <HorizontalLine />
              {/* LAST PORTION */}
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  gap: 20,
                  backgroundColor: "#F0F4F8",
                }}
              >
                <TouchableOpacity
                  style={{ marginBottom: 20, flexDirection: "row", gap: 10 }}
                  onPress={LogoutFunc}
                >
                  <Ionicons name="log-out-outline" size={20} color="#2C3E50" />
                  <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                    Logout
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ArtistProfile;
