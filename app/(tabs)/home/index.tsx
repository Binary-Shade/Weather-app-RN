import ForcastCards from "@/app/components/ForcastCards";
import HightlightCard from "@/app/components/HightlightCard";
import Loader from "@/app/components/Loader";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppData } from "../../context/AppDataProvider";
import { celsiusToFahrenheit, getWeatherImage } from "../../utils/weatherLib";

const Home = () => {
  const { 
    location, 
    weatherData, 
    loading,
    error,
    degree
  } = useAppData();
  
  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <Loader />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <Text className="text-red-500">{error}</Text>
      </SafeAreaView>
    );
  }

  if (!weatherData) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <Text>No weather data available</Text>
      </SafeAreaView>
    );
  }

  // current weather setter
  const currentWeather = {
    location: location,
    temperature: degree === 'C' ? weatherData?.list[0].main.temp : celsiusToFahrenheit(weatherData?.list[0].main.temp),
    condition: weatherData?.list[0].weather[0].main,
    high: weatherData?.list[0].main.temp_max,
    low: weatherData?.list[0].main.temp_min,
  };

  // forecast setter
  const forecast = weatherData?.list
  // Filter to get one forecast per day (every 8 items since OpenWeatherMap provides 3-hour intervals)
  .filter((item: any, index: number) => index % 8 === 0)
  .slice(0, 5) // Get next 5 days
  .map((item: any, index: number) => {
    const date = new Date(item.dt * 1000); // Note: Multiply by 1000, not 2000
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    
    return {
      day: dayName,
      temp: degree === 'C' ? item.main.temp : celsiusToFahrenheit(item.main.temp),
      condition: item.weather[0].main
    };
  });

  // current weather image setter
  const currentImage = getWeatherImage(
    currentWeather.condition, 
    currentWeather.temperature
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-6" showsVerticalScrollIndicator={false}>
        {/* Location of the place  */}
        <View className="mt-6">
          <Text className="text-lg text-gray-500">Current Location</Text>
          <Text className="text-2xl font-bold text-gray-900">
            {currentWeather.location}
          </Text>
        </View>
        {/* Current Weather show*/}
        <View className="items-center my-8">
          <Image
            source={currentImage}
            className="w-36 h-36"
            resizeMode="contain"
          />
          <Text className="text-6xl font-bold text-gray-900 mt-4">
            {Math.round(currentWeather.temperature)}° {degree}
          </Text>
          <Text className="text-lg text-gray-500 capitalize">
            {currentWeather.condition.toLowerCase()}
          </Text>
          <Text className="text-sm text-gray-400 mt-1">
            H: {Math.round(currentWeather.high)}° {degree}  L: {Math.round(currentWeather.low)}° {degree}
          </Text>   
        </View>

        {/* Forecast of 5 days*/}
        <Text className="text-lg font-semibold text-gray-900 mb-4">
          5-Day Forecast
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8">
          {forecast.map((item: any, index: number) => (
            <ForcastCards key={index} item={item} index={index} degree={degree} />
          ))}
        </ScrollView>

        {/* Additional Info Hightlight card*/}
        <HightlightCard weatherData={weatherData} degree={degree} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;