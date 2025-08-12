import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Alert, Linking } from 'react-native';

interface LocationProp {
  latitude: number;
  longitude: number;
  city?: string;
}
// location hook function
export const useLocation = () => {
  const [location, setLocation] = useState<LocationProp | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status === 'granted';
    } catch (err) {
      console.warn('Permission request error:', err);
      return false;
    }
  };
// location services check function
  const checkLocationServices = async () => {
    try {
      const servicesEnabled = await Location.hasServicesEnabledAsync();
      if (!servicesEnabled) {
        Alert.alert(
          'Location Disabled',
          'Please enable location to continue',
          [
            { text: 'Cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() }
          ]
        );
        return false;
      }
      return true;
    } catch (err) {
      console.warn('Service check error:', err);
      return false;
    }
  };
// get city name functiopns
  const getCityName = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
      );
      const data = await response.json();
      return data.city || data.locality || '';
    } catch (err) {
      console.warn('Reverse geocoding error:', err);
      return '';
    }
  };

  const fetchLocation = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. Check location services
      const servicesEnabled = await checkLocationServices();
      if (!servicesEnabled) {
        setError('Location services are disabled');
        setLoading(false);
        return;
      }

      // 2. Request permissions
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        setError('Location permission denied');
        setLoading(false);
        return;
      }

      // 3. Get current position
      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        mayShowUserSettingsDialog: true,
      });

      const { latitude, longitude } = position.coords;
      const city = await getCityName(latitude, longitude);
      setLocation({ latitude, longitude, city });
      //  error handling
    } catch (err) {
      setError(err.message || 'Failed to get location');
      console.warn('Location fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return { 
    location, 
    error, 
    loading, 
    refresh: fetchLocation,
    requestPermission: requestLocationPermission
  };
};