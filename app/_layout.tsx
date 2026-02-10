import { useColorScheme } from "@/presentation/theme/hooks/use-color-scheme";
import { useThemeColor } from "@/presentation/theme/hooks/use-theme-color";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import "react-native-reanimated";

export const unstable_settings = {
    anchor: "(tabs)",
};

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false, // Para que reintente sí falla la petición, se le puede colocar un número que indique la cantidad de veces
        },
    },
});

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const backgroundColor = useThemeColor({}, "background");

    const [loaded] = useFonts({
        KanitRegular: require("../assets/fonts/Kanit-Regular.ttf"),
        KanitBold: require("../assets/fonts/Kanit-Bold.ttf"),
        KanitThin: require("../assets/fonts/Kanit-Thin.ttf"),
    });

    if (!loaded) {
        return null;
    }

    return (
        <View style={{ backgroundColor: backgroundColor, flex: 1 }}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider
                    value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
                >
                    <Stack
                        screenOptions={{
                            headerShown: false,
                        }}
                    >
                        {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} /> */}
                    </Stack>
                    <StatusBar style="auto" />
                </ThemeProvider>
            </QueryClientProvider>
        </View>
    );
}
