import React, { useState, useEffect } from 'react';
import { 
  X, 
  Star, 
  ShoppingBag, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  ExternalLink,
  Plus,
  Minus,
  HelpCircle,
  Truck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product, PackSize } from '../types';
import { getWhatsAppProductOrderUrl } from '../utils/whatsapp';

export const ProductQuickViewModal: React.FC = () => {
  const { quickViewProduct, closeQuickView, addItem } = useCart();
  const [selectedPackIndex, setSelectedPackIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'usage'>('benefits');

  useEffect(() => {
    // Reset state on open
    setSelectedPackIndex(0);
    setQuantity(1);
    setActiveTab('benefits');

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 my-8 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-black flex items-center justify-center shadow-md transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Product Imagery & Badges */}
        <div className="md:w-1/2 bg-gray-50 p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white shadow-inner border border-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {discount > 0 && (
              <span className="absolute top-3 left-3 bg-red-600 text-white font-extrabold text-xs px-2.5 py-1 rounded-md shadow-sm">
                {discount}% OFF
              </span>
            )}
            {product.isFlagship && (
              <span className="absolute top-3 right-3 bg-charcoal-pure text-gold border border-gold/40 font-black text-xs px-2.5 py-1 rounded-full shadow-sm">
                Flagship Formula
              </span>
            )}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-600">
            <div className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-gray-100">
              <ShieldCheck className="w-4 h-4 text-emerald" />
              <span>100% Bio-Organic</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-gray-100">
              <Truck className="w-4 h-4 text-emerald" />
              <span>Doorstep Delivery</span>
            </div>
          </div>
        </div>

        {/* Right Side: Product Details, Packs, Tabs, CTAs */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
          <div>
            {/* Category & Rating */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald bg-emerald-50 px-2.5 py-0.5 rounded-full">
                {product.category}
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-gold text-gold" />
                <span className="text-xs font-bold text-gray-800">{product.rating}</span>
                <span className="text-xs text-gray-400">({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Title & Subtitle */}
            <h2 className="text-xl sm:text-2xl font-extrabold text-charcoal">
              {product.name}
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              {product.subtitle}
            </p>

            {/* Price display */}
            <div className="flex items-baseline gap-3 my-4">
              <span className="text-2xl font-black text-charcoal">₹{currentPack.price}</span>
              <span className="text-sm text-gray-400 line-through">₹{currentPack.mrp}</span>
              <span className="text-xs font-bold text-emerald bg-emerald-50 px-2 py-0.5 rounded">
                Save ₹{currentPack.mrp - currentPack.price}
              </span>
            </div>

            {/* Pack Size Selection */}
            {product.packSizes && product.packSizes.length > 0 && (
              <div className="mb-4">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Choose Variant / Size:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {product.packSizes.map((pack, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedPackIndex(idx)}
                      className={`p-2.5 rounded-xl text-left border transition text-xs ${
                        selectedPackIndex === idx
                          ? 'bg-emerald text-white border-gold font-bold shadow-sm'
                          : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
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
            <div className="border-b border-gray-200 mb-3 flex gap-4 text-xs font-bold">
              <button
                onClick={() => setActiveTab('benefits')}
                className={`pb-2 transition ${
                  activeTab === 'benefits'
                    ? 'border-b-2 border-emerald text-emerald'
                    : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                Key Benefits
              </button>
              {product.ingredients && product.ingredients.length > 0 && (
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`pb-2 transition ${
                    activeTab === 'ingredients'
                      ? 'border-b-2 border-emerald text-emerald'
                      : 'text-gray-400 hover:text-gray-700'
                  }`}
                >
                  Formula & Inputs
                </button>
              )}
              {product.usageInstructions && product.usageInstructions.length > 0 && (
                <button
                  onClick={() => setActiveTab('usage')}
                  className={`pb-2 transition ${
                    activeTab === 'usage'
                      ? 'border-b-2 border-emerald text-emerald'
                      : 'text-gray-400 hover:text-gray-700'
                  }`}
                >
                  How to Use
                </button>
              )}
            </div>

            {/* Tab Contents */}
            <div className="text-xs text-gray-600 space-y-2 mb-6 min-h-[90px]">
              {activeTab === 'benefits' && (
                <ul className="space-y-1.5">
                  {product.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald mt-0.5 flex-shrink-0" />
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
                      <span className="font-bold text-emerald">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Action cluster: Quantity & CTAs */}
          <div className="pt-4 border-t border-gray-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-600">Select Quantity:</span>
              <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 overflow-hidden">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-gray-600 hover:bg-gray-200"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-xs font-bold text-gray-800">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => Math.min(20, q + 1))}
                  className="px-3 py-1.5 text-gray-600 hover:bg-gray-200"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className="w-full bg-emerald hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart (₹{currentPack.price * quantity})</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-charcoal-pure font-black py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
              >
                <span>WhatsApp Buy</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
