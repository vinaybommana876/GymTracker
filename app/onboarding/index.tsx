import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState, type ComponentProps } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
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
  withTiming,
} from "react-native-reanimated";

import { setOnboardingSeen } from "@/utils/onboardingStorage";
import { useTheme } from "@/hooks/use-theme";

const { width } = Dimensions.get("window");

const slides = [
  {
    variant: "text",
    title: "Empower Yourself With Quick Knowledge",
  },
  {
    variant: "visual",
    title: "Elevate Your Reading With Quick Insights",
    subtitle: "Get bite-sized summaries and learn faster.",
    icon: "book-open-variant",
    accent: "#60A5FA",
  },
  {
    variant: "human",
    title: "Stay Motivated And Achieve Goals",
    subtitle: "Build consistency and stay on track.",
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
        Empower{"\n"}Yourself With{"\n"}
        <Text style={{ color: theme.primary }}>Quick</Text>
      </Text>
    </View>
  );
}

function VisualSlide({ item }: any) {
  const theme = useTheme();

  return (
    <View style={styles.visualContainer}>
      {/* STACKED CARDS */}
      <View style={styles.stack}>
        <View
          style={[
            styles.stackCard,
            { transform: [{ rotate: "-8deg" }], backgroundColor: theme.secondary },
          ]}
        />
        <View
          style={[
            styles.stackCard,
            { transform: [{ rotate: "6deg" }], backgroundColor: theme.secondary },
          ]}
        />
        <View
          style={[
            styles.mainCard,
            { backgroundColor: item.accent },
          ]}
        />
      </View>

      <Text style={[styles.slideTitle, { color: theme.foreground }]}>
        {item.title}
      </Text>
      <Text style={[styles.slideSubtitle, { color: theme.mutedForeground }]}>
        {item.subtitle}
      </Text>
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

  const x = useSharedValue(0);
  const progress = useDerivedValue(() => x.value / width);

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
    opacity: withTiming(page === 0 ? 1 : 0.95, { duration: 300 }),
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
        contentContainerStyle={styles.scrollContent}
      >
        {slides.map((item, index) => (
          <View key={index} style={[styles.slide, { width }]}>
            <OnboardingSlide item={item} />
          </View>
        ))}
      </AnimatedScrollView>

      {/* FLOATING BUTTON */}
      <Pressable
        style={[styles.fab, { backgroundColor: theme.primary }]}
        onPress={handleNext}
      >
        <Text style={{ color: theme.primaryForeground, fontSize: 22 }}>→</Text>
      </Pressable>

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
    paddingTop: 48,
  },

  header: {
    paddingHorizontal: 20,
    marginBottom: 16,
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
    alignItems: "center",
  },

  slide: {
    paddingHorizontal: 24,
    justifyContent: "center",
  },

  /* TEXT */
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },

  bigTitle: {
    fontSize: 38,
    fontWeight: "800",
    lineHeight: 46,
  },

  /* VISUAL */
  visualContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
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
  },

  circleBg: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "#38BDF820",
  },

  imagePlaceholder: {
    width: 200,
    height: 220,
    borderRadius: 24,
  },

  /* TEXT COMMON */
  slideTitle: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
  },

  slideSubtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },

  /* FAB */
  fab: {
    position: "absolute",
    bottom: 40,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },

  skipBottom: {
    position: "absolute",
    bottom: 50,
    left: 24,
    fontSize: 16,
  },
});