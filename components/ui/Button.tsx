import React, { ReactNode } from "react";
import { TouchableOpacity, Text, View } from "react-native";

type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

const buttonVariants: Record<
  ButtonVariant,
  { container: string; text: string }
> = {
  default: { container: "bg-blue-500", text: "text-white" },
  destructive: { container: "bg-red-500", text: "text-white" },
  outline: {
    container: "bg-transparent border border-blue-500",
    text: "text-blue-500",
  },
  secondary: { container: "bg-gray-200", text: "text-black" },
  ghost: { container: "bg-transparent", text: "text-blue-500" },
  link: { container: "bg-transparent", text: "text-blue-500 underline" },
};

const buttonSizes: Record<ButtonSize, { container: string; text: string }> = {
  default: { container: "px-4 py-2", text: "text-base" },
  sm: { container: "px-3 py-1", text: "text-sm" },
  lg: { container: "px-6 py-3", text: "text-lg" },
  icon: { container: "p-2", text: "text-base" },
};

interface ButtonProps {
  onPress?: () => void;
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  textClassName?: string;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = "default",
  size = "default",
  className,
  textClassName,
  disabled = false,
  leftIcon,
  rightIcon,
  ...rest
}) => {
  const buttonContainerClasses = `rounded-md flex-row items-center justify-center ${
    buttonVariants[variant].container
  } ${buttonSizes[size].container} ${disabled ? "opacity-50" : ""} ${
    className || ""
  }`;
  const buttonTextClasses = `font-medium ${buttonVariants[variant].text} ${
    buttonSizes[size].text
  } ${textClassName || ""}`;

  return (
    <TouchableOpacity
      className={buttonContainerClasses}
      onPress={onPress}
      disabled={disabled}
      {...rest}
    >
      {leftIcon && <View className="mr-2">{leftIcon}</View>}
      <Text className={buttonTextClasses}>{title}</Text>
      {rightIcon && <View className="ml-2">{rightIcon}</View>}
    </TouchableOpacity>
  );
};

export default Button;
