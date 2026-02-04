import axios from "axios";
import { Platform } from "react-native";

// ToDo: conectar mediante envs vars, android e IOs

const STAGE = process.env.EXPO_PUBLIC_STAGE || "dev";

export const API_URL =
    STAGE === "prod"
        ? process.env.EXPO_PUBLIC_API_URL
        : Platform.OS === "ios"
          ? process.env.EXPO_PUBLIC_API_URL_IOS
          : process.env.EXPO_PUBLIC_API_URL_ANDROID;

console.log({ STAGE, [Platform.OS]: API_URL });
console.log(
    "\x1b[43m\x1b[37m\x1b[1m RECORDATORIO: \x1b[0m",
    "\x1b[31m\x1b[1m Levantar el Docker con el backend \x1b[0m",
);

// en código ANSI
// \x1b[43m -> fondo amarillo
// \x1b[30m -> texto negro
// \x1b[1m -> negrita
// \x1b[0m -> reset

const productsApi = axios.create({
    baseURL: API_URL,
});

// ToDo: interceptores

export { productsApi };
