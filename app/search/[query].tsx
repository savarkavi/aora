import { View, Text, FlatList, Image, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import useAppwrite from "@/lib/useAppwrite";
import { searchPosts } from "@/lib/appwrite";
import SearchInput from "@/components/SearchInput";
import PhotoCard from "@/components/PhotoCard";
import EmptyState from "@/components/EmptyState";

const logo = require("../../assets/images/logo.png");

const Search = () => {
  const { query } = useLocalSearchParams();

  const {
    data: posts,
    isLoading,
    refetch,
  } = useAppwrite(() => searchPosts(query as string));

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      {isLoading ? (
        <View className="h-full justify-center items-center">
          <ActivityIndicator animating={isLoading} color="#fff" />
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => <PhotoCard post={item} />}
          ListHeaderComponent={() => (
            <View className="p-4 mt-4">
              <View className="flex-row justify-between">
                <View>
                  <Text className="text-lg text-white">Search results for</Text>
                  <Text className="text-3xl font-semibold text-white">
                    {query}
                  </Text>
                </View>
                <View>
                  <Image
                    source={logo}
                    className="w-20 h-20"
                    resizeMode="contain"
                  />
                </View>
              </View>
              <SearchInput />
            </View>
          )}
          ListEmptyComponent={() => <EmptyState />}
        />
      )}
    </SafeAreaView>
  );
};

export default Search;
