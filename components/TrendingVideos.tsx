import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import useAppwrite from "@/lib/useAppwrite";
import { getLatestPosts } from "@/lib/appwrite";
import TrendingVideoCard from "./TrendingVideoCard";
import { Models } from "react-native-appwrite";

const TrendingVideos = () => {
  const { data: posts, isLoading, refetch } = useAppwrite(getLatestPosts);
  const [activeItem, setActiveItem] = useState<any>(null);

  useEffect(() => {
    if (posts && posts.length > 0) {
      setActiveItem(posts[1]);
    }
  }, [posts]);

  if (!activeItem) return null;

  const viewableItemsChanged = ({ viewableItems }: { viewableItems: any }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingVideoCard post={item} activeItem={activeItem} />
      )}
      horizontal
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 170, y: 0 }}
      className="mt-4"
    />
  );
};

export default TrendingVideos;
