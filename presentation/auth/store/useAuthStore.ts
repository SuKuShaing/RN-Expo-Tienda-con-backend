import { authCheckStatus, authLogin } from "@/core/auth/actions/auth-actions";
import { User } from "@/core/auth/interface/user";
import { create } from "zustand";

export type AuthStatus = "authenticated" | "unauthenticated" | "checking";

export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User;

    login: (email: string, password: string) => Promise<boolean>;
    checkStatus: () => Promise<void>;
    logout: () => Promise<void>;
    changeStatus: (token?: string, user?: User) => boolean;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    // Properties
    status: "checking",
    token: undefined,
    user: undefined,

    // Métodos (Actions en Zustand)
    changeStatus: (token?: string, user?: User) => {
        if (!token || !user) {
            // sí no tenemos respuesta (nos llega un null) estás dos (token y user) no deberían existir
            set({
                status: "unauthenticated",
                token: undefined,
                user: undefined,
            });
            // definimos ese estatus y el token y el user lo colocamos así por sí acaso tenían otro estado antes
            // ToDo: llamar Logout
            return false;
        }

        set({ status: "authenticated", token: token, user: user });

        //ToDo: guardar el token en el secure storage

        return true;
    },

    login: async (email, password) => {
        const resp = await authLogin(email, password);

        return get().changeStatus(resp?.token, resp?.user);
    },

    checkStatus: async () => {
        const resp = await authCheckStatus();
        get().changeStatus(resp?.token, resp?.user);
    },

    logout: async () => {
        // ToDO: clear token del secure storage

        set({ status: "unauthenticated", token: undefined, user: undefined });
    },
}));
