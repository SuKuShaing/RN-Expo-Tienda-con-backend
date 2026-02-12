import { ThemedView } from "@/presentation/theme/components/themed-view";
import ThemeTextInput from "@/presentation/theme/components/ThemeTextInput";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

const ProductScreen = () => {
    const navigation = useNavigation(); // son las opciones de la cabecera

    useEffect(() => {
        // ToDo: colocar el nombre del producto

        navigation.setOptions({
            headerRight: () => <Ionicons name="camera-outline" size={25} />,
        });
    }, []);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView>
                {/* Todo: Product images */}
                <ThemedView style={{ marginHorizontal: 10, marginTop: 20 }}>
                    <ThemeTextInput
                        placeholder="Título"
                        // style={{ marginVertical: 5 }}
                    />
                    <ThemeTextInput
                        placeholder="Slug"
                        // style={{ marginVertical: 5 }}
                    />
                    <ThemeTextInput
                        placeholder="Descripción"
                        multiline
                        numberOfLines={5}
                        // style={{ marginVertical: 5 }}
                    />
                </ThemedView>

                <ThemedView
                    style={{
                        marginHorizontal: 10,
                        marginVertical: 5,
                        flexDirection: "row",
                        gap: 10,
                    }}
                >
                    <ThemeTextInput placeholder="Precio" style={{ flex: 1 }} />
                    <ThemeTextInput
                        placeholder="Inventario"
                        style={{ flex: 1 }}
                    />
                </ThemedView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default ProductScreen;
