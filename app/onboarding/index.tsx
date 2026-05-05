import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import type { SharedValue } from "react-native-reanimated";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { useTheme } from "@/hooks/use-theme";
import { setOnboardingSeen } from "@/utils/onboardingStorage";

const slides = [
  {
    variant: "text",
    title: "Empower Yourself With Quick Knowledge",
  },
  {
    variant: "visual",
    title: "Elevate Your Workouts",
    subtitle: "Get workout plans and build consistency every day.",
    icon: "book-open-variant",
    accent: "#60A5FA",
  },
  {
    variant: "human",
    title: "Stay Consistent And Achieve Your Goals 💪",
    subtitle: "Stay motivated with streaks, insights, and real results that keep you going.",
  },
];

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

/* ========================= DOT ========================= */
function Dot({
  index,
  progress,
}: {
  index: number;
  progress: SharedValue<number>;
}) {
  const theme = useTheme();

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      progress.value,
      [index - 1, index, index + 1],
      [1, 1.7, 1],
      Extrapolate.CLAMP,
    );
    const opacity = interpolate(
      progress.value,
      [index - 1, index, index + 1],
      [0.35, 1, 0.35],
      Extrapolate.CLAMP,
    );

    return { transform: [{ scale }], opacity };
  });

  return (
    <Animated.View
      style={[styles.dot, animatedStyle, { backgroundColor: theme.primary }]}
    />
  );
}

/* ========================= SLIDES ========================= */

function TextSlide({ item }: any) {
  const theme = useTheme();

  return (
    <View style={styles.textContainer}>
      <Text style={[styles.bigTitle, { color: theme.foreground }]}>
        Your{"\n"}
        <Text style={{ color: theme.primary }}>Fitness</Text> With{"\n"}
        <Text style={{ color: theme.primary }}>Smart Training</Text>
      </Text>
    </View>
  );
}
function VisualSlide({ item }: any) {
  const theme = useTheme();
  const { width, height } = useWindowDimensions();
  const imageWidth = Math.min(width * 0.8, 540);
  const imageHeight = height*0.6;

  return (
    <View style={styles.visualContainer}>
      <Image
        source={require("@/assets/images/a.png")}
        style={[styles.visualImage, { width: imageWidth, height: imageHeight }]}
        resizeMode="contain"
      />

      <View style={styles.visualTextContainer}>
        <Text style={[styles.slideTitle, { color: theme.foreground }]}> 
          {item.title}
        </Text>
        <Text style={[styles.slideSubtitle, { color: theme.mutedForeground }]}> 
          {item.subtitle}
        </Text>
      </View>
    </View>
  );
}

function HumanSlide({ item }: any) {
  const theme = useTheme();

  return (
    <View style={styles.humanContainer}>
      <View style={styles.circleBg} />
      <View
        style={[styles.imagePlaceholder, { backgroundColor: theme.secondary }]}
      />

      <Text style={[styles.slideTitle, { color: theme.foreground }]}>
        {item.title}
      </Text>
      <Text style={[styles.slideSubtitle, { color: theme.mutedForeground }]}>
        {item.subtitle}
      </Text>
    </View>
  );
}

function OnboardingSlide({ item }: any) {
  switch (item.variant) {
    case "text":
      return <TextSlide item={item} />;
    case "visual":
      return <VisualSlide item={item} />;
    case "human":
      return <HumanSlide item={item} />;
    default:
      return null;
  }
}

/* ========================= MAIN ========================= */

