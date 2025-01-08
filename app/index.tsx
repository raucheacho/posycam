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
  ProportionsIcon,
  ZapIcon,
  ZapOffIcon,
  CircleFadingPlusIcon,
  ClockIcon,
} from "lucide-react-native";
import { RenderGrid } from "@/components/overlays/RenderGrid";
import Modes from "@/components/modes/Modes";
import { toggleAspect, toggleFlash, toggleGrid } from "@/actions/modeActions";
import ModeItem from "@/components/modes/ModeItem";
import { ModeItemType } from "@/types";
import { takePicture } from "@/actions/cameraActions";

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

  const modes: ModeItemType[] = [
    {
      name: "flash",
      icon: flash === "off" ? ZapOffIcon : ZapIcon,
      onPress: () => toggleFlash(setFlash),
    },
    {
      name: "aspect",
      textAsIcon: "16:9",
      onPress: () => toggleAspect(),
    },
    {
      name: "zoom",
      textAsIcon: "zoom",
      onPress: () => {},
    },
    {
      name: "zoom",
      icon: CircleFadingPlusIcon,
      onPress: () => {},
    },
    {
      name: "Grid",
      icon: Grid2X2,
      onPress: () => toggleGrid(gridRef),
    },
    {
      name: "Minuteur",
      icon: ClockIcon,
      onPress: () => {},
    },
  ];

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
      className="flex-1 bg-black"
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
            <View className="flex-row items-center gap-5">
              <View className="flex-row gap-2 px-2 bg-secondary  rounded-full z-40 opacity-40 items-center">
                {/* <IconButton
                  className="w-8 h-8 transform rotate-45"
                  size="sm"
                  variant={`${torch === "on" ? "secondary" : "default"}`}
                  icon={Flashlight}
                  iconColor={`${torch === "on" ? "black" : "white"}`}
                  onPress={() =>
                    setTorch((torch) => (torch === "on" ? "off" : "on"))
                  }
                /> */}
                <View
                  className={`w-6 h-6 rounded-full justify-center items-center`}
                >
                  <Text
                    className={`text-[16px] font-bold ${
                      flash === "auto" ? "text-white" : "text-black"
                    }`}
                  >
                    A
                  </Text>
                </View>
                <View className="w-14 h-8 rounded-full justify-center items-center">
                  <Text className="text-[10px] font-bold text-white">
                    00:00:00
                  </Text>
                </View>
                <View className=" w-10 h-8 rounded-full justify-center items-center">
                  <Text className="text-[10px] font-bold text-white">
                    HD {camera.formats[0].maxFps}
                  </Text>
                </View>
              </View>
            </View>
            <IconButton
              className="w-10 h-10 transform rotate-45"
              size="md"
              variant={"secondary"}
              icon={CogIcon}
              iconColor={"white"}
              onPress={() => {}}
            />
          </View>
        </View>
      </View>
      <View className="p-4 justify-between">
        <Modes modes={modes} />
        <View className="flex-row p-4 w-full mx-auto justify-between items-center">
          <IconButton
            className="w-16 h-16 rounded-full"
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
          {/*creer un un boutton person photo et vidéo*/}
          <IconButton
            className="w-20 h-20"
            size="6xl"
            variant="default"
            icon={Circle}
            iconColor="#303030"
            onPress={() => takePicture(cameraRef, flash)}
          />
          <IconButton
            className="w-12 h-12"
            size="md"
            iconColor="white"
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
