import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { ThemedText } from "@/presentation/theme/components/themed-text";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemedLink from "@/presentation/theme/components/ThemedLink";
import ThemeTextInput from "@/presentation/theme/components/ThemeTextInput";
import { useThemeColor } from "@/presentation/theme/hooks/use-theme-color";
import { router } from "expo-router";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    ScrollView,
    useWindowDimensions,
    View,
} from "react-native";

const RegisterScreen = () => {
    const { height } = useWindowDimensions();
    const backgroundColor = useThemeColor({}, "background");
    const { register } = useAuthStore();

    const [isRegister, setIsRegister] = useState(false);
    const [form, setForm] = useState({ fullname: "", email: "", password: "" });

    const onRegister = async () => {
        const { fullname, email, password } = form;

        if (
            fullname.length === 0 ||
            email.length === 0 ||
            password.length === 0
        )
            return;

        console.log("Registrando a: ", { fullname, email, password });

        setIsRegister(true);
        const wasSuccessful = await register(fullname, email, password);
        setIsRegister(false);

        if (wasSuccessful) {
            router.replace("/");
            return;
        }

        // Alert.alert("Email ya existe");
        // Alert.alert("Debe introducir un email valido");
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
                        value={form.fullname}
                        onChangeText={(value) =>
                            setForm({ ...form, fullname: value })
                        }
                    />
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
                    onPress={onRegister}
                    disabled={isRegister}
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
