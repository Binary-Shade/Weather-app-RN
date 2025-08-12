import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'

const Loader = () => {
  return (
    <View>
      <ActivityIndicator size="large" color="#3b82f6" />
      <Text className="mt-4 text-gray-500">Loading...</Text>
    </View> 
  )
}

export default Loader