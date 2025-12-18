import { useColorScheme } from "@/presentation/theme/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";
import { useThemeColor } from "../hooks/use-theme-color";

interface Props extends PressableProps {
    children: string;
    icon?: keyof typeof Ionicons.glyphMap;
    iconOrientation?: "left" | "right";
}

const ThemedButton = ({
    children,
    icon,
    iconOrientation = "left",
    ...rest
}: Props) => {
    const primaryColor = useThemeColor({}, "primary");
    const colorBackground = useThemeColor({}, "background");

    const theme = useColorScheme() ?? "light";

    const colorDeFondo = theme == "light" ? colorBackground : "white";

    return (
        <Pressable
            style={({ pressed }) => [
                {
                    backgroundColor: pressed
                        ? primaryColor + "90"
                        : primaryColor,
                },
                styles.button,
            ]}
        >
            {icon && iconOrientation == "left" && (
                <Ionicons
                    name={icon}
                    size={24}
                    color={colorDeFondo}
                    style={{
                        marginHorizontal: 5,
                    }}
                />
            )}
            <Text
                style={{
                    color: colorDeFondo,
                    // fontWeight: "bold",
                }}
            >
                {children}
            </Text>
            {icon && iconOrientation == "right" && (
                <Ionicons
                    name={icon}
                    size={24}
                    color={colorDeFondo}
                    style={{
                        marginHorizontal: 5,
                    }}
                />
            )}
        </Pressable>
    );
};

export default ThemedButton;

const styles = StyleSheet.create({
    button: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
    },
});
