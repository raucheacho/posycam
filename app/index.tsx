import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  Linking,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";
import { Redirect, router } from "expo-router";
import Button from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";
import {
  Circle,
  CogIcon,
  Flashlight,
  Grid2X2,
  ImageIcon,
  SwitchCameraIcon,
  ZapIcon,
  ZapOffIcon,
} from "lucide-react-native";
import { RenderGrid } from "@/components/overlays/RenderGrid";
// import SkiaCameraControls from "@/components/Controls";

const AppScreen = () => {
  const { hasPermission } = useCameraPermission();
  const [microphonePermission, setMicrophonePermission] = useState<
    string | null
  >(null);

  const [cameraType, setCameraType] = useState<"back" | "front">("back");
  const camera = useCameraDevice(cameraType);
  const [zoom, setZoom] = useState(camera?.neutralZoom);
  const [flash, setFlash] = useState<"off" | "on" | "auto">("auto");
  const [torch, setTorch] = useState<"off" | "on">("off");
  const [exposure, setExposure] = useState(0);
  const [focus, setFocus] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const cameraRef = useRef<Camera>(null);
  const gridRef = useRef<any>(null);

  const handleToggleGrid = () => {
    console.log("eeee");
    if (gridRef.current) {
      gridRef.current.toggleGridType();
      // Call the toggle function
    }
  };
  const toggleFlash = () => {
    setFlash((prevFlash) => {
      switch (prevFlash) {
        case "on":
          return "off";
        case "off":
          return "auto";
        case "auto":
          return "on";
        default:
          return "off"; // Default case if something goes wrong
      }
    });
  };

  const takePicture = async () => {
    try {
      if (cameraRef.current == null)
        throw new Error("Un probleme est survenue");
      const photo = await cameraRef.current.takePhoto({
        flash: flash,
        enableShutterSound: true,
      });
      // const video = await cameraRef.current.startRecording({
      //   onRecordingFinished: (video) => console.log(video),
      //   onRecordingError: (error) => console.error(error),
      // });
      router.push({
        pathname: "/edition",
        params: {
          media: photo.path,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkMicrophonePermission = async () => {
      const status = await Camera.getMicrophonePermissionStatus();
      setMicrophonePermission(status);
    };

    checkMicrophonePermission();
  }, []);

  // Redirect conditions
  const redirectToPermissions =
    !hasPermission || microphonePermission === "not-determined";

  // No camera device available
  if (!camera) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">No camera device found</Text>
      </View>
    );
  }

  // Redirect to permissions if needed
  if (redirectToPermissions) {
    return <Redirect href={"/permissions"} />;
  }

  const handleLayout = (event: any) => {
    const { width, height } = event.nativeEvent.layout;
    setDimensions({ width, height });
  };

  return (
    <SafeAreaView
      style={Platform.OS === "android" ? { marginTop: 40 } : { marginTop: 0 }}
      className="flex-1 bg-white"
    >
      <View className="flex-1 p-2">
        <View
          className="flex-1 relative rounded-xl overflow-hidden"
          onLayout={handleLayout}
        >
          {dimensions.width > 0 && dimensions.height > 0 && (
            <RenderGrid
              width={dimensions.width}
              height={dimensions.height}
              ref={gridRef}
            />
          )}
          <Camera
            ref={cameraRef}
            device={camera}
            isActive={true}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
            torch={torch}
            exposure={exposure}
            photo
            //video
          />
          <View className="flex-row justify-between p-5 items-center">
            <View className="flex-row gap-5 bg-black p-2 rounded-full z-40 opacity-60">
              <View className="relative">
                {flash === "auto" && (
                  <View className="absolute z-40 transform translate-x-6 -mt-1 border border-black bg-gray-200 w-4 h-4 rounded-full justify-center items-center">
                    <Text className="text-black text-[8px]">A</Text>
                  </View>
                )}
                <IconButton
                  className="w-8 h-8"
                  size="sm"
                  variant={`${
                    flash === "on" || flash === "auto" ? "secondary" : "default"
                  }`}
                  icon={flash === "off" ? ZapOffIcon : ZapIcon}
                  iconColor={`${
                    flash === "on" || flash === "auto" ? "black" : "white"
                  }`}
                  onPress={() => toggleFlash()}
                />
              </View>
              <IconButton
                className="w-8 h-8 transform rotate-45"
                size="sm"
                variant={`${torch === "on" ? "secondary" : "default"}`}
                icon={Flashlight}
                iconColor={`${torch === "on" ? "black" : "white"}`}
                onPress={() =>
                  setTorch((torch) => (torch === "on" ? "off" : "on"))
                }
              />
              <View className=" w-10 h-8 rounded-full justify-center items-center">
                <Text className="text-[10px] font-bold text-white">
                  {camera.formats[0].maxFps}fps
                </Text>
              </View>
            </View>
            <IconButton
              className="w-10 h-10 transform rotate-45"
              size="md"
              variant={"default"}
              icon={CogIcon}
              iconColor={"white"}
              onPress={() => {}}
            />
          </View>
        </View>
      </View>
      <View className="p-4 justify-between">
        <View>
          <IconButton
            className="w-10 h-10"
            size="md"
            variant={"default"}
            icon={Grid2X2}
            iconColor={"white"}
            onPress={handleToggleGrid}
          />
          {/* <Text>
            Width: {camera.formats[0].photoWidth} / height:{" "}
            {camera.formats[0].photoHeight}
          </Text>
          <Text>Camera: {camera.name}</Text> */}
        </View>
        <View className="flex-row p-4 w-full mx-auto justify-between items-center">
          <IconButton
            className="w-14 h-14 rounded-xl"
            size="md"
            variant="secondary"
            icon={ImageIcon}
            onPress={() => {
              const link = Platform.select({
                ios: "photos-redirect://",
                android: "content://media/external/images/media",
              });
              Linking.openURL(link as string);
            }}
          />

          <IconButton
            className="w-20 h-20"
            size="4xl"
            variant="default"
            icon={Circle}
            iconColor="white"
            onPress={takePicture}
          />

          <IconButton
            className="w-12 h-12"
            size="md"
            variant="secondary"
            icon={SwitchCameraIcon}
            onPress={() =>
              setCameraType((type) => (type === "back" ? "front" : "back"))
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AppScreen;
