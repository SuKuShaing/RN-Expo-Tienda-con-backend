import { authCheckStatus, authLogin } from "@/core/auth/actions/auth-actions";
import { User } from "@/core/auth/interface/user";
import { SecureStorageAdapter } from "@/helpers/adapters/secure-storage.adapter";
import { create } from "zustand";

export type AuthStatus = "authenticated" | "unauthenticated" | "checking";

export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User;

    login: (email: string, password: string) => Promise<boolean>;
    checkStatus: () => Promise<void>;
    logout: () => Promise<void>;
    changeStatus: (token?: string, user?: User) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    // Properties
    status: "checking",
    token: undefined,
    user: undefined,

    // Métodos (Actions en Zustand)
    changeStatus: async (token?: string, user?: User) => {
        if (!token || !user) {
            // sí no tenemos respuesta (nos llega un null) estás dos (token y user) no deberían existir
            set({
                status: "unauthenticated",
                token: undefined,
                user: undefined,
            });
            // definimos ese estatus y el token y el user lo colocamos así por sí acaso tenían otro estado antes

            await SecureStorageAdapter.deleteItem("token");
            return false;
        }

        set({ status: "authenticated", token: token, user: user });

        await SecureStorageAdapter.setItem("token", token); // aquí guardamos el token en el Secure Storage del dispositivo

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
        SecureStorageAdapter.deleteItem("token");

        set({ status: "unauthenticated", token: undefined, user: undefined });
    },
}));
