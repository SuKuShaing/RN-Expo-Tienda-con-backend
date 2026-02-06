import LogoutIconButton from "@/presentation/auth/components/LogoutIconButton";
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
                // Es un objeto de estilos que se aplica al contenedor de la pantalla (donde se renderiza el contenido de tus rutas, como el index.tsx).
                // Si no defines esto, podrías ver un color blanco por defecto (o el del sistema) "detrás" de tus componentes, lo cual rompería la estética si tu aplicación tiene un tema oscuro o un color personalizado.
                contentStyle: {
                    backgroundColor: backgroundColor,
                },
            }}
        >
            <Stack.Screen
                name="(home)/index"
                options={{
                    title: "Productos",
                    headerLeft: () => <LogoutIconButton />,
                }}
            />
        </Stack>
    );
};

export default CheckAuthenticationLayout;
