import { ThemedText } from "@/presentation/theme/components/themed-text";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemedLink from "@/presentation/theme/components/ThemedLink";
import ThemeTextInput from "@/presentation/theme/components/ThemeTextInput";
import {
    KeyboardAvoidingView,
    ScrollView,
    useWindowDimensions,
    View,
} from "react-native";

const LoginScreen = () => {
    const { height } = useWindowDimensions();

    return (
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <ScrollView
                style={{
                    paddingHorizontal: 40,
                }}
            >
                <View
                    style={{
                        paddingTop: height * 0.35,
                    }}
                >
                    <ThemedText type="title">Ingresar</ThemedText>
                    <ThemedText style={{ color: "grey" }}>
                        Por favor ingrese para continuar
                    </ThemedText>
                </View>

                <View style={{ marginTop: 20 }}>
                    <ThemeTextInput
                        placeholder="Correo Electrónico"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        icon="mail-outline"
                    />
                    <ThemeTextInput
                        placeholder="Contraseña"
                        secureTextEntry
                        autoCapitalize="none"
                        icon="lock-closed-outline"
                    />
                </View>

                {/* Spacer */}
                <View style={{ marginTop: 10 }} />

                {/* Botones */}
                <ThemedButton
                    icon="arrow-forward-outline"
                    iconOrientation="right"
                >
                    Ingresar
                </ThemedButton>

                {/* Spacer */}
                <View style={{ marginTop: 50 }} />

                {/* Enlace a registro */}
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <ThemedText>¿No tienes cuenta?</ThemedText>
                    <ThemedLink
                        href="/auth/register"
                        style={{ marginHorizontal: 5 }}
                    >
                        Crear Cuenta
                    </ThemedLink>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;
