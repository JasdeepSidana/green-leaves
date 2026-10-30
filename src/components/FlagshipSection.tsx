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
import vermicompostPouchImg from '../assets/images/vermicompost-pouch.jpg';
import vermicompostPouchesGrassImg from '../assets/images/vermicompost-pouches-grass.jpg';
import brandPosterImg from '../assets/images/brand-promotional-poster.jpg';

export const FlagshipSection: React.FC = () => {
  const { addItem } = useCart();
  const flagship = PRODUCTS.find(p => p.isFlagship) || PRODUCTS[0];
  const [selectedPackIndex, setSelectedPackIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const galleryPhotos = [
    { img: vermicompostPouchImg, label: 'Official 2kg Pouch', tag: 'Original Packaging' },
    { img: vermicompostPouchesGrassImg, label: 'Pouches on Grass', tag: 'Fresh Lawn Batch' },
    { img: brandPosterImg, label: 'Festive Offer Poster', tag: 'Stall Free Gifts Offer' },
  ];
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

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

  const whatsappUrl = getWhatsAppFlagshipOrderUrl(selectedPack, quantity, 'DIWALIGREEN');

  return (
    <section id="flagship-showcase" className="py-12 sm:py-20 bg-white relative max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-charcoal-pure text-gold border border-gold/40 text-xs font-black uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 fill-gold text-gold" />
            Signature Flagship Innovation
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight">
            6-in-1 Enriched Vermicompost Mix
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            India's most complete organic soil amendment. Six lab-verified bio-actives in our signature matte black-and-gold packaging, engineered for container gardens.
          </p>
        </div>

        {/* Bundle Perk Promo Banner */}
        <div className="mb-10 bg-gradient-to-r from-emerald-950 via-charcoal-pure to-emerald-950 rounded-2xl p-4 sm:p-5 border-2 border-gold/50 shadow-luxury text-white relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 relative z-10">
            <div className="flex items-center gap-3 text-center md:text-left">
              <div className="w-11 h-11 rounded-2xl bg-gold text-charcoal-pure flex items-center justify-center flex-shrink-0 font-black shadow-gold-glow">
                <Gift className="w-5 h-5" />
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
            
            <div className="bg-gradient-to-b from-charcoal-pure to-[#17201c] rounded-3xl p-5 sm:p-7 text-white border-2 border-gold/40 shadow-luxury-dark relative overflow-hidden">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-gold">2kg Signature Pouch</span>
                  <h3 className="text-lg sm:text-xl font-black text-white mt-0.5">Enriched Vermi Compost Mix</h3>
                </div>
                <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full text-xs font-bold text-gold">
                  <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                  <span>4.95 (348 Reviews)</span>
                </div>
              </div>

              {/* High-res Image Presentation with Authentic Pouch */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#14201a] via-[#0d1411] to-black border border-gold/30 my-3 p-3 text-center">
                <div className="relative mx-auto h-60 sm:h-72 w-full flex items-center justify-center">
                  <SafeImage
                    src={galleryPhotos[activePhotoIdx].img}
                    alt={galleryPhotos[activePhotoIdx].label}
                    className="max-h-full max-w-full object-contain rounded-xl filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)] hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-gold text-charcoal-pure font-black text-xs px-2.5 py-0.5 rounded-full shadow-md">
                    {discountPct}% OFF
                  </div>
                  <div className="absolute top-2 right-2 bg-emerald text-white font-bold text-xs px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> 100% Bio-Organic
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-xs rounded-lg py-1 px-2 flex items-center justify-between text-[11px] text-gray-300 border border-white/10">
                    <span className="font-bold text-gold">{galleryPhotos[activePhotoIdx].tag}</span>
                    <span className="text-gray-400">{galleryPhotos[activePhotoIdx].label}</span>
                  </div>
                </div>

                {/* Real Photo Thumbnail Strip */}
                <div className="flex items-center justify-center gap-2 mt-2.5 pt-2 border-t border-white/10">
                  {galleryPhotos.map((photo, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePhotoIdx(idx)}
                      className={`relative w-16 h-14 rounded-lg overflow-hidden border-2 transition-all p-0.5 bg-black/50 cursor-pointer ${
                        activePhotoIdx === idx ? 'border-gold scale-105 shadow-gold-glow' : 'border-white/20 opacity-60 hover:opacity-100'
                      }`}
                      title={photo.label}
                    >
                      <img src={photo.img} alt={photo.label} className="w-full h-full object-cover rounded" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Pack Size Selector */}
              <div className="space-y-2 pt-1">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                  Select Pack Size:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {flagship.packSizes?.map((pack, idx) => {
                    const isSelected = selectedPackIndex === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedPackIndex(idx)}
                        className={`p-2.5 rounded-2xl text-center transition-all border cursor-pointer ${
                          isSelected
                            ? 'bg-emerald border-gold text-white font-bold shadow-md scale-102'
                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        <div className="text-[11px] font-bold">{pack.size.split(' ')[0]} Pack</div>
                        <div className="text-sm sm:text-base font-extrabold mt-0.5">₹{pack.price}</div>
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
              <span className="text-xs font-bold text-emerald uppercase tracking-wider">Scientific Formulation</span>
              <h3 className="text-xl sm:text-3xl font-extrabold text-charcoal mt-1">
                Why 6-in-1 Outperforms Normal Khad
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1.5">
                Standard nursery manure is often unaged, weed-infested, or lacks micro-fungi. Our signature mix blends 6 powerhouse organic inputs in laboratory-calibrated proportions:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {formulaItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-botanical-50/70 border border-botanical-200/60 hover:border-emerald/40 hover:bg-white p-3.5 rounded-2xl transition duration-300 shadow-2xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                    <span className="text-xs font-bold text-gray-400">0{index + 1}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-charcoal mb-0.5">{item.title}</h4>
                  <p className="text-[11px] text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Quick Benefits Checklist */}
            <div className="bg-warmWhite border border-gray-200 rounded-2xl p-3.5 sm:p-4 space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-charcoal mb-1 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-gold" />
                Guaranteed Urban Garden Results:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-gray-700">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald flex-shrink-0" />
                  <span>3x more flower bud set</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald flex-shrink-0" />
                  <span>Zero smell & 100% pet-friendly</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald flex-shrink-0" />
                  <span>Prevents root rot in monsoon/winter</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald flex-shrink-0" />
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
