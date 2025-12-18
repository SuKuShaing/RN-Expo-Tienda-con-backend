import { useColorScheme } from "@/presentation/theme/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { useThemeColor } from "../hooks/use-theme-color";

interface Props extends TextInputProps {
    icon?: keyof typeof Ionicons.glyphMap;
}

const ThemeTextInput = ({ icon, ...rest }: Props) => {
    const primaryColor = useThemeColor({}, "primary");
    const textColor = useThemeColor({}, "text");

    const [isActive, setIsActive] = useState(false);
    const inputRef = useRef<TextInput>(null);

    const theme = useColorScheme() ?? "light";

    return (
        <View
            style={{
                ...styles.border,
                // ToDo: cambiar si tiene el foco el input
                borderColor: isActive ? primaryColor : "#ccc",
            }}
            onTouchStart={() => inputRef.current?.focus()}
        >
            {icon && (
                <Ionicons
                    name={icon}
                    size={24}
                    color={textColor}
                    style={{ marginRight: 10 }}
                />
            )}
            <TextInput
                ref={inputRef}
                placeholderTextColor={theme === "light" ? "#5C5C5C" : "gray"}
                onFocus={() => setIsActive(true)}
                onBlur={() => setIsActive(false)}
                // onBlur es lo contrario a onFocus, es cuando pierde el foco
                style={{
                    color: textColor,
                    marginRight: 10,
                    flex: 1,
                }}
                {...rest}
            />
        </View>
    );
};

export default ThemeTextInput;

const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
    },
});
