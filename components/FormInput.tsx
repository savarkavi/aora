import { View, Text, TextInput } from "react-native";

interface FormInputProps {
  title: string;
  styles?: string;
  value: string;
  handleChangeText: (e: any) => void;
  placeholder?: string;
}

const FormInput = ({
  title,
  styles,
  value,
  handleChangeText,
  placeholder,
}: FormInputProps) => {
  return (
    <View className={`flex flex-col space-y-3 ${styles}`}>
      <Text className="text-white">{title}</Text>
      <View className="bg-black-200 p-3 rounded-lg">
        <TextInput
          className="text-white"
          value={value}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          placeholderTextColor="#CDCDE0"
        />
      </View>
    </View>
  );
};

export default FormInput;
