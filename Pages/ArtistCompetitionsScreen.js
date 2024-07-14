import React, { useState, useEffect } from "react";
import { Text, View, FlatList, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import { useArtifyContext } from "../context/Context";
import ArtItem from "../components/ArtItem";

const ArtistCompetitionsScreen = () => {
  const [competitions, setCompetitions] = useState([]);
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const [userArts, setUserArts] = useState([]);
  const [isArtSelectionVisible, setIsArtSelectionVisible] = useState(false);
  const { artistUser } = useArtifyContext();
  const [selectedArt, setSelectedArt] = useState(null);

  useEffect(() => {
    fetchCompetitions();
  }, []);

  const fetchCompetitions = async () => {
    try {
      const response = await axios.get(
        "http://10.0.2.2:8000/api/artist/allCompetitions"
      );
      setCompetitions(response.data);
    } catch (error) {
      console.error("Error fetching competitions:", error);
    }
  };

  const fetchUserArts = async () => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:8000/api/artist/arts/${artistUser.artistId}`
      );
      setUserArts(response.data.arts);
    } catch (error) {
      console.error("Error fetching user arts:", error);
    }
  };

  const handleAddArtToCompetition = async () => {
    try {
      const response = await axios.post(
        "http://10.0.2.2:8000/api/artist/competition/add-art",
        {
          competitionId: selectedCompetition._id,
          artId: selectedArt._id,
        }
      );
      if (response.status === 200) {
        Alert.alert("Success", "Art added to competition successfully.");
        setSelectedCompetition(null);
        setIsArtSelectionVisible(false);
        setSelectedArt(null);
      } else {
        Alert.alert("Error", "Failed to add art to competition.");
      }
    } catch (error) {
      console.error("Error adding art to competition:", error);
      if (error.response && error.response.data.message) {
        Alert.alert("Error", error.response.data.message);
      } else if (error.response && error.response.status === 404) {
        Alert.alert(
          "Error",
          "Resource not found. Please check your server endpoint."
        );
      } else {
        Alert.alert(
          "Error",
          "An error occurred while adding art to competition."
        );
      }
    }
  };
  const handleSelectCompetition = async (competition) => {
    setSelectedCompetition(competition);
    setIsArtSelectionVisible(true);
    try {
      const response = await axios.get(
        `http://10.0.2.2:8000/api/artist/arts/${artistUser.artistId}`
      );
      setUserArts(response.data.arts);
    } catch (error) {
      console.error("Error fetching user arts:", error);
    }
  };

  const handleSelectArt = (art) => {
    if (selectedArt?._id === art._id) {
      setSelectedArt(null);
    } else {
      setSelectedArt(art);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 5,
        backgroundColor: "#fff",
      }}
    >
      {!selectedCompetition ? (
        <>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 10,
              color: "#2C3E50",
            }}
          >
            Competitions
          </Text>
          <FlatList
            data={competitions}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelectCompetition(item)}
                style={{
                  marginBottom: 15,
                  padding: 10,
                  paddingBottom: 60,
                  gap: 10,
                  backgroundColor: "#F0F4F8",
                  borderRadius: 5,
                  borderWidth: 2,
                  borderColor:
                    selectedCompetition?._id === item._id
                      ? "#2C3E50"
                      : "transparent",
                }}
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
            keyExtractor={(item) => item._id}
          />
        </>
      ) : (
        <>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 20,
              color: "#2C3E50",
            }}
          >
            {selectedCompetition.name}
          </Text>
          <FlatList
            data={isArtSelectionVisible ? userArts : []}
            renderItem={({ item }) => (
              <ArtItem
                item={item}
                isSelected={selectedArt?._id === item._id}
                onSelect={handleSelectArt}
              />
            )}
            keyExtractor={(item) => item._id}
          />
          {isArtSelectionVisible && (
            <TouchableOpacity
              style={{
                backgroundColor: "#2C3E50",
                padding: 15,
                borderRadius: 5,
                alignItems: "center",
                marginTop: 20,
              }}
              onPress={handleAddArtToCompetition}
            >
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
                Confirm Selection
              </Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

export default ArtistCompetitionsScreen;
