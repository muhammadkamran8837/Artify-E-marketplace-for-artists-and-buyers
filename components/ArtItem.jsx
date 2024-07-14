import React from "react";
import { Text, View, TouchableOpacity, Image, Dimensions } from "react-native";

const ArtItem = ({ item, isSelected, onSelect }) => {
  const numColumns = 2;
  const itemWidth = Dimensions.get("window").width / numColumns - 30; // Calculate item width dynamically

  console.log("Item:", item);

  const imageUrl = item.imageUrl.replace(/\\/g, "/");

  return (
    <TouchableOpacity onPress={() => onSelect(item)}>
      <View
        style={{
          flexDirection: "column",
          margin: 5,
          borderRadius: 5,
          overflow: "hidden",
          borderWidth: 2,
          borderColor: isSelected ? "#89BFB6" : "transparent",
          marginBottom: 20,
          backgroundColor: "#F0F4F8", // Background color
        }}
      >
        {item.imageUrl && ( // Check if imageUrl is defined
          <Image
            source={{ uri: `http://10.0.2.2:8000/${imageUrl}` }}
            style={{ height: 250, borderRadius: 5 }}
            resizeMode="cover" // Ensure image covers the defined dimensions
            onError={(error) => console.log("Image loading error:", error)} // Handle image loading errors
          />
        )}

        <View style={{ display: "flex", gap: 5, padding: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16, color: "#0E46A3" }}>
            {item.title}
          </Text>
          <Text style={{ color: "#555" }}>{item.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ArtItem;
