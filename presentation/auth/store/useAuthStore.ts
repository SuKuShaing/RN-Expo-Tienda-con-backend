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
}

export const useAuthStore = create<AuthState>()((set) => ({
    // Properties
    status: "checking",
    token: undefined,
    user: undefined,

    // Métodos (Actions en Zustand)
    login: async (email, password) => {
        return true;
    },

    checkStatus: async () => {},

    logout: async () => {},
}));
