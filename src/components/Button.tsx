import { ReactNode } from "react";
import { Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  title: string | ReactNode;
  action?: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, action }) => {
  return (
    <TouchableOpacity
      className="bg-[#2ab07c] rounded-lg justify-center items-center py-3"
      onPress={action}>
      <Text className="text-white font-bold text-lg">{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
