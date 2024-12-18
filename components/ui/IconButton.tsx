import React from "react";
import { TouchableOpacity } from "react-native";
import { LucideIcon } from "lucide-react-native";

type IconButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

type IconButtonSize =
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl";

const iconButtonVariants: Record<IconButtonVariant, string> = {
  default: "bg-black",
  destructive: "bg-red-500",
  outline: "bg-transparent border border-black",
  secondary: "bg-gray-200",
  ghost: "bg-transparent",
  link: "bg-transparent",
};

const iconButtonSizes: Record<
  IconButtonSize,
  { container: string; iconSize: number }
> = {
  sm: { container: "p-1", iconSize: 16 },
  md: { container: "p-2", iconSize: 24 },
  lg: { container: "p-3", iconSize: 32 },
  xl: { container: "p-4", iconSize: 40 },
  "2xl": { container: "p-4", iconSize: 48 },
  "3xl": { container: "p-4", iconSize: 56 },
  "4xl": { container: "p-4", iconSize: 64 },
  "5xl": { container: "p-4", iconSize: 72 },
  "6xl": { container: "p-4", iconSize: 96 },
};

interface IconButtonProps {
  icon: LucideIcon;
  onPress?: () => void;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  className?: string;
  disabled?: boolean;
  iconColor?: string;
  iconStrokeWidth?: number;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  onPress,
  variant = "default",
  size = "md",
  className,
  disabled = false,
  iconColor,
  iconStrokeWidth = 1.5,
}) => {
  const buttonContainerClasses = `rounded-full items-center justify-center w-fit h-fit ${
    iconButtonVariants[variant]
  } ${iconButtonSizes[size].container} ${disabled ? "opacity-50" : ""} ${
    className || ""
  }`;

  return (
    <TouchableOpacity
      className={buttonContainerClasses}
      onPress={onPress}
      disabled={disabled}
    >
      <Icon
        size={iconButtonSizes[size].iconSize}
        color={iconColor || (variant === "default" ? "white" : "black")}
        strokeWidth={iconStrokeWidth}
      />
    </TouchableOpacity>
  );
};

export default IconButton;
