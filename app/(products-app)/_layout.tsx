import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { Redirect, Stack } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

const CheckAuthenticationLayout = () => {
    const { status, checkStatus } = useAuthStore();

    useEffect(() => {
        checkStatus();
    }, []);

    if (status === "checking") {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 5,
                }}
            >
                <ActivityIndicator />
            </View>
        );
    }

    if (status === "unauthenticated") {
        // aquí se puede guardar la ruta del usuario para regresar a esa ruta después del login
        return <Redirect href="/auth/login" />;
    }

    return (
        <Stack>
            <Stack.Screen
                name="(home)/index"
                options={{
                    title: "Productos",
                }}
            />
        </Stack>
    );
};

export default CheckAuthenticationLayout;
