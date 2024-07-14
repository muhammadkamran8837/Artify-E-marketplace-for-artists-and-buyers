import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useArtifyContext } from "../context/Context";

const BuyerArtDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { art } = route.params;
  const { buyerUser } = useArtifyContext();

  const [likeCount, setLikeCount] = useState(art.likes.length || 0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(art.comments || []);
  const [liked, setLiked] = useState(art.likes.includes(buyerUser.buyerId));
  const [loading, setLoading] = useState(false);

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
              {art.title}
            </Text>
          </View>
        </View>
      ),
    });
  }, [navigation]);
  useEffect(() => {
    const fetchArtDetails = async () => {
      try {
        const response = await axios.get(
          `http://10.0.2.2:8000/api/art/${art._id}`
        );
        const updatedArt = response.data;
        setComments(updatedArt.comments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching art details:", error);
        setLoading(false);
      }
    };

    fetchArtDetails();
  }, []);

  const handleLike = async () => {
    try {
      await axios.post(`http://10.0.2.2:8000/api/art/${art._id}/like`, {
        userId: buyerUser.buyerId,
      });
      setLikeCount(likeCount + 1);
      setLiked(true);
    } catch (error) {
      Alert.alert("Error", "Failed to like the art.");
    }
  };

  const handleComment = async () => {
    if (comment.trim()) {
      try {
        const response = await axios.post(
          `http://10.0.2.2:8000/api/art/${art._id}/comment`,
          { userId: buyerUser.buyerId, commentText: comment }
        );
        setComments(response.data.comments);
        setComment("");
        Alert.alert("Success", "Comment posted successfully.");
      } catch (error) {
        Alert.alert("Error", "Failed to post the comment.");
      }
    } else {
      Alert.alert("Error", "Comment cannot be empty.");
    }
  };
  const handlePurchase = () => {
    navigation.navigate("BuyerCheckout", { art });
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: "#F0F4F8", // Light Pastel Blue-Gray
        paddingHorizontal: 10,
        paddingTop: 10,
      }}
    >
      <Image
        source={{
          uri: `http://10.0.2.2:8000/${art.imageUrl.replace(/\\/g, "/")}`,
        }}
        style={{
          width: "100%",
          height: 300,
          borderRadius: 5,
          marginBottom: 20,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#333",
              marginBottom: 5,
            }}
          >
            {art.title}
          </Text>
          <Text style={{ fontSize: 14, color: "#555", marginBottom: 5 }}>
            {art.description}
          </Text>
        </View>

        <TouchableOpacity
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
          }}
          onPress={handleLike}
        >
          <Ionicons
            name="heart-sharp"
            size={32}
            color={liked ? "red" : "gray"}
          />
          <Text style={{ color: "#555", fontSize: 24 }}>({likeCount})</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: "#000",
            marginBottom: 20,
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Price: ${art.price}
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: "#2C3E50", // Rich Navy Blue
            padding: 10,
            borderRadius: 5,
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
          onPress={handlePurchase}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
            Purchase art
          </Text>
          <Ionicons name="cart" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
          gap: 5,
        }}
      >
        <TextInput
          style={{
            height: 40,
            borderColor: "#ccc",
            borderBottomWidth: 1,
            width: "80%",
          }}
          placeholder="Add a comment..."
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "#2C3E50", // Rich Navy Blue
            padding: 10,
            borderRadius: 5,
            alignItems: "center",
            width: "15%",
          }}
          onPress={handleComment}
        >
          <Text style={{ color: "#fff", fontSize: 18 }}>Post</Text>
        </TouchableOpacity>
      </View>

      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "#333",
          marginBottom: 10,
        }}
      >
        Comments
      </Text>
      <ScrollView>
        {comments.map((comment, index) => (
          <View
            key={index}
            style={{
              borderRadius: 5,
              padding: 10,
              marginBottom: 10,
              backgroundColor: "#EBF4F6",
              borderBottomColor: "#B6C7AA",
              borderBottomWidth: 0.3,
            }}
          >
            {comment.text && (
              <>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#2C3E50",
                  }}
                >
                  {comment.buyer.name}
                </Text>
                <Text style={{ fontSize: 16, color: "#2C3E50" }}>
                  {comment.text}
                </Text>
              </>
            )}
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

export default BuyerArtDetailScreen;
