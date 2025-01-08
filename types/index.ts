import { LucideIcon } from "lucide-react-native";
import { RefObject } from "react";

interface GridRef {
  toggleGridType: () => void;
}
export type ModeItemType = {
  name?: string;
  icon?: LucideIcon;
  textAsIcon?: string;
  onPress: (ref?: RefObject<GridRef>) => void;
};
