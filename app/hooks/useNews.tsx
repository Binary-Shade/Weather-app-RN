import { useEffect, useState } from "react";
import { NewsApiResponse } from "../types/News";

const useNews = (query: string, enabled: boolean = true) => {
    const [newsData, setNewsData] = useState<NewsApiResponse | null>(null);
    const [loadingNews, setLoadingNews] = useState(true);
    const [errorNews, setErrorNews] = useState(null);
    useEffect(() => {
      if (!query) return;
      const fetchNews = async () => {
        setLoadingNews(true);
        setErrorNews(null);
        try {
          const apiKey = process.env.NEWS_API_KEY;
          if(!apiKey){
            throw new Error('API key not found');
          }
          const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&from=2025-08-10&to=2025-08-10&sortBy=popularity&apiKey=${apiKey}`;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Failed to fetch news data');
          }
          const data = await response.json();
          setNewsData(data);
        } catch (err: any) {
          setErrorNews(err.message);
        } finally {
          setLoadingNews(false);
        }
      };
      fetchNews();
    }, [query, enabled]);
    return { newsData, loadingNews, errorNews };
  };
  
  export default useNews;