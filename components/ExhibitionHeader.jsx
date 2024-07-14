import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

const ExhibitionHeader = ({
  selectedExhibition,
  isArtSelectionVisible,
  setIsArtSelectionVisible,
  handleAddArtToExhibition,
  setSelectedExhibition,
  isArtSelected,
}) => {
  const startDate = selectedExhibition.startDate
    ? new Date(selectedExhibition.startDate).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";
  const endDate = selectedExhibition.endDate
    ? new Date(selectedExhibition.endDate).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <View style={{ paddingBottom: 20 }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          marginBottom: 5,
          color: "#0E46A3",
        }}
      >
        {selectedExhibition.name}
      </Text>
      <Text style={{ color: "#555" }}>
        Description: {selectedExhibition.description}
      </Text>
      <Text style={{ color: "#555" }}>Start Date: {startDate}</Text>
      <Text style={{ color: "#555" }}>End Date: {endDate}</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          marginTop: 20,
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#2C3E50",
            padding: 15,
            borderRadius: 5,
            alignItems: "center",
          }}
          onPress={() => setIsArtSelectionVisible(true)}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
            Add Art to Exhibition
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "#F0F4F8",
            padding: 15,
            borderRadius: 5,
            alignItems: "center",
          }}
          onPress={() => setSelectedExhibition(null)}
        >
          <Text style={{ color: "#373A40", fontSize: 16, fontWeight: "bold" }}>
            Back to Exhibitions
          </Text>
        </TouchableOpacity>
      </View>

      {isArtSelected && isArtSelectionVisible && (
        <TouchableOpacity
          style={{
            backgroundColor: "#2C3E50",
            padding: 15,
            borderRadius: 5,
            alignItems: "center",
            marginTop: 20,
          }}
          onPress={handleAddArtToExhibition}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
            Confirm Selection
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ExhibitionHeader;
