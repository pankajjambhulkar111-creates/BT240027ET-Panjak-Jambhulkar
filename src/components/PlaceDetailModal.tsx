import React, { useState } from 'react';
import { TouristPlace } from '../types';
import {
  X,
  MapPin,
  Calendar,
  Clock,
  IndianRupee,
  Utensils,
  Compass,
  Navigation,
  CheckCircle2,
  Share2,
  Heart,
  Scale,
  Car,
  Hotel,
  Ticket,
  AlertCircle
} from 'lucide-react';

interface PlaceDetailModalProps {
  place: TouristPlace | null;
  onClose: () => void;
  onOpenCalculator: (place: TouristPlace) => void;
  isSaved: boolean;
  onToggleSave: (placeId: string) => void;
  isComparing: boolean;
  onToggleCompare: (placeId: string) => void;
}

export const PlaceDetailModal: React.FC<PlaceDetailModalProps> = ({
  place,
  onClose,
  onOpenCalculator,
  isSaved,
  onToggleSave,
  isComparing,
  onToggleCompare,
}) => {
  const [activeModalTab, setActiveModalTab] = useState<'costs' | 'itinerary' | 'attractions' | 'food' | 'reach'>('costs');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!place) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-4xl rounded-2xl md:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Top Hero Header Image */}
        <div className="relative h-64 sm:h-72 w-full shrink-0 bg-slate-900">
          <img
            src={place.imageUrl}
            alt={place.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/20" />

          {/* Close & Action Buttons */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur transition-all"
              title="Share Place"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => onToggleCompare(place.id)}
              className={`p-2 rounded-full backdrop-blur transition-all ${
                isComparing ? 'bg-amber-500 text-white' : 'bg-black/40 hover:bg-black/60 text-white'
              }`}
              title={isComparing ? 'Remove from Compare' : 'Add to Compare'}
            >
              <Scale className="w-4 h-4" />
            </button>

            <button
              onClick={() => onToggleSave(place.id)}
              className={`p-2 rounded-full backdrop-blur transition-all ${
                isSaved ? 'bg-rose-500 text-white' : 'bg-black/40 hover:bg-black/60 text-white'
              }`}
              title={isSaved ? 'Saved' : 'Save to Wishlist'}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur transition-all"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Badges on Top Left */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white text-slate-900 shadow-md">
              {place.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-600/90 text-white shadow-md">
              {place.region}
            </span>
          </div>

          {/* Place Title & Quick Metrics on Banner Bottom */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 text-sm text-amber-300 font-semibold mb-1">
                  <MapPin className="w-4 h-4" />
                  <span>{place.district} District, Maharashtra</span>
                  <span className="text-white/40">•</span>
                  <span className="text-white/90">{place.marathiName}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
                  {place.name}
                </h2>
              </div>

              {/* Quick Trip Duration & Season */}
              <div className="flex items-center gap-2 text-xs">
                <div className="px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur border border-white/10 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{place.idealDurationDays} Days / {place.idealDurationNights} Nights</span>
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur border border-white/10 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{place.bestSeason}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100/90 border-b border-slate-200 px-4 sm:px-6 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          <button
            onClick={() => setActiveModalTab('costs')}
            className={`flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
              activeModalTab === 'costs'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <IndianRupee className="w-4 h-4" />
            Trip Cost Breakdown
          </button>

          <button
            onClick={() => setActiveModalTab('itinerary')}
            className={`flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
              activeModalTab === 'itinerary'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Compass className="w-4 h-4" />
            Day-by-Day Itinerary
          </button>

          <button
            onClick={() => setActiveModalTab('attractions')}
            className={`flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
              activeModalTab === 'attractions'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            Top Attractions
          </button>

          <button
            onClick={() => setActiveModalTab('food')}
            className={`flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
              activeModalTab === 'food'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Utensils className="w-4 h-4" />
            Local Delicacies
          </button>

          <button
            onClick={() => setActiveModalTab('reach')}
            className={`flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
              activeModalTab === 'reach'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Navigation className="w-4 h-4" />
            How to Reach &amp; Tips
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Description Snippet */}
          <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <span className="font-semibold text-orange-900">About {place.name}: </span>
            {place.description}
          </div>

          {/* TAB 1: TRIP COST BREAKDOWN */}
          {activeModalTab === 'costs' && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Estimated Cost of Trip to {place.name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Benchmark estimates for {place.idealDurationDays} Days / {place.idealDurationNights} Nights per traveler
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenCalculator(place);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-orange-600 hover:bg-orange-700 text-white shadow-xs"
                  >
                    <IndianRupee className="w-3.5 h-3.5" />
                    Customize in Calculator
                  </button>
                </div>

                {/* 3 Tier Grid Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Budget Tier */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase bg-slate-100 text-slate-700">
                          Backpacker / Budget
                        </span>
                        <span className="text-xs text-slate-400">Solo / Budget</span>
                      </div>
                      <div className="text-2xl font-extrabold text-slate-900 font-display mb-1 flex items-baseline">
                        ₹{place.costTier.budget.totalEstimate.toLocaleString('en-IN')}
                        <span className="text-xs text-slate-500 font-normal ml-1">/ person</span>
                      </div>
                      <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                        {place.costTier.budget.description}
                      </p>

                      {/* Itemized breakdown */}
                      <div className="space-y-2 border-t border-slate-100 pt-3 text-xs">
                        <div className="flex justify-between text-slate-600">
                          <span className="flex items-center gap-1"><Car className="w-3 h-3 text-slate-400" /> Travel (Bus/Train):</span>
                          <span className="font-semibold text-slate-800">₹{place.costTier.budget.breakdown.travel}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span className="flex items-center gap-1"><Hotel className="w-3 h-3 text-slate-400" /> Stay (Homestay/MTDC):</span>
                          <span className="font-semibold text-slate-800">₹{place.costTier.budget.breakdown.accommodation}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span className="flex items-center gap-1"><Utensils className="w-3 h-3 text-slate-400" /> Meals (Thalis/Street):</span>
                          <span className="font-semibold text-slate-800">₹{place.costTier.budget.breakdown.food}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span className="flex items-center gap-1"><Ticket className="w-3 h-3 text-slate-400" /> Sightseeing / Entries:</span>
                          <span className="font-semibold text-slate-800">₹{place.costTier.budget.breakdown.sightseeing}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                      Average ~₹{place.costTier.budget.perDay}/day
                    </div>
                  </div>

                  {/* Comfort Tier (Recommended) */}
                  <div className="rounded-2xl border-2 border-orange-500 bg-orange-50/20 p-4 shadow-md flex flex-col justify-between relative">
                    <span className="absolute -top-3 right-4 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-orange-500 text-white shadow-xs">
                      Most Popular
                    </span>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase bg-orange-100 text-orange-800">
                          Comfort / Family
                        </span>
                        <span className="text-xs text-orange-600 font-semibold">Recommended</span>
                      </div>
                      <div className="text-2xl font-extrabold text-orange-700 font-display mb-1 flex items-baseline">
                        ₹{place.costTier.comfort.totalEstimate.toLocaleString('en-IN')}
                        <span className="text-xs text-slate-500 font-normal ml-1">/ person</span>
                      </div>
                      <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                        {place.costTier.comfort.description}
                      </p>

                      {/* Itemized breakdown */}
                      <div className="space-y-2 border-t border-orange-100 pt-3 text-xs">
                        <div className="flex justify-between text-slate-600">
                          <span className="flex items-center gap-1"><Car className="w-3 h-3 text-orange-500" /> Travel (Car/3AC):</span>
                          <span className="font-semibold text-slate-800">₹{place.costTier.comfort.breakdown.travel}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span className="flex items-center gap-1"><Hotel className="w-3 h-3 text-orange-500" /> Stay (3-Star Hotel):</span>
                          <span className="font-semibold text-slate-800">₹{place.costTier.comfort.breakdown.accommodation}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span className="flex items-center gap-1"><Utensils className="w-3 h-3 text-orange-500" /> Meals (Restaurants):</span>
                          <span className="font-semibold text-slate-800">₹{place.costTier.comfort.breakdown.food}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span className="flex items-center gap-1"><Ticket className="w-3 h-3 text-orange-500" /> Sightseeing / Guide:</span>
                          <span className="font-semibold text-slate-800">₹{place.costTier.comfort.breakdown.sightseeing}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-orange-100 text-[11px] text-orange-700 font-medium">
                      Average ~₹{place.costTier.comfort.perDay}/day
                    </div>
                  </div>

                  {/* Luxury Tier */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase bg-amber-100 text-amber-900">
                          Luxury / Premium
                        </span>
                        <span className="text-xs text-amber-700">Resort &amp; Spa</span>
                      </div>
                      <div className="text-2xl font-extrabold text-slate-900 font-display mb-1 flex items-baseline">
                        ₹{place.costTier.luxury.totalEstimate.toLocaleString('en-IN')}
                        <span className="text-xs text-slate-500 font-normal ml-1">/ person</span>
                      </div>
                      <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                        {place.costTier.luxury.description}
                      </p>

                      {/* Itemized breakdown */}
                      <div className="space-y-2 border-t border-slate-100 pt-3 text-xs">
                        <div className="flex justify-between text-slate-600">
                          <span className="flex items-center gap-1"><Car className="w-3 h-3 text-amber-600" /> Travel (SUV/Flight):</span>
                          <span className="font-semibold text-slate-800">₹{place.costTier.luxury.breakdown.travel}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span className="flex items-center gap-1"><Hotel className="w-3 h-3 text-amber-600" /> Stay (5-Star / Villa):</span>
                          <span className="font-semibold text-slate-800">₹{place.costTier.luxury.breakdown.accommodation}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span className="flex items-center gap-1"><Utensils className="w-3 h-3 text-amber-600" /> Meals (Fine Dining):</span>
                          <span className="font-semibold text-slate-800">₹{place.costTier.luxury.breakdown.food}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span className="flex items-center gap-1"><Ticket className="w-3 h-3 text-amber-600" /> VIP Pass / Safari:</span>
                          <span className="font-semibold text-slate-800">₹{place.costTier.luxury.breakdown.sightseeing}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                      Average ~₹{place.costTier.luxury.perDay}/day
                    </div>
                  </div>
                </div>
              </div>

              {/* Money Saving Insider Note */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-start gap-3 text-xs text-emerald-800">
                <AlertCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Budget Saving Pro-Tip: </span>
                  Traveling on weekdays (Tuesday-Thursday) can reduce resort and hotel rates by up to 35% compared to weekend rush tariffs. Booking MSRTC Shivshahi AC buses or intercity express trains saves significantly on toll taxes and petrol.
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DAY-BY-DAY ITINERARY */}
          {activeModalTab === 'itinerary' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-bold text-slate-900">
                  Recommended {place.idealDurationDays}-Day Itinerary
                </h3>
                <span className="text-xs text-slate-500">
                  Optimized for sightseeing flow &amp; local timings
                </span>
              </div>

              <div className="space-y-4">
                {place.itinerary.map((day) => (
                  <div
                    key={day.dayNumber}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2.5"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-orange-600 text-white text-xs font-bold flex items-center justify-center">
                          {day.dayNumber}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">
                          {day.title}
                        </h4>
                      </div>
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                        Est. Day Spend: ₹{day.estimatedDayCost}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200/60">
                        <span className="font-semibold text-amber-700 block mb-1">Morning:</span>
                        <p className="text-slate-600 leading-relaxed">{day.morning}</p>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200/60">
                        <span className="font-semibold text-orange-700 block mb-1">Afternoon:</span>
                        <p className="text-slate-600 leading-relaxed">{day.afternoon}</p>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200/60">
                        <span className="font-semibold text-indigo-700 block mb-1">Evening:</span>
                        <p className="text-slate-600 leading-relaxed">{day.evening}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TOP ATTRACTIONS */}
          {activeModalTab === 'attractions' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Must-Visit Tourist Spots in {place.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {place.topAttractions.map((spot, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-orange-300 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h4 className="text-sm font-bold text-slate-900">
                        {spot.name}
                      </h4>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm whitespace-nowrap">
                        {spot.entryFee}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mb-2 leading-relaxed">
                      {spot.description}
                    </p>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3" />
                      <span>{spot.timings}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: FAMOUS FOODS */}
          {activeModalTab === 'food' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-base font-bold text-slate-900">
                  Iconic Local Cuisine &amp; What to Eat
                </h3>
                <span className="text-xs text-orange-600 font-semibold">
                  Authentic Maharashtrian Flavors
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {place.localFoods.map((food, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200 bg-white flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-baseline justify-between gap-1 mb-1">
                        <h4 className="text-sm font-bold text-slate-900">
                          {food.name}
                        </h4>
                        <span className="text-xs font-bold text-orange-600 whitespace-nowrap">
                          {food.approxPrice}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                        {food.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                      <span className="font-semibold text-slate-700">Best spot: </span>
                      {food.bestPlaceToTry}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: HOW TO REACH & TIPS */}
          {activeModalTab === 'reach' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Transport Guide &amp; Distance
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60">
                  <span className="font-semibold text-slate-800 block mb-1">Nearest Airport:</span>
                  <p className="text-slate-600">{place.howToReach.nearestAirport}</p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60">
                  <span className="font-semibold text-slate-800 block mb-1">Nearest Railway Station:</span>
                  <p className="text-slate-600">{place.howToReach.nearestRailwayStation}</p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60">
                  <span className="font-semibold text-slate-800 block mb-1">From Mumbai:</span>
                  <p className="text-slate-600">{place.howToReach.byRoadFromMumbai} ({place.distanceFromMumbaiKm} km)</p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60">
                  <span className="font-semibold text-slate-800 block mb-1">From Pune:</span>
                  <p className="text-slate-600">{place.howToReach.byRoadFromPune} ({place.distanceFromPuneKm} km)</p>
                </div>
              </div>

              {/* Insider Tips List */}
              <div className="mt-4">
                <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-orange-600" />
                  Traveler Precautions &amp; Insider Tips
                </h4>
                <ul className="space-y-2 text-xs text-slate-600">
                  {place.insiderTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-amber-50/40 p-2.5 rounded-lg border border-amber-100">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-600">
            <span>Starting cost from </span>
            <span className="font-bold text-slate-900 text-sm">
              ₹{place.costTier.budget.totalEstimate.toLocaleString('en-IN')}
            </span>
            <span> for {place.idealDurationDays} days</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-100 text-slate-700"
            >
              Close
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenCalculator(place);
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-orange-600 hover:bg-orange-700 text-white shadow-xs"
            >
              <IndianRupee className="w-3.5 h-3.5" />
              <span>Calculate Custom Trip Cost</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
