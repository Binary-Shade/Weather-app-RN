import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocation } from "./hooks/useLocation";

export default function GettingStarted() {
  const { location, error, loading } = useLocation();
  console.log(location);
  console.log(error);
  console.log(loading);
  return (
    <SafeAreaView className="flex-1 bg-blue-100">
      <View className="flex-1 items-center justify-center px-6">
        {/* Title */}
        <Text className="text-3xl font-bold text-black mb-4 text-center">
          Welcome to Wett Weather App
        </Text>
        {/* Weather Icon */}
        <Image
          source={require("../assets/images/static/weather.png")}
          className="w-64 h-64 mb-8"
          resizeMode="contain"
        />

        {/* Subtitle */}
        <Text className="text-lg text-black text-center mb-8">
          Your personal weather companion.  
          Stay updated on temperature, news, and more.
        </Text>

        {/* Get Started Button */}
        <TouchableOpacity
          className="bg-blue-500 px-8 py-3 rounded-full shadow-md"
          onPress={() => router.push("/(tabs)/home")}
        >
          <Text className="text-white font-semibold text-lg">
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
