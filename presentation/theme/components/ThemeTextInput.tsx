import { Ionicons } from "@expo/vector-icons";
import { Text, TextInputProps, View } from "react-native";

interface Props extends TextInputProps {
    icon?: keyof typeof Ionicons.glyphMap;
}

const ThemeTextInput = ({ icon, ...rest }: Props) => {
    return (
        <View>
            <Text>ThemeTextInput</Text>
        </View>
    );
};

export default ThemeTextInput;
