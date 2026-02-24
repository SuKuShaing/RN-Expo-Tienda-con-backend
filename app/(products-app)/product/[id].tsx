import ProductImages from "@/presentation/products/components/ProductImages";
import { useProduct } from "@/presentation/products/hooks/useProduct";
import { ThemedView } from "@/presentation/theme/components/themed-view";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemedButtonGroup from "@/presentation/theme/components/ThemedButtonGroup";
import ThemeTextInput from "@/presentation/theme/components/ThemeTextInput";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    View,
} from "react-native";

const ProductScreen = () => {
    const { id } = useLocalSearchParams();
    const navigation = useNavigation(); // son las opciones de la cabecera

    const { productQuery } = useProduct(`${id}`);

    // Coloca el icono de la cámara en la esquina
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <Ionicons name="camera-outline" size={25} />,
        });
    }, []);

    // Coloca el nombre del producto
    useEffect(() => {
        if (productQuery.data) {
            navigation.setOptions({
                title: productQuery.data.title,
            });
        }
    }, [productQuery.data]);

    if (productQuery.isLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size={30} />
            </View>
        );
    }

    if (!productQuery.data) {
        return <Redirect href="/(products-app)/(home)" />;
    }

    const product = productQuery.data!;
    /*  Ese signo de exclamación (!) se llama Non-null assertion operator (operador de aserción de no nulo) en TypeScript.
        ¿Qué hace?
        Le dice a TypeScript: "Confía en mí, sé que esta variable no es null ni undefined, aunque tú creas que podría serlo". Básicamente, "fuerza" al compilador a tratar la variable como si siempre tuviera un valor.
        ojo, aquí funciona puesto que sí no hay datos es redirigido el home, hay que estar seguró de que habrán datos para usarlo */

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView>
                <ProductImages images={product.images} />
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

                <ThemedView style={{ padding: 10 }}>
                    <ThemedButtonGroup
                        options={["XS", "S", "M", "L", "XL", "XXL", "XXXL"]}
                        selectedOption={product.sizes}
                        onSelect={(options) => console.log({ options })}
                    />
                    <ThemedButtonGroup
                        options={["kid", "men", "woman", "unisex"]}
                        selectedOption={[product.gender]}
                        onSelect={(options) => console.log({ options })}
                    />
                </ThemedView>

                {/* Botón para guardar */}

                <View
                    style={{
                        marginHorizontal: 10,
                        marginBottom: 50,
                        marginTop: 20,
                    }}
                >
                    <ThemedButton
                        icon="save-outline"
                        onPress={() => console.log("Guardar")}
                    >
                        Guardar
                    </ThemedButton>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default ProductScreen;
