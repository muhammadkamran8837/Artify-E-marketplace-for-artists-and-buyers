import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const AdminCommonScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#2C3E50",
        paddingHorizontal: 10,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        overflow: "hidden",
      },
      headerLeft: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 30,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>
              Hello Admin
            </Text>
            <Text style={{ fontSize: 14, color: "#fff" }}>
              Create, schedule, and view Exhibitions, and competitions...
            </Text>
          </View>
        </View>
      ),
      title: "",
    });
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        gap: 20,
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: "#2C3E50",
          borderRadius: 5,
          width: 250,
          height: 100,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => navigation.navigate("AdminExhibitions")}
      >
        <Text style={{ color: "#fff" }}>Exhibitions</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "#fff",
          borderRadius: 5,
          width: 250,
          height: 100,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#2C3E50",
        }}
        onPress={() => navigation.navigate("AdminCompetitions")}
      >
        <Text style={{ color: "#2C3E50" }}>Competitions</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdminCommonScreen;

const styles = StyleSheet.create({});
