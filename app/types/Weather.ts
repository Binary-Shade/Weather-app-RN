// Root response type
export interface ForecastResponse {
    city: City;
    cnt: number;
    cod: string;
    list: ForecastEntry[];
    message: number;
  }
  
  // City info
  export interface City {
    coord: Coord;
    country: string;
    id: number;
    name: string;
    population: number;
    sunrise: number;
    sunset: number;
    timezone: number;
  }
  
  // Coordinates
  export interface Coord {
    lat: number;
    lon: number;
  }
  
  // One forecast entry (3-hour step)
  export interface ForecastEntry {
    clouds: Clouds;
    dt: number;
    dt_txt: string; 
    main: MainWeather;
    pop: number; 
    rain?: Rain;
    snow?: Snow;
    sys: Sys;
    visibility: number;
    weather: Weather[];
    wind: Wind;
  }
  
  // Clouds percentage
  export interface Clouds {
    all: number;
  }
  
  // Temperature & pressure details
  export interface MainWeather {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  }
  
  // Rain data
  export interface Rain {
    ["1h"]?: number;
    ["3h"]?: number;
  }
  
  export interface Snow {
    ["1h"]?: number;
    ["3h"]?: number;
  }
  
  export interface Sys {
    pod: "d" | "n"; 
  }
  
  export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
  }
  
  export interface Wind {
    speed: number;
    deg: number;
    gust?: number;
  }
  