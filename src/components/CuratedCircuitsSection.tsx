import React from 'react';
import { CuratedCircuit } from '../types';
import { Clock, IndianRupee, MapPin, Check, ArrowRight } from 'lucide-react';

interface CuratedCircuitsSectionProps {
  circuits: CuratedCircuit[];
  onOpenCalculator: () => void;
}

export const CuratedCircuitsSection: React.FC<CuratedCircuitsSectionProps> = ({
  circuits,
  onOpenCalculator,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-orange-100 text-orange-800 text-xs font-bold tracking-wide uppercase mb-2">
          <span>Packaged Roadtrips &amp; Yatra Routes</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          Curated Thematic Circuits Across Maharashtra
        </h2>
        <p className="text-sm text-slate-600 mt-2">
          Pre-planned multi-destination roadtrips with route itineraries and estimated budget breakdowns.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {circuits.map((circuit) => (
          <div
            key={circuit.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Cover Image */}
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img
                  src={circuit.coverImage}
                  alt={circuit.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-white/95 text-slate-900 shadow-xs">
                    {circuit.bestFor}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{circuit.duration}</span>
                  </div>
                  <h3 className="text-lg font-bold font-display leading-snug text-white">
                    {circuit.title}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed">
                  {circuit.description}
                </p>

                {/* Route stops */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Circuit Route:
                  </h4>
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-700">
                    {circuit.route.map((stop, idx) => (
                      <React.Fragment key={idx}>
                        <span className="bg-slate-100 px-2 py-0.5 rounded-md text-[11px] font-semibold text-slate-800">
                          {stop}
                        </span>
                        {idx < circuit.route.length - 1 && (
                          <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Key Highlights */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Tour Highlights:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {circuit.highlights.slice(0, 3).map((high, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{high}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Cost Preview */}
            <div className="p-5 pt-0">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between mb-3 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block">
                    Budget Trip
                  </span>
                  <strong className="text-slate-800 font-bold text-sm">
                    ₹{circuit.estimatedCostPerPerson.budget.toLocaleString('en-IN')}
                  </strong>
                  <span className="text-[10px] text-slate-500"> / pax</span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-orange-600 font-semibold uppercase block">
                    Comfort Trip
                  </span>
                  <strong className="text-orange-700 font-bold text-sm">
                    ₹{circuit.estimatedCostPerPerson.comfort.toLocaleString('en-IN')}
                  </strong>
                  <span className="text-[10px] text-slate-500"> / pax</span>
                </div>
              </div>

              <button
                onClick={onOpenCalculator}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Calculate My Custom Group Cost</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
