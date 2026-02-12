import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useThemeColor } from "../hooks/use-theme-color";

interface Props {
    options: string[];
    selectedOption: string[];

    onSelect: (option: string) => void;
}

const ThemedButtonGroup = ({ options, selectedOption, onSelect }: Props) => {
    const primaryColor = useThemeColor({}, "primary");

    return (
        <View style={style.container}>
            {options.map((option) => (
                <TouchableOpacity
                    key={option}
                    onPress={() => onSelect(option)}
                    style={[
                        style.button,
                        selectedOption.includes(option) && {
                            backgroundColor: primaryColor,
                        },
                    ]}
                >
                    <Text
                        adjustsFontSizeToFit
                        numberOfLines={1}
                        style={[
                            style.buttonText,
                            selectedOption.includes(option) &&
                                style.selectedButtonText,
                        ]}
                    >
                        {option}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default ThemedButtonGroup;

const style = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    button: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    buttonText: {
        fontSize: 16,
    },
    selectedButtonText: {
        color: "#fff",
    },
});
