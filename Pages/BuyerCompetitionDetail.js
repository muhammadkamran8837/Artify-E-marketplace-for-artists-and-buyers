import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useArtifyContext } from "../context/Context";
import Ionicons from "react-native-vector-icons/Ionicons";

const BuyerCompetitionDetail = () => {
  const route = useRoute();
  const { competitionId } = route.params;
  const [competition, setCompetition] = useState(null);
  const { buyerUser } = useArtifyContext();
  const navigation = useNavigation();

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
              Competition Details
            </Text>
          </View>
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    fetchCompetitionDetails();
  }, []);

  const fetchCompetitionDetails = async () => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:8000/api/buyerUser/competition/${competitionId}`
      );
      setCompetition(response.data);
    } catch (error) {
      console.error("Error fetching competition details:", error);
    }
  };

  const rateArt = async (artId, rating) => {
    try {
      const userId = buyerUser.buyerId; // Replace with actual buyer userId
      await axios.post(`http://10.0.2.2:8000/api/art/${artId}/rate`, {
        userId,
        rating,
      });
      alert("Art rated successfully!");
      // Refresh the competition details to update the rating status
      fetchCompetitionDetails();
    } catch (error) {
      console.error("Error rating art:", error);
      alert("Error rating art");
    }
  };

  const hasRated = (ratings) => {
    const userRating = ratings.find((r) => r.buyer === buyerUser.buyerId);
    return userRating ? userRating.rating : null;
  };

  const renderStars = (currentRating, artId) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => rateArt(artId, i)}
          disabled={!!currentRating}
        >
          <Ionicons
            name={i <= currentRating ? "star" : "star-outline"}
            size={30}
            color={i <= currentRating ? "#FFD700" : "#D3D3D3"}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: "#F0F4F8" }}>
      {competition ? (
        <>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 5,
              color: "#2C3E50",
            }}
          >
            {competition.name}
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginBottom: 10,
              color: "#2C3E50",
            }}
          >
            {competition.description}
          </Text>
          <FlatList
            data={competition.arts}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              const userRating = hasRated(item.ratings);
              return (
                <View
                  style={{
                    backgroundColor: "#fff",
                    padding: 10,
                    borderRadius: 5,
                    marginBottom: 15,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 10,
                    elevation: 5,
                  }}
                >
                  <Image
                    source={{
                      uri: `http://10.0.2.2:8000/${item.imageUrl.replace(
                        /\\/g,
                        "/"
                      )}`,
                    }}
                    style={{
                      width: "100%",
                      height: 200,
                      borderRadius: 5,
                      marginBottom: 10,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "#0E46A3",
                      marginBottom: 10,
                    }}
                  >
                    {item.title}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    {renderStars(userRating, item._id)}
                  </View>
                  {userRating ? (
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#2C3E50",
                        textAlign: "center",
                        marginTop: 10,
                      }}
                    >
                      You have rated this art: {userRating} stars
                    </Text>
                  ) : null}
                </View>
              );
            }}
          />
        </>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#0E46A3" />
        </View>
      )}
    </View>
  );
};

export default BuyerCompetitionDetail;
