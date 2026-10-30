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
import vermicompostPouchImg from '../assets/images/vermicompost-pouch.jpg';
import vermicompostPouchesGrassImg from '../assets/images/vermicompost-pouches-grass.jpg';
import brandPosterImg from '../assets/images/brand-promotional-poster.jpg';

export const Hero: React.FC = () => {
  const { addItem, openMaaliBooking } = useCart();
  const flagship = PRODUCTS.find(p => p.isFlagship) || PRODUCTS[0];
  const [selectedPackIndex, setSelectedPackIndex] = useState(0);
  const selectedPack = flagship.packSizes ? flagship.packSizes[selectedPackIndex] : { size: '2kg Pack', price: 249, mrp: 399 };
  const [activeIngredientIndex, setActiveIngredientIndex] = useState<number | null>(null);

  const showcaseViews = [
    { id: 'pouch', label: '2kg Official Pouch', img: vermicompostPouchImg, subtitle: 'Authentic 6-in-1 Soil Booster', caption: 'Green Leaves Organics 2kg Pouch' },
    { id: 'grass', label: 'Real Garden Stock', img: vermicompostPouchesGrassImg, subtitle: 'Fresh Batches in the Garden', caption: 'Fresh Vermicompost Pouches In Garden' },
    { id: 'poster', label: 'Festival Offer Stall', img: brandPosterImg, subtitle: 'Free Plant + Maali + Delivery Offer', caption: 'Official Promotional Poster' },
  ];
  const [activeShowcaseView, setActiveShowcaseView] = useState(0);

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
    <section className="relative overflow-hidden bg-gradient-to-b from-warmWhite via-white to-softBg pt-4 sm:pt-8 pb-12 sm:pb-16 lg:pb-20 border-b border-gray-100 max-w-full">
      {/* Soft clamped background foliage glow without negative viewport breach */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-emerald-100/40 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-amber-100/30 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Headlines, Value Props & Dual CTAs */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-center lg:text-left">
            
            {/* Festive Diwali Badge */}
            <div 
              onClick={scrollToDiwali}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-950 text-xs sm:text-sm font-extrabold shadow-xs cursor-pointer hover:bg-amber-100 transition"
            >
              <span className="text-base animate-bounce">🪔</span>
              <span className="tracking-wide">Diwali Special: The Gift That Keeps Growing</span>
              <span className="bg-amber-500 text-white text-[10px] px-2 py-0.2 rounded-full font-black uppercase">
                40% OFF
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-charcoal leading-[1.12]">
              Premium Organic <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-emerald-dark via-emerald to-emerald-light bg-clip-text text-transparent">
                Plant Nutrition
              </span>{' '}
              & Urban Maali Services
            </h1>

            {/* Subtitle / Brand Promise */}
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Say goodbye to sickly, root-rotted plants. Powered by our signature{' '}
              <strong className="text-charcoal font-semibold">6-in-1 Enriched Vermicompost Mix</strong>{' '}
              and verified doorstep Maali care, we bring the healing vitality of virgin forest soil directly to your home.
            </p>

            {/* Benefit Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-left">
              <div className="flex items-center gap-2 bg-white/90 border border-gray-100 p-2.5 rounded-xl shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">100% Certified Organic</h4>
                  <p className="text-[11px] text-gray-500">Zero synthetic chemical burns</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white/90 border border-gray-100 p-2.5 rounded-xl shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald flex items-center justify-center flex-shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Doorstep Delivery</h4>
                  <p className="text-[11px] text-gray-500">Free delivery on orders ₹499+</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white/90 border border-gray-100 p-2.5 rounded-xl shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-gold/15 text-gold-dark flex items-center justify-center flex-shrink-0">
                  <Headphones className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Expert Agronomist Care</h4>
                  <p className="text-[11px] text-gray-500">Direct WhatsApp support</p>
                </div>
              </div>
            </div>

            {/* Dual CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                onClick={() => scrollToCatalog()}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-md shadow-emerald/20 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => openMaaliBooking()}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-charcoal-pure hover:bg-black text-white font-bold text-sm sm:text-base border border-gold/40 shadow-sm hover:shadow-luxury transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-gold group-hover:rotate-12 transition-transform" />
                <span>Book Maali Service</span>
              </button>
            </div>

            {/* Social Trust Line */}
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-1 text-xs text-gray-500">
              <div className="flex -space-x-2">
                <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="User" />
                <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="User" />
                <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="User" />
              </div>
              <div className="flex items-center gap-1">
                <div className="flex text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-gold" />
                  ))}
                </div>
                <span className="font-bold text-gray-800">4.9/5 Rating</span>
                <span>(1,250+ Urban Plant Parents)</span>
              </div>
            </div>

          </div>

          {/* Right Column: Proportioned Flagship Showcase Card */}
          <div className="lg:col-span-5 relative w-full">
            
            {/* Signature Matte-Black & Gold Packaging Card */}
            <div className="relative rounded-3xl bg-gradient-to-b from-charcoal-pure via-[#141b18] to-charcoal-pure text-white p-4 sm:p-5 lg:p-6 shadow-luxury-dark border-2 border-gold/40 transition-all duration-300 hover:border-gold group">
              
              {/* Top Banner & Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold/20 border border-gold/50 text-gold text-[11px] font-black uppercase tracking-wider">
                  <Flame className="w-3 h-3 fill-gold text-gold" />
                  Flagship Innovation
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gray-400 block uppercase tracking-wider">Verified Formula</span>
                  <span className="text-xs font-bold text-emerald-light">6-in-1 Soil Supercharger</span>
                </div>
              </div>

              {/* View Switcher Pills */}
              <div className="flex items-center gap-1.5 mb-2.5 bg-black/40 p-1 rounded-xl border border-white/10">
                {showcaseViews.map((view, idx) => (
                  <button
                    key={view.id}
                    onClick={() => setActiveShowcaseView(idx)}
                    className={`flex-1 py-1 px-1.5 text-[10px] sm:text-[11px] font-bold rounded-lg transition-all text-center cursor-pointer ${
                      activeShowcaseView === idx
                        ? 'bg-gold text-charcoal-pure shadow-gold-glow'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {view.label}
                  </button>
                ))}
              </div>

              {/* Product Packaging Image Showcase */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#121c17] via-charcoal to-[#080d0b] border border-gold/30 mb-3.5 p-2 sm:p-3 text-center">
                <div className="relative mx-auto h-48 sm:h-56 w-full rounded-xl overflow-hidden flex items-center justify-center p-1">
                  <SafeImage
                    src={showcaseViews[activeShowcaseView].img}
                    alt={showcaseViews[activeShowcaseView].caption}
                    className="max-h-full max-w-full object-contain rounded-lg filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.85)] group-hover:scale-102 transition-transform duration-300"
                  />
                  
                  {/* Floating Black & Gold Packaging Label Overlay */}
                  <div className="absolute bottom-1.5 left-1.5 right-1.5 bg-black/90 backdrop-blur-md rounded-xl p-2 border border-gold/40 flex items-center justify-between">
                    <div className="text-left">
                      <p className="text-[9px] text-gold font-bold uppercase tracking-wider">{showcaseViews[activeShowcaseView].subtitle}</p>
                      <p className="text-xs font-black text-white">6-in-1 Enriched Vermicompost</p>
                    </div>
                    <span className="text-xs font-black bg-emerald text-white px-2 py-0.5 rounded-full">
                      ₹{selectedPack.price}
                    </span>
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
                
                <div className="grid grid-cols-3 gap-1.5">
                  {flagship.packSizes?.map((pack, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedPackIndex(idx)}
                      className={`py-1.5 px-1 rounded-xl text-center transition border cursor-pointer ${
                        selectedPackIndex === idx
                          ? 'bg-emerald text-white border-gold font-bold shadow-sm'
                          : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-[10px] font-bold">{pack.size.replace(' Signature Pack', '').replace(' Family Garden Pack', '').replace(' Value Pack', '')}</div>
                      <div className="text-xs font-extrabold mt-0.5">₹{pack.price}</div>
                      <div className="text-[9px] text-gray-300 line-through">₹{pack.mrp}</div>
                    </button>
                  ))}
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
