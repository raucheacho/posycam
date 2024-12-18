import { View, Text, Switch } from "react-native";
import React from "react";
import { LucideIcon } from "lucide-react-native";
import { CameraPermissionStatus } from "react-native-vision-camera";

interface PermissionItemProps {
  icon: LucideIcon;
  label: string;
  value: boolean | CameraPermissionStatus | undefined;
  onToggle: () => Promise<void> | void;
}

const PermissionItem: React.FC<PermissionItemProps> = ({
  icon: Icon,
  label,
  value,
  onToggle,
}) => (
  <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-200">
    <View className="flex-row items-center space-x-4">
      <Icon size={24} strokeWidth={1.5} className="text-gray-600" />
      <Text className="text-lg text-gray-800">{label}</Text>
    </View>
    <Switch
      value={label === "Media Library" ? !!value : value === "granted"}
      onValueChange={onToggle}
      trackColor={{ false: "#767577", true: "#81b0ff" }}
      thumbColor={
        (label === "Media Library" ? !!value : value === "granted")
          ? "#f5dd4b"
          : "#f4f3f4"
      }
    />
  </View>
);

export default PermissionItem;
