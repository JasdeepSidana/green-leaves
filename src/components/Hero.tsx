import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Headphones, 
  ArrowRight, 
  Star, 
  ShoppingBag, 
  Leaf, 
  Flame, 
  Info,
  ExternalLink
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { getWhatsAppFlagshipOrderUrl } from '../utils/whatsapp';
import { SafeImage } from './SafeImage';
import vermicompost1kgStarterImg from '../assets/images/vermicompost-1kg-starter.jpg';
import vermicompost2kgOfficialImg from '../assets/images/vermicompost-2kg-official.jpg';
import vermicompostHandsPouchImg from '../assets/images/vermicompost-showcase-hands-pouch.jpg';
import vermicompostSquareImg from '../assets/images/vermicompost-organic-square.jpg';
import vermicompost5kgImg from '../assets/images/vermicompost-5kg-showcase.jpg';
import vermicompost10kgImg from '../assets/images/vermicompost-10kg-showcase.jpg';
import deodapVermicompostSoilImg from '../assets/images/deodap-vermicompost-soil.jpg';

export const Hero: React.FC = () => {
  const { addItem, openMaaliBooking } = useCart();
  const flagship = PRODUCTS.find(p => p.isFlagship) || PRODUCTS[0];
  const [selectedPackIndex, setSelectedPackIndex] = useState(0);
  const selectedPack = flagship.packSizes ? flagship.packSizes[selectedPackIndex] : { size: '1 kg Starter Pack', price: 149, mrp: 249 };
  const [activeIngredientIndex, setActiveIngredientIndex] = useState<number | null>(null);

  // All 5 showcase views synchronized with pack sizes & garden results
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
      fitContain: true
    },
    {
      id: '2kg-garden',
      label: '2kg Pack in Garden',
      src: vermicompost2kgOfficialImg,
      alt: 'Green Leaves Organics Official 2kg Vermicompost Pouch in Garden',
      packIdx: 1,
      title: '6-in-1 Enriched Vermicompost',
      subtitle: 'Official 2kg Pack',
      price: 249,
      mrp: 399,
      fitContain: true
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
      id: '10kg-terrace',
      label: '10kg Terrace Pack',
      src: vermicompost10kgImg,
      alt: 'Green Leaves Organics 10 KG Terrace Pack Vermicompost',
      packIdx: 3,
      title: '6-in-1 Enriched Vermicompost',
      subtitle: '10kg Terrace Pack',
      price: 999,
      mrp: 1600,
      fitContain: true
    },
    {
      id: 'garden-results',
      label: 'Garden Results',
      src: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
      alt: 'Lush blooming garden nurtured with 6-in-1 Vermicompost Mix',
      packIdx: 1,
      title: 'Lush Garden Results',
      subtitle: 'Visible Blooms After Compost',
      price: 249,
      mrp: 399,
      fitContain: false
    }
  ];
  const [activeViewIdx, setActiveViewIdx] = useState(0);

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
    else if (idx === 3) setActiveViewIdx(3);
  };

  const ingredientDetails = [
    { name: 'Pure Vermicompost', role: 'Aged 90-days Eisenia foetida earthworm castings for rich humus' },
    { name: 'Neem Khali', role: 'Organic bio-pesticide that repels nematodes & soil grubs' },
    { name: 'Banana Leaves', role: 'Natural potassium & micro-elements for heavy blooming' },
    { name: 'Trichoderma +++', role: 'Friendly bio-fungus that devours root rot pathogens' },
    { name: 'Steamed Bone Meal', role: 'Slow-release calcium & phosphorus for root branching' },
    { name: 'Rock Phosphate', role: 'Mineral booster that permanently conditions potting soil' }
  ];

  const scrollToCatalog = (category?: string) => {
    const el = document.getElementById('products-catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDiwali = () => {
    const el = document.getElementById('diwali-campaign') || document.getElementById('products-catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFlagshipAddToCart = () => {
    addItem(flagship, selectedPack, 1);
  };

  const flagshipWhatsAppUrl = getWhatsAppFlagshipOrderUrl(selectedPack, 1, 'DIWALIGREEN');

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#070B09] via-[#0B120E] to-[#070B09] pt-4 sm:pt-8 pb-12 sm:pb-16 lg:pb-20 border-b border-gold/20 max-w-full text-white">
      {/* Clamped background foliage glow */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-emerald-600/15 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Headlines, Value Props & Dual CTAs */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-center lg:text-left">
            
            {/* Festive Diwali Badge */}
            <div 
              onClick={scrollToDiwali}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs sm:text-sm font-extrabold shadow-gold-glow cursor-pointer hover:bg-gold/25 transition"
            >
              <span className="text-base animate-bounce">🪔</span>
              <span className="tracking-wide">Diwali Special: The Gift That Keeps Growing</span>
              <span className="bg-gold text-charcoal-pure text-[10px] px-2 py-0.2 rounded-full font-black uppercase">
                40% OFF
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Premium Organic <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-light to-gold bg-clip-text text-transparent">
                Plant Nutrition
              </span>{' '}
              & Urban Maali Services
            </h1>

            {/* Subtitle / Brand Promise */}
            <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Say goodbye to sickly, root-rotted plants. Powered by our signature{' '}
              <strong className="text-gold font-bold">6-in-1 Enriched Vermicompost Mix</strong>{' '}
              and verified doorstep Maali care, we bring the healing vitality of virgin forest soil directly to your home.
            </p>

            {/* Benefit Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-left">
              <div className="flex items-center gap-2 bg-[#121B16] border border-emerald-500/20 p-2.5 rounded-xl shadow-luxury-dark">
                <div className="w-8 h-8 rounded-lg bg-emerald-950/80 text-emerald-light flex items-center justify-center flex-shrink-0 border border-emerald-500/30">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">100% Certified Organic</h4>
                  <p className="text-[11px] text-gray-400">Zero synthetic chemical burns</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-[#121B16] border border-emerald-500/20 p-2.5 rounded-xl shadow-luxury-dark">
                <div className="w-8 h-8 rounded-lg bg-emerald-950/80 text-emerald-light flex items-center justify-center flex-shrink-0 border border-emerald-500/30">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Doorstep Delivery</h4>
                  <p className="text-[11px] text-gray-400">Free delivery on orders ₹499+</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-[#121B16] border border-emerald-500/20 p-2.5 rounded-xl shadow-luxury-dark">
                <div className="w-8 h-8 rounded-lg bg-gold/15 text-gold flex items-center justify-center flex-shrink-0 border border-gold/30">
                  <Headphones className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Expert Agronomist Care</h4>
                  <p className="text-[11px] text-gray-400">Direct WhatsApp support</p>
                </div>
              </div>
            </div>

            {/* Dual CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                onClick={() => scrollToCatalog()}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald hover:bg-emerald-600 text-white font-bold text-sm sm:text-base shadow-emerald-glow transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => openMaaliBooking()}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl btn-dubai-gold-shiny text-sm sm:text-base transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-gold-dubai"
              >
                <Sparkles className="w-4 h-4 text-charcoal-pure group-hover:rotate-12 transition-transform" />
                <span>Book Maali Service</span>
              </button>
            </div>

            {/* Social Trust Line */}
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-1 text-xs text-gray-400">
              <div className="flex -space-x-2">
                <img className="inline-block h-6 w-6 rounded-full ring-2 ring-[#0B0F0E] object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="User" />
                <img className="inline-block h-6 w-6 rounded-full ring-2 ring-[#0B0F0E] object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="User" />
                <img className="inline-block h-6 w-6 rounded-full ring-2 ring-[#0B0F0E] object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="User" />
              </div>
              <div className="flex items-center gap-1">
                <div className="flex text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-gold" />
                  ))}
                </div>
                <span className="font-bold text-white">4.9/5 Rating</span>
                <span>(1,250+ Urban Plant Parents)</span>
              </div>
            </div>

          </div>

          {/* Right Column: Proportioned Flagship Showcase Card */}
          <div className="lg:col-span-5 relative w-full">
            
            {/* Signature Matte-Black & Gold Packaging Card with Dubai Gold Frame */}
            <div className="relative rounded-3xl frame-dubai-gold text-white p-4 sm:p-5 lg:p-6 transition-all duration-300 group">
              
              {/* Top Banner & Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full badge-dubai-gold text-[11px] font-black uppercase tracking-wider">
                  <Flame className="w-3.5 h-3.5 fill-charcoal-pure text-charcoal-pure" />
                  <span>Flagship Innovation</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gray-400 block uppercase tracking-wider font-semibold">Verified Formula</span>
                  <span className="text-xs font-black text-gold-metallic-shiny">6-in-1 Soil Supercharger</span>
                </div>
              </div>

              {/* Image Showcase View Switcher Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 mb-2.5 bg-black/70 p-1.5 rounded-xl border border-gold/30">
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

              {/* Product Packaging Image Showcase */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#101914] via-[#0B100D] to-[#070B09] border-2 border-gold/40 mb-3.5 p-2 sm:p-2.5 text-center shadow-gold-dubai-sm">
                <div className="relative mx-auto h-80 sm:h-96 md:h-[400px] w-full rounded-xl overflow-hidden bg-black/85 flex items-center justify-center p-3">
                  
                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 z-20 badge-dubai-gold font-black text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full shadow-md">
                    {Math.round(((selectedPack.mrp - selectedPack.price) / selectedPack.mrp) * 100)}% OFF
                  </div>
                  <div className="absolute top-2.5 right-2.5 z-20 bg-emerald text-white font-bold text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 border border-emerald-400/40">
                    <ShieldCheck className="w-3 h-3" /> 100% Bio-Organic
                  </div>

                  {/* Proportional Full-View Image - 100% visible, zero cropping */}
                  <SafeImage
                    src={showcaseViews[activeViewIdx].src}
                    alt={showcaseViews[activeViewIdx].alt}
                    className="w-full h-full object-contain"
                    imgClassName="object-contain filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.9)] transition-transform duration-500 hover:scale-105"
                  />
                  
                  {/* Floating Black & Gold Packaging Label Overlay at bottom */}
                  <div className="absolute bottom-2 left-2 right-2 bg-black/95 backdrop-blur-md rounded-xl px-3 py-2 border border-gold/40 flex items-center justify-between shadow-lg z-20">
                    <div className="text-left truncate mr-2">
                      <p className="text-[9px] text-gold-metallic-shiny font-black uppercase tracking-wider truncate">
                        {showcaseViews[activeViewIdx].subtitle || selectedPack.size}
                      </p>
                      <p className="text-xs font-black text-white truncate">
                        {showcaseViews[activeViewIdx].title || '6-in-1 Enriched Vermicompost'}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className="text-[10px] text-gray-400 line-through">
                        ₹{showcaseViews[activeViewIdx].mrp ?? selectedPack.mrp}
                      </span>
                      <span className="text-xs font-black badge-dubai-gold px-2.5 py-0.5 rounded-full shadow-xs">
                        ₹{showcaseViews[activeViewIdx].price ?? selectedPack.price}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Free Bonus Plant Banner inside card */}
                <div className="mt-2 py-1 px-2.5 bg-emerald-950/70 border border-emerald-500/40 rounded-lg text-[10px] sm:text-[11px] text-emerald-300 font-medium flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-gold flex-shrink-0" />
                  <span>Diwali Bonus: <strong>FREE Diya 🪔</strong> + <strong>FREE Plant 🪴</strong> + <strong>FREE Maali Consult</strong></span>
                </div>
              </div>

              {/* Interactive Formula Breakdown Chips */}
              <div className="mb-3.5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1">
                    <Leaf className="w-3 h-3 text-emerald-light" />
                    Formula Breakdown (Tap to inspect)
                  </span>
                  <span className="text-[10px] text-gray-400">6 Bio-Actives</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {ingredientDetails.map((ing, idx) => {
                    const isSelected = activeIngredientIndex === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveIngredientIndex(isSelected ? null : idx)}
                        className={`text-left text-[10px] p-1.5 rounded-lg transition-all border cursor-pointer ${
                          isSelected 
                            ? 'bg-gold/20 border-gold text-white font-bold shadow-gold-glow' 
                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-emerald/40'
                        }`}
                      >
                        <div className="flex items-center gap-1 truncate">
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isSelected ? 'bg-gold' : 'bg-emerald-400'}`}></span>
                          <span className="truncate">{ing.name}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {activeIngredientIndex !== null && (
                  <div className="mt-2 p-2 rounded-xl bg-white/10 border border-gold/40 text-[11px] text-gray-200 animate-in fade-in duration-200 flex items-start gap-1.5">
                    <Info className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-gold">
                        {ingredientDetails[activeIngredientIndex].name}:
                      </span>{' '}
                      {ingredientDetails[activeIngredientIndex].role}
                    </div>
                  </div>
                )}
              </div>

              {/* Pack Size Selection */}
              <div className="space-y-1.5 mb-3.5">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-gray-300 font-semibold">Select Pack Size:</span>
                  <span className="text-gold font-bold">{selectedPack.perks || 'Special Price'}</span>
                </div>
                
                <div className="grid grid-cols-4 gap-1 sm:gap-1.5">
                  {flagship.packSizes?.map((pack, idx) => {
                    const isSelected = selectedPackIndex === idx;
                    const displayLabel = pack.weightKg ? `${pack.weightKg}kg` : pack.size.split(' ')[0];
                    return (
                      <button
                        key={idx}
                        onClick={() => handlePackSizeSelect(idx)}
                        className={`py-1.5 px-1 rounded-xl text-center transition border cursor-pointer ${
                          isSelected
                            ? 'bg-emerald text-white border-gold font-bold shadow-gold-dubai-sm'
                            : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <div className="text-[10px] font-bold truncate">{displayLabel}</div>
                        <div className="text-xs font-extrabold mt-0.5 text-gold-metallic-shiny">₹{pack.price}</div>
                        <div className="text-[9px] text-gray-400 line-through">₹{pack.mrp}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Instant Purchase Actions */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleFlagshipAddToCart}
                  className="w-full bg-emerald hover:bg-emerald-600 text-white font-bold py-2.5 px-2 rounded-xl shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer text-xs"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span className="truncate">Add to Cart</span>
                </button>

                <a
                  href={flagshipWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-charcoal-pure font-black py-2.5 px-2 rounded-xl shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer text-xs"
                >
                  <span className="truncate">1-Click WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                </a>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
