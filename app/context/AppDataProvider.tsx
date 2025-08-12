import React, { createContext, ReactNode, useCallback, useState } from "react";
import { useLocation } from "../hooks/useLocation";
import useWeather from "../hooks/useWeather";

// types
interface LocationContextType {
  name: string;
  email: string;
  updateName: (newName: string) => void;
  updateEmail: (newEmail: string) => void;
  location: string;
  updateLocation: (newLocation: string) => void;
  weatherData: any;
  category: string;
  updateCategory: (newCategory: string) => void;
  loading: boolean;
  error: string | null;
  degree: string;
  updateDegree: (newDegree: string) => void;
}

// initial values 
export const LocationContext = createContext<LocationContextType>({
  name: 'Mickasa Ackerman',
  email: 'mickasaackerman@gmail.com',
  updateName: () => {},
  updateEmail: () => {},
  location: 'bangalore',
  updateLocation: () => {},
  weatherData: null,
  category: 'win',
  updateCategory: () => {},
  loading: true,
  error: null,
  degree: 'C',
  updateDegree: () => {}
});

// provider main function
export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [manualLocation, setManualLocation] = useState<string>('bangalore');
  const [manualCategory, setManualCategory] = useState<string>('win');
  const [manualDegree, setManualDegree] = useState<string>('C');
  const [manualName, setManualName] = useState<string>('Mickasa Ackerman');
  const [manualEmail, setManualEmail] = useState<string>('mickasaackerman@gmail.com');
  console.log(manualDegree, manualCategory);
  
  // Get user's current location
  const { 
    location: userLocation, 
    error: locationError, 
    loading: locationLoading 
  } = useLocation();

  // Determine which location to use
  const currentLocation = userLocation?.city || manualLocation;

  // Fetch weather data
  const {
    weatherData,
    loading: weatherLoading,
    error: weatherError
  } = useWeather(currentLocation);

  // Determine news category
  const getNewsCategory = useCallback((temp: number) => {
    if (temp < 10) return 'war';
    if (temp > 30) return 'heat';
    return 'win';
  }, []);

  const autoCategory = getNewsCategory(weatherData?.list?.[0]?.main?.temp ?? 20);
  const currentCategory = manualCategory || autoCategory;

  // Update functions setters
  const updateLocation = useCallback((newLocation: string) => {
    setManualLocation(newLocation);
  }, []);

  const updateCategory = useCallback((newCategory: string) => {
    setManualCategory(newCategory);
  }, []);

  const updateDegree = useCallback((newDegree: string) => {
    setManualDegree(newDegree);
  }, []);

  const updateName = useCallback((newName: string) => {
    setManualName(newName);
  }, []);

  const updateEmail = useCallback((newEmail: string) => {
    setManualEmail(newEmail);
  }, []);

  return (
    <LocationContext.Provider value={{
      name: manualName,
      email: manualEmail,
      updateName,
      updateEmail,
      location: currentLocation,
      updateLocation,
      weatherData,
      category: currentCategory,
      updateCategory,
      loading: locationLoading || weatherLoading,
      error: locationError || weatherError,
      degree: manualDegree,
      updateDegree
    }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useAppData = () => {
  const context = React.useContext(LocationContext);
  if (!context) {
    throw new Error('useAppData must be used within a LocationProvider');
  }
  return context;
};