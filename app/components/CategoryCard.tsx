import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
 
import { MaterialIcons } from '@expo/vector-icons'
import { Category } from '../types/Profile'

const CategoryCard = ({category, editing, toggleCategory, isSelected, isActive}: {category: Category, editing: boolean, toggleCategory: (catId: string) => void, isSelected: boolean, isActive: boolean}) => {
  return (
    <View>
      <TouchableOpacity
        key={category.id}
        onPress={() => editing && toggleCategory(category.id)}
        disabled={!editing}
        style={[
          styles.categoryItem,
          isSelected && styles.selectedCategory,
          isActive && styles.activeCategory,
          !editing && styles.disabledCategory,
        ]}
      >
        <MaterialIcons
          name={category.icon}
          size={20}
          color={isSelected || isActive ? '#fff' : '#6B7280'}
          style={styles.categoryIcon}
        />
        <Text style={[
          styles.categoryText,
          (isSelected || isActive) && styles.activeCategoryText
        ]}>
          {category.id.charAt(0).toUpperCase() + category.id.slice(1)}
        </Text>
      </TouchableOpacity>   
    </View>
  )
}

export default CategoryCard

const styles = StyleSheet.create({
    categoryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        backgroundColor: '#F3F4F6',
      },
      selectedCategory: {
        backgroundColor: '#3B82F6',
        borderColor: '#3B82F6',
      },
      activeCategory: {
        backgroundColor: '#1D4ED8',
        borderColor: '#1D4ED8',
      },
      disabledCategory: {
        opacity: 0.7,
      },
      categoryIcon: {
        marginRight: 6,
      },
      categoryText: {
        fontSize: 14,
        color: '#4B5563',
      },
      activeCategoryText: {
        color: '#FFFFFF',
        fontWeight: '500',
      },  
})