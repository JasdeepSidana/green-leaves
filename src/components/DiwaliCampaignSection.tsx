import React, { useState } from 'react';
import { 
  Sparkles, 
  Gift, 
  Copy, 
  Check, 
  ArrowRight, 
  Star, 
  ShoppingBag, 
  ExternalLink,
  ShieldCheck,
  Truck,
  Heart
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { SafeImage } from './SafeImage';
import { getWhatsAppProductOrderUrl, getWhatsAppInquiryUrl } from '../utils/whatsapp';
import brandPosterImg from '../assets/images/brand-promotional-poster.jpg';
import vermicompostPouchesGrassImg from '../assets/images/vermicompost-pouches-grass.jpg';
import vermicompostPouchImg from '../assets/images/vermicompost-pouch.jpg';

export const DiwaliCampaignSection: React.FC = () => {
  const { addItem, openQuickView, applyPromoCode, appliedPromoCode } = useCart();
  const [copied, setCopied] = useState(false);

  // Filter the diwali festive products
  const diwaliProducts = PRODUCTS.filter(p => p.category === 'diwali' || p.isDiwaliSpecial).slice(0, 4);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('DIWALIGREEN');
    applyPromoCode('DIWALIGREEN');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="diwali-campaign" className="py-12 sm:py-16 bg-gradient-to-b from-[#160b00] via-[#211102] to-[#121c15] text-white relative overflow-hidden border-y-2 border-gold/40">
      {/* Festive ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Festive Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/20 border border-gold/50 text-gold text-xs sm:text-sm font-black uppercase tracking-wider mb-3 animate-diya-glow">
            <span className="text-lg">🪔</span>
            <span>Green Leaves Diwali Utsav 2026</span>
            <span className="text-lg">🪔</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            The Gift That Keeps Growing 🪴
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl mx-auto">
            This festive season, rethink traditional gifting. Replace perishable sweets (*mithai*) with living, air-purifying, prosperity-attracting plants that thrive for years.
          </p>

          {/* Interactive Coupon Box */}
          <div className="mt-6 inline-flex flex-col sm:flex-row items-center gap-3 bg-black/60 border border-gold/40 p-3 sm:p-4 rounded-2xl shadow-xl">
            <div className="flex items-center gap-2 text-left">
              <Gift className="w-5 h-5 text-gold flex-shrink-0" />
              <div>
                <span className="text-[11px] text-gray-400 block font-semibold">Festive Coupon Code:</span>
                <span className="text-sm sm:text-base font-black text-gold tracking-widest font-mono">DIWALIGREEN</span>
              </div>
            </div>

            <div className="h-6 w-px bg-white/20 hidden sm:block"></div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-emerald-400 font-bold">Extra 15% OFF + Free Diya</span>
              <button
                onClick={handleCopyCode}
                className="bg-gold hover:bg-gold-light text-charcoal-pure font-black px-3.5 py-1.5 rounded-xl text-xs transition flex items-center gap-1 cursor-pointer shadow-md"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Applied!' : 'Copy & Apply'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Why Green Gifting Contrast Cards (Ugaoo Concept) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-12 max-w-4xl mx-auto">
          {/* Card 1: Mithai */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 relative">
            <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase mb-2">
              <span>❌</span>
              <span>Traditional Sweet Boxes</span>
            </div>
            <h4 className="text-base font-bold text-gray-200 mb-1.5">Temporary & Consumed in 48 Hours</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Excess refined sugar, preservative-heavy sweets that add holiday calories, get consumed instantly, and leave empty packaging behind.
            </p>
          </div>

          {/* Card 2: Living Green Gift */}
          <div className="bg-gradient-to-br from-emerald-950/80 to-[#122b1a] border-2 border-emerald-500/50 rounded-2xl p-5 relative shadow-lg">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase mb-2">
              <span>✅</span>
              <span>Green Leaves Living Plant Gift</span>
            </div>
            <h4 className="text-base font-bold text-white mb-1.5">Purifies Air & Grows for Decades</h4>
            <p className="text-xs text-emerald-200/90 leading-relaxed">
              Attracts positive Vastu chi, continuously removes post-festive winter smog, and reminds your loved ones of your warmth every single day.
            </p>
          </div>
        </div>

        {/* Curated Diwali Gifts Carousel / Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold text-gold uppercase tracking-wider">Auspicious Hampers</span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                Best-Selling Diwali Green Gifts
              </h3>
            </div>
            <a
              href="#products-catalog"
              className="text-xs font-bold text-gold hover:text-gold-light flex items-center gap-1 transition"
            >
              <span>View All Diwali Offers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {diwaliProducts.map((product) => {
              const pack = product.packSizes ? product.packSizes[0] : { size: 'Gift Pack', price: product.price, mrp: product.mrp };
              const discount = Math.round(((pack.mrp - pack.price) / pack.mrp) * 100);
              const whatsappUrl = getWhatsAppProductOrderUrl(product, pack, 1);

              return (
                <div
                  key={product.id}
                  className="bg-charcoal-card border border-gold/30 hover:border-gold rounded-2xl overflow-hidden shadow-lg transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-black/40">
                    <SafeImage
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-amber-500 text-charcoal-pure font-black text-[10px] px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                      <span>🪔</span>
                      <span>Diwali Special</span>
                    </div>
                    {discount > 0 && (
                      <div className="absolute top-2.5 right-2.5 bg-red-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md shadow-sm">
                        {discount}% OFF
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1 mb-1 text-gold text-xs">
                        <Star className="w-3.5 h-3.5 fill-gold" />
                        <span className="font-bold">{product.rating}</span>
                        <span className="text-gray-400 text-[10px]">({product.reviewCount})</span>
                      </div>

                      <h4 
                        onClick={() => openQuickView(product)}
                        className="font-extrabold text-sm text-white hover:text-gold transition cursor-pointer line-clamp-1"
                      >
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-gray-300 mt-0.5 line-clamp-2">
                        {product.subtitle}
                      </p>

                      <div className="mt-2 text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 p-1 rounded border border-emerald-500/30 text-center">
                        Includes Free Handcrafted Diya 🪔
                      </div>
                    </div>

                    {/* Price and CTA */}
                    <div className="pt-3 mt-3 border-t border-white/10">
                      <div className="flex items-baseline justify-between mb-2.5">
                        <span className="text-base font-black text-white">₹{pack.price}</span>
                        <span className="text-xs text-gray-400 line-through">₹{pack.mrp}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => addItem(product, pack, 1)}
                          className="bg-emerald hover:bg-emerald-600 text-white font-bold py-2 px-2 rounded-xl text-xs transition flex items-center justify-center gap-1 cursor-pointer shadow-sm"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>

                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#25D366] hover:bg-[#20ba5a] text-charcoal-pure font-black py-2 px-2 rounded-xl text-xs transition flex items-center justify-center gap-1 cursor-pointer shadow-sm"
                        >
                          <span>WhatsApp</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Authentic Stall Spotlight: Vermicompost 3-Free-Gifts Offer */}
        <div className="mb-10 bg-gradient-to-r from-charcoal-pure via-[#15231c] to-charcoal-pure border-2 border-gold/50 rounded-3xl p-5 sm:p-7 shadow-luxury text-white relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Visual: Authentic Bag & Garden Stock */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row gap-3 items-center justify-center">
              <div className="w-full sm:w-1/2 rounded-2xl overflow-hidden bg-black/60 border border-gold/30 p-2 text-center group">
                <div className="h-44 sm:h-52 w-full flex items-center justify-center">
                  <img
                    src={vermicompostPouchImg}
                    alt="Authentic 2kg Vermicompost Packaging"
                    className="max-h-full max-w-full object-contain filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform"
                  />
                </div>
                <span className="text-[10px] font-bold text-gold uppercase tracking-wider block mt-1">Official 2kg Pouch</span>
              </div>

              <div className="w-full sm:w-1/2 rounded-2xl overflow-hidden bg-black/60 border border-emerald-500/30 p-2 text-center group">
                <div className="h-44 sm:h-52 w-full flex items-center justify-center">
                  <img
                    src={vermicompostPouchesGrassImg}
                    alt="Fresh Stock Pouches Outdoors"
                    className="h-full w-full object-cover rounded-xl group-hover:scale-105 transition-transform"
                  />
                </div>
                <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider block mt-1">Fresh Grassland Batch</span>
              </div>
            </div>

            {/* Offer Content */}
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/20 text-gold border border-gold/40 text-[11px] font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Special Stall & Online Mega Offer
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight">
                Buy Our Vermicompost Mixture &amp; Get <span className="text-gold">3 FREE Gifts!</span>
              </h3>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                As featured at our festival exhibition stall: Celebrate with greener choices! Every order of our 6-in-1 Enriched Vermicompost Mix directly unlocks 3 festive gifts for your home garden:
              </p>

              {/* 3 Free Gifts Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                <div className="bg-white/5 border border-gold/30 rounded-xl p-2.5 flex items-center gap-2">
                  <span className="text-xl">🪴</span>
                  <div>
                    <h5 className="text-xs font-bold text-white">FREE Plant</h5>
                    <p className="text-[10px] text-gray-400">Live healthy sapling</p>
                  </div>
                </div>

                <div className="bg-white/5 border border-gold/30 rounded-xl p-2.5 flex items-center gap-2">
                  <span className="text-xl">👨‍🌾</span>
                  <div>
                    <h5 className="text-xs font-bold text-white">FREE Maali Service</h5>
                    <p className="text-[10px] text-gray-400">Expert care consult</p>
                  </div>
                </div>

                <div className="bg-white/5 border border-gold/30 rounded-xl p-2.5 flex items-center gap-2">
                  <span className="text-xl">🚚</span>
                  <div>
                    <h5 className="text-xs font-bold text-white">FREE Home Delivery</h5>
                    <p className="text-[10px] text-gray-400">Right to your door</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <a
                  href="#flagship-showcase"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gold hover:bg-gold-light text-charcoal-pure font-black text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-gold-glow"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Claim 3-in-1 Offer (₹249)</span>
                </a>

                <a
                  href={getWhatsAppInquiryUrl('Hello Green Leaves! I want to claim the Stall Offer: Buy Vermicompost Mixture and get FREE Plant + FREE Maali Service + FREE Delivery')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-charcoal-pure font-black text-xs sm:text-sm transition flex items-center justify-center gap-2"
                >
                  <span>WhatsApp Inquiry (8826078720)</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Festive Perks Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-black/40 border border-gold/30 rounded-2xl p-4 text-center">
          <div className="flex flex-col items-center">
            <span className="text-xl mb-1">🪔</span>
            <span className="text-xs font-bold text-gold">FREE Brass/Clay Diya</span>
            <span className="text-[10px] text-gray-400">With every order</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl mb-1">🪴</span>
            <span className="text-xs font-bold text-gold">FREE Living Plant</span>
            <span className="text-[10px] text-gray-400">With Diwali hampers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl mb-1">👨‍🌾</span>
            <span className="text-xs font-bold text-gold">FREE Maali Consult</span>
            <span className="text-[10px] text-gray-400">Expert agronomist line</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl mb-1">🚚</span>
            <span className="text-xs font-bold text-gold">FREE Delivery</span>
            <span className="text-[10px] text-gray-400">On all orders above ₹499</span>
          </div>
        </div>

      </div>
    </section>
  );
};
