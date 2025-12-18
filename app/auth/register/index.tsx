import { ThemedText } from "@/presentation/theme/components/themed-text";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemedLink from "@/presentation/theme/components/ThemedLink";
import ThemeTextInput from "@/presentation/theme/components/ThemeTextInput";
import { useThemeColor } from "@/presentation/theme/hooks/use-theme-color";
import {
    KeyboardAvoidingView,
    ScrollView,
    useWindowDimensions,
    View,
} from "react-native";

const RegisterScreen = () => {
    const { height } = useWindowDimensions();
    const backgroundColor = useThemeColor({}, "background");

    return (
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <ScrollView
                style={{
                    paddingHorizontal: 40,
                    backgroundColor: backgroundColor,
                }}
            >
                <View
                    style={{
                        paddingTop: height * 0.25,
                    }}
                >
                    <ThemedText type="title">Crear cuenta</ThemedText>
                    <ThemedText style={{ color: "grey" }}>
                        Por favor crea una cuenta para continuar
                    </ThemedText>
                </View>

                <View style={{ marginTop: 20 }}>
                    <ThemeTextInput
                        placeholder="Nombre completo"
                        keyboardType="default"
                        autoCapitalize="words"
                        icon="person-outline"
                    />
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
                    Crear cuenta
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
                    <ThemedText>¿Ya tienes cuenta?</ThemedText>
                    <ThemedLink
                        href="/auth/login"
                        style={{ marginHorizontal: 5 }}
                    >
                        Ingresar
                    </ThemedLink>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default RegisterScreen;
