import React, { useState, forwardRef, useImperativeHandle } from "react";

import { Line, Group, Canvas } from "@shopify/react-native-skia";

interface GridConfig {
  verticalLines?: { x: number; color: string }[];
  horizontalLines?: { y: number; color: string }[];
  lines?: { x1: number; y1: number; x2: number; y2: number; color: string }[];
}

export const RenderGrid = forwardRef(
  ({ width, height }: { width: number; height: number }, ref) => {
    const [gridType, setGridType] = useState<
      "thirds" | "golden" | "diagonal" | "off"
    >("golden");

    const toggleGridType = () => {
      setGridType((prevGridType) => {
        switch (prevGridType) {
          case "thirds":
            return "golden";
          case "golden":
            return "diagonal";
          case "diagonal":
            return "thirds";
          default:
            return "off"; // Default case if something goes wrong
        }
      });
    };

    // Expose toggleGridType to the parent
    useImperativeHandle(ref, () => ({
      toggleGridType,
    }));

    const gridConfigs: { [key: string]: GridConfig } = {
      thirds: {
        verticalLines: [
          { x: 0.33, color: "rgba(255,255,255,0.5)" },
          { x: 0.66, color: "rgba(255,255,255,0.5)" },
        ],
        horizontalLines: [
          { y: 0.33, color: "rgba(255,255,255,0.5)" },
          { y: 0.66, color: "rgba(255,255,255,0.5)" },
        ],
      },
      golden: {
        verticalLines: [
          { x: 0.618, color: "rgba(255,255,255,0.7)" },
          { x: 0.382, color: "rgba(255,255,255,0.7)" },
        ],
        horizontalLines: [
          { y: 0.618, color: "rgba(255,255,255,0.7)" },
          { y: 0.382, color: "rgba(255,255,255,0.7)" },
        ],
      },
      diagonal: {
        lines: [
          { x1: 0, y1: 0, x2: 1, y2: 1, color: "rgba(255,255,255,0.5)" },
          { x1: 0, y1: 1, x2: 1, y2: 0, color: "rgba(255,255,255,0.5)" },
        ],
      },
    };

    const currentGrid = gridConfigs[gridType];

    return (
      <Canvas
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: 20,
          pointerEvents: "none",
        }}
      >
        <Group>
          {currentGrid.verticalLines?.map((line, index) => (
            <Line
              key={`v-${index}`}
              p1={{ x: width * line.x, y: 0 }}
              p2={{ x: width * line.x, y: height }}
              color={line.color}
              strokeWidth={1}
            />
          ))}
          {currentGrid.horizontalLines?.map((line, index) => (
            <Line
              key={`h-${index}`}
              p1={{ x: 0, y: height * line.y }}
              p2={{ x: width, y: height * line.y }}
              color={line.color}
              strokeWidth={1}
            />
          ))}
          {currentGrid.lines?.map((line, index) => (
            <Line
              key={`d-${index}`}
              p1={{ x: width * line.x1, y: height * line.y1 }}
              p2={{ x: width * line.x2, y: height * line.y2 }}
              color={line.color}
              strokeWidth={1}
            />
          ))}
        </Group>
      </Canvas>
    );
  }
);
