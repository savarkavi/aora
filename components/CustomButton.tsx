import { View, Text, TouchableOpacity } from "react-native";

interface CustomButtonProps {
  containerClasses?: string;
  text: string;
  handlePress: () => void;
}

const CustomButton = ({
  containerClasses,
  text,
  handlePress,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      className={`bg-secondary p-3 rounded-lg items-center ${containerClasses}`}
      activeOpacity={0.5}
      onPress={handlePress}
    >
      <Text className={``}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
