// weather images
export const weatherImages = {
    Clouds: require("../../assets/weather/cloud.png"),
    HeavyRain: require("../../assets/weather/heavyrain.png"),
    Mist: require("../../assets/weather/mist.png"),
    PartlyCloudy: require("../../assets/weather/partlycloudy.png"),
    Rain: require("../../assets/weather/rain.png"),
    Sun: require("../../assets/weather/sun.png"),
  };


//   profile data
export const allCategories = [
    { id: "general", icon: "public" },
    { id: "business", icon: "business" },
    { id: "entertainment", icon: "movie" },
    { id: "health", icon: "favorite" },
    { id: "science", icon: "science" },
    { id: "sports", icon: "sports-soccer" },
    { id: "technology", icon: "computer" },
  ] as const;
  