import { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ButtonOutlineProps {
  title: string;
  action?: () => void;
  children?: ReactNode;
}

const ButtonOutline: React.FC<ButtonOutlineProps> = ({
  title,
  action,
  children,
}) => {
  return (
    <TouchableOpacity
      className="rounded-lg justify-center items-center py-3 border-2 border-neutral-400 flex-row gap-2"
      onPress={action}>
      {children && <View>{children}</View>}
      <Text className="text-neutral-400 font-bold text-lg">{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonOutline;
