import React from 'react';
import { Compass, Calculator, MapPin, Utensils, Heart, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: 'explore' | 'calculator' | 'circuits' | 'food';
  setActiveTab: (tab: 'explore' | 'calculator' | 'circuits' | 'food') => void;
  savedCount: number;
  onOpenSaved: () => void;
  onOpenCompare: () => void;
  compareCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  onOpenSaved,
  onOpenCompare,
  compareCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo & Brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('explore')}
          >
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl md:text-2xl font-bold font-display tracking-tight text-slate-900">
                  Maharashtra<span className="text-orange-600">Yatra</span>
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded-sm bg-orange-100 text-orange-700">
                  पर्यटन
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                All Tourist Places &amp; Trip Cost Guide
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/60">
            <button
              onClick={() => setActiveTab('explore')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'explore'
                  ? 'bg-white text-orange-600 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <MapPin className="w-4 h-4" />
              Explore Places
            </button>

            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'calculator'
                  ? 'bg-white text-orange-600 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Calculator className="w-4 h-4" />
              Trip Cost Calculator
            </button>

            <button
              onClick={() => setActiveTab('circuits')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'circuits'
                  ? 'bg-white text-orange-600 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Compass className="w-4 h-4" />
              Curated Circuits
            </button>

            <button
              onClick={() => setActiveTab('food')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'food'
                  ? 'bg-white text-orange-600 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Utensils className="w-4 h-4" />
              Food Guide
            </button>
          </nav>

          {/* Actions & Utilities */}
          <div className="flex items-center gap-2">
            {/* Compare Button */}
            <button
              onClick={onOpenCompare}
              className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                compareCount > 0
                  ? 'bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
              title="Compare Places & Costs"
            >
              <span>Compare</span>
              {compareCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-600 text-white text-[11px] flex items-center justify-center font-bold">
                  {compareCount}
                </span>
              )}
            </button>

            {/* Saved Wishlist Button */}
            <button
              onClick={onOpenSaved}
              className="relative p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-rose-600 transition-colors"
              aria-label="Wishlist"
              title="Saved Places"
            >
              <Heart className={`w-5 h-5 ${savedCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Currency Badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Real INR (₹) Costs</span>
            </div>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden overflow-x-auto py-2.5 gap-2 border-t border-slate-100 no-scrollbar">
          <button
            onClick={() => setActiveTab('explore')}
            className={`whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
              activeTab === 'explore'
                ? 'bg-orange-500 text-white font-semibold'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            All Places
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
              activeTab === 'calculator'
                ? 'bg-orange-500 text-white font-semibold'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            Cost Calculator
          </button>
          <button
            onClick={() => setActiveTab('circuits')}
            className={`whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
              activeTab === 'circuits'
                ? 'bg-orange-500 text-white font-semibold'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Circuits
          </button>
          <button
            onClick={() => setActiveTab('food')}
            className={`whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
              activeTab === 'food'
                ? 'bg-orange-500 text-white font-semibold'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            Food Guide
          </button>
        </div>
      </div>
    </header>
  );
};
