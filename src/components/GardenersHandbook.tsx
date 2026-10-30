import React, { useState } from 'react';
import { 
  BookOpen, 
  ChevronDown, 
  Lightbulb, 
  Stethoscope, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { GARDENER_GUIDES, PLANT_DOCTOR_SYMPTOMS } from '../data/educational';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export const GardenersHandbook: React.FC = () => {
  const { openQuickView } = useCart();
  const [openGuideId, setOpenGuideId] = useState<string>(GARDENER_GUIDES[0].id);
  const [selectedSymptomIndex, setSelectedSymptomIndex] = useState<number>(0);

  const toggleGuide = (id: string) => {
    setOpenGuideId(prev => (prev === id ? '' : id));
  };

  const currentSymptom = PLANT_DOCTOR_SYMPTOMS[selectedSymptomIndex];
  const matchedProduct = PRODUCTS.find(p => p.slug === currentSymptom.recommendedProductSlug) || PRODUCTS[0];

  return (
    <section id="gardeners-handbook" className="py-16 sm:py-24 bg-softBg/60 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5 text-emerald" />
            Agronomist Knowledge Hub
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight">
            The Urban Gardener's Handbook
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600">
            Backed by biological science and organic field trials. Master plant parenting in apartments, balconies, and terrace gardens.
          </p>
        </div>

        {/* Dual Grid: Left Accordion Guides, Right Plant Doctor Mini-Tool */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Accordion Articles */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xl font-extrabold text-charcoal flex items-center gap-2 mb-4">
              <span>Step-by-Step Care Protocols</span>
            </h3>

            {GARDENER_GUIDES.map((guide) => {
              const isOpen = openGuideId === guide.id;
              return (
                <div
                  key={guide.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen 
                      ? 'bg-white border-emerald/50 shadow-md ring-1 ring-emerald/20' 
                      : 'bg-white/80 border-gray-200/80 hover:border-gray-300'
                  }`}
                >
                  <button
                    onClick={() => toggleGuide(guide.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black uppercase tracking-wider bg-botanical-100 text-emerald-900 px-2 py-0.5 rounded-full">
                          {guide.category}
                        </span>
                        <span className="text-xs text-gray-400">{guide.readTime}</span>
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-charcoal">
                        {guide.title}
                      </h4>
                    </div>

                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-emerald text-white rotate-180' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-gray-600 border-t border-gray-100 animate-in fade-in duration-200">
                      <p className="mb-4 text-xs sm:text-sm leading-relaxed text-gray-700">
                        {guide.summary}
                      </p>

                      <div className="space-y-2.5 mb-5 bg-botanical-50/60 p-4 rounded-xl border border-botanical-100">
                        <span className="text-xs font-bold uppercase tracking-wider text-charcoal block mb-1">
                          Execution Steps:
                        </span>
                        {guide.steps.map((step, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-700">
                            <span className="w-5 h-5 rounded-full bg-emerald text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>

                      <div className="bg-amber-50 border border-amber-200/70 rounded-xl p-3 flex items-start gap-2.5 text-xs text-amber-900">
                        <Lightbulb className="w-4 h-4 text-gold-dark flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold">Pro Grower Tip:</strong> {guide.proTip}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Interactive Plant Doctor SOS Diagnostic Tool */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-b from-charcoal-pure via-[#15221b] to-charcoal-pure rounded-3xl p-6 sm:p-8 text-white border-2 border-gold/40 shadow-luxury-dark relative overflow-hidden">
              <div className="flex items-center gap-2 text-gold text-xs font-black uppercase tracking-wider mb-2">
                <Stethoscope className="w-4 h-4 text-emerald-light" />
                <span>Interactive Plant Doctor SOS</span>
              </div>
              <h3 className="text-2xl font-black text-white">
                Diagnose Sick Potted Plants
              </h3>
              <p className="text-xs text-gray-300 mt-1 mb-5">
                Select what symptoms your plant is showing to instantly see root causes and verified organic remedies.
              </p>

              {/* Symptom Selector Radio Pills */}
              <div className="space-y-2 mb-6">
                <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider">
                  Select Observed Symptom:
                </label>
                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                  {PLANT_DOCTOR_SYMPTOMS.map((item, idx) => {
                    const isSelected = selectedSymptomIndex === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedSymptomIndex(idx)}
                        className={`w-full text-left p-2.5 rounded-xl text-xs transition border flex items-center justify-between gap-2 cursor-pointer ${
                          isSelected
                            ? 'bg-emerald text-white border-gold font-bold shadow-sm'
                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        <span className="truncate">{item.symptom}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-gold flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Diagnosis Output Card */}
              <div className="bg-black/40 border border-white/10 rounded-2xl p-4 space-y-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-0.5 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-amber-400" />
                    Likely Cause:
                  </span>
                  <p className="text-xs text-gray-200">
                    {currentSymptom.causes}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-light block mb-0.5 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-light" />
                    Recommended Organic Remedy:
                  </span>
                  <p className="text-xs text-gray-200">
                    {currentSymptom.solution}
                  </p>
                </div>

                {/* Direct Product Recommendation Pill */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <img
                      src={matchedProduct.image}
                      alt={matchedProduct.name}
                      className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-white/20"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white truncate">{matchedProduct.name}</p>
                      <p className="text-[11px] text-gold font-bold">₹{matchedProduct.price}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => openQuickView(matchedProduct)}
                    className="bg-gold hover:bg-gold-light text-charcoal-pure font-black px-3 py-1.5 rounded-lg text-xs transition flex items-center gap-1 flex-shrink-0 cursor-pointer shadow-sm"
                  >
                    <span>View Cure</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
