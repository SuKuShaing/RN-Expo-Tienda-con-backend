import { getProducts } from "@/core/products/actions/get-products.actions";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useProducts = () => {
    const productsQuery = useInfiniteQuery({
        queryKey: ["products", "infinite"], // nombre de la llave con la cuál pedirá los datos, sí ya los tiene, los toma de la cache
        queryFn: ({ pageParam }) => getProducts(20, pageParam * 20), // función que pedirá los datos
        // pageParam es un parámetro que TanStack Query inyecta automáticamente en la función queryFn cuando utilizas el hook useInfiniteQuery

        staleTime: 1000 * 60 * 60, // 1 hr, tiempo en el que se considera que los datos son válidos

        initialPageParam: 0, // parámetro que indica la página inicial dado que estamos usando el hook useInfiniteQuery
        getNextPageParam: (lastPage, allPage) => allPage.length, // función que indica la página siguiente y retorna el número de páginas totales, ese valor se carga al pageParam de la siguiente petición.
        // allPage es un array de arrays, donde cada subarray contiene 20 productos
        // [[p1, p2, p3], [p4, p5, p6], [p7, p8, p9]]
    });

    return {
        // parameter
        productsQuery,

        // Methods
        loadNextPage: productsQuery.fetchNextPage, // método que carga la siguiente página, ejecutando getNextPageParam
    };
};
