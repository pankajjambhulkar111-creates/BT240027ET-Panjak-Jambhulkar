import React from 'react';
import { TouristPlace } from '../types';
import { X, Trash2, IndianRupee, MapPin, Calendar, Clock, Star, ArrowRight } from 'lucide-react';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  comparePlaces: TouristPlace[];
  onRemovePlace: (placeId: string) => void;
  onSelectPlace: (place: TouristPlace) => void;
  onCalculatePlace: (place: TouristPlace) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  comparePlaces,
  onRemovePlace,
  onSelectPlace,
  onCalculatePlace,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-5xl rounded-2xl md:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div>
            <h3 className="text-xl font-bold font-display">
              Side-by-Side Place &amp; Trip Cost Comparison
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Comparing {comparePlaces.length} destination{comparePlaces.length > 1 ? 's' : ''} (up to 3 places)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-x-auto flex-1">
          {comparePlaces.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              <p className="text-base font-semibold text-slate-700 mb-1">
                No places selected for comparison yet
              </p>
              <p className="text-xs max-w-sm mx-auto">
                Click the scale icon on any place card to add it to this side-by-side comparison table.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 min-w-[650px]">
              {comparePlaces.map((place) => (
                <div
                  key={place.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 flex flex-col justify-between"
                >
                  <div>
                    {/* Header Image & Remove */}
                    <div className="relative h-40 rounded-xl overflow-hidden mb-3 bg-slate-200">
                      <img
                        src={place.imageUrl}
                        alt={place.name}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => onRemovePlace(place.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-red-600 transition-colors"
                        title="Remove from comparison"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/95 text-slate-900">
                        {place.category}
                      </div>
                    </div>

                    <h4 className="text-lg font-bold text-slate-900 font-display mb-0.5">
                      {place.name}
                    </h4>
                    <div className="text-xs text-slate-500 font-medium mb-3 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-orange-500" />
                      <span>{place.district} ({place.region})</span>
                    </div>

                    {/* Comparison Fields */}
                    <div className="space-y-3 text-xs divide-y divide-slate-200/80">
                      {/* Budget Comparison */}
                      <div className="pt-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Estimated Costs:
                        </span>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-white p-2 rounded-lg border border-slate-200">
                            <span className="text-[10px] text-slate-500 block">Budget</span>
                            <strong className="text-slate-900">
                              ₹{place.costTier.budget.totalEstimate.toLocaleString('en-IN')}
                            </strong>
                          </div>
                          <div className="bg-orange-50 p-2 rounded-lg border border-orange-200">
                            <span className="text-[10px] text-orange-600 block font-semibold">Comfort</span>
                            <strong className="text-orange-700">
                              ₹{place.costTier.comfort.totalEstimate.toLocaleString('en-IN')}
                            </strong>
                          </div>
                        </div>
                      </div>

                      {/* Duration & Season */}
                      <div className="pt-2 flex justify-between text-slate-700">
                        <span className="text-slate-500">Ideal Duration:</span>
                        <strong className="font-semibold">{place.idealDurationDays}D / {place.idealDurationNights}N</strong>
                      </div>

                      <div className="pt-2 flex justify-between text-slate-700">
                        <span className="text-slate-500">Best Season:</span>
                        <strong className="font-semibold">{place.bestSeason}</strong>
                      </div>

                      {/* Distance */}
                      <div className="pt-2 flex justify-between text-slate-700">
                        <span className="text-slate-500">From Mumbai:</span>
                        <strong>{place.distanceFromMumbaiKm} km</strong>
                      </div>

                      <div className="pt-2 flex justify-between text-slate-700">
                        <span className="text-slate-500">From Pune:</span>
                        <strong>{place.distanceFromPuneKm} km</strong>
                      </div>

                      {/* Top Spots */}
                      <div className="pt-2">
                        <span className="text-slate-500 block mb-1">Key Attractions:</span>
                        <ul className="list-disc list-inside text-slate-700 space-y-0.5 text-[11px]">
                          {place.topAttractions.slice(0, 3).map((a, i) => (
                            <li key={i} className="truncate">{a.name}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-slate-200 space-y-2">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectPlace(place);
                      }}
                      className="w-full py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800"
                    >
                      View Full Details
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        onCalculatePlace(place);
                      }}
                      className="w-full py-2 rounded-xl text-xs font-semibold bg-orange-100 text-orange-800 hover:bg-orange-200"
                    >
                      Calculate Cost
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800"
          >
            Done Comparing
          </button>
        </div>

      </div>
    </div>
  );
};
