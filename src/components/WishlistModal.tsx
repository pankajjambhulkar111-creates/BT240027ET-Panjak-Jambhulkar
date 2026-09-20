import React from 'react';
import { TouristPlace } from '../types';
import { X, Trash2, Heart, ArrowRight, IndianRupee, MapPin } from 'lucide-react';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedPlaces: TouristPlace[];
  onRemoveSave: (placeId: string) => void;
  onSelectPlace: (place: TouristPlace) => void;
  onCalculatePlace: (place: TouristPlace) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  savedPlaces,
  onRemoveSave,
  onSelectPlace,
  onCalculatePlace,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-2xl rounded-2xl md:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
            <h3 className="text-xl font-bold font-display">
              Saved Tourist Destinations ({savedPlaces.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-3">
          {savedPlaces.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3 stroke-1" />
              <p className="text-base font-semibold text-slate-700 mb-1">
                Your wishlist is currently empty
              </p>
              <p className="text-xs max-w-xs mx-auto">
                Click the heart icon on any place card to bookmark it for future travel plans.
              </p>
            </div>
          ) : (
            savedPlaces.map((place) => (
              <div
                key={place.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={place.imageUrl}
                    alt={place.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {place.name}
                    </h4>
                    <div className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                      <MapPin className="w-3 h-3 text-orange-500" />
                      <span>{place.district} • {place.category}</span>
                    </div>
                    <div className="text-xs font-semibold text-emerald-700">
                      Starting ~₹{place.costTier.budget.totalEstimate.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => {
                      onClose();
                      onCalculatePlace(place);
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-orange-100 hover:bg-orange-200 text-orange-800 transition-colors"
                  >
                    Calculate Cost
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onSelectPlace(place);
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onRemoveSave(place.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
