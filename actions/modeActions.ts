import { RefObject, useRef, Dispatch, SetStateAction } from "react";

interface GridRef {
  toggleGridType: () => void;
}

type FlashMode = "off" | "on" | "auto";

export const toggleFlash = (setFlash: Dispatch<SetStateAction<FlashMode>>) => {
  setFlash((prevFlash: FlashMode) => {
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

export const toggleAspect = () => {};

export const toggleGrid = (ref: RefObject<GridRef>) => {
  console.log("grid");
  if (ref?.current) {
    ref.current.toggleGridType();
    // Call the toggle function
  }
};
