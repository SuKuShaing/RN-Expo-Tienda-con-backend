import { getProductById } from "@/core/products/actions/get-products-by-id.action";
import { useQuery } from "@tanstack/react-query";

export const useProduct = (productId: string) => {
    const productQuery = useQuery({
        queryKey: ["product", productId],
        queryFn: () => getProductById(productId),
        staleTime: 1000 * 60 * 60,
    });

    // Falta: Mutación, Mantener el ID del producto en caso de ser uno nuevo
    return {
        productQuery,
    };
};
