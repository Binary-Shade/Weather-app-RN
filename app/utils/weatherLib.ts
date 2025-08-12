import { weatherImages } from "../data/weatherData";
// 
// celsius to fahrenheit
// 
export const celsiusToFahrenheit = (celsius: number) => {
    return (celsius * 9/5) + 32;
};

// 
// Helper function to get weather image
// 
export const getWeatherImage = (condition: string, temp: number) => {
    if (weatherImages[condition as keyof typeof weatherImages]) {
      return weatherImages[condition as keyof typeof weatherImages];
    }
    if (temp < 0) {
      return weatherImages.Sun;
    } else if (temp < 10) {
      return weatherImages.PartlyCloudy;
    } else if (temp > 30) {
      return weatherImages.Rain;
    } else {
      return weatherImages.Sun;
    }
};
