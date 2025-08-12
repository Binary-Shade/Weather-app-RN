import React from 'react'
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native'

const NewsCard = ({item}: {item: any}) => {
  return (
    <View className="mb-6 p-4 bg-gray-50 rounded-2xl shadow-sm">
        {item.source.name && (
          <Text className="text-xs text-gray-400 mb-1">
            {item.source.name}
          </Text>
        )}
        <Text className="text-lg font-semibold text-gray-800 mb-1">
          {item.title}
        </Text>
        <Text className="text-sm text-gray-500 mb-2">
          {item.description}
        </Text>
        {item.urlToImage ? <Image
            source={{ uri: item?.urlToImage }}
            className="w-full h-48 rounded-lg mb-2"
            resizeMode="cover"
          /> : <Text>Image not available</Text>}
        <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
          <Text className="text-blue-500 font-medium">Read More →</Text>
        </TouchableOpacity>
      </View>
  )
}

export default NewsCard