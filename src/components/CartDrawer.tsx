import React, { useState, useEffect } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Truck, 
  Sparkles, 
  ExternalLink, 
  CreditCard, 
  ArrowRight,
  ShieldCheck,
  Tag,
  Check
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getWhatsAppCartCheckoutUrl } from '../utils/whatsapp';
import { SafeImage } from './SafeImage';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    items, 
    removeItem, 
    updateQuantity, 
    subtotal, 
    shippingFee, 
    grandTotal, 
    freeDeliveryThreshold, 
    freeDeliveryRemaining, 
    hasFlagship,
    appliedPromoCode,
    promoDiscount,
    promoLabel,
    applyPromoCode,
    removePromoCode,
    orderNotes,
    setOrderNotes,
    setIsCheckoutModalOpen
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; isError: boolean } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsCartOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsCartOpen]);

  if (!isCartOpen) return null;

  const progressPercent = hasFlagship 
    ? 100 
    : Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  const whatsappCheckoutUrl = getWhatsAppCartCheckoutUrl(
    items, 
    subtotal, 
    shippingFee, 
    promoDiscount, 
    appliedPromoCode, 
    orderNotes
  );

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyPromoCode(couponInput.trim());
    setCouponMsg({ text: res.message, isError: !res.success });
    if (res.success) setCouponInput('');
    setTimeout(() => setCouponMsg(null), 4000);
  };

  const handleOpenWebCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-xs transition-opacity duration-300 cursor-pointer"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-8">
        <div className="w-screen max-w-md bg-[#0D1411] text-white shadow-2xl flex flex-col justify-between border-l border-gold/30 animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 bg-[#080D0B] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-light" />
              <h2 className="font-extrabold text-base sm:text-lg text-white">Your Garden Cart</h2>
              <span className="bg-gold text-charcoal-pure text-xs font-black px-2 py-0.5 rounded-full">
                {items.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Meter */}
          <div className="bg-[#14231b] border-b border-emerald-500/30 p-3 sm:p-4 text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5 font-bold text-white">
                <Truck className="w-4 h-4 text-emerald-light" />
                {hasFlagship ? (
                  <span className="text-gold font-black">🎉 Free Delivery Unlocked (Flagship Vermicompost in cart!)</span>
                ) : freeDeliveryRemaining <= 0 ? (
                  <span className="text-emerald-light font-black">🎉 You've unlocked FREE Doorstep Delivery!</span>
                ) : (
                  <span>
                    Add <strong className="text-gold">₹{freeDeliveryRemaining}</strong> more for <strong>FREE Delivery</strong>
                  </span>
                )}
              </div>
              <span className="font-bold text-gold">{progressPercent}%</span>
            </div>

            {/* Progress Bar with Shiny Dubai Gold */}
            <div className="w-full h-2.5 bg-black/70 rounded-full overflow-hidden border border-gold/30">
              <div 
                className="h-full bg-dubai-gold-metallic rounded-full transition-all duration-500 shadow-gold-dubai-sm"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-gray-400">
                  <ShoppingBag className="w-8 h-8 text-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Your garden cart is empty</h3>
                  <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
                    Bring life to your home. Explore our 6-in-1 Vermicompost, pure Neem Khali, or auspicious Diwali gifts.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="inline-flex items-center gap-2 bg-emerald hover:bg-emerald-600 text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-md transition cursor-pointer"
                >
                  <span>Start Shopping</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div 
                  key={`${item.product.id}-${item.selectedPack.size}`}
                  className="flex gap-3.5 p-3 rounded-2xl bg-[#121A16] border border-white/10 hover:border-gold/40 transition"
                >
                  <SafeImage
                    src={item.selectedPack.image || item.product.image}
                    alt={`${item.product.name} - ${item.selectedPack.size}`}
                    className="w-16 h-16 rounded-xl object-contain p-1 bg-black/60 flex-shrink-0 border border-white/10"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-white truncate leading-tight">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.product.id, item.selectedPack.size)}
                          className="text-gray-400 hover:text-red-400 transition cursor-pointer p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] text-gray-400 mt-0.5 font-medium">
                        {item.selectedPack.size}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xs font-black text-gold">₹{item.selectedPack.price * item.quantity}</span>
                        {item.quantity > 1 && (
                          <span className="text-[10px] text-gray-400">
                            (₹{item.selectedPack.price} each)
                          </span>
                        )}
                      </div>

                      {/* Quantity Modifiers */}
                      <div className="flex items-center border border-white/20 rounded-lg overflow-hidden bg-black/40">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedPack.size, item.quantity - 1)}
                          className="px-2 py-0.5 text-gray-300 hover:bg-white/10 cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedPack.size, item.quantity + 1)}
                          className="px-2 py-0.5 text-gray-300 hover:bg-white/10 cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Festive Coupon Input Box */}
            {items.length > 0 && (
              <div className="pt-2">
                <div className="bg-[#141F1A] border border-gold/40 rounded-2xl p-3">
                  <div className="flex items-center justify-between mb-1.5 text-xs">
                    <span className="font-bold text-gold flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5 text-gold" />
                      Festive Coupon Code
                    </span>
                    <span className="text-[10px] text-amber-300 font-bold">Use 'DIWALIGREEN'</span>
                  </div>

                  {appliedPromoCode ? (
                    <div className="flex items-center justify-between bg-black/60 border border-emerald-500/40 rounded-xl p-2 text-xs">
                      <div className="flex items-center gap-1.5 text-emerald-light font-bold">
                        <Check className="w-4 h-4 text-emerald-light" />
                        <span>{promoLabel || `${appliedPromoCode} (15% OFF)`}</span>
                      </div>
                      <button
                        onClick={removePromoCode}
                        className="text-xs text-red-400 hover:text-red-300 font-bold underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter DIWALIGREEN"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        className="bg-black/60 border border-white/20 rounded-xl px-3 py-1.5 text-xs text-white font-mono font-bold uppercase focus:outline-none focus:border-gold flex-1"
                      />
                      <button
                        type="submit"
                        className="bg-gold hover:bg-gold-light text-charcoal-pure px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition shadow-gold-glow"
                      >
                        Apply
                      </button>
                    </form>
                  )}

                  {couponMsg && (
                    <p className={`text-[11px] mt-1.5 font-medium ${couponMsg.isError ? 'text-red-400' : 'text-emerald-light'}`}>
                      {couponMsg.text}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Special Instructions / Notes */}
            {items.length > 0 && (
              <div className="pt-1">
                <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1">
                  Delivery Notes / Gate Code (Optional):
                </label>
                <textarea
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="e.g. Please leave with security guard; Call on arrival..."
                  rows={2}
                  className="w-full bg-[#141F1A] border border-white/10 text-white rounded-xl p-2.5 text-xs focus:outline-none focus:border-gold"
                ></textarea>
              </div>
            )}
          </div>

          {/* Footer Calculations & Dual Checkout CTAs */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-white/10 bg-[#080D0B] space-y-3">
              {/* Financial Breakdown */}
              <div className="space-y-1.5 text-xs text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-white">₹{subtotal}</span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-emerald-light font-bold">
                    <span>Diwali Discount ({appliedPromoCode}):</span>
                    <span>-₹{promoDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span>Shipping Fee:</span>
                  {shippingFee === 0 ? (
                    <span className="font-bold text-emerald-light">FREE</span>
                  ) : (
                    <span className="font-semibold text-white">₹{shippingFee}</span>
                  )}
                </div>
                <div className="flex justify-between text-sm font-black text-white pt-1.5 border-t border-white/10 items-baseline">
                  <span>Total Amount:</span>
                  <span className="text-gold-metallic-shiny text-lg font-black">₹{grandTotal}</span>
                </div>
              </div>

              {/* Dual Checkout Buttons */}
              <div className="space-y-2 pt-1">
                {/* 1. Instant WhatsApp Checkout */}
                <a
                  href={whatsappCheckoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-charcoal-pure font-black py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
                >
                  <span>1. Instant WhatsApp Order</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                {/* 2. Secure Web Checkout Modal */}
                <button
                  onClick={handleOpenWebCheckout}
                  className="w-full bg-emerald hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>2. Secure Web Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-light" />
                <span>256-Bit SSL Encrypted | Safe & Sanitized Packing</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
