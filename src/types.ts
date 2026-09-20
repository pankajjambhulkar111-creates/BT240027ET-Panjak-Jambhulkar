export type Region = 
  | 'Konkan Coast'
  | 'Western Ghats & Hills'
  | 'Pune & Western Maharashtra'
  | 'Marathwada'
  | 'Vidarbha'
  | 'North Maharashtra (Khandesh)';

export type Category = 
  | 'Hill Station'
  | 'Beach & Coastal'
  | 'Heritage Fort & Cave'
  | 'Pilgrimage & Spiritual'
  | 'Wildlife & Nature'
  | 'Culture & City';

export type BestSeason = 'Monsoon (Jul-Sep)' | 'Winter (Oct-Feb)' | 'Summer (Mar-May)' | 'Year-Round';

export interface CostBreakdown {
  travel: number;       // To & fro travel estimate from Mumbai/Pune
  accommodation: number;// Stay per night
  food: number;         // Food per day
  sightseeing: number;  // Entry tickets, local guide, safari, tolls
  localTransport: number; // Auto, taxi, ferry, ropeway
}

export interface CostTier {
  budget: {
    totalEstimate: number; // Total for recommended duration
    perDay: number;
    description: string;
    stayType: string;
    travelType: string;
    foodType: string;
    breakdown: CostBreakdown;
  };
  comfort: {
    totalEstimate: number;
    perDay: number;
    description: string;
    stayType: string;
    travelType: string;
    foodType: string;
    breakdown: CostBreakdown;
  };
  luxury: {
    totalEstimate: number;
    perDay: number;
    description: string;
    stayType: string;
    travelType: string;
    foodType: string;
    breakdown: CostBreakdown;
  };
}

export interface AttractionSpot {
  name: string;
  description: string;
  entryFee: string;
  timings: string;
}

export interface LocalFoodItem {
  name: string;
  marathiName?: string;
  description: string;
  approxPrice: string;
  bestPlaceToTry: string;
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  estimatedDayCost: number;
}

export interface HowToReach {
  nearestAirport: string;
  nearestRailwayStation: string;
  byRoadFromMumbai: string;
  byRoadFromPune: string;
  stateTransportAvailable: boolean;
}

export interface TouristPlace {
  id: string;
  name: string;
  marathiName: string;
  district: string;
  region: Region;
  category: Category;
  tagline: string;
  description: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  idealDurationDays: number;
  idealDurationNights: number;
  bestSeason: BestSeason;
  bestMonths: string;
  costTier: CostTier;
  topAttractions: AttractionSpot[];
  localFoods: LocalFoodItem[];
  itinerary: ItineraryDay[];
  howToReach: HowToReach;
  insiderTips: string[];
  isPopularWeekendGetaway: boolean;
  distanceFromMumbaiKm: number;
  distanceFromPuneKm: number;
}

export interface CuratedCircuit {
  id: string;
  title: string;
  tagline: string;
  duration: string;
  route: string[];
  estimatedCostPerPerson: {
    budget: number;
    comfort: number;
  };
  bestFor: string;
  highlights: string[];
  description: string;
  coverImage: string;
}
