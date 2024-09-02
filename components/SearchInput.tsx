import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React from "react";

const searchIcon = require("../assets/icons/search.png");

interface SearchInputProps {
  value: string;
  handleChangeText: (e: any) => void;
}

const SearchInput = ({ value, handleChangeText }: SearchInputProps) => {
  return (
    <View className="bg-black-200 p-3 rounded-lg flex-row justify-between items-center">
      <TextInput
        placeholder="search for a video topic"
        placeholderTextColor="#7b7b8b"
        className="text-white flex-1"
        value={value}
        onChangeText={handleChangeText}
      />
      <TouchableOpacity>
        <Image source={searchIcon} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
