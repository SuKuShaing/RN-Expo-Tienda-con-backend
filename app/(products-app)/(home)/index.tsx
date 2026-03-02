import ProductList from "@/presentation/products/components/ProductList";
import { useProducts } from "@/presentation/products/hooks/useProducts";
import { FAB } from "@/presentation/theme/components/FAB";
import { useThemeColor } from "@/presentation/theme/hooks/use-theme-color";
import { router } from "expo-router";
import { ActivityIndicator, View } from "react-native";

const HomeScreen = () => {
    const primary = useThemeColor({}, "primary");

    const { productsQuery, loadNextPage } = useProducts();

    if (productsQuery.isLoading) {
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

    return (
        // <View style={{ paddingTop: 100, paddingHorizontal: 20 }}>
        //     <ThemedText style={{ fontFamily: Fonts.kanitRegular }}>
        //         HomeScreen
        //     </ThemedText>
        //     <ThemedText style={{ fontFamily: Fonts.kanitBold }}>
        //         HomeScreen
        //     </ThemedText>
        //     <ThemedText style={{ fontFamily: Fonts.kanitThin }}>
        //         HomeScreen
        //     </ThemedText>
        //     <ThemedText style={{ color: primary }}>HomeScreen</ThemedText>
        // </View>
        <View style={{ paddingHorizontal: 10 }}>
            <ProductList
                products={
                    productsQuery.data?.pages.flatMap((page) => page) ?? []
                }
                loadNextPage={loadNextPage}
            />
            <FAB
                iconName="add-outline"
                onPress={() => router.push("/(products-app)/product/new")}
            />
        </View>
    );
};

export default HomeScreen;
