import axios from "axios";
// ToDo: conectar mediante envs vars, android e IOs

const productsApi = axios.create({
    baseURL: "localhost:3000/api",
});

// ToDo: interceptores

export { productsApi };
