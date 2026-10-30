import React, { useEffect } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Truck, 
  Sparkles, 
  Gift, 
  ExternalLink, 
  CreditCard, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getWhatsAppCartCheckoutUrl } from '../utils/whatsapp';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    items, 
    removeItem, 
    updateQuantity, 
    clearCart,
    subtotal, 
    shippingFee, 
    grandTotal, 
    freeDeliveryThreshold, 
    freeDeliveryRemaining, 
    hasFlagship,
    orderNotes,
    setOrderNotes,
    setIsCheckoutModalOpen
  } = useCart();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsCartOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsCartOpen]);

  if (!isCartOpen) return null;

  // Free delivery progress calculation
  const progressPercent = hasFlagship 
    ? 100 
    : Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  const whatsappCheckoutUrl = getWhatsAppCartCheckoutUrl(items, subtotal, shippingFee, orderNotes);

  const handleOpenWebCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-gray-100 animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-gray-100 bg-warmWhite flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald" />
              <h2 className="font-extrabold text-lg text-charcoal">Your Garden Cart</h2>
              <span className="bg-emerald-100 text-emerald-900 text-xs font-bold px-2 py-0.5 rounded-full">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="px-5 py-3.5 bg-botanical-50 border-b border-botanical-100">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold text-gray-700 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald" />
                {hasFlagship ? (
                  <span className="text-emerald-800">🎉 FREE Shipping Unlocked via Flagship Pack!</span>
                ) : freeDeliveryRemaining === 0 ? (
                  <span className="text-emerald-800">🎉 Congratulations! You unlocked FREE Delivery!</span>
                ) : (
                  <span>Add <strong className="text-emerald">₹{freeDeliveryRemaining}</strong> more for FREE Delivery</span>
                )}
              </span>
              <span className="font-extrabold text-emerald">{progressPercent}%</span>
            </div>

            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-emerald h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {hasFlagship && (
              <div className="mt-2 text-[11px] text-gold-dark font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Bonus: FREE Plant + FREE Maali Consult active in cart!</span>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-gray-700">Your cart is currently empty</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Add our 6-in-1 Enriched Vermicompost Mix or fresh indoor plants to get growing.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-emerald text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm hover:bg-emerald-700 transition"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item, idx) => (
                <div 
                  key={`${item.product.id}-${item.selectedPack.size}`}
                  className="flex gap-3 p-3 bg-warmWhite rounded-2xl border border-gray-100"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover border border-gray-200 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold text-charcoal truncate pr-2">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeItem(item.product.id, item.selectedPack.size)}
                        className="text-gray-400 hover:text-red-500 transition p-0.5"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-gray-500 font-medium">
                      Size: {item.selectedPack.size}
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-black text-charcoal">
                        ₹{item.selectedPack.price * item.quantity}
                      </span>

                      {/* Quantity Toggles */}
                      <div className="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedPack.size, item.quantity - 1)}
                          className="px-2 py-0.5 text-gray-500 hover:bg-gray-100"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-gray-800">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedPack.size, item.quantity + 1)}
                          className="px-2 py-0.5 text-gray-500 hover:bg-gray-100"
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

            {/* Special Instructions / Notes */}
            {items.length > 0 && (
              <div className="pt-2">
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                  Delivery Notes / Gate Code (Optional):
                </label>
                <textarea
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="e.g. Please leave with security guard; Call on arrival..."
                  rows={2}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-emerald focus:bg-white"
                ></textarea>
              </div>
            )}
          </div>

          {/* Footer Calculations & Dual Checkout CTAs */}
          {items.length > 0 && (
            <div className="p-5 border-t border-gray-100 bg-white space-y-3">
              {/* Financial Breakdown */}
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-gray-800">₹{subtotal}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Shipping Fee:</span>
                  {shippingFee === 0 ? (
                    <span className="font-bold text-emerald">FREE</span>
                  ) : (
                    <span className="font-semibold text-gray-800">₹{shippingFee}</span>
                  )}
                </div>
                <div className="flex justify-between text-sm font-black text-charcoal pt-1.5 border-t border-gray-100">
                  <span>Total Amount:</span>
                  <span className="text-emerald text-base">₹{grandTotal}</span>
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
                  className="w-full bg-emerald hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>2. Secure Web Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald" />
                <span>256-Bit SSL Encrypted | Safe & Sanitized Packing</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
