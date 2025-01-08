import React from "react";
import { View } from "react-native";
import ModeItem from "./ModeItem";
import { ModeItemType } from "@/types";

const Modes = ({ modes }: { modes: ModeItemType[] }) => {
  return (
    <View className="flex flex-row gap-3 w-full justify-center">
      {modes.map((mode: ModeItemType, index: number) => (
        <ModeItem
          textAsIcon={mode.textAsIcon}
          key={index}
          onPress={mode.onPress}
          icon={mode.icon}
        />
      ))}
    </View>
  );
};

export default Modes;
