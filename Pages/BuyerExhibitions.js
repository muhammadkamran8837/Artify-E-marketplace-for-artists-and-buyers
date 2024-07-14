import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useArtifyContext } from "../context/Context";
import BuyerExhibitionItem from "../components/BuyerExhibitionItem";
import axios from "axios";
import BuyerExhibitionContent from "../components/BuyerExhibitionContent";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

const BuyerExhibitions = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [selectedExhibition, setSelectedExhibition] = useState(null);
  const [userArts, setUserArts] = useState([]);
  const [isArtSelectionVisible, setIsArtSelectionVisible] = useState(false);
  const { artistUser, setAllExhibitions } = useArtifyContext();
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
              Exhibitions
            </Text>
          </View>
        </View>
      ),
    });
  }, [navigation]);

  const fetchExhibitionArts = () => {};
  useEffect(() => {
    fetchExhibitions();
  }, []);

  const fetchExhibitions = async () => {
    try {
      const response = await axios.get(
        "http://10.0.2.2:8000/api/buyerUser/allexhibitions"
      );
      setExhibitions(response.data);
      setAllExhibitions(response.data);
    } catch (error) {
      console.error("Error fetching exhibitions:", error);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 20,
        backgroundColor: "#F0F4F8",
      }}
    >
      {!selectedExhibition ? (
        <>
          <FlatList
            data={exhibitions}
            renderItem={({ item }) => (
              <BuyerExhibitionItem
                item={item}
                onSelect={(item) => {
                  setSelectedExhibition(item);
                  fetchExhibitionArts();
                }}
              />
            )}
            keyExtractor={(item) => item._id}
          />
        </>
      ) : (
        <>
          <BuyerExhibitionContent
            selectedExhibition={selectedExhibition}
            setSelectedExhibition={setSelectedExhibition}
          />
        </>
      )}
    </View>
  );
};

export default BuyerExhibitions;

const styles = StyleSheet.create({});
