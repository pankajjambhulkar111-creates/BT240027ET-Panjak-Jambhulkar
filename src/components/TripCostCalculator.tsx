import React, { useState, useMemo } from 'react';
import { TouristPlace } from '../types';
import {
  IndianRupee,
  Users,
  Calendar,
  Car,
  Hotel,
  Utensils,
  Ticket,
  Sparkles,
  Printer,
  Check,
  RefreshCw,
  Info,
  MapPin
} from 'lucide-react';

interface TripCostCalculatorProps {
  places: TouristPlace[];
  initialPlaceId?: string;
  onSelectPlace?: (place: TouristPlace) => void;
}

export const TripCostCalculator: React.FC<TripCostCalculatorProps> = ({
  places,
  initialPlaceId,
  onSelectPlace,
}) => {
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>(
    initialPlaceId || (places.length > 0 ? places[0].id : 'mahabaleshwar')
  );

  const [startingCity, setStartingCity] = useState<'Mumbai' | 'Pune' | 'Nagpur' | 'Nashik'>('Mumbai');
  const [adultsCount, setAdultsCount] = useState<number>(2);
  const [kidsCount, setKidsCount] = useState<number>(0);
  const [daysCount, setDaysCount] = useState<number>(2);

  const [travelMode, setTravelMode] = useState<'msrtc' | 'express_train' | 'personal_car' | 'private_cab'>('personal_car');
  const [stayClass, setStayClass] = useState<'budget' | 'comfort' | 'luxury'>('comfort');
  const [foodClass, setFoodClass] = useState<'budget' | 'comfort' | 'luxury'>('comfort');

  const [includeGuide, setIncludeGuide] = useState<boolean>(false);
  const [includeActivities, setIncludeActivities] = useState<boolean>(true);
  const [shoppingBuffer, setShoppingBuffer] = useState<number>(1000);

  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  // Find the selected place
  const selectedPlace = useMemo(() => {
    return places.find((p) => p.id === selectedPlaceId) || places[0];
  }, [places, selectedPlaceId]);

  // Compute Distance based on starting city
  const distanceKm = useMemo(() => {
    if (!selectedPlace) return 150;
    if (startingCity === 'Mumbai') {
      return selectedPlace.distanceFromMumbaiKm || 100;
    }
    if (startingCity === 'Pune') {
      return selectedPlace.distanceFromPuneKm || 100;
    }
    if (startingCity === 'Nagpur') {
      if (selectedPlace.region === 'Vidarbha') return 120;
      return 650;
    }
    // Nashik
    if (selectedPlace.id === 'trimbakeshwar' || selectedPlace.id === 'shirdi') return 50;
    return 220;
  }, [selectedPlace, startingCity]);

  // Nights calculation: 1 day = 0 nights (Day trip)
  const nightsCount = daysCount > 1 ? daysCount - 1 : 0;
  const roomsNeeded = Math.ceil(adultsCount / 2);
  const totalTravelers = adultsCount + kidsCount;

  // Calculation Logic
  const costCalculation = useMemo(() => {
    // 1. Travel Cost
    let transportCost = 0;
    const roundTripKm = distanceKm * 2;

    switch (travelMode) {
      case 'msrtc': // State transport bus / ordinary train
        // Approx ₹1.2 per km per adult, ₹0.6 per kid
        transportCost = (adultsCount * 1.2 + kidsCount * 0.6) * roundTripKm + 100 * totalTravelers;
        break;
      case 'express_train': // 3AC / Vande Bharat
        transportCost = (adultsCount * 2.2 + kidsCount * 1.1) * roundTripKm + 200 * totalTravelers;
        break;
      case 'personal_car': // Petrol + Tolls
        // Mileage ~15 km/l @ ₹105/L + Tolls (~₹400-800 for highway)
        const fuelCost = (roundTripKm / 14) * 105;
        const tolls = roundTripKm > 200 ? 550 : 250;
        transportCost = fuelCost + tolls;
        break;
      case 'private_cab': // Commercial AC cab
        // ₹16/km + driver batta ₹400/day
        transportCost = Math.max(roundTripKm, 250 * daysCount) * 16 + daysCount * 400;
        break;
    }

    // 2. Accommodation Cost
    let roomRatePerNight = 0;
    if (nightsCount > 0) {
      switch (stayClass) {
        case 'budget':
          roomRatePerNight = 1200;
          break;
        case 'comfort':
          roomRatePerNight = 3200;
          break;
        case 'luxury':
          roomRatePerNight = 8500;
          break;
      }
    }
    const accommodationCost = roomRatePerNight * roomsNeeded * nightsCount;

    // 3. Food Cost
    let foodRatePerPersonDay = 0;
    switch (foodClass) {
      case 'budget':
        foodRatePerPersonDay = 350;
        break;
      case 'comfort':
        foodRatePerPersonDay = 750;
        break;
      case 'luxury':
        foodRatePerPersonDay = 1600;
        break;
    }
    const foodCost = (adultsCount * foodRatePerPersonDay + kidsCount * (foodRatePerPersonDay * 0.6)) * daysCount;

    // 4. Sightseeing & Entry Passes
    // Base entries per place
    let baseEntryPerPerson = 150;
    if (selectedPlace?.category === 'Heritage Fort & Cave') baseEntryPerPerson = 250;
    if (selectedPlace?.category === 'Wildlife & Nature') baseEntryPerPerson = 800; // Safari / reserve fees
    const sightseeingCost = baseEntryPerPerson * totalTravelers * (daysCount > 1 ? 1.5 : 1);

    // 5. Add-ons: Guide & Activities
    const guideCost = includeGuide ? 800 * daysCount : 0;
    let activityCost = 0;
    if (includeActivities) {
      // Activity cost depends on place type (e.g. Scuba in Tarkarli, Boat in Mahabaleshwar, Ropeway in Raigad)
      if (selectedPlace?.id === 'tarkarli-malvan') {
        activityCost = 1500 * adultsCount; // Scuba
      } else if (selectedPlace?.id === 'tadoba-andhari') {
        activityCost = 2500; // Shared gypsy
      } else if (selectedPlace?.id === 'raigad-fort') {
        activityCost = 350 * totalTravelers; // Ropeway
      } else {
        activityCost = 400 * totalTravelers; // Boating / water scooter
      }
    }

    // 6. Shopping & Buffer
    const shoppingTotal = shoppingBuffer;

    // Total & Per Person
    const grandTotal = Math.round(
      transportCost +
      accommodationCost +
      foodCost +
      sightseeingCost +
      guideCost +
      activityCost +
      shoppingTotal
    );

    const perPerson = Math.round(grandTotal / Math.max(totalTravelers, 1));

    return {
      transport: Math.round(transportCost),
      accommodation: Math.round(accommodationCost),
      food: Math.round(foodCost),
      sightseeing: Math.round(sightseeingCost),
      guide: Math.round(guideCost),
      activities: Math.round(activityCost),
      shopping: Math.round(shoppingTotal),
      grandTotal,
      perPerson,
    };
  }, [
    distanceKm,
    daysCount,
    nightsCount,
    adultsCount,
    kidsCount,
    totalTravelers,
    roomsNeeded,
    travelMode,
    stayClass,
    foodClass,
    includeGuide,
    includeActivities,
    shoppingBuffer,
    selectedPlace,
  ]);

  // Preset Configurations
  const applyPreset = (preset: 'backpacker' | 'couple' | 'family') => {
    if (preset === 'backpacker') {
      setAdultsCount(1);
      setKidsCount(0);
      setDaysCount(2);
      setTravelMode('msrtc');
      setStayClass('budget');
      setFoodClass('budget');
      setIncludeGuide(false);
      setIncludeActivities(true);
      setShoppingBuffer(500);
    } else if (preset === 'couple') {
      setAdultsCount(2);
      setKidsCount(0);
      setDaysCount(2);
      setTravelMode('personal_car');
      setStayClass('comfort');
      setFoodClass('comfort');
      setIncludeGuide(false);
      setIncludeActivities(true);
      setShoppingBuffer(1500);
    } else if (preset === 'family') {
      setAdultsCount(3);
      setKidsCount(1);
      setDaysCount(3);
      setTravelMode('personal_car');
      setStayClass('comfort');
      setFoodClass('comfort');
      setIncludeGuide(true);
      setIncludeActivities(true);
      setShoppingBuffer(2500);
    }
  };

  const copyTripSummary = () => {
    const text = `Trip Budget Estimate for ${selectedPlace?.name} (${startingCity} Departure)
----------------------------------------
Duration: ${daysCount} Days / ${nightsCount} Nights
Travelers: ${adultsCount} Adults${kidsCount > 0 ? `, ${kidsCount} Children` : ''}
Travel Mode: ${travelMode.toUpperCase()}
Stay Tier: ${stayClass.toUpperCase()} (${roomsNeeded} Rooms)
Estimated Total Budget: ₹${costCalculation.grandTotal.toLocaleString('en-IN')}
Per Person: ₹${costCalculation.perPerson.toLocaleString('en-IN')}

Breakdown:
- Travel: ₹${costCalculation.transport.toLocaleString('en-IN')}
- Stay: ₹${costCalculation.accommodation.toLocaleString('en-IN')}
- Food & Dining: ₹${costCalculation.food.toLocaleString('en-IN')}
- Sightseeing & Tickets: ₹${costCalculation.sightseeing.toLocaleString('en-IN')}
- Activities & Guide: ₹${(costCalculation.activities + costCalculation.guide).toLocaleString('en-IN')}
- Shopping & Buffer: ₹${costCalculation.shopping.toLocaleString('en-IN')}

Created via Maharashtra Tourism & Trip Cost Guide`;

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Title & Presets Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-orange-100 text-orange-800 text-xs font-bold tracking-wide uppercase mb-2">
            <IndianRupee className="w-3.5 h-3.5" />
            <span>Interactive Cost Calculator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Plan &amp; Estimate Your Maharashtra Trip Budget
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Calculate accurate expenses for travel, hotel rooms, regional food, and attractions based on real Indian market rates.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:inline">
            Quick Presets:
          </span>
          <button
            onClick={() => applyPreset('backpacker')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            Solo Backpacker
          </button>
          <button
            onClick={() => applyPreset('couple')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-orange-100 hover:bg-orange-200 text-orange-800 transition-colors"
          >
            Couple Weekend
          </button>
          <button
            onClick={() => applyPreset('family')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-100 hover:bg-indigo-200 text-indigo-800 transition-colors"
          >
            Family (4 Pax)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* INPUTS COLUMN (Left - 7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. Destination & Starting City */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-orange-600 text-white text-[11px] font-bold flex items-center justify-center">1</span>
              <span>Select Destination &amp; Departure</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Destination Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Tourist Destination in Maharashtra
                </label>
                <select
                  value={selectedPlaceId}
                  onChange={(e) => setSelectedPlaceId(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                >
                  {places.map((place) => (
                    <option key={place.id} value={place.id}>
                      {place.name} ({place.district} - {place.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Starting City */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Departure From
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['Mumbai', 'Pune', 'Nagpur', 'Nashik'] as const).map((city) => (
                    <button
                      key={city}
                      onClick={() => setStartingCity(city)}
                      className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                        startingCity === city
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Distance indicator */}
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-orange-500" />
                <span>One-way road distance: </span>
                <strong className="text-slate-900 font-bold">{distanceKm} km</strong>
              </span>
              <span className="text-slate-500">
                Round-trip: ~{distanceKm * 2} km
              </span>
            </div>
          </div>

          {/* 2. Travelers & Trip Duration */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-orange-600 text-white text-[11px] font-bold flex items-center justify-center">2</span>
              <span>Travelers &amp; Duration</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Adults */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>Adults (12+ yrs)</span>
                </label>
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                  <button
                    onClick={() => setAdultsCount(Math.max(1, adultsCount - 1))}
                    className="w-10 py-2 text-slate-600 hover:bg-slate-200 font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-bold text-slate-900 text-sm">
                    {adultsCount}
                  </span>
                  <button
                    onClick={() => setAdultsCount(Math.min(10, adultsCount + 1))}
                    className="w-10 py-2 text-slate-600 hover:bg-slate-200 font-bold text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Children */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>Kids (Under 12)</span>
                </label>
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                  <button
                    onClick={() => setKidsCount(Math.max(0, kidsCount - 1))}
                    className="w-10 py-2 text-slate-600 hover:bg-slate-200 font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-bold text-slate-900 text-sm">
                    {kidsCount}
                  </span>
                  <button
                    onClick={() => setKidsCount(Math.min(6, kidsCount + 1))}
                    className="w-10 py-2 text-slate-600 hover:bg-slate-200 font-bold text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Days Count */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Trip Duration</span>
                </label>
                <select
                  value={daysCount}
                  onChange={(e) => setDaysCount(Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 font-medium focus:ring-2 focus:ring-orange-500"
                >
                  <option value={1}>1 Day (Day Trip)</option>
                  <option value={2}>2 Days / 1 Night (Weekend)</option>
                  <option value={3}>3 Days / 2 Nights</option>
                  <option value={4}>4 Days / 3 Nights</option>
                  <option value={5}>5 Days / 4 Nights</option>
                </select>
              </div>
            </div>

            {nightsCount > 0 && (
              <div className="text-[11px] text-slate-500 flex items-center gap-2">
                <Info className="w-3.5 h-3.5 text-slate-400" />
                <span>
                  Requires <strong>{roomsNeeded} hotel room{roomsNeeded > 1 ? 's' : ''}</strong> for {nightsCount} night{nightsCount > 1 ? 's' : ''} stay.
                </span>
              </div>
            )}
          </div>

          {/* 3. Travel Mode & Stay Style */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-orange-600 text-white text-[11px] font-bold flex items-center justify-center">3</span>
              <span>Travel &amp; Stay Preferences</span>
            </h3>

            {/* Travel Mode Radio Grid */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Transportation Option
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'msrtc', label: 'MSRTC / Bus', desc: 'Budget State Bus' },
                  { id: 'express_train', label: 'Express Train', desc: 'Sleeper / 3AC' },
                  { id: 'personal_car', label: 'Personal Car', desc: 'Fuel & Tolls' },
                  { id: 'private_cab', label: 'AC Taxi / Cab', desc: 'Chauffeur Sedan' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setTravelMode(item.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      travelMode === item.id
                        ? 'bg-orange-50/70 border-orange-500 ring-1 ring-orange-500'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900">{item.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Accommodation Class (if staying overnight) */}
            {nightsCount > 0 && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Hotel / Accommodation Style
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'budget', label: 'Budget', sub: '~₹1,200/night', desc: 'Homestay / MTDC' },
                    { id: 'comfort', label: 'Comfort', sub: '~₹3,200/night', desc: '3-Star Hotel / Resort' },
                    { id: 'luxury', label: 'Luxury', sub: '~₹8,500/night', desc: '5-Star / Private Villa' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setStayClass(item.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        stayClass === item.id
                          ? 'bg-orange-50/70 border-orange-500 ring-1 ring-orange-500'
                          : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-900">{item.label}</div>
                      <div className="text-[11px] font-semibold text-orange-700">{item.sub}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Food Style */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Food &amp; Dining Style
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'budget', label: 'Street & Thalis', rate: '₹350/day', desc: 'Local Bhojanalayas' },
                  { id: 'comfort', label: 'Family Dining', rate: '₹750/day', desc: 'Good Restaurants' },
                  { id: 'luxury', label: 'Resort Buffets', rate: '₹1,600/day', desc: 'Multi-course Dining' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setFoodClass(item.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      foodClass === item.id
                        ? 'bg-orange-50/70 border-orange-500 ring-1 ring-orange-500'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900">{item.label}</div>
                    <div className="text-[11px] font-semibold text-emerald-700">{item.rate}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Add-ons & Shopping Buffer */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-orange-600 text-white text-[11px] font-bold flex items-center justify-center">4</span>
              <span>Activities &amp; Shopping</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100/60 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeActivities}
                  onChange={(e) => setIncludeActivities(e.target.checked)}
                  className="w-4 h-4 rounded-sm text-orange-600 focus:ring-orange-500"
                />
                <div>
                  <span className="font-bold text-slate-800 block">Include Local Activities</span>
                  <span className="text-slate-500 text-[11px]">
                    Boating / Water sports / Safari / Ropeway
                  </span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100/60 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeGuide}
                  onChange={(e) => setIncludeGuide(e.target.checked)}
                  className="w-4 h-4 rounded-sm text-orange-600 focus:ring-orange-500"
                />
                <div>
                  <span className="font-bold text-slate-800 block">Hire Local Historian / Guide</span>
                  <span className="text-slate-500 text-[11px]">
                    Dedicated guide for fort/caves (~₹800/day)
                  </span>
                </div>
              </label>
            </div>

            {/* Shopping & Miscellaneous Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
                <span>Souvenirs, Chikkis, Mangoes &amp; Shopping Buffer:</span>
                <span className="text-orange-600 font-bold">₹{shoppingBuffer.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min={0}
                max={5000}
                step={500}
                value={shoppingBuffer}
                onChange={(e) => setShoppingBuffer(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>₹0 (None)</span>
                <span>₹2,500</span>
                <span>₹5,000 (Gifts &amp; Delicacies)</span>
              </div>
            </div>
          </div>

        </div>

        {/* RESULTS SUMMARY COLUMN (Right - 5 cols) */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 bg-white rounded-3xl border-2 border-slate-900 shadow-xl overflow-hidden">
            
            {/* Header with Total Price */}
            <div className="bg-slate-950 text-white p-6">
              <div className="flex items-center justify-between text-xs text-amber-400 font-semibold mb-1">
                <span>ESTIMATED TOTAL BUDGET</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] uppercase font-bold">
                  {daysCount} Days / {nightsCount} Nights
                </span>
              </div>

              <div className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-white mb-1 flex items-baseline">
                ₹{costCalculation.grandTotal.toLocaleString('en-IN')}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-slate-800">
                <span>Cost Per Person:</span>
                <span className="text-sm font-bold text-emerald-400">
                  ~₹{costCalculation.perPerson.toLocaleString('en-IN')} / person
                </span>
              </div>
            </div>

            {/* Visual Progress Bar Breakdown */}
            <div className="p-6 space-y-5">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Itemized Cost Breakdown
                </h4>

                <div className="space-y-2.5 text-xs">
                  {/* Transport */}
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-slate-700">
                      <Car className="w-4 h-4 text-blue-500" />
                      <span>Round-trip Transport:</span>
                    </span>
                    <strong className="text-slate-900 font-bold">
                      ₹{costCalculation.transport.toLocaleString('en-IN')}
                    </strong>
                  </div>

                  {/* Accommodation */}
                  {nightsCount > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-slate-700">
                        <Hotel className="w-4 h-4 text-purple-500" />
                        <span>Stay ({roomsNeeded} room{roomsNeeded > 1 ? 's' : ''}, {nightsCount}N):</span>
                      </span>
                      <strong className="text-slate-900 font-bold">
                        ₹{costCalculation.accommodation.toLocaleString('en-IN')}
                      </strong>
                    </div>
                  )}

                  {/* Food */}
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-slate-700">
                      <Utensils className="w-4 h-4 text-amber-500" />
                      <span>Meals &amp; Local Cuisine:</span>
                    </span>
                    <strong className="text-slate-900 font-bold">
                      ₹{costCalculation.food.toLocaleString('en-IN')}
                    </strong>
                  </div>

                  {/* Sightseeing */}
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-slate-700">
                      <Ticket className="w-4 h-4 text-emerald-500" />
                      <span>Sightseeing &amp; Entry Tickets:</span>
                    </span>
                    <strong className="text-slate-900 font-bold">
                      ₹{costCalculation.sightseeing.toLocaleString('en-IN')}
                    </strong>
                  </div>

                  {/* Activities & Guide */}
                  {(costCalculation.activities > 0 || costCalculation.guide > 0) && (
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-slate-700">
                        <Sparkles className="w-4 h-4 text-orange-500" />
                        <span>Activities &amp; Guide:</span>
                      </span>
                      <strong className="text-slate-900 font-bold">
                        ₹{(costCalculation.activities + costCalculation.guide).toLocaleString('en-IN')}
                      </strong>
                    </div>
                  )}

                  {/* Shopping Buffer */}
                  {costCalculation.shopping > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-slate-700">
                        <IndianRupee className="w-4 h-4 text-rose-500" />
                        <span>Shopping &amp; Souvenirs:</span>
                      </span>
                      <strong className="text-slate-900 font-bold">
                        ₹{costCalculation.shopping.toLocaleString('en-IN')}
                      </strong>
                    </div>
                  )}
                </div>
              </div>

              {/* Destination Highlight Box */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-900">
                    {selectedPlace?.name}
                  </span>
                  <span className="text-[11px] font-semibold text-orange-600">
                    {selectedPlace?.bestSeason}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                  {selectedPlace?.tagline}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={copyTripSummary}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-xs transition-all"
                >
                  {copiedSummary ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Copied Summary to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Printer className="w-4 h-4" />
                      <span>Copy / Share Budget Breakdown</span>
                    </>
                  )}
                </button>

                {onSelectPlace && selectedPlace && (
                  <button
                    onClick={() => onSelectPlace(selectedPlace)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-orange-700 bg-orange-50 hover:bg-orange-100 border border-orange-200 transition-colors"
                  >
                    View Full Sightseeing Itinerary &amp; Tips
                  </button>
                )}
              </div>

              <div className="text-[10px] text-center text-slate-400">
                *Prices are calculated based on current fuel rates, toll schedules &amp; seasonal hotel averages in Maharashtra.
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
