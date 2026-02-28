import { updateCreateProduct } from "@/core/products/actions/create-update-product.action";
import { getProductById } from "@/core/products/actions/get-products-by-id.action";
import { Product } from "@/core/products/interface/producto.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Alert } from "react-native";

/**
 * Este archivo define un Hook personalizado llamado useProduct
 * que se encarga de gestionar toda la lógica relacionada con un único producto
 * obtener sus datos y actualizarlos
 * @param productId
 * @returns
 */
export const useProduct = (productId: string) => {
    const queryClient = useQueryClient();

    // usamos productIdRef para Mantener la identidad del producto: si es 'new' se actualiza con el ID real tras el primer guardado.
    // Esto permite que el formulario pase de modo "Crear" a "Actualizar" automáticamente,
    // evitando duplicados en guardados posteriores y sin disparar re-renders innecesarios.
    const productIdRef = useRef(productId);

    // useQuery es para los Get, se ejecuta automáticamente
    const productQuery = useQuery({
        queryKey: ["product", productId],
        queryFn: () => getProductById(productId),
        staleTime: 1000 * 60 * 60,
    });

    // Mutación
    // useMutation es para los Post, Put, Delete y Patch, se ejecuta manualmente
    const productMutation = useMutation({
        mutationFn: async (data: Product) =>
            updateCreateProduct({ ...data, id: productIdRef.current }),

        onSuccess: (data: Product) => {
            productIdRef.current = data.id;

            // Invalidar cache products Queries
            queryClient.invalidateQueries({
                queryKey: ["products", "infinite"],
            });
            queryClient.invalidateQueries({
                queryKey: ["product", data.id],
            });

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
