import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  FlatList,
  Image,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useArtifyContext } from "../context/Context";

const BuyerGallery = () => {
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { setAllBuyerArts } = useArtifyContext();

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
            <Ionicons name="chevron-back-sharp" size={30} color={"#fff"} />
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
              Art Gallery
            </Text>
          </View>
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const fetchArts = async () => {
      try {
        const response = await axios.get(
          "http://10.0.2.2:8000/api/art/allArts"
        );
        const filteredArts = response.data.filter((art) => art.imageUrl); // Filter out arts without images
        setArts(filteredArts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching arts:", error);
        setLoading(false);
      }
    };

    fetchArts();
  }, [arts]);

  const renderItem = ({ item }) => {
    const imageUrl = item.imageUrl
      ? `http://10.0.2.2:8000/${item.imageUrl.replace(/\\/g, "/")}`
      : null;

    return (
      <TouchableOpacity
        style={{
          flex: 1,
          margin: 5,
          borderRadius: 5,
          overflow: "hidden",
          backgroundColor: "#f0f0f0",
        }}
        onPress={() => navigation.navigate("BuyerArtDetails", { art: item })}
      >
        <Image
          source={{
            uri: "https://thewowstyle.com/wp-content/uploads/2015/01/image.painting-art.jpg",
          }}
          style={{ width: "100%", height: 200, borderRadius: 5 }}
        />
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#2C3E50" />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F0F4F8", // Light Pastel Blue-Gray
        paddingHorizontal: 5,
      }}
    >
      <FlatList
        data={arts}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default BuyerGallery;
