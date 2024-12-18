// import React, { useState } from "react";
// import { View, Text, TouchableOpacity } from "react-native";
// import {
//   Canvas,
//   Rect,
//   Circle,
//   Line,
//   Group,
//   Path,
// } from "@shopify/react-native-skia";
// import { Skia } from "@shopify/react-native-skia";
// import clsx from "clsx";

// interface GridConfig {
//   verticalLines?: { x: number; color: string }[];
//   horizontalLines?: { y: number; color: string }[];
//   lines?: { x1: number; y1: number; x2: number; y2: number; color: string }[];
// }

// interface SkiaCameraControlsProps {}

// const SkiaCameraControls: React.FC<SkiaCameraControlsProps> = () => {
//   const [exposure, setExposure] = useState<number>(0.0);
//   const [focus, setFocus] = useState<number>(50);
//   const [aperture, setAperture] = useState<number>(5.6);
//   const [iso, setIso] = useState<number>(100);
//   const [gridType, setGridType] = useState<string>("thirds");

//   const renderGrid = (width: number, height: number) => {
//     const gridConfigs: { [key: string]: GridConfig } = {
//       thirds: {
//         verticalLines: [
//           { x: 0.33, color: "rgba(255,255,255,0.5)" },
//           { x: 0.66, color: "rgba(255,255,255,0.5)" },
//         ],
//         horizontalLines: [
//           { y: 0.33, color: "rgba(255,255,255,0.5)" },
//           { y: 0.66, color: "rgba(255,255,255,0.5)" },
//         ],
//       },
//       golden: {
//         verticalLines: [
//           { x: 0.618, color: "rgba(255,255,255,0.7)" },
//           { x: 0.382, color: "rgba(255,255,255,0.7)" },
//         ],
//         horizontalLines: [
//           { y: 0.618, color: "rgba(255,255,255,0.7)" },
//           { y: 0.382, color: "rgba(255,255,255,0.7)" },
//         ],
//       },
//       diagonal: {
//         lines: [
//           { x1: 0, y1: 0, x2: 1, y2: 1, color: "rgba(255,255,255,0.5)" },
//           { x1: 0, y1: 1, x2: 1, y2: 0, color: "rgba(255,255,255,0.5)" },
//         ],
//       },
//     };

//     const currentGrid = gridConfigs[gridType];

//     return (
//       <Group>
//         {currentGrid.verticalLines?.map((line, index) => (
//           <Line
//             key={`v-${index}`}
//             p1={{ x: width * line.x, y: 0 }}
//             p2={{ x: width * line.x, y: height }}
//             color={line.color}
//             strokeWidth={1}
//           />
//         ))}
//         {currentGrid.horizontalLines?.map((line, index) => (
//           <Line
//             key={`h-${index}`}
//             p1={{ x: 0, y: height * line.y }}
//             p2={{ x: width, y: height * line.y }}
//             color={line.color}
//             strokeWidth={1}
//           />
//         ))}
//         {currentGrid.lines?.map((line, index) => (
//           <Line
//             key={`d-${index}`}
//             p1={{ x: width * line.x1, y: height * line.y1 }}
//             p2={{ x: width * line.x2, y: height * line.y2 }}
//             color={line.color}
//             strokeWidth={1}
//           />
//         ))}
//       </Group>
//     );
//   };

//   return (
//     <View className="relative w-full h-[480px]">
//       {/* Canvas Zone */}
//       <Canvas className="w-full h-full relative">
//         {({ width, height }) => (
//           <>
//             {/* Background */}
//             <Path
//               path={Skia.Path.MakeRect(0, 0, width, height)}
//               color="rgb(0, 0, 0)"
//             />
//             <Rect
//               x={width * 0.05}
//               y={height * 0.05}
//               width={width * 0.9}
//               height={height * 0.9}
//               color="rgba(255, 255, 255, 0.1)"
//             />

//             {/* Grid Overlay */}
//             {renderGrid(width, height)}

//             {/* Sliders and Indicators */}
//             <Circle
//               cx={width * 0.2}
//               cy={height * 0.7}
//               r={height * 0.05}
//               color={`rgb(${focus}, ${focus}, ${focus})`}
//             />
//           </>
//         )}
//       </Canvas>

//       {/* Grid Selection */}
//       <View className="absolute top-4 left-4 flex flex-row space-x-2">
//         {["thirds", "golden", "diagonal"].map((type) => (
//           <TouchableOpacity
//             key={type}
//             onPress={() => setGridType(type)}
//             className={clsx(
//               "p-2 rounded text-white",
//               gridType === type ? "bg-blue-500" : "bg-gray-700"
//             )}
//           >
//             {type.charAt(0).toUpperCase() + type.slice(1)} Grid
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// };

// export default SkiaCameraControls;
import React, { useState } from "react";
import { View } from "react-native";
import { Canvas } from "@shopify/react-native-skia";
import clsx from "clsx";

import CameraBackground from "./CameraBackground";
import Visor from "./Visor";
import GridOverlay from "./GridOverlay";
import ExposureSlider from "./ExposureSlider";
import FocusSlider from "./FocusSlider";
import ApertureSlider from "./ApertureSlider";
import IsoSlider from "./IsoSlider";
import GridTypeSelector from "./GridTypeSelector";

const SkiaCameraControls = () => {
  const [exposure, setExposure] = useState(0.0);
  const [focus, setFocus] = useState(50);
  const [aperture, setAperture] = useState(5.6);
  const [iso, setIso] = useState(100);
  const [gridType, setGridType] = useState("thirds");

  const handleExposureChange = (value: number) => {
    setExposure(value);
  };

  const handleFocusChange = (value: number) => {
    setFocus(value);
  };

  const handleApertureChange = (value: number) => {
    setAperture(value);
  };

  const handleIsoChange = (value: number) => {
    setIso(value);
  };

  return (
    <View className="relative w-full h-[480px]">
      <Canvas
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        <CameraBackground />
        <Visor />
        <GridOverlay gridType={gridType} />
        <ExposureSlider
          exposure={exposure}
          onExposureChange={handleExposureChange}
        />
        <FocusSlider focus={focus} onFocusChange={handleFocusChange} />
        <ApertureSlider
          aperture={aperture}
          onApertureChange={handleApertureChange}
        />
        <IsoSlider iso={iso} onIsoChange={handleIsoChange} />
      </Canvas>

      <GridTypeSelector gridType={gridType} onGridTypeChange={setGridType} />
    </View>
  );
};

export default SkiaCameraControls;
