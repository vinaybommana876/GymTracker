import AsyncStorage from "@react-native-async-storage/async-storage";

const ONBOARDING_KEY = "hasSeenOnboarding";

/**
 * Mark onboarding as completed
 */
export const setOnboardingSeen = async (): Promise<void> => {
  try {
    await AsyncStorage.setItem(ONBOARDING_KEY, "true");
  } catch (error) {
    console.error("Error saving onboarding state:", error);
  }
};

/**
 * Check if onboarding was already completed
 */
export const getOnboardingSeen = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(ONBOARDING_KEY);
    return value === "true";
  } catch (error) {
    console.error("Error reading onboarding state:", error);
    return false;
  }
};

/**
 * (Optional) Reset onboarding — useful for testing
 */
export const resetOnboarding = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(ONBOARDING_KEY);
  } catch (error) {
    console.error("Error resetting onboarding state:", error);
  }
};