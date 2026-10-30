import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Headphones, 
  ArrowRight, 
  Star, 
  ShoppingBag, 
  CheckCircle2, 
  Leaf, 
  Flame, 
  Layers, 
  Info,
  ExternalLink
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { getWhatsAppFlagshipOrderUrl } from '../utils/whatsapp';

export const Hero: React.FC = () => {
  const { addItem, openMaaliBooking } = useCart();
  const flagship = PRODUCTS.find(p => p.isFlagship) || PRODUCTS[0];
  const [selectedPackIndex, setSelectedPackIndex] = useState(0);
  const selectedPack = flagship.packSizes ? flagship.packSizes[selectedPackIndex] : { size: '2kg Pack', price: 249, mrp: 399 };
  const [activeIngredientIndex, setActiveIngredientIndex] = useState<number | null>(null);

  const ingredientDetails = [
    { name: 'Pure Vermicompost', role: 'Aged 90-days Eisenia foetida earthworm castings for rich humus', color: 'from-amber-700 to-amber-900' },
    { name: 'Cold-Pressed Neem Khali', role: 'Organic bio-pesticide that repels nematodes & soil maggots', color: 'from-green-700 to-green-900' },
    { name: 'Processed Banana Leaves', role: 'Natural organic potassium & micro-elements for heavy blooming', color: 'from-yellow-600 to-yellow-800' },
    { name: 'Trichoderma Viride +++', role: 'Friendly bio-fungus that devours root rot pathogens', color: 'from-emerald-600 to-emerald-800' },
    { name: 'Steamed Bone Meal', role: 'Slow-release calcium & phosphorus for root branching', color: 'from-stone-600 to-stone-800' },
    { name: 'Natural Rock Phosphate', role: 'Mineral booster that permanently conditions potting soil', color: 'from-teal-700 to-teal-900' }
  ];

  const scrollToCatalog = () => {
    const el = document.getElementById('products-catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFlagshipAddToCart = () => {
    addItem(flagship, selectedPack, 1);
  };

  const flagshipWhatsAppUrl = getWhatsAppFlagshipOrderUrl(selectedPack, 1);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-warmWhite via-white to-softBg pt-6 sm:pt-10 pb-16 lg:pb-24 border-b border-gray-100">
      {/* Subtle organic background foliage glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-100/40 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-gold/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headlines, Value Props & Dual CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-botanical-100/90 border border-botanical-200/80 text-emerald-900 text-xs sm:text-sm font-bold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald animate-ping"></span>
              <span className="tracking-wide">Healthy Soil, Happy Plants, Greener Future</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-charcoal leading-[1.12]">
              Premium Organic <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-emerald-dark via-emerald to-emerald-light bg-clip-text text-transparent">
                Plant Nutrition
              </span>{' '}
              & Urban Maali Services
            </h1>

            {/* Subtitle / Brand Promise */}
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Say goodbye to sickly, root-rotted plants. Powered by our signature{' '}
              <strong className="text-charcoal font-semibold">6-in-1 Enriched Vermicompost Mix</strong>{' '}
              and verified doorstep Maali care, we bring the healing vitality of virgin forest soil directly to your home.
            </p>

            {/* Benefit Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left">
              <div className="flex items-center gap-2 bg-white/80 border border-gray-100 p-2.5 rounded-xl shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">100% Certified Organic</h4>
                  <p className="text-[11px] text-gray-500">Zero synthetic chemical burns</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white/80 border border-gray-100 p-2.5 rounded-xl shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald flex items-center justify-center flex-shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Doorstep Delivery</h4>
                  <p className="text-[11px] text-gray-500">Free delivery on orders ₹499+</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white/80 border border-gray-100 p-2.5 rounded-xl shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-gold/15 text-gold-dark flex items-center justify-center flex-shrink-0">
                  <Headphones className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Expert Agronomist Care</h4>
                  <p className="text-[11px] text-gray-500">Direct WhatsApp support</p>
                </div>
              </div>
            </div>

            {/* Dual CTAs & Social Proof Counter */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={scrollToCatalog}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-emerald hover:bg-emerald-700 text-white font-bold text-base shadow-lg shadow-emerald/25 hover:shadow-xl hover:shadow-emerald/30 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => openMaaliBooking()}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-charcoal-pure hover:bg-black text-white font-bold text-base border border-gold/40 shadow-md hover:shadow-luxury transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-gold group-hover:rotate-12 transition-transform" />
                <span>Book Maali Service</span>
              </button>
            </div>

            {/* Social Trust Line */}
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-2 text-xs text-gray-500">
              <div className="flex -space-x-2">
                <img className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="User" />
                <img className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="User" />
                <img className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="User" />
                <img className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" alt="User" />
              </div>
              <div className="flex items-center gap-1">
                <div className="flex text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold" />
                  ))}
                </div>
                <span className="font-bold text-gray-800">4.9/5 Rating</span>
                <span>(1,250+ Happy Urban Plant Parents)</span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D/Floating Flagship Showcase Card with Glowing Chips */}
          <div className="lg:col-span-5 relative">
            
            {/* Signature Matte-Black & Gold Packaging Card */}
            <div className="relative rounded-3xl bg-gradient-to-b from-charcoal-pure via-[#141b18] to-charcoal-pure text-white p-6 sm:p-7 shadow-luxury-dark border-2 border-gold/40 transition-all duration-500 hover:border-gold group">
              
              {/* Premium Glow Aura */}
              <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 via-emerald/30 to-gold/20 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-500 -z-10"></div>

              {/* Top Banner & Badge */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/20 border border-gold/50 text-gold text-xs font-black uppercase tracking-wider">
                  <Flame className="w-3.5 h-3.5 fill-gold text-gold" />
                  Flagship Innovation
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-gray-400 block uppercase tracking-wider">Verified Formula</span>
                  <span className="text-xs font-bold text-emerald-light">6-in-1 Soil Supercharger</span>
                </div>
              </div>

              {/* Product Packaging Image Showcase */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-charcoal to-[#0d1310] border border-white/10 mb-5 p-4 text-center">
                <div className="relative mx-auto h-52 sm:h-60 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=700&q=80"
                    alt="6-in-1 Enriched Vermicompost Mix Signature Black & Gold Pack"
                    className="h-full object-cover rounded-xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Floating Black & Gold Packaging Label Overlay */}
                  <div className="absolute bottom-2 left-2 right-2 bg-black/85 backdrop-blur-md rounded-xl p-2.5 border border-gold/40 flex items-center justify-between">
                    <div className="text-left">
                      <p className="text-[10px] text-gold font-bold uppercase tracking-wider">Signature 2kg Black Pouch</p>
                      <p className="text-xs font-extrabold text-white">6-in-1 Enriched Vermicompost Mix</p>
                    </div>
                    <span className="text-xs font-black bg-emerald text-white px-2 py-0.5 rounded-full">
                      ₹{selectedPack.price}
                    </span>
                  </div>
                </div>

                {/* Free Bonus Plant Banner inside card */}
                <div className="mt-3 py-1.5 px-3 bg-emerald-950/70 border border-emerald-500/40 rounded-lg text-[11px] text-emerald-300 font-medium flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  <span>Includes: <strong>FREE Plant</strong> + <strong>FREE Maali Consult</strong></span>
                </div>
              </div>

              {/* Interactive Formula Breakdown Chips */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1">
                    <Leaf className="w-3.5 h-3.5 text-emerald-light" />
                    Interactive Formula Chips (Tap to inspect)
                  </span>
                  <span className="text-[10px] text-gray-400">6 Active Bio-Ingredients</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {ingredientDetails.map((ing, idx) => {
                    const isSelected = activeIngredientIndex === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveIngredientIndex(isSelected ? null : idx)}
                        className={`text-left text-[11px] p-2 rounded-xl transition-all border ${
                          isSelected 
                            ? 'bg-gold/20 border-gold text-white font-bold shadow-gold-glow' 
                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-emerald/40'
                        }`}
                      >
                        <div className="flex items-center gap-1 truncate">
                          <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-gold' : 'bg-emerald-400'}`}></span>
                          <span className="truncate">{ing.name}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Expanded chip role information */}
                {activeIngredientIndex !== null && (
                  <div className="mt-2.5 p-2.5 rounded-xl bg-white/10 border border-gold/40 text-xs text-gray-200 animate-in fade-in duration-200 flex items-start gap-2">
                    <Info className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
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
              <div className="space-y-2 mb-5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-300 font-semibold">Select Pack Size:</span>
                  <span className="text-gold font-bold">{selectedPack.perks || 'Special Price'}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  {flagship.packSizes?.map((pack, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedPackIndex(idx)}
                      className={`py-2 px-2 rounded-xl text-center transition border ${
                        selectedPackIndex === idx
                          ? 'bg-emerald text-white border-gold font-bold shadow-md'
                          : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-[11px] font-bold">{pack.size.replace(' Signature Pack', '').replace(' Family Garden Pack', '').replace(' Value Pack', '')}</div>
                      <div className="text-xs font-extrabold mt-0.5">₹{pack.price}</div>
                      <div className="text-[9px] text-gray-300 line-through">₹{pack.mrp}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Instant Purchase Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={handleFlagshipAddToCart}
                  className="w-full bg-emerald hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <a
                  href={flagshipWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-charcoal-pure font-black py-3 px-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>1-Click WhatsApp</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
