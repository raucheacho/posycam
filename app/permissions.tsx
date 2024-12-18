import { View, Text, TouchableOpacity, Switch, Alert } from "react-native";
import React, { useState } from "react";
import { Camera, CameraPermissionStatus } from "react-native-vision-camera";
import { usePermissions } from "expo-media-library";
import { Stack, useRouter } from "expo-router";
import { CameraIcon, GalleryVerticalIcon, MicIcon } from "lucide-react-native";
import PermissionItem from "@/components/PermissionItem";

const Permissions: React.FC = () => {
  const router = useRouter();
  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState<CameraPermissionStatus>("not-determined");
  const [microphonePermissionStatus, setMicrophonePermissionStatus] =
    useState<CameraPermissionStatus>("not-determined");
  const [mediaLibraryPermissions, requestMediaLibraryPermissions] =
    usePermissions();

  const getCameraPermission = async () => {
    try {
      const status = await Camera.requestCameraPermission();
      setCameraPermissionStatus(status);
    } catch (error) {
      Alert.alert("Error", "Failed to get camera permission");
    }
  };

  const getMicrophonePermission = async () => {
    try {
      const status = await Camera.requestMicrophonePermission();
      setMicrophonePermissionStatus(status);
    } catch (error) {
      Alert.alert("Error", "Failed to get microphone permission");
    }
  };

  const getMediaLibraryPermission = async () => {
    try {
      const result = await requestMediaLibraryPermissions();
      if (result.granted) {
        Alert.alert("Success", "Media library permission granted");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to get media library permission");
    }
  };

  const handleContinue = () => {
    if (
      cameraPermissionStatus === "granted" &&
      microphonePermissionStatus === "granted" &&
      mediaLibraryPermissions?.granted
    ) {
      router.push("/");
    } else {
      Alert.alert(
        "Permissions Required",
        "Please grant all permissions to continue"
      );
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerTitle: "Permissions" }} />
      <View className="flex-1 bg-white">
        <View className="px-6 py-8">
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            Permissions
          </Text>
          <Text className="text-gray-600 mb-6">
            Control access to your device features
          </Text>
        </View>

        <View className="bg-white rounded-lg mx-4">
          <PermissionItem
            icon={CameraIcon}
            label="Camera Access"
            value={cameraPermissionStatus}
            onToggle={getCameraPermission}
          />
          <PermissionItem
            icon={MicIcon}
            label="Microphone"
            value={microphonePermissionStatus}
            onToggle={getMicrophonePermission}
          />
          <PermissionItem
            icon={GalleryVerticalIcon}
            label="Media Library"
            value={mediaLibraryPermissions?.granted}
            onToggle={getMediaLibraryPermission}
          />
        </View>

        <TouchableOpacity
          className="bg-blue-500 rounded-lg p-4 m-4 items-center"
          onPress={handleContinue}
        >
          <Text className="text-white font-bold">Continue</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Permissions;
