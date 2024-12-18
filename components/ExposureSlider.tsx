import React from "react";
import { Rect, Text } from "@shopify/react-native-skia";

interface ExposureSliderProps {
  exposure: number;
  onExposureChange: (value: number) => void;
}

const ExposureSlider: React.FC<ExposureSliderProps> = ({
  exposure,
  onExposureChange,
}) => {
  const width = 250;
  const height = 20;
  return (
    <>
      <Rect
        x={0.1 * width}
        y={0.8 * height}
        width={0.8 * width}
        height={0.1 * height}
        color="rgb(128, 128, 128)"
      />
      <Rect
        x={0.1 * width + 0.8 * width * exposure}
        y={0.8 * height}
        width={0.1 * width}
        height={0.1 * height}
        color="rgb(255, 215, 0)"
      />
      <Text
        x={0.05 * width}
        y={0.9 * height}
        text={`Exposure: ${exposure.toFixed(2)}`}
        color="rgb(255, 255, 255)"
        font={null}
      />
    </>
  );
};

export default ExposureSlider;
