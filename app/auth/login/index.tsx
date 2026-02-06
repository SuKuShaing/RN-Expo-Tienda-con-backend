import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { ThemedText } from "@/presentation/theme/components/themed-text";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemedLink from "@/presentation/theme/components/ThemedLink";
import ThemeTextInput from "@/presentation/theme/components/ThemeTextInput";
import { useThemeColor } from "@/presentation/theme/hooks/use-theme-color";
import { router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    ScrollView,
    useWindowDimensions,
    View,
} from "react-native";

const LoginScreen = () => {
    const { height } = useWindowDimensions();
    const backgroundColor = useThemeColor({}, "background");
    const { login } = useAuthStore();

    const [isPosting, setIsPosting] = useState(false); // Verifica sí se enviaron los datos y mientras se envía desactiva el botón
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const onLogin = async () => {
        const { email, password } = form;

        console.log({ email, password });

        if (email.length === 0 || password.length === 0) return;

        setIsPosting(true);
        const wasSuccessful = await login(email, password); // Enviamos los datos para el login
        setIsPosting(false);

        if (wasSuccessful) {
            router.replace("/"); // sí todo fue correcto nos vamos al home
            return;
        }

        Alert.alert("Error", "Usuario o contraseña no son correctos");
    };

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
                        value={form.email}
                        onChangeText={(value) =>
                            setForm({ ...form, email: value })
                        }
                    />
                    <ThemeTextInput
                        placeholder="Contraseña"
                        secureTextEntry
                        autoCapitalize="none"
                        icon="lock-closed-outline"
                        value={form.password}
                        onChangeText={(value) =>
                            setForm({ ...form, password: value })
                        }
                    />
                </View>

                {/* Spacer */}
                <View style={{ marginTop: 10 }} />

                {/* Botones */}
                <ThemedButton
                    icon="arrow-forward-outline"
                    iconOrientation="right"
                    onPress={onLogin}
                    disabled={isPosting}
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
