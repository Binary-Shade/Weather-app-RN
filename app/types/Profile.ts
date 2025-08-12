import { allCategories } from "../data/weatherData";

export interface UserProfile {
    name: string;
    email: string;
    avatar?: string; 
    unit: string;
    categories: string[];
}

export type Category = typeof allCategories[number];
