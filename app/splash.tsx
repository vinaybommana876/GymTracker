/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View, Dimensions, Image } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/hooks/use-theme";

// ✅ Correct import
import { getOnboardingSeen, resetOnboarding } from "@/utils/onboardingStorage";
import { RESET_ONBOARDING_ON_START, DEBUG_ONBOARDING_FLOW } from "@/constants/devConfig";

const { width } = Dimensions.get("window");

// 🔑 Responsive sizes
const LOGO_WIDTH = width * 0.6;
const LOGO_HEIGHT = LOGO_WIDTH * 0.6;
const TEXT_WIDTH = width * 0.4;

export default function Splash() {
  const router = useRouter();
  const theme = useTheme();

  // 🌍 Background
  const scaleBg = useSharedValue(0.3);

  // 🎯 Logo
  const logoScale = useSharedValue(0.3);
  const logoOpacity = useSharedValue(0);

  // 🧩 Text Images
  const textTranslateY = useSharedValue(80);
  const textOpacity = useSharedValue(0);

  const bgStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleBg.value }],
  }));

  const logoStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: logoScale.value },
      { translateY: (1 - logoScale.value) * 20 },
    ],
    opacity: logoOpacity.value,
  }));

  const textStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: textTranslateY.value }],
    opacity: textOpacity.value,
  }));

  useEffect(() => {
    // 🌍 Background
    scaleBg.value = withTiming(2.5, {
      duration: 900,
      easing: Easing.bezier(0.22, 1, 0.36, 1),
    });

    // 🎯 Logo
    logoScale.value = withDelay(
      400,
      withSpring(1, {
        damping: 14,
        stiffness: 90,
      })
    );

    logoOpacity.value = withDelay(
      400,
      withTiming(1, {
        duration: 700,
        easing: Easing.out(Easing.cubic),
      })
    );

    // 🧩 TEXT
    textTranslateY.value = withDelay(
      1100,
      withTiming(0, {
        duration: 700,
        easing: Easing.bezier(0.22, 1, 0.36, 1),
      })
    );

    textOpacity.value = withDelay(
      1100,
      withTiming(1, { duration: 600 })
    );

    // 🚀 NAVIGATION (onboarding-aware)
    async function navigateNext() {
      try {
        // 🔄 Reset onboarding if enabled in devConfig
        if (RESET_ONBOARDING_ON_START) {
          await resetOnboarding();
          if (DEBUG_ONBOARDING_FLOW) {
            console.log("[Onboarding] Reset for fresh start");
          }
        }

        const seen = await getOnboardingSeen();
        const nextRoute = seen ? "/(tabs)" : "/onboarding";
        
        if (DEBUG_ONBOARDING_FLOW) {
          console.log(`[Onboarding] Seen: ${seen} → Route: ${nextRoute}`);
        }

        setTimeout(() => {
          router.replace(nextRoute);
        }, 2500);
      } catch (error) {
        console.error("[Splash] Navigation error:", error);
        // Fallback: show onboarding on error
        setTimeout(() => {
          router.replace("/onboarding");
        }, 2500);
      }
    }

    void navigateNext();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      
      {/* 🌍 Curved Gradient */}
      <Animated.View
        style={[
          {
            position: "absolute",
            width: width * 2,
            height: width * 2,
            borderRadius: width,
            left: -width / 2,
            bottom: -width,
            overflow: "hidden",
          },
          bgStyle,
        ]}
      >
        <LinearGradient
          colors={[
            "#0d3973",
            "#3b82f6",
            "#76a0e5",
          ]}
          start={{ x: 0.2, y: 1 }}
          end={{ x: 0.8, y: 0 }}
          style={{ flex: 1 }}
        />
      </Animated.View>

      {/* 🎯 CENTER CONTENT */}
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* LOGO */}
        <Animated.View style={logoStyle}>
          <Image
            source={require("../assets/logos/logo-without-bg.png")}
            style={{
              width: LOGO_WIDTH,
              height: LOGO_HEIGHT,
              resizeMode: "contain",
            }}
          />
        </Animated.View>

        {/* 🧩 TEXT */}
        <Animated.View style={[textStyle, { marginTop: -15 }]}>
          <Image
            source={require("../assets/logos/Fitness.png")}
            style={{
              width: TEXT_WIDTH * 0.8,
              height: TEXT_WIDTH * 0.22,
              resizeMode: "contain",
            }}
          />

          <Image
            source={require("../assets/logos/Tracker.png")}
            style={{
              width: TEXT_WIDTH * 0.6,
              height: TEXT_WIDTH * 0.22,
              resizeMode: "contain",
              marginTop: -8,
              alignSelf: "center",
            }}
          />
        </Animated.View>
      </View>
    </View>
  );
}