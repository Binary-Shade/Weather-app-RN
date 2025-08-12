import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'

const TabLayout = () => {
  return (
        <Tabs screenOptions={{ headerShown: false, tabBarStyle: {height: 60} }}>
      <Tabs.Screen name="home/index"
        options={{
          title: "Home",
          headerTitle: "Home",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen name="news/index"
        options={{
          title: "News",
          headerTitle: "News",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="newspaper" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen name="profile/index"
        options={{
          title: "Profile",
          headerTitle: "Profile",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  )
}

export default TabLayout