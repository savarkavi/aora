import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import useAppwrite from "@/lib/useAppwrite";
import { getUserPosts, searchPosts, signOut } from "@/lib/appwrite";
import SearchInput from "@/components/SearchInput";
import PhotoCard from "@/components/PhotoCard";
import EmptyState from "@/components/EmptyState";
import { useGlobalContext } from "@/context/GlobalProvider";

const logoutIcon = require("../../assets/icons/logout.png");

const Profile = () => {
  const { user, setUser } = useGlobalContext();

  if (!user) return;

  const {
    data: posts,
    isLoading,
    refetch,
  } = useAppwrite(() => getUserPosts(user.$id));

  const onLogout = async () => {
    await signOut();

    setUser(null);

    router.replace("/sign-in");
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
            <View className="p-4 mt-4 items-center gap-8">
              <TouchableOpacity className="self-end" onPress={() => onLogout()}>
                <Image
                  source={logoutIcon}
                  className="w-6 h-6"
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <View className="items-center space-y-4">
                <View>
                  <Image
                    source={{ uri: user.avatar }}
                    className="w-20 h-20 rounded-lg"
                    resizeMode="contain"
                  />
                </View>
                <View className="items-center space-y-4">
                  <Text className="text-white text-xl font-semibold">
                    {user.username}
                  </Text>
                  <View className="flex-row items-center space-x-10">
                    <View className="items-center">
                      <Text className="text-white text-lg font-semibold">
                        {posts.length}
                      </Text>
                      <Text className="text-gray-100">Posts</Text>
                    </View>
                    <View className="items-center">
                      <Text className="text-white text-lg font-semibold">
                        1.2k
                      </Text>
                      <Text className="text-gray-100">Followers</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}
          ListEmptyComponent={() => <EmptyState />}
        />
      )}
    </SafeAreaView>
  );
};

export default Profile;
