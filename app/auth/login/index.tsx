import { ThemedText } from "@/presentation/theme/components/themed-text";
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
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;
