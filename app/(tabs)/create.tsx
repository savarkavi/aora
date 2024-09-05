import { View, Text, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormInput from "@/components/FormInput";
import CustomButton from "@/components/CustomButton";
import * as DocumentPicker from "expo-document-picker";

const uploadIcon = require("../../assets/icons/upload.png");

const Create = () => {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    prompt: "",
  });

  const openPicker = async () => {
    const res = await DocumentPicker.getDocumentAsync({
      type: ["image/png", "image/jpg", "image/jpeg"],
    });
  };

  return (
    <SafeAreaView className="bg-primary h-full p-4">
      <ScrollView>
        <View>
          <Text className="text-xl text-white font-semibold mt-4">
            Upload a Photo
          </Text>
          <View className="mt-8 space-y-6">
            <FormInput
              title="Photo title"
              value={formData.title}
              handleChangeText={() => {}}
              placeholder="Give your photo a title"
            />
            <View className="space-y-4">
              <Text className="text-white">Upload photo</Text>
              <View className="w-full h-40 bg-black-200 rounded-lg justify-center items-center">
                <View className="p-2 rounded-md border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={uploadIcon}
                    className="w-5 h-5"
                    resizeMode="contain"
                  />
                </View>
              </View>
            </View>
            <FormInput
              title="Photo prompt"
              value={formData.prompt}
              handleChangeText={() => {}}
              placeholder="What prompt did you use to generate the image?"
              styles="mt-6"
            />
          </View>
          <CustomButton
            text="Publish"
            handlePress={() => {}}
            containerClasses="mt-8"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
