import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/splash");
    }, 100);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View className="flex-1 bg-[#060814] items-center justify-center p-5">
      <ActivityIndicator size="large" color="#38BDF8" />
      <Text className="mt-4 text-[#E2E8F0] text-base">
        Loading...
      </Text>
    </View>
  );
}
