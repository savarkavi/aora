import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";

const searchIcon = require("../assets/icons/search.png");

const SearchInput = () => {
  const [query, setQuery] = useState("");

  return (
    <View className="bg-black-200 p-3 rounded-lg flex-row justify-between items-center">
      <TextInput
        placeholder="search for a photo topic"
        placeholderTextColor="#CDCDE0"
        className="text-white flex-1"
        value={query}
        onChangeText={(e) => setQuery(e)}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) return Alert.alert("Inavlid input");

          router.push(`/search/${query}`);
        }}
      >
        <Image source={searchIcon} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
