import { productsApi } from "@/core/api/productsApi";
import { Product } from "../interface/producto.interface";

export const updateCreateProduct = (product: Partial<Product>) => {
    product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);
    product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);

    if (product.id && product.id !== "new") {
        return updateProduct(product);
    }

    return createProduct(product);
};

const updateProduct = async (product: Partial<Product>) => {
    const { id, images = [], user, ...rest } = product;

    try {
        const { data } = await productsApi.patch<Product>(`/products/${id}`, {
            // ToDo: images
            ...rest,
        });

        return data;
    } catch (error) {
        console.log("🚀 ~ updateProduct ~ error:", error);
        throw new Error("Error al actualizar el producto");
    }
};

async function createProduct(product: Partial<Product>) {
    const { id, images = [], user, ...rest } = product;

    try {
        const { data } = await productsApi.post<Product>(`/products`, {
            // ToDo: images
            ...rest,
        });

        return data;
    } catch (error) {
        console.log("🚀 ~ updateProduct ~ error:", error);
        throw new Error("Error al actualizar el producto");
    }
}