export default function OnboardingScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const scrollRef = useRef<ScrollView | null>(null);
  const { width, height } = useWindowDimensions();

  const x = useSharedValue(0);
  const progress = useDerivedValue(() => x.value / width);
  const hover = useSharedValue(0);
  const wave = useSharedValue(0);
  const wave2 = useSharedValue(0);

  useEffect(() => {
    hover.value = withRepeat(withTiming(1, { duration: 1200 }), -1, true);
    wave.value = withRepeat(withTiming(1, { duration: 1400 }), -1, false);
    wave2.value = withRepeat(
      withDelay(700, withTiming(1, { duration: 1400 })),
      -1,
      false,
    );
  }, []);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    x.value = event.contentOffset.x;
  });

  const completeOnboarding = async () => {
    await setOnboardingSeen();
    router.replace("/(tabs)");
  };

  const handleNext = () => {
    if (page < slides.length - 1) {
      scrollRef.current?.scrollTo({ x: width * (page + 1), animated: true });
    } else {
      void completeOnboarding();
    }
  };

  const headerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [1, 0.9]),
  }));

  const hoverStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(hover.value, [0, 1], [0, -6]),
      },
      {
        scale: interpolate(hover.value, [0, 1], [1, 1.025]),
      },
    ],
  }));

  const waveStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(wave.value, [0, 1], [1, 2.2]),
      },
    ],
    opacity: interpolate(wave.value, [0, 0.7, 1], [0.4, 0.15, 0]),
  }));

  const waveStyle2 = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(wave2.value, [0, 1], [1, 2.6]),
      },
    ],
    opacity: interpolate(wave2.value, [0, 0.7, 1], [0.25, 0.1, 0]),
  }));

  const fabAnimatedStyle = useAnimatedStyle(() => ({
    position: "absolute",
    bottom: 40,
    right: 24,
  }));

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* HEADER */}
      <Animated.View style={[styles.header, headerStyle]}>
        <View style={styles.progressGroup}>
          {slides.map((_, index) => (
            <Dot key={index} index={index} progress={progress} />
          ))}
        </View>
      </Animated.View>

      {/* SLIDES */}
     <View  style={[styles.sub]}>
       <AnimatedScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const nextPage = Math.round(
            event.nativeEvent.contentOffset.x / width,
          );
          setPage(nextPage);
        }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={[styles.scrollContent]}
        style={{ flex: 1 }}
      >
        
        {slides.map((item, index) => (
          <View
            key={index}
            style={[
              styles.slide,
              { width, minHeight: height * 0.74 },
            ]}
          >
            <OnboardingSlide item={item} />
          </View>
        ))}
      </AnimatedScrollView>
     </View>

      {/* FLOATING BUTTON */}
      <Animated.View style={[styles.fabRoot, fabAnimatedStyle, hoverStyle]}>
        <Animated.View
          style={[styles.waveRing, waveStyle, { borderColor: theme.primary }]}
        />
        <Animated.View
          style={[styles.waveRing, waveStyle2, { borderColor: theme.primary }]}
        />
        <Pressable
          style={[styles.fab, { backgroundColor: theme.primary }]}
          onPress={handleNext}
        >
          <Text style={{ color: theme.primaryForeground, fontSize: 22 }}>→</Text>
        </Pressable>
      </Animated.View>

      {/* SKIP */}
      <Text
        style={[styles.skipBottom, { color: theme.mutedForeground }]}
        onPress={() => void completeOnboarding()}
      >
        Skip
      </Text>
    </View>
  );
}

/* ========================= STYLES ========================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 48,
  },

  header: {
    paddingTop: 40,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    // marginBottom: 16,
  },

  sub: {
    flex: 1,
  },

  progressGroup: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  scrollContent: {
    alignItems: "flex-start",
    position: "absolute",
    top: 0,
    left: 0,
  },

  slide: {
    justifyContent: "center",
    flex: 1,
    // flexDirection: "column",
    // position: "relative",
    // paddingHorizontal: 24,
    paddingVertical: 24,
  },

  /* TEXT */
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },

  bigTitle: {
    fontSize: 48,
  fontWeight: "400",
  lineHeight: 52,
  textAlign: "center", // 👈 ADD
},
  /* VISUAL */
  visualContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 24,
  },

  visualImage: {
    width: "84%",
    // maxWidth: 440,
    aspectRatio: 0.6,
    borderRadius: 24,
  },

  visualTextContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 12,
    // marginTop: 24,
  },

  stack: {
    height: 220,
    width: 220,
    justifyContent: "center",
    alignItems: "center",
  },

  stackCard: {
    position: "absolute",
    width: 180,
    height: 220,
    borderRadius: 20,
  },

  mainCard: {
    width: 180,
    height: 220,
    borderRadius: 20,
  },

  /* HUMAN */
  humanContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    paddingVertical: 28,
  },

  circleBg: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "#38BDF820",
  },

  imagePlaceholder: {
    width: 220,
    height: 260,
    borderRadius: 24,
  },

  /* TEXT COMMON */
  slideTitle: {
    fontSize: 28,
    fontWeight: "400",
    textAlign: "center",
  },

  slideSubtitle: {
    marginTop: 4,
    fontSize: 20,
    textAlign: "center",
    lineHeight: 28,
    maxWidth: 340,
  },

  /* FAB */
  fabRoot: {
    position: "absolute",
    bottom: 40,
    right: 24,
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
  },

  waveRing: {
    position: "absolute",
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
  },

  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Android shadow
  },

  skipBottom: {
    position: "absolute",
    bottom: 50,
    left: 24,
    fontSize: 16,
  },
});