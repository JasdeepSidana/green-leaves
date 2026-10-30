import React, { useState, useEffect } from 'react';
import { Clock, X, ChevronRight, Copy, Check, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });
  const { applyPromoCode } = useCart();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 4, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  const scrollToDiwali = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('diwali-campaign') || document.getElementById('flagship-showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyCoupon = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('DIWALIGREEN');
    applyPromoCode('DIWALIGREEN');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-gradient-to-r from-[#1c0f00] via-[#2a1705] to-[#0f1f14] text-white text-xs sm:text-sm py-2 px-3 sm:px-4 border-b border-gold/40 relative z-40 transition-all select-none overflow-hidden">
      {/* Decorative festive shimmer */}
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Left Offer Text */}
        <div 
          onClick={scrollToDiwali}
          className="flex items-center gap-2 flex-1 justify-center sm:justify-start overflow-hidden cursor-pointer group"
        >
          <span className="text-base animate-bounce">🪔</span>
          <p className="truncate text-gray-100 text-[11px] sm:text-xs md:text-sm">
            <span className="font-black text-gold tracking-wide">SHUBH DIWALI UTSAV:</span>{' '}
            <span className="hidden xs:inline">Gift Living Plants Instead Of Mithai 🪴 </span>
            <span className="font-bold text-amber-300">Flat 40% OFF</span> +{' '}
            <span className="font-bold text-emerald-light">FREE Diya 🪔</span> +{' '}
            <span className="font-bold text-emerald-light">FREE Maali Consult!</span>
          </p>

          {/* Copy Coupon Badge */}
          <button
            onClick={copyCoupon}
            className="hidden md:inline-flex items-center gap-1 bg-gold/20 hover:bg-gold/30 border border-gold/50 text-gold px-2 py-0.5 rounded-full text-[10px] font-mono font-bold transition ml-1 cursor-pointer"
            title="Click to copy coupon"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'APPLIED (15% OFF)!' : 'CODE: DIWALIGREEN'}</span>
          </button>
        </div>

        {/* Right Timer & Action */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div className="hidden xs:flex items-center gap-1.5 bg-black/50 border border-gold/30 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs text-gold font-mono">
            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold animate-pulse flex-shrink-0" />
            <span>
              {String(timeLeft.hours).padStart(2, '0')}:
              {String(timeLeft.minutes).padStart(2, '0')}:
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>

          <button
            onClick={scrollToDiwali}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-black bg-gold hover:bg-gold-light text-charcoal-pure px-2.5 py-1 rounded-full transition shadow-sm cursor-pointer"
          >
            <span>Diwali Offers</span>
            <ChevronRight className="w-3 h-3" />
          </button>

          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
            aria-label="Close announcement"
          >
            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
