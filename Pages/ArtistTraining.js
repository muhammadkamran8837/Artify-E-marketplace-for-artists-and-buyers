import React, { useState } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { Video } from "expo-av";

// Import the images
import thumbnail1 from "../assets/training1.jpg";
import thumbnail2 from "../assets/training2.jpg";
import thumbnail3 from "../assets/training3.jpg";
import thumbnail4 from "../assets/training4.jpg";

// Import the video files
import video1 from "../assets/videos/vid1.mp4";
import video2 from "../assets/videos/vid2.mp4";
import video3 from "../assets/videos/vid3.mp4";
import video4 from "../assets/videos/vid3.mp4";

const videos = [
  {
    id: "1",
    title: "Video 1",
    description: "Learn the basics of painting",
    thumbnail: thumbnail1,
    videoUrl: video1,
  },
  {
    id: "2",
    title: "Video 2",
    description: "Advanced techniques for sculpting",
    thumbnail: thumbnail2,
    videoUrl: video2,
  },
  {
    id: "3",
    title: "Video 3",
    description: "Advanced techniques for sculpting",
    thumbnail: thumbnail3,
    videoUrl: video3,
  },
  {
    id: "4",
    title: "Video 4",
    description: "Advanced techniques for sculpting",
    thumbnail: thumbnail4,
    videoUrl: video4,
  },
];

const ArtistTraining = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  const handleVideoPress = (videoUrl) => {
    setCurrentVideo(videoUrl);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.thumbnail} style={styles.thumbnail} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleVideoPress(item.videoUrl)}
        >
          <Text style={styles.buttonText}>Watch Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Artist Training</Text>
      <FlatList
        data={videos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                {currentVideo && (
                  <Video
                    source={currentVideo}
                    style={styles.video}
                    useNativeControls
                    resizeMode="contain"
                    isLooping
                  />
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 5,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2C3E50",
  },
  card: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#EBF4F6",
    borderRadius: 10,
    overflow: "hidden",
  },
  thumbnail: {
    width: 120,
    height: "100%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  info: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#0E46A3",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#2C3E50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.6,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
  },
  video: {
    width: "100%",
    height: "100%",
  },
});

export default ArtistTraining;
