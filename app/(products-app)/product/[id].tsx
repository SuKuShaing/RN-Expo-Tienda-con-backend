import { Size } from "@/core/products/interface/producto.interface";
import ProductImages from "@/presentation/products/components/ProductImages";
import { useProduct } from "@/presentation/products/hooks/useProduct";
import { useCameraStore } from "@/presentation/store/useCameraStore";
import MenuIconBotton from "@/presentation/theme/components/MenuIconBotton";
import { ThemedView } from "@/presentation/theme/components/themed-view";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemedButtonGroup from "@/presentation/theme/components/ThemedButtonGroup";
import ThemeTextInput from "@/presentation/theme/components/ThemeTextInput";
import {
    Redirect,
    router,
    useLocalSearchParams,
    useNavigation,
} from "expo-router";
import { Formik } from "formik";
import { useEffect } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    RefreshControl,
    ScrollView,
    View,
} from "react-native";

const ProductScreen = () => {
    const { addSelectedImage } = useCameraStore();

    const { selectedImages, clearImages } = useCameraStore();

    const { id } = useLocalSearchParams();
    const navigation = useNavigation(); // son las opciones de la cabecera

    const { productQuery, productMutation } = useProduct(`${id}`);

    //fn de limpieza, para sacar de memoria las fotos que se guardaron en zustand
    useEffect(() => {
        return () => {
            clearImages();
        };
    }, []);

    // Coloca el icono de la cámara en la esquina
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <MenuIconBotton
                    onPress={() => router.push("/camera")}
                    // onPress={() => router.push("/camera/index")} // funciona solo sí se deja /camera, aunque marque error el sistema, ahí funciona
                    icon="camera-outline"
                />
            ),
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
        <Formik
            initialValues={product}
            // onSubmit={(productLike) => productMutation.mutate(productLike)} // ambos debiesen funcionar igual
            onSubmit={(productLike) =>
                productMutation.mutate({
                    ...productLike,
                    images: [...productLike.images, ...selectedImages],
                })
            }
        >
            {({ values, handleSubmit, handleChange, setFieldValue }) => (
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                >
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={productQuery.isFetching}
                                onRefresh={async () => {
                                    await productQuery.refetch();
                                }}
                            />
                        }
                    >
                        <ProductImages
                            images={[...product.images, ...selectedImages]}
                        />
                        <ThemedView
                            style={{ marginHorizontal: 10, marginTop: 20 }}
                        >
                            <ThemeTextInput
                                placeholder="Título"
                                style={{ marginVertical: 5 }}
                                value={values.title}
                                onChangeText={handleChange("title")}
                            />
                            <ThemeTextInput
                                placeholder="Slug"
                                style={{ marginVertical: 5 }}
                                value={values.slug}
                                onChangeText={handleChange("slug")}
                            />
                            <ThemeTextInput
                                placeholder="Descripción"
                                multiline
                                numberOfLines={5}
                                style={{ marginVertical: 5 }}
                                value={values.description}
                                onChangeText={handleChange("description")}
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
                            <ThemeTextInput
                                placeholder="Precio"
                                style={{ flex: 1 }}
                                value={values.price.toString()}
                                onChangeText={handleChange("price")}
                            />
                            <ThemeTextInput
                                placeholder="Inventario"
                                style={{ flex: 1 }}
                                value={values.stock.toString()}
                                onChangeText={handleChange("stock")}
                            />
                        </ThemedView>

                        <ThemedView style={{ padding: 10 }}>
                            <ThemedButtonGroup
                                options={[
                                    "XS",
                                    "S",
                                    "M",
                                    "L",
                                    "XL",
                                    "XXL",
                                    "XXXL",
                                ]}
                                selectedOption={values.sizes}
                                onSelect={(selectedSize) => {
                                    const newSizesValue = values.sizes.includes(
                                        selectedSize as Size,
                                    )
                                        ? values.sizes.filter(
                                              (s) => s !== selectedSize,
                                          )
                                        : [...values.sizes, selectedSize];
                                    setFieldValue("sizes", newSizesValue);
                                }}
                            />
                            <ThemedButtonGroup
                                options={["kid", "men", "woman", "unisex"]}
                                selectedOption={[values.gender]}
                                onSelect={(selectedOption) =>
                                    setFieldValue("gender", selectedOption)
                                }
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
                                onPress={() => handleSubmit()}
                            >
                                Guardar
                            </ThemedButton>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            )}
        </Formik>
    );
};

export default ProductScreen;
