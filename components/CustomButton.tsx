import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

interface CustomButtonProps {
  containerClasses?: string;
  text: string;
  handlePress: () => void;
  isLoading?: boolean;
}

const CustomButton = ({
  containerClasses,
  text,
  handlePress,
  isLoading,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      className={`bg-secondary p-3 rounded-lg items-center ${containerClasses}`}
      activeOpacity={0.5}
      onPress={handlePress}
    >
      {isLoading ? (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      ) : (
        <Text className={`font-bold`}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
