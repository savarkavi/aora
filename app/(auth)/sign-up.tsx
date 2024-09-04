import { View, Text, ScrollView, Image, Alert, StatusBar } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormInput from "@/components/FormInput";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const logo = require("../../assets/images/logo.png");

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const { setIsLoggedIn, setUser } = useGlobalContext();

  const onSumbit = async () => {
    if (!formData.email || !formData.password || !formData.username) {
      Alert.alert("Error", "Please fill in all the fields");
    }

    setSubmitting(true);

    try {
      const res = await createUser({
        email: formData.email,
        password: formData.password,
        username: formData.username,
      });

      setUser(res);
      setIsLoggedIn(true);

      router.replace("/home");
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="px-8 h-[85vh] justify-center">
          <Image
            source={logo}
            className="w-[115px] h-[80px]"
            resizeMode="contain"
          />
          <Text className="text-white text-xl mt-6">Sign Up to Aora</Text>
          <View className="mt-8">
            <FormInput
              title="Username"
              value={formData.username}
              handleChangeText={(e: any) =>
                setFormData({ ...formData, username: e })
              }
            />
            <FormInput
              title="Email"
              styles="mt-4"
              value={formData.email}
              handleChangeText={(e: any) =>
                setFormData({ ...formData, email: e })
              }
            />
            <FormInput
              title="Password"
              styles="mt-4"
              value={formData.password}
              handleChangeText={(e: any) =>
                setFormData({ ...formData, password: e })
              }
            />
          </View>
          <CustomButton
            handlePress={onSumbit}
            text="Sign Up"
            containerClasses="mt-8"
            isLoading={submitting}
          />
          <View className="flex-row justify-center gap-2 items-center mt-8">
            <Text className="text-white">Already have an account?</Text>
            <Link href="/sign-in" className="text-secondary-100">
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
      <StatusBar barStyle="light-content" />
    </SafeAreaView>
  );
};

export default SignUp;
