import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Image, Dimensions } from "react-native";
import axios from "axios";
import { useArtifyContext } from "../context/Context";

const ArtistGallery = () => {
  const [arts, setArts] = useState([]);
  const { artistUser } = useArtifyContext();

  useEffect(() => {
    const fetchArts = async () => {
      try {
        const response = await axios.get(
          `http://10.0.2.2:8000/api/artist/arts/${artistUser.artistId}`
        );
        setArts(response.data.arts); // Set arts state with response.data.arts
      } catch (error) {
        console.error("Error fetching arts:", error);
      }
    };

    fetchArts();
  }, [artistUser.artistId]);

  const numColumns = 2; // Number of arts per row

  const renderItem = ({ item }) => (
    <View
      style={{
        flexDirection: "column",
        padding: 5,
      }}
    >
      <Image
        source={{
          uri: "https://th.bing.com/th/id/OIP.tUI0RRF7NTmJbpMs1bOAZAHaF0?rs=1&pid=ImgDetMain",
          // uri: `http://10.0.2.2:8000/${item.imageUrl.replace(/\\/g, "/")}`,
        }}
        style={{
          width: Dimensions.get("window").width / numColumns - 30,
          height: 250,
          borderRadius: 5,
        }}
      />
      <View style={{ display: "flex", gap: 2 }}>
        <Text style={{ fontWeight: "bold", fontSize: 16, color: "#2C3E50" }}>
          {item.title}
        </Text>
        <Text
          style={{
            width: Dimensions.get("window").width / numColumns - 30,
            color: "#555",
          }}
        >
          {item.description}
        </Text>
      </View>
    </View>
  );

  return (
    <View
      style={{ flex: 1, paddingHorizontal: 20, backgroundColor: "#F0F4F8" }}
    >
      <FlatList
        data={arts}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingTop: 20 }}
        numColumns={numColumns}
      />
    </View>
  );
};

export default ArtistGallery;
