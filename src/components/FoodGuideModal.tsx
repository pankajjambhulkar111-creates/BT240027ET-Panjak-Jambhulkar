import React from 'react';
import { X, Utensils, MapPin, IndianRupee } from 'lucide-react';

interface FoodGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Delicacy {
  name: string;
  marathi: string;
  region: string;
  price: string;
  description: string;
  bestSpots: string;
  type: 'Veg' | 'Non-Veg' | 'Dessert / Beverage';
}

const delicacies: Delicacy[] = [
  {
    name: 'Misal Pav',
    marathi: 'मिसळ पाव',
    region: 'Pune, Nashik, Kolhapur',
    price: '₹70 - ₹120',
    description: 'Sprouted moth bean curry topped with spicy rassa (tarri), crunchy farsan, chopped onions, and coriander, served with fresh pav.',
    bestSpots: 'Katakirr (Pune), Sadhana Chulivarchi (Nashik), Phadatare (Kolhapur)',
    type: 'Veg',
  },
  {
    name: 'Pithla Bhakri with Thecha',
    marathi: 'पिठलं भाकरी आणि ठेचा',
    region: 'Sahyadri Forts & Rural Maharashtra',
    price: '₹90 - ₹150',
    description: 'Rustic comforting gram flour (besan) curry spiced with green chillies, eaten with freshly toasted jowar or bajra bhakri and fiery garlic thecha.',
    bestSpots: 'Sinhagad Fort huts, Raigad base, Purohit (Mahabaleshwar)',
    type: 'Veg',
  },
  {
    name: 'Tambda & Pandhra Rassa',
    marathi: 'तांबडा आणि पांढरा रस्सा',
    region: 'Kolhapur',
    price: '₹280 - ₹420 (Thali)',
    description: 'Kolhapur’s world-famous dual broths: fiery red mutton rassa prepared with local special masala, alongside soothing white coconut-milk and almond broth.',
    bestSpots: 'Hotel Opal, Hotel Dehati, Padma Guest House (Kolhapur)',
    type: 'Non-Veg',
  },
  {
    name: 'Malvani Surmai & Crab Curry with Vade',
    marathi: 'मालवणी सुरमई आणि कोळंबी वडे',
    region: 'Konkan Coast (Malvan & Sindhudurg)',
    price: '₹350 - ₹550',
    description: 'Fresh Kingfish pan-fried in rava or mud crabs simmered in roasted coconut-coriander gravy, served with fluffy multi-grain fried puris (kombdi vade).',
    bestSpots: 'Chaitanya (Malvan), Sanman (Alibaug), Athithi Bamboo',
    type: 'Non-Veg',
  },
  {
    name: 'Ukadiche Modak',
    marathi: 'उकडीचे मोदक',
    region: 'Konkan & Pune',
    price: '₹40 - ₹80 each',
    description: 'Steamed rice flour dumplings stuffed with freshly grated coconut, jaggery, cardamom, and nutmeg, drizzled with pure desi ghee.',
    bestSpots: 'Ganpatipule temple stalls, Joshi Bhojanalaya, Shrivardhan homestays',
    type: 'Dessert / Beverage',
  },
  {
    name: 'Solkadhi',
    marathi: 'सोलकढी',
    region: 'Entire Konkan Coast',
    price: '₹40 - ₹60',
    description: 'Refreshing pink digestive beverage made from fresh coconut milk infused with wild dried kokum (Amsul), crushed garlic, and green chillies.',
    bestSpots: 'Every authentic Konkani and Malvani khanawal across the coast',
    type: 'Dessert / Beverage',
  },
  {
    name: 'Mumbai Vada Pav',
    marathi: 'मुंबई वडा पाव',
    region: 'Mumbai',
    price: '₹20 - ₹40',
    description: 'India’s ultimate street burger: spiced potato fritter encased in chickpea batter, nestled inside a soft pav with dry red garlic chutney and fried chillies.',
    bestSpots: 'Aram Vada Pav (CSMT), Ashok Vada Pav (Kirti College, Dadar)',
    type: 'Veg',
  },
  {
    name: 'Puran Poli with Tup (Ghee)',
    marathi: 'पुरणपोळी आणि तूप',
    region: 'Statewide Festival Classic',
    price: '₹50 - ₹90',
    description: 'Delicate handmade sweet flatbread filled with sweet cooked chana dal, jaggery, and nutmeg, served steaming hot drenched in golden cow ghee.',
    bestSpots: 'Traditional Bhojanalayas, Shirdi Prasadalaya, Pune sweet houses',
    type: 'Dessert / Beverage',
  },
  {
    name: 'Mahabaleshwar Fresh Strawberry Cream',
    marathi: 'स्ट्रॉबेरी क्रीम',
    region: 'Mahabaleshwar & Panchgani',
    price: '₹150 - ₹250',
    description: 'Juicy freshly plucked red strawberries layered with luscious thick clotted dairy cream and strawberry crush.',
    bestSpots: 'Mapro Garden, Bagicha Corner, Venna Lake stalls',
    type: 'Dessert / Beverage',
  },
];

export const FoodGuideModal: React.FC<FoodGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-3xl rounded-2xl md:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[88vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white p-5 sm:p-6 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-200 font-bold uppercase tracking-wider mb-1">
              <Utensils className="w-4 h-4" />
              <span>Taste of Maharashtra</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display">
              Iconic Maharashtrian Culinary Guide &amp; Prices
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          <p className="text-xs sm:text-sm text-slate-600">
            A guide to the most famous local dishes you must try during your trips across Maharashtra, with estimated street and restaurant pricing.
          </p>

          <div className="space-y-3">
            {delicacies.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-orange-300 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1.5">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm sm:text-base font-bold text-slate-900">
                      {item.name}
                    </h4>
                    <span className="text-xs text-slate-500 font-semibold">
                      ({item.marathi})
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.type === 'Veg'
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.type === 'Non-Veg'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.type}
                    </span>
                  </div>
                  <span className="text-sm font-extrabold text-orange-600">
                    {item.price}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mb-2.5 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/60 gap-1">
                  <span className="flex items-center gap-1 font-medium text-slate-700">
                    <MapPin className="w-3 h-3 text-orange-500" />
                    <span>Region: {item.region}</span>
                  </span>
                  <span>
                    <strong>Top Places: </strong>{item.bestSpots}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
