import { TouristPlace } from '../types';
import { hillStationPlaces } from './placesList1';
import { coastalPlaces } from './placesList2';
import { heritagePlaces } from './placesList3';
import { pilgrimagePlaces } from './placesList4';
import { wildlifeAndWonderPlaces } from './placesList5';

export const allTouristPlaces: TouristPlace[] = [
  ...hillStationPlaces,
  ...coastalPlaces,
  ...heritagePlaces,
  ...pilgrimagePlaces,
  ...wildlifeAndWonderPlaces,
];

export function getPlaceById(id: string): TouristPlace | undefined {
  return allTouristPlaces.find((p) => p.id === id);
}

export const allRegions = [
  'All Regions',
  'Western Ghats & Hills',
  'Konkan Coast',
  'Pune & Western Maharashtra',
  'Marathwada',
  'Vidarbha',
  'North Maharashtra (Khandesh)',
] as const;

export const allCategories = [
  'All Categories',
  'Hill Station',
  'Beach & Coastal',
  'Heritage Fort & Cave',
  'Pilgrimage & Spiritual',
  'Wildlife & Nature',
  'Culture & City',
] as const;
