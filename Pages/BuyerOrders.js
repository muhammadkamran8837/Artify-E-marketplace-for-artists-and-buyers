import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import { useArtifyContext } from "../context/Context";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";

const BuyerOrders = () => {
  const { buyerUser } = useArtifyContext();
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation();
  const { setAllBuyerOrders, allBuyerOrders } = useArtifyContext();

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
              Your Orders
            </Text>
          </View>
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://10.0.2.2:8000/api/Order/buyerOrders/${buyerUser.buyerId}`
        );
        setOrders(response.data);
        setAllBuyerOrders(response.data);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch orders.");
      }
    };

    fetchOrders();
  }, [buyerUser.buyerId]);

  const renderOrder = ({ item }) => (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 20,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        // borderWidth: 0.5,
        // borderColor: "#2C3E50",
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        {item.art.title}
      </Text>
      <Text
        style={{
          fontSize: 16,
          marginBottom: 5,
        }}
      >
        Price: ${item.art.price}
      </Text>
      <Text
        style={{
          fontSize: 16,
          marginBottom: 5,
        }}
      >
        Order Date: {new Date(item.orderDate).toLocaleDateString()}
      </Text>
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 5 }}>
        <Text
          style={{
            fontSize: 16,
          }}
        >
          Status:
        </Text>
        <Text
          style={{
            fontSize: 16,
            backgroundColor: "#F4CE14",
            paddingHorizontal: 10,
            paddingVertical: 2,
            borderRadius: 4,
            color: "#fff",
          }}
        >
          {item.status}
        </Text>
      </View>
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 20,
        backgroundColor: "#F0F4F8", // Light Pastel Blue-Gray
      }}
    >
      {/* <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 30,
          marginBottom: 20,
          gap: 2,
        }}
      >
        <Ionicons name="cart" size={80} color="#2C3E50" />
        <Text style={{ fontSize: 24, fontWeight: "bold", marginLeft: 10 }}>
          Orders
        </Text>
      </View> */}

      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        renderItem={renderOrder}
      />
    </View>
  );
};

export default BuyerOrders;
