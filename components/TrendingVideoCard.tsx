import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextStyle,
  ViewStyle,
  ImageStyle,
} from "react-native";
import { Models } from "react-native-appwrite";
import * as Animatable from "react-native-animatable";
import { useState } from "react";
// import { Video, ResizeMode } from "expo-av";

const playIcon = require("../assets/icons/play.png");

const zoomIn = {
  0: {
    scale: 0.8,
  },
  1: {
    scale: 1.1,
  },
};

const zoomOut = {
  0: {
    scale: 1.1,
  },
  1: {
    scale: 0.8,
  },
};

const TrendingVideoCard = ({
  post,
  activeItem,
}: {
  post: Models.Document;
  activeItem: any;
}) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className="mr-5 my-5"
      animation={activeItem === post.$id ? zoomIn : (zoomOut as any)}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: post.videoUrl }}
          resizeMode={ResizeMode.CONTAIN}
        />
      ) : (
        <TouchableOpacity activeOpacity={0.6} onPress={() => setPlay(true)}>
          <View className="relative flex justify-center items-center rounded-lg">
            <Image
              source={{ uri: post.thumbnail }}
              className="w-52 h-72 rounded-lg opacity-60"
              resizeMode="cover"
            />
            <Image
              source={playIcon}
              className="w-12 h-12 absolute"
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

export default TrendingVideoCard;
