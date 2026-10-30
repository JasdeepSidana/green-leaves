import React from 'react';
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Scissors, 
  Layers, 
  ShieldAlert, 
  Home, 
  PhoneCall
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { MAALI_SERVICES } from '../data/services';
import { PRIMARY_DISPLAY_PHONE } from '../utils/whatsapp';

export const MaaliServicesSection: React.FC = () => {
  const { openMaaliBooking } = useCart();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-gold" />;
      case 'Scissors': return <Scissors className="w-5 h-5 text-emerald-light" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-amber-400" />;
      case 'Layers': return <Layers className="w-5 h-5 text-emerald-light" />;
      case 'Home': return <Home className="w-5 h-5 text-emerald-light" />;
      default: return <Sparkles className="w-5 h-5 text-gold" />;
    }
  };

  return (
    <section id="maali-services" className="py-16 sm:py-24 bg-[#070B09] text-white relative overflow-hidden border-b border-gold/20">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-light text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            Verified Urban Garden Care
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            On-Demand Doorstep Maali Services
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-300">
            Trained, background-verified master gardeners equipped with professional tools, Green Leaves organic amendments, and agronomist protocols.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MAALI_SERVICES.map((service) => (
            <div
              key={service.id}
              className={`rounded-3xl border transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between relative group ${
                service.popular
                  ? 'bg-gradient-to-b from-[#14231b] via-[#0e1713] to-charcoal-pure text-white border-2 border-gold shadow-gold-glow'
                  : 'bg-[#121A16] border-emerald-500/20 hover:border-gold/50 text-white shadow-luxury-dark'
              }`}
            >
              {service.popular && (
                <div className="absolute -top-3 right-6 bg-gold text-charcoal-pure text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-md">
                  Most Popular
                </div>
              )}

              <div>
                {/* Header Icon & Duration */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/10 border border-white/10">
                    {getIcon(service.iconName)}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-gray-400">
                    <Clock className="w-3.5 h-3.5 text-gold" />
                    <span>{service.duration}</span>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl font-extrabold mb-1 text-white">
                  {service.title}
                </h3>
                <p className="text-xs mb-4 text-gray-400">
                  {service.subtitle}
                </p>

                {/* Price Tag */}
                <div className="mb-5 pb-4 border-b border-white/10">
                  <span className="text-2xl font-black text-gold">
                    {service.priceDisplay}
                  </span>
                  <span className="text-[11px] block text-gray-400 mt-0.5">
                    Includes tools & organic bio-inputs
                  </span>
                </div>

                {/* Features Checklist */}
                <div className="space-y-2.5 mb-6">
                  {service.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-light" />
                      <span className="text-gray-300">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Book Button */}
              <div className="pt-2">
                <button
                  onClick={() => openMaaliBooking(service.id)}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    service.popular
                      ? 'bg-gold hover:bg-gold-light text-charcoal-pure font-black shadow-gold-glow'
                      : 'bg-emerald hover:bg-emerald-600 text-white font-bold'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment Now</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-12 bg-[#121A16] border border-gold/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald text-white flex items-center justify-center flex-shrink-0 shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">The Green Leaves Maali Promise</h4>
              <p className="text-xs text-gray-400">
                If you aren't completely delighted with your plant care session, we send a senior supervisor for a free follow-up inspection.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Need urgent custom consultation?</span>
            <a
              href={`tel:918826078720`}
              className="text-xs font-bold text-gold flex items-center gap-1 hover:underline whitespace-nowrap"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{PRIMARY_DISPLAY_PHONE}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
