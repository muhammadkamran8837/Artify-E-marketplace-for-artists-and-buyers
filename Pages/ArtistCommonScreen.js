import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useArtifyContext } from "../context/Context";
import axios from "axios";
import thumbnail4 from "../assets/training4.jpg";
import { useNavigation } from "@react-navigation/native";

const ArtistCommonScreen = () => {
  const [arts, setArts] = useState([]);
  const [exhibitions, setExhibitions] = useState([]);
  const navigation = useNavigation();
  const [competitions, setCompetitions] = useState([]);

  const { artistUser } = useArtifyContext();

  useEffect(() => {
    fetchExhibitions();
    // fetchCompetitions();
    fetchArts();
  }, []);

  const fetchArts = async () => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:8000/api/artist/arts/${artistUser.artistId}`
      );
      setArts(response.data.arts);
    } catch (error) {
      console.error("Error fetching arts:", error);
    }
  };

  const fetchExhibitions = async () => {
    try {
      const response = await axios.get(
        "http://10.0.2.2:8000/api/artist/allexhibitions"
      );
      setExhibitions(response.data);
    } catch (error) {
      console.error("Error fetching exhibitions:", error);
    }
  };

  // const fetchCompetitions = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://10.0.2.2:8000/api/artist/allcompetitions"
  //     );
  //     setCompetitions(response.data);
  //   } catch (error) {
  //     console.error("Error fetching competitions:", error);
  //   }
  // };

  const training = {
    id: "1",
    title: "Video 1",
    description: "Learn the basics of painting for beginners",
    thumbnail: thumbnail4, // Use the imported image
    videoUrl: "",
  };

  const exhibition = exhibitions.length > 0 ? exhibitions[0] : null;
  const artistArts = arts.slice(0, 2);

  const startDate = new Date(exhibition?.startDate).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );
  const endDate = new Date(exhibition?.endDate).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 10,
          paddingTop: 10,
          gap: 20,
        }}
      >
        {/***************  Training Card ***************/}
        <View style={{ gap: 5 }}>
          <ImageBackground
            source={training.thumbnail}
            style={{
              borderRadius: 10,
              height: 200,
              overflow: "hidden",
            }}
            imageStyle={{
              borderRadius: 10,
              resizeMode: "cover",
            }}
          >
            <View
              style={{
                borderRadius: 10,
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                height: 200,
                padding: 10,
                gap: 10,
              }}
            >
              <Text style={{ color: "red", fontSize: 18, fontWeight: "bold" }}>
                LIVE
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 18,
                  fontWeight: "bold",
                  width: "60%",
                  marginBottom: 20,
                }}
              >
                {training.description}
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "#2C3E50",
                  alignSelf: "flex-start",
                  padding: 8,
                  paddingHorizontal: 20,
                  borderRadius: 10,
                }}
                onPress={() => navigation.navigate("Training")}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#fff",
                    marginTop: 3,
                    fontWeight: "bold",
                  }}
                >
                  See More
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
        {/***************  Exhibition Card ***************/}

        <View style={{ gap: 5 }}>
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#2C3E50",
              }}
            >
              Exhibitions
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Exhibition")}>
              <Text style={{ fontSize: 14, color: "#0E46A3", marginTop: 3 }}>
                See More
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              height: 150,
              gap: 10,
              borderWidth: 1,
              borderColor: "#0E46A3",
              borderRadius: 10,
            }}
          >
            <Image
              source={require("../assets/exhibitionDemo.jpg")}
              style={{
                width: 180,
                height: "100%",
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
              }}
            />
            <View
              style={{ gap: 1, paddingVertical: 10, paddingHorizontal: 10 }}
            >
              <Text style={{ fontWeight: "bold" }}>{exhibition?.name}</Text>
              <Text>{exhibition?.description}</Text>
              <Text>Start Date: {startDate}</Text>
              <Text>End Date: {endDate}</Text>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 5,
                  alignItems: "center",
                  marginTop: 10,
                  borderWidth: 1,
                  borderColor: "#0E46A3",
                  backgroundColor: "#2C3E50",
                }}
              >
                <Text
                  style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}
                >
                  Participate
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/***************  Gallery Card ***************/}

        <View style={{ gap: 5 }}>
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#2C3E50",
              }}
            >
              Your Arts
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Gallery")}>
              <Text style={{ fontSize: 14, color: "#0E46A3", marginTop: 3 }}>
                See More
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              justifyContent: "space-between",
            }}
          >
            {artistArts.map((art, index) => (
              <View key={index} style={{ width: "48%" }}>
                <Image
                  source={
                    require("../assets/artgallary2.jpg")
                    // uri: `http://10.0.2.2:8000/${art.image.replace(
                    //   /\\/g,
                    //   "/"
                    // )}`,
                  }
                  style={{
                    width: "100%",
                    height: 150,
                    borderRadius: 10,
                  }}
                />
                <Text style={{ marginTop: 5 }}>{art.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/***************  Compititions Card ***************/}
      </View>
    </ScrollView>
  );
};

export default ArtistCommonScreen;
