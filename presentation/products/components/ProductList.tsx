import { Product } from "@/core/products/interface/producto.interface";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import { ProductCard } from "./ProductCard";

interface Props {
    products: Product[];
    loadNextPage: () => void;
}

const ProductList = ({ products, loadNextPage }: Props) => {
    const [isRefreshing, setIsRefreshing] = useState(false);

    const queryClient = useQueryClient();

    const onPullToRefresh = async () => {
        setIsRefreshing(true);
        await new Promise((resolve) => setTimeout(resolve, 200));

        queryClient.invalidateQueries({
            // con esto invalidamos la data y hacemos que la pida de nuevo la información
            queryKey: ["products", "infinite"],
        });

        setIsRefreshing(false);
    };

    return (
        <FlatList
            data={products}
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ProductCard product={item} />}
            onEndReached={loadNextPage} // para que cargue la siguiente pantalla
            onEndReachedThreshold={0.8} // cuándo haya pasado del 80%
            showsVerticalScrollIndicator={false} // para que no se vea la barra de deslizamiento
            refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={onPullToRefresh}
                />
            }
        />
    );
};

export default ProductList;
