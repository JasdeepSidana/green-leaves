import React from 'react';
import { 
  Star, 
  ShieldCheck, 
  Truck, 
  Leaf, 
  CheckCircle2, 
  Quote, 
  Award 
} from 'lucide-react';
import { TESTIMONIALS, TRUST_BADGES } from '../data/testimonials';
import { SafeImage } from './SafeImage';

export const TestimonialsTrust: React.FC = () => {
  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Leaf': return <Leaf className="w-6 h-6 text-emerald-light" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-emerald-light" />;
      case 'Truck': return <Truck className="w-6 h-6 text-emerald-light" />;
      case 'Award': return <Award className="w-6 h-6 text-gold" />;
      default: return <ShieldCheck className="w-6 h-6 text-emerald-light" />;
    }
  };

  return (
    <section className="py-12 sm:py-20 bg-[#070B09] text-white relative max-w-full overflow-hidden border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Badges Strip (4 Pillars) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {TRUST_BADGES.map((badge) => (
            <div
              key={badge.id}
              className="bg-[#121B16] border border-emerald-500/20 rounded-2xl p-5 text-center hover:border-gold/50 transition duration-300 shadow-luxury-dark flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-black/60 shadow-2xs flex items-center justify-center mb-3 border border-gold/30">
                {getBadgeIcon(badge.iconName)}
              </div>
              <h4 className="text-sm sm:text-base font-extrabold text-white mb-1">
                {badge.title}
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                {badge.description}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-light text-xs font-bold uppercase tracking-wider mb-2">
            <Star className="w-3.5 h-3.5 fill-gold text-gold" />
            Loved By 1,250+ Urban Plant Parents
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Real Stories, Thriving Balconies
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-300">
            Hear from apartment plant lovers, villa garden owners, and terrace green thumbs across Delhi NCR, Bangalore, Mumbai, and Chandigarh.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="bg-[#121A16] border border-emerald-500/20 hover:border-gold/50 rounded-3xl p-5 sm:p-7 shadow-luxury-dark transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Stars & Verified Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-gold">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-emerald-light bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                    <CheckCircle2 className="w-3 h-3 text-emerald-light" />
                    Verified Customer
                  </span>
                </div>

                {/* Comment */}
                <div className="relative mb-5">
                  <Quote className="w-7 h-7 text-white/5 absolute -top-3 -left-2 -z-0" />
                  <p className="text-xs sm:text-sm text-gray-200 leading-relaxed italic relative z-10">
                    "{review.comment}"
                  </p>
                </div>
              </div>

              {/* Author Info & Plant Thumbnail */}
              <div className="pt-3.5 border-t border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className={`w-10 h-10 rounded-full ${review.avatarBg} text-white font-bold text-xs sm:text-sm flex items-center justify-center flex-shrink-0 shadow-xs border border-white/20`}>
                    {review.avatarText}
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-white">{review.name}</h5>
                    <p className="text-[11px] text-gray-400">{review.location}</p>
                  </div>
                </div>

                {review.productMentioned && (
                  <span className="hidden sm:inline-block text-[10px] bg-white/5 text-gold px-2 py-1 rounded-lg border border-gold/30">
                    {review.productMentioned}
                  </span>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
