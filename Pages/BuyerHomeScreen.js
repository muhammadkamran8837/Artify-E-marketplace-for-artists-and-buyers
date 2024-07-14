import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useArtifyContext } from "../context/Context";
import CustomBuyerDrawer from "../components/CustomBuyerDrawer";

const { width } = Dimensions.get("window");

const BuyerHomeScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [buyerArts, setBuyerArts] = useState([]);
  const [buyerExhibitions, setBuyerExhibitions] = useState([]);
  const [currentExhibitionIndex, setCurrentExhibitionIndex] = useState(0);
  const [orders, setOrders] = useState([]);
  const [currentOrderIndex, setCurrentOrderIndex] = useState(0);
  const { buyerUser } = useArtifyContext();
  const [customBuyerDrawerVisible, setCustomBuyerDrawerVisible] =
    useState(false);

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
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
            gap: 15,
          }}
        >
          <TouchableOpacity
            onPress={() => setCustomBuyerDrawerVisible(true)}
            style={{}}
          >
            <Ionicons name="menu-outline" size={35} color="#fff" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              color: "#fff",
              fontFamily: "sans-serif",
            }}
          >
            ARTIFY
          </Text>
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const fetchArts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://10.0.2.2:8000/api/art/allArts"
        );
        const filteredArts = response.data.filter((art) => art.imageUrl); // Filter out arts without images
        setBuyerArts(filteredArts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching arts:", error);
        setLoading(false);
      }
    };
    fetchArts();
  }, []);

  useEffect(() => {
    const fetchExhibitions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://10.0.2.2:8000/api/buyerUser/allexhibitions"
        );
        setBuyerExhibitions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching exhibitions:", error);
        setLoading(false);
      }
    };
    fetchExhibitions();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://10.0.2.2:8000/api/Order/buyerOrders/${buyerUser.buyerId}`
        ); // Replace with actual buyer ID
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const renderGalleryItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("BuyerArtDetails", { art: item })}
    >
      <Image
        source={{
          uri: "https://thewowstyle.com/wp-content/uploads/2015/01/image.painting-art.jpg",
          // uri: `http://10.0.2.2:8000/${item.imageUrl.replace(/\\/g, "/")}`,
        }}
        style={{
          width: width / 3 - 13.5,
          height: width / 3 - 10,
          borderRadius: 5,
          marginRight: 10,
        }}
      />
    </TouchableOpacity>
  );

  const renderExhibitionItem = ({ item }) => {
    const startDate = item.startDate
      ? new Date(item.startDate).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "";
    const endDate = item.endDate
      ? new Date(item.endDate).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "";
    return (
      <View
        style={{
          width: width - 30,
          padding: 15,
          marginHorizontal: 5,
          backgroundColor: "#fff",
          borderRadius: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 10,
          elevation: 5,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            marginBottom: 5,
            color: "#0E46A3",
          }}
        >
          {item.name}
        </Text>
        <Text style={{ marginBottom: 5, color: "#555" }}>
          {item.description}
        </Text>
        <Text style={{ color: "#555" }}>Start Date: {startDate}</Text>
        <Text style={{ color: "#555" }}>End Date: {endDate}</Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#2C3E50",
            padding: 10,
            borderRadius: 5,
            alignItems: "center",
            marginTop: 15,
          }}
          onPress={() => navigation.navigate("BuyerExhibitions")}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
            Explore
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderOrderItem = ({ item }) => {
    const orderDate = new Date(item.orderDate).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return (
      <View
        style={{
          width: width - 30,
          padding: 15,
          marginHorizontal: 5,
          backgroundColor: "#fff",
          borderRadius: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 10,
          elevation: 5,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            marginBottom: 5,
            color: "#0E46A3",
          }}
        >
          {item.art.title}
        </Text>
        {/* <Text style={{ color: "#555" }}>Price: ${item.art.price}</Text>
        <Text style={{ color: "#555" }}>Order Date: {orderDate}</Text> */}
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Text style={{}}>Status:</Text>
          <Text
            style={{
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
        <TouchableOpacity
          style={{
            backgroundColor: "#2C3E50",
            padding: 10,
            borderRadius: 5,
            alignItems: "center",
            marginTop: 15,
          }}
          onPress={() => navigation.navigate("BuyerOrders")}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
            View Details
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentExhibitionIndex(index);
    setCurrentOrderIndex(index);
  };

  return (
    <>
      <CustomBuyerDrawer
        visible={customBuyerDrawerVisible}
        onClose={() => setCustomBuyerDrawerVisible(false)}
      />

      <View
        style={{
          paddingHorizontal: 10,
          paddingTop: 10,
          paddingBottom: 10,
          backgroundColor: "#F0F4F8",
        }}
      >
        {/* Arts Section */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#2C3E50" }}>
            Arts
          </Text>
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
              marginTop: 3,
            }}
            onPress={() => navigation.navigate("BuyerGallary")}
          >
            <Text style={{ fontSize: 14, color: "#2C3E50" }}>See More</Text>
            <Ionicons name="arrow-forward-outline" size={20} color="#2C3E50" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={buyerArts.slice(0, 6)}
          renderItem={renderGalleryItem}
          keyExtractor={(item) => item._id}
          numColumns={3}
          contentContainerStyle={{ marginBottom: 15, gap: 15 }}
        />

        {/* Exhibitions Section */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#2C3E50" }}>
            Exhibitions
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("BuyerExhibitions")}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
              marginTop: 3,
            }}
          >
            <Text style={{ fontSize: 14, color: "#2C3E50" }}>See More</Text>
            <Ionicons name="arrow-forward-outline" size={20} color="#2C3E50" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={buyerExhibitions}
          renderItem={renderExhibitionItem}
          keyExtractor={(item) => item._id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          decelerationRate="fast"
          onScroll={handleScroll}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          {buyerExhibitions.map((_, index) => (
            <View
              key={index}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor:
                  currentExhibitionIndex === index ? "#0E46A3" : "#d3d3d3",
                marginHorizontal: 4,
              }}
            />
          ))}
        </View>

        {/* Orders Section */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#2C3E50" }}>
            Orders
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("BuyerOrders")}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
              marginTop: 3,
            }}
          >
            <Text style={{ fontSize: 14, color: "#2C3E50" }}>See More</Text>
            <Ionicons name="arrow-forward-outline" size={20} color="#2C3E50" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item._id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          decelerationRate="fast"
          onScroll={handleScroll}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          {orders.map((_, index) => (
            <View
              key={index}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor:
                  currentOrderIndex === index ? "#0E46A3" : "#d3d3d3",
                marginHorizontal: 4,
              }}
            />
          ))}
        </View>
      </View>
    </>
  );
};

export default BuyerHomeScreen;
