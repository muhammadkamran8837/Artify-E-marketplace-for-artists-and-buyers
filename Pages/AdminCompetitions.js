import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";

const AdminCompetitions = () => {
  const navigation = useNavigation();
  const [competitions, setCompetitions] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

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

  // Fetch existing competitions
  useEffect(() => {
    fetchCompetitions();
  }, []);

  const fetchCompetitions = async () => {
    try {
      const response = await axios.get(
        "http://10.0.2.2:8000/api/admin/allCompetitions"
      );
      setCompetitions(response.data);
    } catch (error) {
      console.error("Error fetching competitions:", error);
    }
  };

  const handleCreateCompetition = async () => {
    try {
      if (!name || !description) {
        Alert.alert("Error", "Please enter all fields");
        return;
      }

      const response = await axios.post(
        "http://10.0.2.2:8000/api/admin/createCompetition",
        {
          name,
          description,
        }
      );

      if (response.status === 201) {
        fetchCompetitions(); // Refresh the list of competitions
        setName("");
        setDescription("");
      } else {
        Alert.alert("Error", "Failed to create competition");
      }
    } catch (error) {
      console.error("Error creating competition:", error);
      Alert.alert("Error", "An error occurred while creating competition");
    }
  };

  const renderCompetitionItem = ({ item }) => {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          padding: 15,
          marginBottom: 10,
          borderRadius: 5,
          paddingVertical: 20,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 5,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            marginBottom: 5,
            color: "#0E46A3",
          }}
        >
          {item.name}
        </Text>

        <Text style={{ marginBottom: 20 }}>{item.description}</Text>
      </View>
    );
  };

  return (
    <View
      style={{ flex: 1, paddingHorizontal: 10, backgroundColor: "#F0F4F8" }}
    >
      <Text style={{ fontSize: 18, fontWeight: "bold", marginVertical: 10 }}>
        Create New Competition
      </Text>
      <TextInput
        style={[
          {
            borderWidth: 1,
            borderColor: "#ddd",
            padding: 10,
            borderRadius: 5,
            marginBottom: 10,
          },
        ]}
        placeholder="Competition Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={[
          {
            borderWidth: 1,
            borderColor: "#ddd",
            padding: 10,
            borderRadius: 5,
            height: 100,
            marginBottom: 10,
          },
        ]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity
        style={{
          backgroundColor: "#2C3E50",
          padding: 15,
          borderRadius: 5,
          alignItems: "center",
          marginBottom: 10,
        }}
        onPress={handleCreateCompetition}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
          Create Competition
        </Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        Your Competitions
      </Text>
      <FlatList
        data={competitions}
        renderItem={renderCompetitionItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ marginTop: 10 }}
      />
    </View>
  );
};

export default AdminCompetitions;

const styles = StyleSheet.create({});
