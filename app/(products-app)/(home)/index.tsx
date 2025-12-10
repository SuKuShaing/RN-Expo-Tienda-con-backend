import { Fonts } from "@/constants/theme";
import { ThemedText } from "@/presentation/theme/components/themed-text";
import { useThemeColor } from "@/presentation/theme/hooks/use-theme-color";
import { View } from "react-native";

const HomeScreen = () => {
    const primary = useThemeColor({}, "primary");

    return (
        <View style={{ paddingTop: 100, paddingHorizontal: 20 }}>
            <ThemedText style={{ fontFamily: Fonts.kanitRegular }}>
                HomeScreen
            </ThemedText>
            <ThemedText style={{ fontFamily: Fonts.kanitBold }}>
                HomeScreen
            </ThemedText>
            <ThemedText style={{ fontFamily: Fonts.kanitThin }}>
                HomeScreen
            </ThemedText>
            <ThemedText style={{ color: primary }}>HomeScreen</ThemedText>
        </View>
    );
};

export default HomeScreen;
