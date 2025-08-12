import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from '../utils/StylesLib'

const UnitCard = ({editing, handleUnitChange, draft}: {editing: boolean, handleUnitChange: (unit: string) => void, draft: {unit: string}}) => {
  return (
    <View style={styles.settingsCard}>
        <Text style={styles.sectionTitle}>Temperature Unit</Text>
        <View style={styles.unitOptions}>
            {(["C", "F"] as const).map((unit) => (
                    <TouchableOpacity
                      key={unit}
                      onPress={() => editing && handleUnitChange(unit)}
                      style={[
                        styles.unitOption,
                        draft.unit === unit 
                          ? styles.selectedUnit 
                          : styles.unselectedUnit,
                        !editing && styles.disabledCategory,
                      ]}
                      disabled={!editing}
                    >
                      <Text style={[
                        styles.unitText,
                        draft.unit === unit 
                          ? styles.selectedUnitText 
                          : styles.unselectedUnitText,
                      ]}>
                        °{unit}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
  )
}

export default UnitCard