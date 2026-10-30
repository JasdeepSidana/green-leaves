import React, { useState } from 'react';
import { 
  Leaf, 
  PhoneCall, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Lock, 
  Send, 
  Heart,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { 
  PRIMARY_DISPLAY_PHONE, 
  SECONDARY_DISPLAY_PHONE, 
  PRIMARY_WHATSAPP_NUMBER 
} from '../utils/whatsapp';
import { sanitizeInput, isValidEmail } from '../utils/security';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !isValidEmail(newsletterEmail)) {
      setNewsletterError('Please enter a valid email address');
      return;
    }
    setNewsletterError('');
    setNewsletterSuccess(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSuccess(false), 5000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050807] text-white pt-16 pb-12 border-t-2 border-gold/30 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-950/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-gray-800">
          
          {/* Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center shadow-md border border-gold/60 shadow-gold-dubai-sm">
                <Leaf className="w-5 h-5 text-emerald-light" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl tracking-tight text-white leading-none">
                  Green Leaves<span className="text-emerald font-black">.</span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-gold-metallic-shiny mt-0.5">
                  Organics
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              We bring nature closer to you. Premium organic plant nutrition, 6-in-1 enriched vermicompost formulas, and certified urban Maali services engineered for vibrant Indian homes.
            </p>

            <div className="pt-1">
              <span className="text-[11px] font-bold text-gold uppercase tracking-wider block mb-1">
                Our Brand Mottos:
              </span>
              <p className="text-xs text-gray-400 italic">
                "Healthy Soil, Happy Plants, Greener Future"
              </p>
              <p className="text-xs text-gray-400 italic">
                "Healthy Plants | Happy Tomorrow"
              </p>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-gold">
              Shop & Explore
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <button onClick={() => scrollToSection('products-catalog')} className="hover:text-emerald-light transition">
                  6-in-1 Vermicompost
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('products-catalog')} className="hover:text-emerald-light transition">
                  Pure Neem Khali
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('products-catalog')} className="hover:text-emerald-light transition">
                  Air-Purifier Plants
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('products-catalog')} className="hover:text-emerald-light transition">
                  Trichoderma Fungicide
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('products-catalog')} className="hover:text-emerald-light transition">
                  Terrace Starter Kits
                </button>
              </li>
            </ul>
          </div>

          {/* Maali Services (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-gold">
              Maali Services
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <button onClick={() => scrollToSection('maali-services')} className="hover:text-emerald-light transition">
                  Balcony Garden Setup
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('maali-services')} className="hover:text-emerald-light transition">
                  Routine Maintenance
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('maali-services')} className="hover:text-emerald-light transition">
                  Seasonal Repotting
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('maali-services')} className="hover:text-emerald-light transition">
                  Lawn Mowing Care
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('gardeners-handbook')} className="hover:text-emerald-light transition">
                  Plant Doctor SOS
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Support & Newsletter (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-gold">
              Contact & Order Hotline
            </h4>

            <div className="space-y-2 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-light flex-shrink-0" />
                <span>Primary: </span>
                <a href={`tel:${PRIMARY_WHATSAPP_NUMBER}`} className="font-bold text-white hover:text-emerald-light">
                  {PRIMARY_DISPLAY_PHONE}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-light flex-shrink-0" />
                <span>Secondary: </span>
                <a href={`tel:918556889924`} className="font-bold text-white hover:text-emerald-light">
                  {SECONDARY_DISPLAY_PHONE}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-light flex-shrink-0" />
                <span>Hours: 8:00 AM – 8:00 PM (Monday to Sunday)</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-light flex-shrink-0" />
                <span>Head Office: Delhi NCR & Pan-India Dispatch Hub</span>
              </div>
            </div>

            {/* Gardening Newsletter */}
            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1.5">
                Weekly Urban Gardening Tips & Secret Deals:
              </span>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald flex-1"
                />
                <button
                  type="submit"
                  className="bg-emerald hover:bg-emerald-600 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                  aria-label="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
              {newsletterSuccess && (
                <p className="text-emerald-light text-[11px] mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Welcome to Green Leaves Organics club!
                </p>
              )}
              {newsletterError && (
                <p className="text-red-400 text-[11px] mt-1">{newsletterError}</p>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Legal & Security Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Green Leaves Organics. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-gray-300">
              <Lock className="w-3.5 h-3.5 text-emerald-light" /> 256-bit SSL Certified
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-gray-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-light" /> 100% Bio-Organic Tested
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
