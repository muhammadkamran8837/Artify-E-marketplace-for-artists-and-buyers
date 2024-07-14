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
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

const AdminExhibitions = () => {
  const navigation = useNavigation();
  const [exhibitions, setExhibitions] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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

  // Fetch existing exhibitions
  useEffect(() => {
    fetchExhibitions();
  }, []);

  const fetchExhibitions = async () => {
    try {
      const response = await axios.get(
        "http://10.0.2.2:8000/api/admin/allexhibitions"
      );
      setExhibitions(response.data);
    } catch (error) {
      console.error("Error fetching exhibitions:", error);
    }
  };

  const handleCreateExhibition = async () => {
    try {
      if (!name || !description || !startDate || !endDate) {
        Alert.alert("Error", "Please enter all fields");
        return;
      }

      const response = await axios.post(
        "http://10.0.2.2:8000/api/admin/createExhibitions",
        {
          name,
          description,
          startDate,
          endDate,
        }
      );

      if (response.status === 201) {
        fetchExhibitions(); // Refresh the list of exhibitions
        setName("");
        setDescription("");
        setStartDate("");
        setEndDate("");
      } else {
        Alert.alert("Error", "Failed to create exhibition");
      }
    } catch (error) {
      console.error("Error creating exhibition:", error);
      Alert.alert("Error", "An error occurred while creating exhibition");
    }
  };

  const renderExhibitionItem = ({ item }) => {
    const startDate = new Date(item.startDate).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    // Format the end date
    const endDate = new Date(item.endDate).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
        <Text>Start Date: {startDate}</Text>
        <Text>End Date: {endDate}</Text>
      </View>
    );
  };

  return (
    <View
      style={{ flex: 1, paddingHorizontal: 10, backgroundColor: "#F0F4F8" }}
    >
      <Text style={{ fontSize: 18, fontWeight: "bold", marginVertical: 10 }}>
        Create New Exhibition
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
        placeholder="Exhibition Name"
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
        placeholder="Start Date"
        value={startDate}
        onChangeText={setStartDate}
      />
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          padding: 10,
          borderRadius: 5,
          marginBottom: 10,
        }}
        placeholder="End Date"
        value={endDate}
        onChangeText={setEndDate}
      />
      <TouchableOpacity
        style={{
          backgroundColor: "#2C3E50",
          padding: 15,
          borderRadius: 5,
          alignItems: "center",
          marginBottom: 10,
        }}
        onPress={handleCreateExhibition}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
          Create Exhibition
        </Text>
      </TouchableOpacity>

      {/* List of existing exhibitions */}
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>Your Exhibitions</Text>
      <FlatList
        data={exhibitions}
        renderItem={renderExhibitionItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ marginTop: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default AdminExhibitions;
1234;
