import { API_URL, productsApi } from "@/core/api/productsApi";
import { type Product } from "../interface/producto.interface";

export const getProductById = async (productId: string): Promise<Product> => {
    try {
        const { data } = await productsApi.get<Product>(
            `/products/${productId}`,
        );

        return {
            ...data,
            images: data.images.map(
                (image) => `${API_URL}/files/product/${image}`,
            ),
        };
    } catch (error) {
        throw new Error(`product with id ${productId} not found`);
    }
};
