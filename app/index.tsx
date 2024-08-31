import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";

const logo = require("../assets/images/logo.png");
const cards = require("../assets/images/cards.png");

export default function App() {
  const { isLoggedIn, isLoading } = useGlobalContext();

  if (!isLoading && isLoggedIn) {
    return <Redirect href="/home" />;
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="justify-center items-center px-6 h-[85vh]">
          <Image
            source={logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={cards}
            className="w-[380x] h-[300px]"
            resizeMode="contain"
          />
          <View className="mt-5">
            <Text className="text-white text-3xl text-center">
              Discover Endless Possibilites with{" "}
              <Text className="text-secondary-200 font-bold">Aora</Text>
            </Text>
            <Text className="text-white text-center mt-4">
              Where creativity meets innovation: embark on a journey of
              limitless exploration with Aora
            </Text>
          </View>
          <CustomButton
            text="Continue with Email"
            containerClasses="w-full mt-8"
            handlePress={() => router.push("/sign-in")}
          />
        </View>
      </ScrollView>
      <StatusBar barStyle="light-content" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
