/* eslint-disable react-hooks/exhaustive-deps */
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

import { useTheme } from "@/hooks/use-theme"; // ✅ central theme hook

export default function Splash() {
  const router = useRouter();
  const animation = useRef<LottieView>(null);

  const theme = useTheme(); 

  const scale = useSharedValue(0.7);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  useEffect(() => {
    scale.value = withTiming(1, {
      duration: 1200,
      easing: Easing.out(Easing.exp),
    });

    opacity.value = withTiming(1, { duration: 1000 });

    setTimeout(() => animation.current?.play(), 100);
    setTimeout(() => router.replace("/onboarding"), 2000); // ← 20s is excessive
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.background, // ✅ from theme
      }}
    >
      <Animated.View style={animatedStyle}>
        <LottieView
          ref={animation}
          source={require("../assets/gradientBall.json")}
          autoPlay
          loop
          resizeMode="contain"
          renderMode="AUTOMATIC"
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
            color: theme.foreground, // ✅ from theme
          },
        ]}
      >
        FitnessTracker
      </Animated.Text>
    </View>
  );
}