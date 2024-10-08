import {
  View,
  Text,
  FlatList,
  Image,
  StatusBar,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/SearchInput";
import TrendingPhotos from "@/components/TrendingPhotos";
import EmptyState from "@/components/EmptyState";
import useAppwrite from "@/lib/useAppwrite";
import { getAllPosts, getLatestPosts } from "@/lib/appwrite";
import PhotoCard from "@/components/PhotoCard";

const logo = require("../../assets/images/logo.png");

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);

  const { data: posts, isLoading, refetch } = useAppwrite(getAllPosts);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
  };

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
                  <Text className="text-lg text-white">Welcome back</Text>
                  <Text className="text-3xl font-semibold text-white">
                    Sushant
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
              <Text className="text-white mt-16 font-semibold">
                Trending Photos
              </Text>
              <TrendingPhotos />
            </View>
          )}
          ListEmptyComponent={() => <EmptyState />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
      <StatusBar barStyle="light-content" />
    </SafeAreaView>
  );
};

export default Home;
