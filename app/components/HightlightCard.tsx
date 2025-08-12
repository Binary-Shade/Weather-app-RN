import React from 'react'
import { Text, View } from 'react-native'

const HightlightCard = ({weatherData, degree}: {weatherData: any, degree: string}) => {
  return (
    <View className="bg-gray-50 rounded-2xl p-6 mb-8">
          <Text className="text-base font-semibold text-gray-900 mb-4">
            Today&apos;s Highlights
          </Text>
          <View className="flex-row justify-between">
            <View className="flex-1 items-center">
              <Text className="text-sm text-gray-500">Humidity</Text>
              <Text className="text-lg font-bold text-gray-900">
                {weatherData?.list[0].main.humidity}%
              </Text>
            </View>
            <View className="flex-1 items-center">
              <Text className="text-sm text-gray-500">Wind</Text>
              <Text className="text-lg font-bold text-gray-900">
                {Math.round(weatherData?.list[0].wind.speed * 3.6)} km/h
              </Text>
            </View>
            <View className="flex-1 items-center">
              <Text className="text-sm text-gray-500">Feels Like</Text>
              <Text className="text-lg font-bold text-gray-900">
                {Math.round(weatherData?.list[0].main.feels_like)}° {degree}
              </Text>
            </View>
          </View>
        </View>
  )
}

export default HightlightCard