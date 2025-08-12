import CategoryCard from "@/app/components/CategoryCard";
import UnitCard from "@/app/components/UnitCard";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppData } from "../../context/AppDataProvider";
import { allCategories } from "../../data/weatherData";
import { Category, UserProfile } from "../../types/Profile";
import { styles } from '../../utils/StylesLib';

const SettingsScreen = () => {
  const {updateCategory, updateDegree, updateName, updateEmail, name, email, category, degree} = useAppData();
  // Local state for profile data
  const [profile, setProfile] = useState<UserProfile>({
    name: name,
    email: email,
    unit: degree,
    categories: [category]
  });
  // states
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile);
  const [activeCategory, setActiveCategory] = useState("general");
  
  const toggleCategory = (catId: string) => {
    setDraft(prev => ({
      ...prev,
      categories: [catId]
    }));
    setActiveCategory(catId);
  };

  const handleUnitChange = (unit: string) => {
    setDraft(prev => ({
      ...prev,
      unit  
    }));
  };

  const saveChanges = () => {
    setProfile(draft);
    setEditing(false);
    if (draft.categories.length > 0) {
      setActiveCategory(draft.categories[0]);
      updateCategory(draft.categories[0]);
    }
    updateDegree(draft.unit);
    updateName(draft.name);
    updateEmail(draft.email);
  };

  const cancelEditing = () => {
    setDraft(profile);
    setEditing(false);
  };

  const renderCategory = (category: Category) => {
    const isSelected = draft.categories.includes(category.id);
    const isActive = activeCategory === category.id;
    
    return (
      <CategoryCard
        key={category.id} 
        category={category}
        editing={editing}
        toggleCategory={toggleCategory}
        isSelected={isSelected}
        isActive={isActive}
      />  
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            {/* profile avatar sections */}
            <Image
              source={require("@/assets/images/static/profile.jpg")}
              style={styles.avatar}
            />
            {/* profile edit badge */}
            {editing && (
              <View style={styles.editBadge}>
                <Ionicons name="pencil" size={20} color="white" />
              </View>
            )}
          </View>
          
          {/* profile name and email sections */}
          {editing ? (
            <>
              <TextInput
                value={draft.name}
                onChangeText={(t) => setDraft({ ...draft, name: t })}
                style={styles.nameInput}
                placeholder="Your Name"
              />
              <TextInput
                value={draft.email}
                onChangeText={(t) => setDraft({ ...draft, email: t })}
                style={styles.emailInput}
                placeholder="E-mail"
                keyboardType="email-address"
              />
            </>
          ) : (
            <>
              <Text style={styles.profileName}>{profile.name}</Text>
              <Text style={styles.profileEmail}>{profile.email}</Text>
            </>
          )}
        </View>

        {/* Settings Sections */}
        <View style={styles.settingsContainer}>
          {/* Temperature Unit Section */}
          <UnitCard
            editing={editing}
            handleUnitChange={handleUnitChange}
            draft={draft}
          />

          {/* News Categories Section */}
          <View style={styles.settingsCard}>
            <Text style={styles.sectionTitle}>News Categories</Text>
            <Text style={styles.sectionSubtitle}>Select your preferred news topics</Text>
            <View style={styles.categoriesContainer}>
              {allCategories.map(renderCategory)}
            </View>
          </View>
        </View>
        <Text className="text-center text-xs text-gray-500 uppercase mt-5">made with ❤️ by Suresh K</Text>
        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          {editing ? (
            <View style={styles.editButtons}>
              <TouchableOpacity
                onPress={cancelEditing}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={saveChanges}
                style={styles.saveButton}
              >
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => setEditing(true)}
              style={styles.editButton}
            >
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}



export default SettingsScreen;