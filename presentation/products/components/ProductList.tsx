import { Product } from "@/core/products/interface/producto.interface";
import { FlatList } from "react-native";
import { ProductCard } from "./ProductCard";

interface Props {
    products: Product[];
    loadNextPage: () => void;
}

const ProductList = ({ products, loadNextPage }: Props) => {
    return (
        <FlatList
            data={products}
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ProductCard product={item} />}
        />
    );
};

export default ProductList;
