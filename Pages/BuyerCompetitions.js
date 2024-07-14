import { Text, TouchableOpacity, View, FlatList } from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const BuyerCompetitions = () => {
  const [competitions, setCompetitions] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchCompetitions();
  }, []);

  const fetchCompetitions = async () => {
    try {
      const response = await axios.get(
        "http://10.0.2.2:8000/api/buyerUser/allcompetitions"
      );
      setCompetitions(response.data);
    } catch (error) {
      console.error("Error fetching competitions:", error);
    }
  };

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
              Competitions
            </Text>
          </View>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 20,
        paddingBottom: 10,
        backgroundColor: "#F0F4F8",
      }}
    >
      <FlatList
        data={competitions}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              marginBottom: 15,
              padding: 10,
              paddingBottom: 60,
              gap: 10,
              backgroundColor: "#fff",
              borderRadius: 5,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 10,
              elevation: 5,
            }}
            onPress={() =>
              navigation.navigate("BuyerCompetitionDetail", {
                competitionId: item._id,
              })
            }
          >
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "#0E46A3" }}
            >
              {item.name}
            </Text>
            <Text style={{ color: "#555" }}>
              Description: {item.description}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default BuyerCompetitions;
