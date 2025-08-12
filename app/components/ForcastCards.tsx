import React from 'react'
import { Image, Text, View } from 'react-native'
import { getWeatherImage } from '../utils/weatherLib'

const ForcastCards = ({item, index, degree}: {item: any, index: number, degree: string}) => {
    // forcast cards funcationality
  return (
    <View key={index} className="bg-blue-50 rounded-xl p-4 mr-4 items-center w-24">
        <Text className="font-medium text-gray-700">{item.day}</Text>
        <Image
            source={getWeatherImage(item.condition, item.temp)}
            className="w-12 h-12 my-2"
            resizeMode="contain"
        />
        <Text className="text-gray-900 font-semibold">{Math.round(item.temp)}° {degree}</Text>
        <Text className="text-xs text-gray-500 capitalize">
            {item.condition.toLowerCase()}
        </Text>
    </View>
  )
}

export default ForcastCards