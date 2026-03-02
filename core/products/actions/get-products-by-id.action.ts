import { API_URL, productsApi } from "@/core/api/productsApi";
import { Gender, type Product } from "../interface/producto.interface";

const emptyProduct: Product = {
    id: "",
    title: "Nuevo Producto",
    description: "",
    price: 0,
    images: [],
    slug: "",
    gender: Gender.Men,
    sizes: [],
    stock: 0,
    tags: [],
};

export const getProductById = async (productId: string): Promise<Product> => {
    if (productId === "new") return emptyProduct;

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
