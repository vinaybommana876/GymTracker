/* eslint-disable react-hooks/exhaustive-deps */
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { useEffect, useRef } from "react";
import { View } from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

export default function Splash() {
  const router = useRouter();
  const animation = useRef<LottieView>(null);

  const isDark = useColorScheme() === "dark";

  const scale = useSharedValue(0.7);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  useEffect(() => {
    scale.value = withTiming(1, { duration: 1200, easing: Easing.out(Easing.exp) });
    opacity.value = withTiming(1, { duration: 1000 });

    setTimeout(() => animation.current?.play(), 100);
    setTimeout(() => router.replace("/onboarding"), 3500);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: isDark ? "#020617" : "#f1f5f9",
      }}
    >
      <Animated.View style={animatedStyle}>
        <LottieView
  ref={animation}
  source={require("../assets/gradientBall.json")}
  autoPlay
  loop
  resizeMode="contain"
  renderMode="AUTOMATIC" // important
  style={{ width: 260, height: 260 }}
/>
      </Animated.View>

      <Animated.Text
        style={[
          animatedStyle,
          {
            marginTop: 24,
            fontSize: 28,
            fontWeight: "800",
            color: isDark ? "#fff" : "#0f172a",
          },
        ]}
      >
        FitnessTracker
      </Animated.Text>
    </View>
  );
}