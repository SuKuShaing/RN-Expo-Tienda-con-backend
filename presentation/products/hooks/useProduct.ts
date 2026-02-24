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
    const productQuery = useQuery({
        queryKey: ["product", productId],
        queryFn: () => getProductById(productId),
        staleTime: 1000 * 60 * 60,
    });

    // Mutación
    const productMutation = useMutation({
        mutationFn: async (data: Product) => {
            // ToDo: disparar la acción de guardar
            console.log({ data });

            return data;
        },

        onSuccess: (data: Product) => {
            // ToDo: Invalidar products Queries

            Alert.alert(
                "Guardado Exitosamente",
                `"${data.title}" se guardó correctamente`,
            );
        },
    });

    // Mantener el ID del producto en caso de ser uno nuevo
    return {
        productQuery,
        productMutation,
    };
};
