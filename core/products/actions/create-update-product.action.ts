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

/**
 * Preparamos la imagen para subir, separamos las nuevas de las que ya está en el servidor
 * @param images: string[]
 * @returns Promise<string[]>
 */
const prepareImages = async (images: string[]): Promise<string[]> => {
    const fileImages = images.filter((image) => image.startsWith("file")); // sirve startsWith, includes entre otras
    const currentImages = images.filter((image) => !image.includes("file"));

    if (fileImages.length > 0) {
        const uploadPromises = fileImages.map(uploadImage); // es lo mismo que fileImages.map(img => uploadImage(img))
        const uploadedImages = await Promise.all(uploadPromises); // Esperamos a que todas las promesas de subir las imágenes terminen

        currentImages.push(...uploadedImages); // Ahora las imágenes está en el servidor y tienen un id
    }

    return currentImages.map((img) => img.split("/").pop()!);
};

/**
 * Carga las imágenes en el servidor
 * @param Image
 * @returns
 */
const uploadImage = async (Image: string): Promise<string> => {
    return "";
};

const updateProduct = async (product: Partial<Product>) => {
    const { id, images = [], user, ...rest } = product;

    try {
        const checkedImages = await prepareImages(images);

        const { data } = await productsApi.patch<Product>(`/products/${id}`, {
            // ToDo: images
            ...rest,
            images: checkedImages,
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
        const checkedImages = await prepareImages(images);

        const { data } = await productsApi.post<Product>(`/products`, {
            // ToDo: images
            ...rest,
            images: checkedImages,
        });

        return data;
    } catch (error) {
        console.log("🚀 ~ updateProduct ~ error:", error);
        throw new Error("Error al actualizar el producto");
    }
}
