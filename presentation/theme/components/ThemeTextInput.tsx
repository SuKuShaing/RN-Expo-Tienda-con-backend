import { useColorScheme } from "@/presentation/theme/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
    StyleProp,
    StyleSheet,
    TextInput,
    TextInputProps,
    View,
    ViewStyle,
} from "react-native";
import { useThemeColor } from "../hooks/use-theme-color";

interface Props extends Omit<TextInputProps, "style"> {
    icon?: keyof typeof Ionicons.glyphMap;
    style?: StyleProp<ViewStyle>;
    // Al usar Omit<TextInputProps, 'style'>, le dices a TypeScript: "Toma todas las propiedades de un input, excepto el estilo". Luego, añades style manualmente pero con el tipo ViewStyle, que es lo que el componente <View> de la línea 38 espera recibir
    // por qué había un error en style, porque extendemos de TextInput y ahí solo admite style de textos, y nosotros colocamos los style en un View, no en un Text, entonces el View necesita styles de View
}

const ThemeTextInput = ({ icon, style, ...rest }: Props) => {
    const primaryColor = useThemeColor({}, "primary");
    const textColor = useThemeColor({}, "text");

    const [isActive, setIsActive] = useState(false);
    const inputRef = useRef<TextInput>(null);

    const theme = useColorScheme() ?? "light";

    return (
        <View
            style={[
                {
                    ...styles.border,
                    // ToDo: cambiar si tiene el foco el input
                    borderColor: isActive ? primaryColor : "#ccc",
                },
                style,
            ]}
            // esta siguiente linea es para que el input tenga el foco cuando se toca el borde el view
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
