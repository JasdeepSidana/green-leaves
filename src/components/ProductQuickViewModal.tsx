import React, { useState, useEffect } from 'react';
import { 
  X, 
  Star, 
  ShoppingBag, 
  ExternalLink, 
  ShieldCheck, 
  Truck, 
  Minus, 
  Plus, 
  Check,
  Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SafeImage } from './SafeImage';
import { getWhatsAppProductOrderUrl } from '../utils/whatsapp';
import { PackSize } from '../types';

export const ProductQuickViewModal: React.FC = () => {
  const { quickViewProduct, closeQuickView, addItem } = useCart();
  const [selectedPackIndex, setSelectedPackIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'usage'>('benefits');
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    setSelectedPackIndex(0);
    setQuantity(1);
    setActiveTab('benefits');
    if (quickViewProduct) {
      setSelectedImage(quickViewProduct.image);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeQuickView();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quickViewProduct, closeQuickView]);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const currentPack: PackSize = product.packSizes && product.packSizes[selectedPackIndex]
    ? product.packSizes[selectedPackIndex]
    : { size: 'Standard Unit', price: product.price, mrp: product.mrp };

  const discount = Math.round(((currentPack.mrp - currentPack.price) / currentPack.mrp) * 100);

  const handleAddToCart = () => {
    addItem(product, currentPack, quantity);
    closeQuickView();
  };

  const whatsappUrl = getWhatsAppProductOrderUrl(product, currentPack, quantity);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-[#0E1512] text-white rounded-3xl shadow-luxury-dark overflow-y-auto md:overflow-hidden border-2 border-gold/40 my-4 sm:my-8 animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-9 h-9 rounded-full bg-black/80 hover:bg-black text-gray-300 hover:text-white flex items-center justify-center border border-white/20 shadow-md transition cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Product Imagery & Badges */}
        <div className="md:w-1/2 bg-black/40 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden border-b md:border-b-0 md:border-r border-white/10">
          <div className="relative h-64 sm:h-76 md:h-88 w-full rounded-2xl overflow-hidden shadow-inner border border-white/10 flex items-center justify-center bg-gradient-to-b from-[#141F1A] to-[#0A0F0D] p-3">
            <SafeImage
              src={selectedImage || currentPack.image || product.image}
              alt={product.name}
              className="max-w-full max-h-full object-contain transition-transform duration-300 filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.85)]"
            />
            {discount > 0 && (
              <span className="absolute top-3 left-3 bg-red-600 text-white font-extrabold text-[10px] sm:text-xs px-2.5 py-1 rounded-md shadow-sm">
                {discount}% OFF
              </span>
            )}
            {product.isFlagship && (
              <span className="absolute top-3 right-12 sm:right-3 bg-black text-gold border border-gold/50 font-black text-[10px] sm:text-xs px-2.5 py-1 rounded-full shadow-sm">
                Flagship Formula
              </span>
            )}
          </div>

          {/* Gallery Thumbnails */}
          {product.gallery && product.gallery.length > 1 && (
            <div className="flex items-center gap-2 mt-2.5 overflow-x-auto pb-1">
              {product.gallery.map((gImg, idx) => {
                const isSelected = (selectedImage || product.image) === gImg;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(gImg)}
                    className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 transition-all p-0.5 bg-black/50 cursor-pointer flex-shrink-0 ${
                      isSelected ? 'border-gold shadow-gold-glow scale-105' : 'border-white/20 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={gImg} alt={`View ${idx + 1}`} className="w-full h-full object-cover rounded-lg" />
                  </button>
                );
              })}
            </div>
          )}

          <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-300">
            <div className="flex items-center gap-1.5 bg-white/5 p-2 rounded-xl border border-white/10 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-light" />
              <span className="truncate">100% Bio-Organic</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 p-2 rounded-xl border border-white/10 shadow-2xs">
              <Truck className="w-4 h-4 text-emerald-light" />
              <span className="truncate">Doorstep Delivery</span>
            </div>
          </div>
        </div>

        {/* Right Side: Product Details, Packs, Tabs, CTAs */}
        <div className="md:w-1/2 p-5 sm:p-8 overflow-y-auto flex flex-col justify-between">
          <div>
            {/* Category & Rating */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-emerald-light bg-emerald-950 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                {product.category}
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-gold text-gold" />
                <span className="text-xs font-bold text-white">{product.rating}</span>
                <span className="text-xs text-gray-400">({product.reviewCount})</span>
              </div>
            </div>

            {/* Title & Subtitle */}
            <h2 className="text-lg sm:text-2xl font-extrabold text-white leading-tight">
              {product.name}
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              {product.subtitle}
            </p>

            {/* Price display */}
            <div className="flex items-baseline gap-2.5 my-3 sm:my-4">
              <span className="text-xl sm:text-2xl font-black text-gold">₹{currentPack.price}</span>
              <span className="text-xs sm:text-sm text-gray-500 line-through">₹{currentPack.mrp}</span>
              <span className="text-[11px] sm:text-xs font-bold text-emerald-light bg-emerald-950 border border-emerald-500/30 px-2 py-0.5 rounded">
                Save ₹{currentPack.mrp - currentPack.price}
              </span>
            </div>

            {/* Pack Size Selection */}
            {product.packSizes && product.packSizes.length > 0 && (
              <div className="mb-4">
                <label className="block text-[11px] sm:text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  Choose Variant / Size:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {product.packSizes.map((pack, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedPackIndex(idx);
                        if (pack.image) setSelectedImage(pack.image);
                      }}
                      className={`p-2 sm:p-2.5 rounded-xl text-left border transition text-xs cursor-pointer ${
                        selectedPackIndex === idx
                          ? 'bg-emerald-900/80 border-gold text-gold font-bold shadow-xs'
                          : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <div className="font-bold truncate">{pack.size}</div>
                      <div className="text-[11px] opacity-90 font-semibold mt-0.5">₹{pack.price}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tabs for Benefits, Ingredients, Usage */}
            <div className="border-b border-white/10 mb-3 flex gap-3 sm:gap-4 text-xs font-bold">
              <button
                onClick={() => setActiveTab('benefits')}
                className={`pb-2 transition cursor-pointer ${
                  activeTab === 'benefits'
                    ? 'border-b-2 border-gold text-gold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Key Benefits
              </button>
              {product.ingredients && product.ingredients.length > 0 && (
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`pb-2 transition cursor-pointer ${
                    activeTab === 'ingredients'
                      ? 'border-b-2 border-gold text-gold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Formula
                </button>
              )}
              {product.usageInstructions && product.usageInstructions.length > 0 && (
                <button
                  onClick={() => setActiveTab('usage')}
                  className={`pb-2 transition cursor-pointer ${
                    activeTab === 'usage'
                      ? 'border-b-2 border-gold text-gold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  How to Use
                </button>
              )}
            </div>

            {/* Tab Contents */}
            <div className="text-xs text-gray-300 space-y-2 mb-4 sm:mb-6 min-h-[75px]">
              {activeTab === 'benefits' && (
                <ul className="space-y-1.5">
                  {product.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-light mt-0.5 flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === 'ingredients' && product.ingredients && (
                <ul className="space-y-1.5">
                  {product.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-gold mt-0.5 flex-shrink-0" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === 'usage' && product.usageInstructions && (
                <ul className="space-y-1.5">
                  {product.usageInstructions.map((step, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-bold text-gold">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Action cluster: Quantity & CTAs */}
          <div className="pt-3 border-t border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-300">Select Quantity:</span>
              <div className="flex items-center border border-white/20 rounded-xl bg-black/40 overflow-hidden">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-gray-300 hover:bg-white/10 cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-xs font-bold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => Math.min(20, q + 1))}
                  className="px-3 py-1.5 text-gray-300 hover:bg-white/10 cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <button
                onClick={handleAddToCart}
                className="w-full bg-emerald hover:bg-emerald-600 text-white font-bold py-3 px-2 sm:px-4 rounded-xl shadow-md transition flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer text-xs sm:text-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="truncate">Add to Cart (₹{currentPack.price * quantity})</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-charcoal-pure font-black py-3 px-2 sm:px-4 rounded-xl shadow-md transition flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer text-xs sm:text-sm"
              >
                <span>WhatsApp Buy</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
