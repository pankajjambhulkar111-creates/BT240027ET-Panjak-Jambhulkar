import React from 'react';
import { TouristPlace } from '../types';
import { MapPin, Clock, Calendar, Star, IndianRupee, Heart, ArrowUpRight, Scale } from 'lucide-react';

interface PlaceCardProps {
  place: TouristPlace;
  onSelect: (place: TouristPlace) => void;
  onCalculate: (place: TouristPlace) => void;
  isSaved: boolean;
  onToggleSave: (placeId: string) => void;
  isComparing: boolean;
  onToggleCompare: (placeId: string) => void;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({
  place,
  onSelect,
  onCalculate,
  isSaved,
  onToggleSave,
  isComparing,
  onToggleCompare,
}) => {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col">
      {/* Image & Badges */}
      <div className="relative h-52 sm:h-56 overflow-hidden bg-slate-100">
        <img
          src={place.imageUrl}
          alt={place.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/95 text-slate-800 backdrop-blur shadow-xs">
            {place.category}
          </span>

          <div className="flex items-center gap-1.5">
            {/* Compare Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(place.id);
              }}
              title={isComparing ? 'Remove from compare' : 'Add to compare'}
              className={`p-1.5 rounded-full backdrop-blur transition-all ${
                isComparing
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-black/40 text-white/90 hover:bg-black/60'
              }`}
            >
              <Scale className="w-4 h-4" />
            </button>

            {/* Bookmark Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(place.id);
              }}
              aria-label="Save place"
              className={`p-1.5 rounded-full backdrop-blur transition-all ${
                isSaved
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'bg-black/40 text-white/90 hover:bg-black/60'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
            </button>
          </div>
        </div>

        {/* Bottom Banner inside Image */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-amber-300 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-300" />
              <span>{place.rating.toFixed(1)}</span>
              <span className="text-white/70 font-normal">({place.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-white/90 bg-black/40 backdrop-blur px-2 py-0.5 rounded-sm">
              <Clock className="w-3 h-3 text-white/80" />
              <span>
                {place.idealDurationDays}D / {place.idealDurationNights}N
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* District & Region */}
          <div className="flex items-center gap-1 text-xs font-medium text-slate-500 mb-1">
            <MapPin className="w-3.5 h-3.5 text-orange-500" />
            <span>{place.district} Dist.</span>
            <span className="text-slate-300">•</span>
            <span>{place.region}</span>
          </div>

          {/* Place Title */}
          <div className="flex items-baseline justify-between gap-2 mb-1.5">
            <h3 className="text-lg font-bold text-slate-900 font-display group-hover:text-orange-600 transition-colors">
              {place.name}
            </h3>
            <span className="text-xs font-semibold text-slate-500 font-sans">
              {place.marathiName}
            </span>
          </div>

          {/* Tagline */}
          <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
            {place.tagline}
          </p>

          {/* Cost Preview Box */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 mb-4">
            <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 mb-1.5 flex items-center justify-between">
              <span>Estimated Trip Cost</span>
              <span className="text-emerald-700 font-bold lowercase text-[11px]">per person</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white p-2 rounded-lg border border-slate-200/60">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Budget</span>
                <div className="text-sm font-bold text-slate-800 flex items-center">
                  <IndianRupee className="w-3.5 h-3.5 text-slate-500 -mr-0.5" />
                  <span>{place.costTier.budget.totalEstimate.toLocaleString('en-IN')}</span>
                </div>
                <span className="text-[10px] text-slate-500">~₹{place.costTier.budget.perDay}/day</span>
              </div>

              <div className="bg-white p-2 rounded-lg border border-slate-200/60">
                <span className="text-[10px] text-orange-600 uppercase font-semibold block">Comfort</span>
                <div className="text-sm font-bold text-orange-700 flex items-center">
                  <IndianRupee className="w-3.5 h-3.5 text-orange-600 -mr-0.5" />
                  <span>{place.costTier.comfort.totalEstimate.toLocaleString('en-IN')}</span>
                </div>
                <span className="text-[10px] text-slate-500">~₹{place.costTier.comfort.perDay}/day</span>
              </div>
            </div>
          </div>

          {/* Best Season & Distances */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              <span>{place.bestSeason}</span>
            </div>
            <div className="text-right text-[11px]">
              <span>{place.distanceFromMumbaiKm} km from Mumbai</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => onSelect(place)}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white transition-colors"
          >
            <span>Details &amp; Plan</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onCalculate(place)}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200/80 transition-colors"
          >
            <IndianRupee className="w-3.5 h-3.5" />
            <span>Calculate Cost</span>
          </button>
        </div>
      </div>
    </div>
  );
};
