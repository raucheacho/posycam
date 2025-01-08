import React from "react";
import IconButton from "../ui/IconButton";
import { ModeItemType } from "@/types";
import { LucideIcon } from "lucide-react-native";

const ModeItem = ({ icon, onPress, textAsIcon }: ModeItemType) => {
  return (
    <>
      <IconButton
        className="w-14 h-14"
        size="md"
        variant={"secondary"}
        icon={icon as LucideIcon}
        textAsIcon={textAsIcon as string}
        iconColor={"white"}
        onPress={onPress}
      />
    </>
  );
};

export default ModeItem;
