import React, { useState } from 'react';
import { 
  Sparkles, 
  Check, 
  Star, 
  ShoppingBag, 
  Gift, 
  ShieldCheck, 
  Award, 
  ExternalLink
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { getWhatsAppFlagshipOrderUrl } from '../utils/whatsapp';
import { SafeImage } from './SafeImage';
import vermicompost1kgStarterImg from '../assets/images/vermicompost-1kg-starter.jpg';
import vermicompostHandsPouchImg from '../assets/images/vermicompost-showcase-hands-pouch.jpg';
import vermicompostSquareImg from '../assets/images/vermicompost-organic-square.jpg';
import vermicompost5kgImg from '../assets/images/vermicompost-5kg-showcase.jpg';
import deodapVermicompostSoilImg from '../assets/images/deodap-vermicompost-soil.jpg';

export const FlagshipSection: React.FC = () => {
  const { addItem } = useCart();
  const flagship = PRODUCTS.find(p => p.isFlagship) || PRODUCTS[0];
  const [selectedPackIndex, setSelectedPackIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Exact 4 showcase views requested by user with synchronized pricing
  const showcaseViews = [
    {
      id: '1kg-starter',
      label: '1 kg Starter Pack',
      src: vermicompost1kgStarterImg,
      alt: 'Green Leaves Organics 1 kg Starter Pack Vermicompost',
      packIdx: 0,
      title: '6-in-1 Enriched Vermicompost',
      subtitle: '1 kg Starter Pack',
      price: 149,
      mrp: 249,
      fitContain: false
    },
    {
      id: '2kg-garden',
      label: '2kg Pack in Garden',
      src: vermicompostHandsPouchImg,
      alt: 'Green Leaves Organics 2kg Pack in Garden with rich soil and seedling',
      packIdx: 1,
      title: '6-in-1 Enriched Vermicompost',
      subtitle: '2kg Pack in Garden',
      price: 249,
      mrp: 399,
      fitContain: false
    },
    {
      id: '5kg-value',
      label: '5kg Value Pack',
      src: vermicompost5kgImg,
      alt: 'Green Leaves Organics 5 KG Enriched Vermicompost Value Pack with sapling',
      packIdx: 2,
      title: '6-in-1 Enriched Vermicompost',
      subtitle: '5kg Value Pack',
      price: 549,
      mrp: 850,
      fitContain: false
    },
    {
      id: 'garden-results',
      label: 'Garden pic after using compost',
      src: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
      alt: 'Lush blooming garden nurtured with 6-in-1 Vermicompost Mix',
      packIdx: 1,
      title: 'Lush Garden Results',
      subtitle: 'Results After Using Compost',
      price: 249,
      mrp: 399,
      fitContain: false
    }
  ];
  const [activeViewIdx, setActiveViewIdx] = useState(0);

  const selectedPack = flagship.packSizes ? flagship.packSizes[selectedPackIndex] : { size: '1 kg Starter Pack', price: 149, mrp: 249 };
  const discountPct = Math.round(((selectedPack.mrp - selectedPack.price) / selectedPack.mrp) * 100);

  const handleShowcaseTabClick = (idx: number) => {
    setActiveViewIdx(idx);
    const view = showcaseViews[idx];
    if (view && view.packIdx !== undefined && flagship.packSizes && flagship.packSizes[view.packIdx]) {
      setSelectedPackIndex(view.packIdx);
    }
  };

  const handlePackSizeSelect = (idx: number) => {
    setSelectedPackIndex(idx);
    if (idx === 0) setActiveViewIdx(0);
    else if (idx === 1) setActiveViewIdx(1);
    else if (idx === 2) setActiveViewIdx(2);
  };

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
      desc: 'Natural calcium and phosphorus matrix that drives thick white feeder roots into new soil.',
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

  const whatsappUrl = getWhatsAppFlagshipOrderUrl(selectedPack, quantity, 'DIWALIGREEN');

  return (
    <section id="flagship-showcase" className="py-12 sm:py-20 bg-[#080D0B] text-white relative max-w-full overflow-hidden border-t border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-black text-gold border-2 border-gold text-xs font-black uppercase tracking-wider mb-3 shadow-gold-dubai">
            <Sparkles className="w-3.5 h-3.5 fill-gold text-gold" />
            <span className="text-gold-gradient">Signature Flagship Innovation</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            6-in-1 Enriched Vermicompost Mix
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-300">
            India's most complete organic soil amendment. Six lab-verified bio-actives in our signature matte black-and-gold packaging, engineered for container gardens.
          </p>
        </div>

        {/* Bundle Perk Promo Banner */}
        <div className="mb-10 bg-gradient-to-r from-emerald-950 via-charcoal-pure to-emerald-950 rounded-2xl p-4 sm:p-5 border-2 border-gold/60 shadow-gold-dubai text-white relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 relative z-10">
            <div className="flex items-center gap-3 text-center md:text-left">
              <div className="w-11 h-11 rounded-2xl bg-gold-gradient text-charcoal-pure flex items-center justify-center flex-shrink-0 font-black shadow-gold-dubai-sm">
                <Gift className="w-5 h-5 text-charcoal-pure" />
              </div>
              <div>
                <span className="text-[10px] sm:text-xs font-bold text-gold uppercase tracking-wider">🪔 Diwali Special Celebration Bundle</span>
                <h3 className="text-base sm:text-lg font-black text-white">
                  1 Pack = FREE Diya 🪔 + FREE Plant 🪴 + FREE Maali Consultation 👨‍🌾 + FREE Delivery 🚚
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="bg-emerald px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider text-white shadow-xs">
                Perks Auto-Applied
              </span>
            </div>
          </div>
        </div>

        {/* Main Grid: Left Packaging & Selector, Right Formula Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Visual Showcase & Pack Selector */}
          <div className="lg:col-span-6 space-y-5">
            
            <div className="rounded-3xl frame-dubai-gold p-5 sm:p-7 text-white relative overflow-hidden">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-gold-metallic-shiny">
                    {showcaseViews[activeViewIdx].subtitle || selectedPack.size}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white mt-0.5">
                    {showcaseViews[activeViewIdx].title || 'Enriched Vermi Compost Mix'}
                  </h3>
                </div>
                <div className="flex items-center gap-1 bg-black/60 border border-gold/40 px-2.5 py-1 rounded-full text-xs font-bold text-gold shadow-gold-dubai-sm">
                  <Star className="w-3.5 h-3.5 fill-[#FFD700] text-[#FFD700]" />
                  <span className="font-mono text-gold-metallic-shiny">4.95 (348 Reviews)</span>
                </div>
              </div>

              {/* Image Switcher Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-2.5 bg-black/70 p-1.5 rounded-xl border border-gold/30">
                {showcaseViews.map((view, idx) => (
                  <button
                    key={view.id}
                    onClick={() => handleShowcaseTabClick(idx)}
                    className={`py-1.5 px-1.5 text-[10px] sm:text-[11px] font-bold rounded-lg transition-all text-center cursor-pointer leading-tight flex items-center justify-center min-h-[34px] ${
                      activeViewIdx === idx
                        ? 'badge-dubai-gold font-black shadow-gold-dubai-sm'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span>{view.label}</span>
                  </button>
                ))}
              </div>

              {/* High-res Image Presentation */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#121c17] via-charcoal to-[#080d0b] border-2 border-gold/40 my-3 p-2 sm:p-2.5 text-center shadow-gold-dubai-sm">
                <div className="relative mx-auto h-52 sm:h-60 w-full rounded-xl overflow-hidden flex items-center justify-center bg-black/50">
                  <SafeImage
                    src={showcaseViews[activeViewIdx].src}
                    alt={showcaseViews[activeViewIdx].alt}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 badge-dubai-gold font-black text-xs px-2.5 py-0.5 rounded-full shadow-md">
                    {discountPct}% OFF
                  </div>
                  <div className="absolute bottom-3 right-3 bg-emerald text-white font-bold text-xs px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 border border-emerald-400/40">
                    <ShieldCheck className="w-3.5 h-3.5" /> 100% Bio-Organic
                  </div>
                </div>
              </div>

              {/* Pack Size Selector */}
              <div className="space-y-2 pt-1">
                <div className="flex justify-between items-center text-xs">
                  <label className="block font-bold text-gray-300 uppercase tracking-wider">
                    Select Pack Size:
                  </label>
                  <span className="text-gold font-bold">{selectedPack.perks}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {flagship.packSizes?.map((pack, idx) => {
                    const isSelected = selectedPackIndex === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handlePackSizeSelect(idx)}
                        className={`p-2.5 rounded-2xl text-center transition-all border cursor-pointer ${
                          isSelected
                            ? 'bg-emerald border-gold text-white font-bold shadow-gold-dubai-sm scale-102'
                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        <div className="text-[11px] font-bold">{pack.size}</div>
                        <div className="text-sm sm:text-base font-extrabold mt-0.5 text-gold-metallic-shiny">₹{pack.price}</div>
                        <div className="text-[10px] text-gray-400 line-through">₹{pack.mrp}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity and Action Buttons */}
              <div className="pt-3 space-y-3">
                <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-2">
                  <span className="text-xs font-semibold text-gray-300">Quantity:</span>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center transition cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-sm font-bold text-white min-w-[20px] text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(q => Math.min(20, q + 1))}
                      className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center transition cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-emerald hover:bg-emerald-600 text-white font-bold py-3 px-2 sm:px-4 rounded-xl shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer text-xs sm:text-sm"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span className="truncate">Add to Cart (₹{selectedPack.price * quantity})</span>
                  </button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-charcoal-pure font-black py-3 px-2 sm:px-4 rounded-xl shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer text-xs sm:text-sm"
                  >
                    <span>Instant WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Formula Breakdown Cards */}
          <div className="lg:col-span-6 space-y-3.5">
            <div className="mb-2">
              <span className="text-xs font-bold text-emerald-light uppercase tracking-wider">Scientific Formulation</span>
              <h3 className="text-xl sm:text-3xl font-extrabold text-white mt-1">
                Why 6-in-1 Outperforms Normal Khad
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 mt-1.5">
                Standard nursery manure is often unaged, weed-infested, or lacks micro-fungi. Our signature mix blends 6 powerhouse organic inputs in laboratory-calibrated proportions:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {formulaItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#121B16] border border-emerald-500/20 hover:border-gold/50 hover:bg-[#16221c] p-3.5 rounded-2xl transition duration-300 shadow-luxury-dark"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-black uppercase tracking-wider bg-emerald-950 text-emerald-light border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                    <span className="text-xs font-bold text-gold font-mono">0{index + 1}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5">{item.title}</h4>
                  <p className="text-[11px] text-gray-300 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Quality Seals Bar */}
            <div className="bg-black/40 border border-gold/30 rounded-2xl p-3 flex items-center justify-around text-center text-xs text-gray-300">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-light" />
                <span>Zero Sludge / Zero Odor</span>
              </div>
              <div className="hidden sm:block h-4 w-px bg-white/20"></div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-gold" />
                <span>Lab Certified Purity</span>
              </div>
              <div className="hidden sm:block h-4 w-px bg-white/20"></div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-light" />
                <span>Pet & Child Safe</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
