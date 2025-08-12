import Loader from "@/app/components/Loader";
import NewsCard from "@/app/components/NewsCard";
import React, { Suspense } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppData } from "../../context/AppDataProvider";
import useNews from "../../hooks/useNews";

const NewsScreen = () => {
  const {category} = useAppData();
  const {newsData, loadingNews, errorNews} = useNews(category);
  // Combined loading state
  if (loadingNews) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <Loader />
      </SafeAreaView>
    );
  }

  // Error states
  if (errorNews) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <Text className="text-red-500">Weather error: {errorNews}</Text>
      </SafeAreaView>
    );
  }


  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 py-8">
        <Text className="text-2xl font-bold text-gray-900 mb-6">
        Related News
        </Text>
        {/* fallback for no news */}
        {newsData?.articles.length === 0 ? (
          <Text className="text-center text-gray-500">
            No matching news for current weather.
          </Text>
        ) : (
          // flatlist to show the news cards
          <FlatList
            data={newsData?.articles}
            keyExtractor={(item, index) => `${item.url}-${index}`}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Suspense fallback={<Loader />}>
                <NewsCard item={item} />
              </Suspense>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default NewsScreen;