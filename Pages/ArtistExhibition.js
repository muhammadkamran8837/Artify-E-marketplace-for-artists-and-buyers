import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
} from "react-native";
import axios from "axios";
import { useArtifyContext } from "../context/Context";
import ExhibitionItem from "../components/ExhibitionItem";
import ArtItem from "../components/ArtItem";
import ExhibitionHeader from "../components/ExhibitionHeader";

const ArtistExhibition = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [selectedExhibition, setSelectedExhibition] = useState(null);
  const [userArts, setUserArts] = useState([]);
  const [isArtSelectionVisible, setIsArtSelectionVisible] = useState(false);
  const { artistUser } = useArtifyContext();
  const [selectedArt, setSelectedArt] = useState(null); // Updated to single art selection
  const numColumns = 2; // Number of arts per row

  useEffect(() => {
    fetchExhibitions();
  }, []);

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

  const handleAddArtToExhibition = async () => {
    try {
      const response = await axios.post(
        "http://10.0.2.2:8000/api/artist/exhibitions/add-art",
        {
          exhibitionId: selectedExhibition._id,
          artId: selectedArt._id,
        }
      );
      if (response.status === 200) {
        Alert.alert("Success", "Art added to exhibition successfully.");
        setSelectedExhibition(null);
        setIsArtSelectionVisible(false);
        setSelectedArt(null);
      } else {
        Alert.alert("Error", "Failed to add art to exhibition.");
      }
    } catch (error) {
      console.error("Error adding art to exhibition:", error);
      if (error.response && error.response.data.message) {
        Alert.alert("Error", error.response.data.message);
      } else {
        Alert.alert(
          "Error",
          "An error occurred while adding art to exhibition."
        );
      }
    }
  };

  const handleSelectArt = (art) => {
    if (selectedArt?._id === art._id) {
      setSelectedArt(null); // Toggle selection off
    } else {
      setSelectedArt(art); // Select the clicked art
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 5,
        backgroundColor: "#fff", // Background color
      }}
    >
      {!selectedExhibition ? (
        <>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 10,
              color: "#2C3E50",
            }}
          >
            Exhibitions
          </Text>
          <FlatList
            data={exhibitions}
            renderItem={({ item }) => (
              <ExhibitionItem
                item={item}
                onSelect={(item) => {
                  setSelectedExhibition(item);
                  fetchUserArts();
                }}
              />
            )}
            keyExtractor={(item) => item._id}
          />
        </>
      ) : (
        <>
          <ExhibitionHeader
            selectedExhibition={selectedExhibition}
            isArtSelectionVisible={isArtSelectionVisible}
            setIsArtSelectionVisible={setIsArtSelectionVisible}
            handleAddArtToExhibition={handleAddArtToExhibition}
            setSelectedExhibition={setSelectedExhibition}
            isArtSelected={selectedArt !== null}
          />
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
        </>
      )}
    </View>
  );
};

export default ArtistExhibition;
