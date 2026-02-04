import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { useThemeColor } from "@/presentation/theme/hooks/use-theme-color";
import { Redirect, Stack } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

const CheckAuthenticationLayout = () => {
    const { status, checkStatus } = useAuthStore();
    const backgroundColor = useThemeColor({}, "background");

    // Antes de llegar al home (index.tsx) pasa por este _layout.tsx y verificamos el estado de autentificación del usuario
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
        <Stack
            screenOptions={{
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: backgroundColor,
                },
                contentStyle: {
                    backgroundColor: backgroundColor,
                },
            }}
        >
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
