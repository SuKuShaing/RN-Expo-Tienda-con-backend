import { productsApi } from "../../api/productsApi";
import { User } from "../interface/user";

export interface AuthResponse {
    id: string;
    email: string;
    fullName: string;
    isActive: boolean;
    roles: string[];
    token: string;
}

const returnUserToken = (data: AuthResponse): { user: User; token: string } => {
    const { id, email, fullName, isActive, roles, token } = data;

    const user: User = {
        id,
        email,
        fullName,
        isActive,
        roles,
    };

    /*
    const {token, ...rest} = data; // en vez de rest puede ser cualquier nombre y tendrá agrupado las demás keys
    const {token, ...user} = data;
    con solo esa línea reemplazo las dos de arriba, pero es menos legible
    ambas formas son validas
    */

    return {
        user,
        token,
    };
};

export const authLogin = async (email: string, password: string) => {
    email = email.toLocaleLowerCase();

    try {
        const { data } = await productsApi.post<AuthResponse>("/auth/login", {
            email,
            password,
        });

        return returnUserToken(data);
    } catch (error) {
        console.log(error);
        // throw new Error("User and/or password not valid");
        console.log(
            "Error en el auth-actions, authLogin",
            "User and/or password not valid",
        );
        return null;
    }
};

export const authCheckStatus = async () => {
    try {
        const { data } =
            await productsApi.get<AuthResponse>("/auth/check-status");

        return returnUserToken(data);
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const authRegister = async (
    fullName: string,
    email: string,
    password: string,
) => {
    email = email.toLocaleLowerCase();

    try {
        const { data } = await productsApi.post<AuthResponse>(
            "/auth/register",
            { email, password, fullName },
        );

        return returnUserToken(data);
    } catch (error) {
        console.log("Error en el auth-actions, authRegister");
        return null;
    }
};
