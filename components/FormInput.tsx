import { View, Text, TextInput } from "react-native";

interface FormInputProps {
  title: string;
  styles?: string;
  value: string;
  handleChangeText: (e: any) => void;
}

const FormInput = ({
  title,
  styles,
  value,
  handleChangeText,
}: FormInputProps) => {
  return (
    <View className={`flex flex-col gap-3 ${styles}`}>
      <Text className="text-white">{title}</Text>
      <View className="bg-black-200 p-3 rounded-lg">
        <TextInput
          className="text-white"
          value={value}
          onChangeText={handleChangeText}
        />
      </View>
    </View>
  );
};

export default FormInput;
