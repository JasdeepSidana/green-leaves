import React, { useState, useEffect } from 'react';
import { Clock, X, ChevronRight } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });

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

  const scrollToFlagship = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('flagship-showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gradient-to-r from-charcoal-pure via-[#0f2e1a] to-charcoal-pure text-white text-xs sm:text-sm py-2 px-3 sm:px-4 border-b border-emerald/30 relative z-40 transition-all select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Left Offer Text */}
        <div 
          onClick={scrollToFlagship}
          className="flex items-center gap-2 flex-1 justify-center sm:justify-start overflow-hidden cursor-pointer group"
        >
          <span className="flex h-2 w-2 relative flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
          </span>
          <p className="truncate text-gray-200 text-[11px] sm:text-xs md:text-sm">
            <span className="font-extrabold text-gold tracking-wide">SPECIAL OFFER:</span>{' '}
            <span className="hidden xs:inline">Buy Enriched Vermicompost Mix & Get </span>
            <span className="font-bold text-emerald-light">FREE Plant</span> +{' '}
            <span className="font-bold text-emerald-light">FREE Maali Service</span> +{' '}
            <span className="font-bold text-emerald-light">FREE Delivery!</span>
          </p>
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
            onClick={scrollToFlagship}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-bold bg-emerald hover:bg-emerald-600 text-white px-2.5 py-1 rounded-full transition shadow-sm cursor-pointer"
          >
            Claim
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
