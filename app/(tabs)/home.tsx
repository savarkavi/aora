import {
  View,
  Text,
  FlatList,
  Image,
  StatusBar,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/SearchInput";
import TrendingVideos from "@/components/TrendingVideos";
import EmptyState from "@/components/EmptyState";
import useAppwrite from "@/lib/useAppwrite";
import { getAllPosts, getLatestPosts } from "@/lib/appwrite";
import VideoCard from "@/components/VideoCard";

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
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard post={item} />}
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
            <SearchInput value="" handleChangeText={() => {}} />
            <Text className="text-white mt-16">Trending Videos</Text>
            <TrendingVideos />
          </View>
        )}
        ListEmptyComponent={() => <EmptyState />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <StatusBar barStyle="light-content" />
    </SafeAreaView>
  );
};

export default Home;
