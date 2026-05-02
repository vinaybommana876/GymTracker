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

const { width } = Dimensions.get("window");
const slides = [
  {
    title: "Track workouts with ease",
    subtitle: "Your progress, stats, and routines all in one place.",
    icon: "dumbbell",
    accent: "#4FD1C5",
  },
  {
    title: "Smart daily goals",
    subtitle: "Push your limits with gentle reminders and streak tracking.",
    icon: "target",
    accent: "#60A5FA",
  },
  {
    title: "Healthy nutrition support",
    subtitle: "Build better habits with meal logging and macro guidance.",
    icon: "food-apple",
    accent: "#F59E0B",
  },
  {
    title: "Live activity insights",
    subtitle: "See your performance in real time and stay motivated.",
    icon: "heart-pulse",
    accent: "#EA580C",
  },
  {
    title: "Built for every lifestyle",
    subtitle: "A clean, premium interface designed for fast action.",
    icon: "star-circle",
    accent: "#A855F7",
  },
];

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

function Dot({
  index,
  progress,
}: {
  index: number;
  progress: SharedValue<number>;
}) {
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

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return <Animated.View style={[styles.dot, animatedStyle]} />;
}

export default function OnboardingScreen() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const scrollRef = useRef<ScrollView | null>(null);
  const x = useSharedValue(0);
  const progress = useDerivedValue(() => x.value / width);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    x.value = event.contentOffset.x;
  });

  const handleNext = () => {
    if (page < slides.length - 1) {
      scrollRef.current?.scrollTo({ x: width * (page + 1), animated: true });
    } else {
      router.replace("/");
    }
  };

  const headerStyle = useAnimatedStyle(() => ({
    opacity: withTiming(page === 0 ? 1 : 0.95, { duration: 300 }),
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, headerStyle]}>
        <Text style={styles.skipText} onPress={() => router.replace("/")}>
          Skip
        </Text>
        <View style={styles.progressGroup}>
          {slides.map((_, index) => (
            <Dot key={index} index={index} progress={progress} />
          ))}
        </View>
      </Animated.View>

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
          <View key={item.title} style={[styles.slide, { width }]}>
            <View style={[styles.card, { borderColor: item.accent }]}>
              <Animated.View
                style={[
                  styles.iconWrapper,
                  { backgroundColor: item.accent + "20" },
                ]}
              >
                <MaterialCommunityIcons
                  name={
                    item.icon as ComponentProps<
                      typeof MaterialCommunityIcons
                    >["name"]
                  }
                  size={62}
                  color={item.accent}
                />
              </Animated.View>
              <Text style={styles.slideTitle}>{item.title}</Text>
              <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
              <View style={styles.badgeRow}>
                <View
                  style={[
                    styles.badge,
                    { backgroundColor: item.accent + "22" },
                  ]}
                >
                  <Text style={styles.badgeText}>Smooth UX</Text>
                </View>
                <View
                  style={[
                    styles.badge,
                    { backgroundColor: item.accent + "22" },
                  ]}
                >
                  <Text style={styles.badgeText}>Animated</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </AnimatedScrollView>

      <View style={styles.footer}>
        <Text style={styles.pageLabel}>
          Step {page + 1} of {slides.length}
        </Text>
        <Pressable style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {page === slides.length - 1 ? "Get Started" : "Next"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#060814",
    paddingTop: 48,
  },
  header: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  skipText: {
    color: "#9CA3AF",
    fontSize: 16,
    fontWeight: "600",
  },
  progressGroup: {
    flexDirection: "row",
    gap: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#38BDF8",
    marginHorizontal: 2,
  },
  scrollContent: {
    alignItems: "center",
  },
  slide: {
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  card: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 32,
    padding: 28,
    backgroundColor: "#0E1320",
    justifyContent: "center",
    gap: 22,
  },
  iconWrapper: {
    width: 130,
    height: 130,
    borderRadius: 44,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    shadowColor: "#38BDF8",
    shadowOpacity: 0.18,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 14 },
  },
  slideTitle: {
    color: "#F8FAFC",
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
  },
  slideSubtitle: {
    color: "#CBD5E1",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
  badgeRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  badgeText: {
    color: "#E0F2FE",
    fontSize: 13,
    fontWeight: "600",
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: "#060814",
    borderTopWidth: 1,
    borderTopColor: "#111827",
  },
  pageLabel: {
    color: "#94A3B8",
    textAlign: "center",
    marginBottom: 14,
    fontSize: 14,
    fontWeight: "600",
  },
  button: {
    width: "100%",
    backgroundColor: "#38BDF8",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#020617",
    fontSize: 17,
    fontWeight: "700",
  },
});
