import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Models } from "react-native-appwrite";

const menuIcon = require("../assets/icons/menu.png");
const playIcon = require("../assets/icons/play.png");

const PhotoCard = ({ post }: { post: Models.Document }) => {
  return (
    <View className="mt-4 p-4">
      <View className="flex-row justify-between">
        <View className="flex-row gap-4">
          <View className="w-[40px] h-[40px]">
            <Image
              source={{ uri: post.user.avatar }}
              className="rounded-lg w-full h-full"
              resizeMode="cover"
            />
          </View>
          <View>
            <Text className="text-white font-bold">{post.title}</Text>
            <Text className="text-gray-100">{post.user.username}</Text>
          </View>
        </View>
        <View>
          <Image source={menuIcon} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>
      <TouchableOpacity
        className="mt-4 relative justify-center items-center"
        activeOpacity={0.6}
      >
        <Image
          source={{ uri: post.thumbnail }}
          className="w-full h-60 rounded-lg"
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
};

export default PhotoCard;
