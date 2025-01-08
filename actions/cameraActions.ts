import { router } from "expo-router";
import { RefObject } from "react";

type FlashMode = "off" | "on" | "auto";

interface PhotoOptions {
  flash: FlashMode;
  enableShutterSound: boolean;
}

interface PhotoResult {
  path: string;
}

interface CameraRef {
  takePhoto: (options: PhotoOptions) => Promise<PhotoResult>;
}

export const takePicture = async (
  cameraRef: RefObject<CameraRef>,
  flash: FlashMode
) => {
  try {
    if (cameraRef.current == null) {
      throw new Error("Un probleme est survenue");
    }

    const photo = await cameraRef.current.takePhoto({
      flash,
      enableShutterSound: true,
    });

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
