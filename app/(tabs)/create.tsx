import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageSourcePropType,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormInput from "@/components/FormInput";
import CustomButton from "@/components/CustomButton";
import * as DocumentPicker from "expo-document-picker";
import { useGlobalContext } from "@/context/GlobalProvider";
import { createPost } from "@/lib/appwrite";
import { router } from "expo-router";

const uploadIcon = require("../../assets/icons/upload.png");

interface FormDataType {
  title: string;
  prompt: string;
  file: DocumentPicker.DocumentPickerAsset | null;
}

const Create = () => {
  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    file: null,
    prompt: "",
  });

  const { user } = useGlobalContext();

  if (!user) return;

  const openPicker = async () => {
    const res = await DocumentPicker.getDocumentAsync({
      type: ["image/png", "image/jpg", "image/jpeg"],
    });

    if (!res.canceled) {
      setFormData({ ...formData, file: res.assets[0] });
    }
  };

  const onSubmit = async () => {
    if (!formData.title || !formData.prompt || !formData.file) {
      return Alert.alert("Please fill on all the fields");
    }
    try {
      const res = await createPost(formData, user.$id);
      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setFormData({ title: "", prompt: "", file: null });
    }
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
              <TouchableOpacity onPress={openPicker}>
                {formData.file ? (
                  <View className="w-full h-52 rounded-lg">
                    <Image
                      source={{ uri: formData.file.uri }}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  </View>
                ) : (
                  <View className="w-full h-52 bg-black-200 rounded-lg justify-center items-center">
                    <View className="p-2 rounded-md border border-dashed border-secondary-100 justify-center items-center">
                      <Image
                        source={uploadIcon}
                        className="w-5 h-5"
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                )}
              </TouchableOpacity>
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
            handlePress={onSubmit}
            containerClasses="mt-8"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
