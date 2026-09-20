import React, { useState, useMemo, useEffect } from 'react';
import { allTouristPlaces, allRegions, allCategories } from './data/touristPlaces';
import { curatedCircuits } from './data/curatedCircuits';
import { TouristPlace } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PlaceCard } from './components/PlaceCard';
import { PlaceDetailModal } from './components/PlaceDetailModal';
import { TripCostCalculator } from './components/TripCostCalculator';
import { CuratedCircuitsSection } from './components/CuratedCircuitsSection';
import { FoodGuideModal } from './components/FoodGuideModal';
import { CompareModal } from './components/CompareModal';
import { WishlistModal } from './components/WishlistModal';
import {
  Compass,
  MapPin,
  IndianRupee,
  Calendar,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Sun,
  CloudRain,
  Snowflake
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'explore' | 'calculator' | 'circuits' | 'food'>('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedBudgetFilter, setSelectedBudgetFilter] = useState('All Budgets');

  // Selected place for modal detail view
  const [selectedPlace, setSelectedPlace] = useState<TouristPlace | null>(null);

  // Pre-selected place for calculator
  const [calculatorPlaceId, setCalculatorPlaceId] = useState<string>('mahabaleshwar');

  // Wishlist state (persisted in localStorage)
  const [savedPlaceIds, setSavedPlaceIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mh_tourism_wishlist');
      return saved ? JSON.parse(saved) : ['mahabaleshwar', 'tarkarli-malvan'];
    } catch {
      return ['mahabaleshwar', 'tarkarli-malvan'];
    }
  });

  // Compare state
  const [comparePlaceIds, setComparePlaceIds] = useState<string[]>([]);

  // Modals state
  const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mh_tourism_wishlist', JSON.stringify(savedPlaceIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedPlaceIds]);

  // Wishlist toggle handler
  const handleToggleSave = (placeId: string) => {
    setSavedPlaceIds((prev) =>
      prev.includes(placeId) ? prev.filter((id) => id !== placeId) : [...prev, placeId]
    );
  };

  // Compare toggle handler
  const handleToggleCompare = (placeId: string) => {
    setComparePlaceIds((prev) => {
      if (prev.includes(placeId)) {
        return prev.filter((id) => id !== placeId);
      }
      if (prev.length >= 3) {
        // limit to 3
        return [prev[1], prev[2], placeId];
      }
      return [...prev, placeId];
    });
  };

  // Filtered tourist places
  const filteredPlaces = useMemo(() => {
    return allTouristPlaces.filter((place) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = place.name.toLowerCase().includes(query);
        const matchesMarathi = place.marathiName.includes(query);
        const matchesDistrict = place.district.toLowerCase().includes(query);
        const matchesTagline = place.tagline.toLowerCase().includes(query);
        const matchesAttraction = place.topAttractions.some((a) =>
          a.name.toLowerCase().includes(query)
        );
        const matchesFood = place.localFoods.some((f) =>
          f.name.toLowerCase().includes(query)
        );

        if (
          !matchesName &&
          !matchesMarathi &&
          !matchesDistrict &&
          !matchesTagline &&
          !matchesAttraction &&
          !matchesFood
        ) {
          return false;
        }
      }

      // 2. Region Filter
      if (selectedRegion !== 'All Regions' && place.region !== selectedRegion) {
        return false;
      }

      // 3. Category Filter
      if (selectedCategory !== 'All Categories' && place.category !== selectedCategory) {
        return false;
      }

      // 4. Budget Filter
      if (selectedBudgetFilter === 'under-3000') {
        if (place.costTier.budget.totalEstimate > 3000) return false;
      } else if (selectedBudgetFilter === '3000-8000') {
        if (
          place.costTier.budget.totalEstimate > 8000 ||
          place.costTier.comfort.totalEstimate < 3000
        )
          return false;
      } else if (selectedBudgetFilter === 'above-8000') {
        if (place.costTier.comfort.totalEstimate < 8000) return false;
      }

      return true;
    });
  }, [searchQuery, selectedRegion, selectedCategory, selectedBudgetFilter]);

  // Saved objects
  const savedPlacesList = useMemo(() => {
    return allTouristPlaces.filter((p) => savedPlaceIds.includes(p.id));
  }, [savedPlaceIds]);

  // Compare objects
  const comparePlacesList = useMemo(() => {
    return allTouristPlaces.filter((p) => comparePlaceIds.includes(p.id));
  }, [comparePlaceIds]);

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedRegion('All Regions');
    setSelectedCategory('All Categories');
    setSelectedBudgetFilter('All Budgets');
  };

  // Open calculator with specific place
  const handleOpenCalculatorForPlace = (place: TouristPlace) => {
    setCalculatorPlaceId(place.id);
    setActiveTab('calculator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-orange-500 selection:text-white">
      
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'food') {
            setIsFoodModalOpen(true);
          } else {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        savedCount={savedPlaceIds.length}
        onOpenSaved={() => setIsWishlistModalOpen(true)}
        compareCount={comparePlaceIds.length}
        onOpenCompare={() => setIsCompareModalOpen(true)}
      />

      {/* MAIN CONTENT ROUTING */}
      <main className="flex-1">
        
        {/* TAB 1: EXPLORE PLACES */}
        {activeTab === 'explore' && (
          <div>
            {/* Hero & Search Header */}
            <HeroSection
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedBudgetFilter={selectedBudgetFilter}
              setSelectedBudgetFilter={setSelectedBudgetFilter}
              regions={allRegions}
              categories={allCategories}
              totalPlacesCount={allTouristPlaces.length}
            />

            {/* Places Grid Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
              
              {/* Section Sub-header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                    {selectedCategory === 'All Categories' ? 'All Tourist Spots' : selectedCategory} in{' '}
                    {selectedRegion === 'All Regions' ? 'Maharashtra' : selectedRegion}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Showing {filteredPlaces.length} of {allTouristPlaces.length} verified destinations with trip costs
                  </p>
                </div>

                {/* Reset filters button if any filter is active */}
                {(searchQuery ||
                  selectedRegion !== 'All Regions' ||
                  selectedCategory !== 'All Categories' ||
                  selectedBudgetFilter !== 'All Budgets') && (
                  <button
                    onClick={handleResetFilters}
                    className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-2xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset All Filters</span>
                  </button>
                )}
              </div>

              {/* Grid or Empty State */}
              {filteredPlaces.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 shadow-xs max-w-xl mx-auto">
                  <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto mb-4">
                    <Compass className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    No destinations match your filters
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
                    Try clearing your search query or selecting &quot;All Categories&quot; and &quot;All Regions&quot; to see all 30+ Maharashtra destinations.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-xs transition-all"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filteredPlaces.map((place) => (
                    <PlaceCard
                      key={place.id}
                      place={place}
                      onSelect={(p) => setSelectedPlace(p)}
                      onCalculate={(p) => handleOpenCalculatorForPlace(p)}
                      isSaved={savedPlaceIds.includes(place.id)}
                      onToggleSave={handleToggleSave}
                      isComparing={comparePlaceIds.includes(place.id)}
                      onToggleCompare={handleToggleCompare}
                    />
                  ))}
                </div>
              )}

              {/* Callout Banner to Cost Calculator */}
              <div className="mt-16 bg-gradient-to-r from-slate-900 via-slate-800 to-orange-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="max-w-xl">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-400/30 text-orange-300 text-xs font-semibold uppercase tracking-wider mb-3">
                    <IndianRupee className="w-3.5 h-3.5" />
                    <span>Personalized Budget Planner</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mb-2">
                    Need an exact budget for your family or group?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Use our interactive trip cost calculator to customize departure city, private cab vs train, room count, dining style, and activity passes.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('calculator');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="whitespace-nowrap px-6 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-sm font-bold shadow-lg shadow-orange-600/30 transition-all flex items-center gap-2"
                >
                  <span>Open Trip Cost Calculator</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Maharashtra Travel Seasons Advisory */}
              <div className="mt-16 pt-12 border-t border-slate-200">
                <div className="text-center max-w-2xl mx-auto mb-8">
                  <h3 className="text-xl font-bold font-display text-slate-900">
                    When to Visit Maharashtra: Seasonal Guide
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Plan according to geography: coastal humidity, Sahyadri monsoon, and pleasant winter getaways
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Monsoon */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                    <div className="flex items-center gap-2.5 mb-2 text-blue-600">
                      <CloudRain className="w-5 h-5" />
                      <h4 className="text-sm font-bold text-slate-900">
                        Monsoon (July – September)
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      Lush emerald landscapes, roaring waterfalls in Lonavala, Bhandardara, and Malshej Ghat. Best for Sahyadri fort treks and Kaas plateau flowers.
                    </p>
                    <span className="text-[11px] font-semibold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-md">
                      Recommended: Lonavala, Bhandardara, Sinhagad, Kaas
                    </span>
                  </div>

                  {/* Winter */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                    <div className="flex items-center gap-2.5 mb-2 text-amber-600">
                      <Snowflake className="w-5 h-5" />
                      <h4 className="text-sm font-bold text-slate-900">
                        Winter (October – February)
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      The golden season across all of Maharashtra. Ideal temperatures (12°C - 28°C) for Konkan scuba diving, strawberry picking, caves, and tiger safaris.
                    </p>
                    <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">
                      Recommended: Mahabaleshwar, Tarkarli, Ajanta-Ellora, Tadoba
                    </span>
                  </div>

                  {/* Summer */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                    <div className="flex items-center gap-2.5 mb-2 text-rose-600">
                      <Sun className="w-5 h-5" />
                      <h4 className="text-sm font-bold text-slate-900">
                        Summer (March – June)
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      Highland hill stations offer relief from coastal heat. Peak time for tiger sightings at Tadoba waterholes and Alphonso mango harvests in Ratnagiri.
                    </p>
                    <span className="text-[11px] font-semibold text-rose-800 bg-rose-50 px-2.5 py-1 rounded-md">
                      Recommended: Matheran, Mahabaleshwar, Tadoba Safari
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: TRIP COST CALCULATOR */}
        {activeTab === 'calculator' && (
          <TripCostCalculator
            places={allTouristPlaces}
            initialPlaceId={calculatorPlaceId}
            onSelectPlace={(place) => setSelectedPlace(place)}
          />
        )}

        {/* TAB 3: CURATED CIRCUITS */}
        {activeTab === 'circuits' && (
          <CuratedCircuitsSection
            circuits={curatedCircuits}
            onOpenCalculator={() => {
              setActiveTab('calculator');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-16 pt-12 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-800 text-xs">
            {/* Col 1 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white font-bold">
                  <Compass className="w-5 h-5" />
                </div>
                <span className="text-base font-bold text-white font-display">
                  Maharashtra<span className="text-orange-500">Yatra</span>
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Comprehensive guide to all tourist spots, hill stations, beaches, historic forts, and Jyotirlingas in Maharashtra with transparent, itemized trip cost calculations.
              </p>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                Key Regions
              </h4>
              <ul className="space-y-2 text-slate-400">
                <li>Western Ghats (Mahabaleshwar, Lonavala, Matheran)</li>
                <li>Konkan Coast (Alibaug, Tarkarli, Ganpatipule)</li>
                <li>Pune &amp; Sahyadri Forts (Sinhagad, Raigad, Shivneri)</li>
                <li>Marathwada &amp; Caves (Ajanta, Ellora, Daulatabad)</li>
                <li>Vidarbha Wildlife (Tadoba Tiger Reserve, Lonar Lake)</li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                Top Experiences
              </h4>
              <ul className="space-y-2 text-slate-400">
                <li>5 Sacred Shiva Jyotirlingas Pilgrimage</li>
                <li>Chhatrapati Shivaji Maharaj Forts Trail</li>
                <li>Scuba Diving &amp; Water Sports at Tarkarli</li>
                <li>Strawberry Farms of Mahabaleshwar</li>
                <li>Authentic Saoji, Malvani &amp; Kolhapuri Cuisine</li>
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                Trip Cost Assistance
              </h4>
              <p className="text-slate-400 leading-relaxed mb-3">
                All estimated budgets are verified against prevailing MSRTC bus fares, toll plazas, state hotel tariffs, and local ticket prices.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-[11px] text-emerald-400">
                ✓ Updated for 2026 travel season
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
            <div>
              © 2026 Maharashtra Tourism &amp; Trip Cost Guide. All rights reserved.
            </div>
            <div className="flex items-center gap-3">
              <span>जय महाराष्ट्र • Maharashtra Unlimited</span>
            </div>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {/* 1. Place Detail Modal */}
      <PlaceDetailModal
        place={selectedPlace}
        onClose={() => setSelectedPlace(null)}
        onOpenCalculator={(place) => handleOpenCalculatorForPlace(place)}
        isSaved={selectedPlace ? savedPlaceIds.includes(selectedPlace.id) : false}
        onToggleSave={handleToggleSave}
        isComparing={selectedPlace ? comparePlaceIds.includes(selectedPlace.id) : false}
        onToggleCompare={handleToggleCompare}
      />

      {/* 2. Food Guide Modal */}
      <FoodGuideModal
        isOpen={isFoodModalOpen}
        onClose={() => setIsFoodModalOpen(false)}
      />

      {/* 3. Compare Modal */}
      <CompareModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        comparePlaces={comparePlacesList}
        onRemovePlace={handleToggleCompare}
        onSelectPlace={(place) => setSelectedPlace(place)}
        onCalculatePlace={(place) => handleOpenCalculatorForPlace(place)}
      />

      {/* 4. Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistModalOpen}
        onClose={() => setIsWishlistModalOpen(false)}
        savedPlaces={savedPlacesList}
        onRemoveSave={handleToggleSave}
        onSelectPlace={(place) => setSelectedPlace(place)}
        onCalculatePlace={(place) => handleOpenCalculatorForPlace(place)}
      />

    </div>
  );
}
