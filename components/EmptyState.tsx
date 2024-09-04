import { View, Text, Image } from "react-native";
import React from "react";

const empty = require("../assets/images/empty.png");

const EmptyState = () => {
  return (
    <View className="justify-center items-center">
      <View>
        <Image
          source={empty}
          className="w-[200px] h-[200px]"
          resizeMode="contain"
        />
      </View>
      <View className="items-center">
        <Text className="text-white font-bold text-xl">No Photos found</Text>
        <Text className="text-white">Be the first one to upload a Photo</Text>
      </View>
    </View>
  );
};

export default EmptyState;
