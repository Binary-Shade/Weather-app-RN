import { useEffect, useState } from 'react';

const useWeather = (city: string) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);

  useEffect(() => {
    if (!city) {
      setError('Please provide a city name');
      setLoading(false);
      return;
    }

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiKey = process.env.WEATHER_APP_KEY;
        
        if(!apiKey){
          throw new Error('API key not found');
        }
    
        console.log("city inside hook",city);
        
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch weather data: ${response.status}`);
        }

        const data = await response.json();
        setWeatherData(data);
        setCountry(data.city.name);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return { weatherData, loading, error, country };
};

export default useWeather;