import React, { useState } from 'react';
import { 
  Sparkles, 
  Check, 
  Star, 
  ShoppingBag, 
  Gift, 
  ShieldCheck, 
  Award, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Percent
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { getWhatsAppFlagshipOrderUrl } from '../utils/whatsapp';

export const FlagshipSection: React.FC = () => {
  const { addItem } = useCart();
  const flagship = PRODUCTS.find(p => p.isFlagship) || PRODUCTS[0];
  const [selectedPackIndex, setSelectedPackIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const selectedPack = flagship.packSizes ? flagship.packSizes[selectedPackIndex] : { size: '2kg Pack', price: 249, mrp: 399 };
  const discountPct = Math.round(((selectedPack.mrp - selectedPack.price) / selectedPack.mrp) * 100);

  const formulaItems = [
    {
      title: 'Pure Eisenia Foetida Vermicompost',
      desc: '90-day aged worm castings yielding natural plant humic & fulvic acids for deep soil revival.',
      badge: 'Base Formula'
    },
    {
      title: 'Cold-Pressed Neem Khali',
      desc: 'High-azadirachtin cake that protects roots against nematodes, white grubs & soil fungus.',
      badge: 'Bio-Pest Shield'
    },
    {
      title: 'Processed Banana Leaves',
      desc: 'Sun-cured and micro-fermented, offering organic potassium to induce heavy bloom buds.',
      badge: 'Bloom Booster'
    },
    {
      title: 'Trichoderma Viride +++',
      desc: 'Beneficial bio-fungal inoculation (2x10^8 CFU/g) that annihilates fatal root rot and damping off.',
      badge: 'Anti-Root Rot'
    },
    {
      title: 'Steamed Bone Meal',
      desc: 'Slow-release calcium and organic phosphorus for rapid root expansion and disease immunity.',
      badge: 'Root Expansion'
    },
    {
      title: 'Natural Rock Phosphate',
      desc: 'Sedimentary soft mineral deposit providing continuous micronutrients without salt burning.',
      badge: 'Soil Mineralizer'
    }
  ];

  const handleAddToCart = () => {
    addItem(flagship, selectedPack, quantity);
  };

  const whatsappUrl = getWhatsAppFlagshipOrderUrl(selectedPack, quantity);

  return (
    <section id="flagship-showcase" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-charcoal-pure text-gold border border-gold/40 text-xs font-black uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 fill-gold text-gold" />
            Signature Flagship Innovation
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight">
            6-in-1 Enriched Vermicompost Mix
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600">
            India's most complete organic soil amendment. Six lab-verified bio-actives in our signature matte black-and-gold packaging, engineered for container gardens.
          </p>
        </div>

        {/* Bundle Perk Promo Banner */}
        <div className="mb-12 bg-gradient-to-r from-emerald-950 via-charcoal-pure to-emerald-950 rounded-2xl p-4 sm:p-6 border-2 border-gold/50 shadow-luxury text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-48 h-48 bg-gold/10 rounded-full blur-2xl"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-3 sm:gap-4 text-center md:text-left">
              <div className="w-12 h-12 rounded-2xl bg-gold text-charcoal-pure flex items-center justify-center flex-shrink-0 font-black shadow-gold-glow">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-gold uppercase tracking-wider">Limited Celebration Bundle</span>
                <h3 className="text-lg sm:text-xl font-extrabold text-white">
                  1 Pack = FREE Plant 🪴 + FREE Maali Consultation 👨‍🌾 + FREE Delivery 🚚
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="bg-emerald px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider text-white shadow-sm">
                Automatic Perk Applied
              </span>
            </div>
          </div>
        </div>

        {/* Main Grid: Left Packaging & Selector, Right Formula Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Visual Showcase & Pack Selector */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Packaging Presentation Card */}
            <div className="bg-gradient-to-b from-charcoal-pure to-[#17201c] rounded-3xl p-6 sm:p-8 text-white border-2 border-gold/40 shadow-luxury-dark relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-gold">2kg Signature Pouch</span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">Enriched Vermi Compost Mix</h3>
                </div>
                <div className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-full text-xs font-bold text-gold">
                  <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                  <span>4.95 (348 Reviews)</span>
                </div>
              </div>

              {/* High-res Image Presentation */}
              <div className="relative rounded-2xl overflow-hidden bg-black/60 border border-white/10 my-4 p-4 text-center">
                <img
                  src={flagship.image}
                  alt="Green Leaves Organics 6-in-1 Vermicompost Mix"
                  className="w-full h-64 sm:h-72 object-cover rounded-xl shadow-xl hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-6 left-6 bg-gold text-charcoal-pure font-black text-xs px-3 py-1 rounded-full shadow-md">
                  {discountPct}% OFF
                </div>
                <div className="absolute bottom-6 right-6 bg-emerald text-white font-bold text-xs px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Bio-Organic
                </div>
              </div>

              {/* Pack Size Selector */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                  Select Pack Size:
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {flagship.packSizes?.map((pack, idx) => {
                    const isSelected = selectedPackIndex === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedPackIndex(idx)}
                        className={`p-3 rounded-2xl text-center transition-all border ${
                          isSelected
                            ? 'bg-emerald border-gold text-white font-bold shadow-lg scale-102'
                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        <div className="text-xs font-bold">{pack.size.split(' ')[0]} Pack</div>
                        <div className="text-base font-extrabold mt-1">₹{pack.price}</div>
                        <div className="text-[10px] text-gray-400 line-through">₹{pack.mrp}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity and Action Buttons */}
              <div className="pt-4 space-y-3">
                <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-2.5">
                  <span className="text-xs font-semibold text-gray-300">Quantity:</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center transition"
                    >
                      -
                    </button>
                    <span className="text-sm font-bold text-white min-w-[20px] text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(q => Math.min(20, q + 1))}
                      className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-emerald hover:bg-emerald-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer text-sm"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart (₹{selectedPack.price * quantity})</span>
                  </button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-charcoal-pure font-black py-3.5 px-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer text-sm"
                  >
                    <span>Instant WhatsApp Buy</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="mt-4 text-center text-xs text-gray-400">
                🔒 Safe payments & Free replacement guarantee on damaged transit
              </div>
            </div>

          </div>

          {/* Right Column: Formula Breakdown Cards */}
          <div className="lg:col-span-6 space-y-4">
            <div className="mb-2">
              <span className="text-xs font-bold text-emerald uppercase tracking-wider">Scientific Formulation</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-charcoal mt-1">
                Why 6-in-1 Outperforms Normal Khad
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Standard nursery manure is often unaged, weed-infested, or lacks micro-fungi. Our signature mix blends 6 powerhouse organic inputs in laboratory-calibrated proportions:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {formulaItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-botanical-50/60 border border-botanical-200/60 hover:border-emerald/40 hover:bg-white p-4 rounded-2xl transition duration-300 shadow-xs hover:shadow-md"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                    <span className="text-xs font-bold text-gray-400">0{index + 1}</span>
                  </div>
                  <h4 className="text-sm font-bold text-charcoal mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Quick Benefits Checklist */}
            <div className="bg-warmWhite border border-gray-200 rounded-2xl p-4 sm:p-5 mt-4 space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-charcoal mb-2 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-gold" />
                Guaranteed Urban Garden Results:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald flex-shrink-0" />
                  <span>3x more flower bud set</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald flex-shrink-0" />
                  <span>Zero smell & 100% pet-friendly</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald flex-shrink-0" />
                  <span>Prevents root rot in monsoon</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald flex-shrink-0" />
                  <span>Water retention lasts 30% longer</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
