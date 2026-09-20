import React from 'react';
import { Search, MapPin, Sparkles, Filter, IndianRupee, Mountain, Waves, Landmark, Church, Trees } from 'lucide-react';
import { Region, Category } from '../types';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedRegion: string;
  setSelectedRegion: (r: string) => void;
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  selectedBudgetFilter: string;
  setSelectedBudgetFilter: (b: string) => void;
  regions: readonly string[];
  categories: readonly string[];
  totalPlacesCount: number;
  onOpenCalculatorWithPlace?: (placeId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  selectedRegion,
  setSelectedRegion,
  selectedCategory,
  setSelectedCategory,
  selectedBudgetFilter,
  setSelectedBudgetFilter,
  regions,
  categories,
  totalPlacesCount,
}) => {
  const quickCategoryIcons: Record<string, React.ReactNode> = {
    'Hill Station': <Mountain className="w-4 h-4" />,
    'Beach & Coastal': <Waves className="w-4 h-4" />,
    'Heritage Fort & Cave': <Landmark className="w-4 h-4" />,
    'Pilgrimage & Spiritual': <Church className="w-4 h-4" />,
    'Wildlife & Nature': <Trees className="w-4 h-4" />,
  };

  return (
    <div className="relative bg-gradient-to-b from-orange-50/60 via-white to-slate-50 border-b border-slate-200 pt-8 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Announcement */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/80 border border-orange-200/80 text-orange-900 text-xs font-semibold tracking-wide shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>Complete Maharashtra Tourism Guide &amp; Trip Cost Estimator</span>
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
            <span className="text-orange-700">२०२६ अद्यतन</span>
          </div>
        </div>

        {/* Heading & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-display tracking-tight leading-tight">
            Discover Maharashtra &amp; Plan Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">Trip Budget</span>
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Explore {totalPlacesCount}+ premier tourist destinations across the Sahyadri mountains, Konkan coast, historic Maratha forts, and holy Jyotirlingas with realistic itemized trip costs.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="max-w-4xl mx-auto bg-white p-3 sm:p-4 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search place, fort, beach, district (e.g. Mahabaleshwar, Scuba, Shirdi)..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-medium"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Region Dropdown */}
            <div className="md:col-span-4">
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full pl-9 pr-8 py-2.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-orange-500 font-medium cursor-pointer"
                >
                  {regions.map((reg) => (
                    <option key={reg} value={reg}>
                      {reg}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Budget Range Filter */}
            <div className="md:col-span-3">
              <div className="relative">
                <IndianRupee className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  value={selectedBudgetFilter}
                  onChange={(e) => setSelectedBudgetFilter(e.target.value)}
                  className="w-full pl-9 pr-8 py-2.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-orange-500 font-medium cursor-pointer"
                >
                  <option value="All Budgets">All Budgets</option>
                  <option value="under-3000">Budget (&lt; ₹3,000)</option>
                  <option value="3000-8000">Comfort (₹3,000 - ₹8,000)</option>
                  <option value="above-8000">Premium (&gt; ₹8,000)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quick Category Chips */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider pl-1 hidden sm:inline">
              Filter:
            </span>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-orange-600 text-white shadow-xs font-semibold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                  }`}
                >
                  {quickCategoryIcons[cat]}
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Highlights Metrics */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
          <div className="bg-white/70 backdrop-blur p-3 rounded-xl border border-slate-200/80 text-center">
            <div className="text-xl sm:text-2xl font-bold text-orange-600 font-display">350+</div>
            <div className="text-xs text-slate-500 font-medium">Historic Forts &amp; Citadels</div>
          </div>
          <div className="bg-white/70 backdrop-blur p-3 rounded-xl border border-slate-200/80 text-center">
            <div className="text-xl sm:text-2xl font-bold text-amber-600 font-display">720 km</div>
            <div className="text-xs text-slate-500 font-medium">Konkan Coastal Beaches</div>
          </div>
          <div className="bg-white/70 backdrop-blur p-3 rounded-xl border border-slate-200/80 text-center">
            <div className="text-xl sm:text-2xl font-bold text-emerald-600 font-display">5 of 12</div>
            <div className="text-xs text-slate-500 font-medium">Sacred Shiva Jyotirlingas</div>
          </div>
          <div className="bg-white/70 backdrop-blur p-3 rounded-xl border border-slate-200/80 text-center">
            <div className="text-xl sm:text-2xl font-bold text-blue-600 font-display">₹450+</div>
            <div className="text-xs text-slate-500 font-medium">Starting Trip Cost / Day</div>
          </div>
        </div>

      </div>
    </div>
  );
};
