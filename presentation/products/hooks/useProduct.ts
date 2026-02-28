import { updateCreateProduct } from "@/core/products/actions/create-update-product.action";
import { getProductById } from "@/core/products/actions/get-products-by-id.action";
import { Product } from "@/core/products/interface/producto.interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Alert } from "react-native";

/**
 * Este archivo define un Hook personalizado llamado useProduct
 * que se encarga de gestionar toda la lógica relacionada con un único producto
 * obtener sus datos y actualizarlos
 * @param productId
 * @returns
 */
export const useProduct = (productId: string) => {
    // useQuery es para los Get, se ejecuta automáticamente
    const productQuery = useQuery({
        queryKey: ["product", productId],
        queryFn: () => getProductById(productId),
        staleTime: 1000 * 60 * 60,
    });

    // Mutación
    // useMutation es para los Post, Put, Delete y Patch, se ejecuta manualmente
    const productMutation = useMutation({
        mutationFn: async (data: Product) => updateCreateProduct(data),

        onSuccess: (data: Product) => {
            // ToDo: Invalidar products Queries

            Alert.alert(
                "Guardado Exitosamente",
                `"${data.title}" se guardó correctamente`,
            );
        },

        // Agregar esto:
        onError: (error) => {
            Alert.alert(
                "Error al guardar",
                "Revisa que tengas permisos de administrador (Código 403)",
            );
            console.log("error: ", error);
        },
    });

    // Mantener el ID del producto en caso de ser uno nuevo
    return {
        productQuery,
        productMutation,
    };
};
