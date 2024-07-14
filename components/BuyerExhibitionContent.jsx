import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const BuyerExhibitionContent = ({
  selectedExhibition,
  setSelectedExhibition,
}) => {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    if (selectedExhibition && selectedExhibition.arts) {
      setLoading(false);
    }
  }, [selectedExhibition]);

  const startDate = selectedExhibition.startDate
    ? new Date(selectedExhibition.startDate).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";
  const endDate = selectedExhibition.endDate
    ? new Date(selectedExhibition.endDate).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  const handleArtPress = (item) => {
    navigation.navigate("BuyerArtDetails", { art: item });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2C3E50" />
      </View>
    );
  }

  return (
    <View style={{ paddingBottom: 20 }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          marginBottom: 5,
          color: "#0E46A3",
        }}
      >
        {selectedExhibition.name}
      </Text>
      <Text style={{ color: "#555" }}>
        Description: {selectedExhibition.description}
      </Text>
      <Text style={{ color: "#555" }}>Start Date: {startDate}</Text>
      <Text style={{ color: "#555" }}>End Date: {endDate}</Text>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          paddingVertical: 20,
        }}
      >
        {selectedExhibition.arts.map((item) => (
          <TouchableOpacity
            key={item._id}
            style={{
              width: "48%", // Adjust according to your styling needs
              aspectRatio: 1,
              marginBottom: 10,
              borderRadius: 5,
              backgroundColor: "#2C3E50",
            }}
            onPress={() => handleArtPress(item)}
          >
            <Text
              style={{ textAlign: "center", padding: 10, color: "#F0F4F8" }}
            >
              {item.title}
            </Text>
            {item.imageUrl ? (
              <Image
                source={{
                  uri: `http://10.0.2.2:8000/${item.imageUrl.replace(
                    /\\/g,
                    "/"
                  )}`,
                }}
                style={{ width: "100%", height: "100%", borderRadius: 5 }}
                resizeMode="cover"
              />
            ) : (
              <Image
                source={require("../assets/artgallary2.jpg")}
                style={{ width: "100%", height: "100%", borderRadius: 5 }}
                resizeMode="cover"
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
      <View
        style={{
          gap: 10,
          marginTop: 70,
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#2C3E50",
            padding: 10,
            borderRadius: 5,
            alignItems: "center",
          }}
          onPress={() => setSelectedExhibition(null)}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#F0F4F8",
            }}
          >
            Back to Exhibitions
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BuyerExhibitionContent;
