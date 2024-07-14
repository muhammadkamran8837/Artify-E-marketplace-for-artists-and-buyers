import React from "react";
import { Text, TouchableOpacity } from "react-native";

const ExhibitionItem = ({ item, onSelect }) => {
  const startDate = item.startDate
    ? new Date(item.startDate).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";
  const endDate = item.endDate
    ? new Date(item.endDate).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#EBF4F6",
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
      }}
      onPress={() => onSelect(item)}
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
      <Text style={{ marginBottom: 20, color: "#555" }}>
        {item.description}
      </Text>
      <Text style={{ color: "#555" }}>Start Date: {startDate}</Text>
      <Text style={{ color: "#555" }}>End Date: {endDate}</Text>
      <TouchableOpacity
        style={{
          backgroundColor: "#2C3E50",
          padding: 10,
          borderRadius: 5,
          alignItems: "center",
          marginTop: 30,
        }}
        onPress={() => onSelect(item)}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
          Participate
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ExhibitionItem;
