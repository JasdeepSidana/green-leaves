import React, { useState } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  ChevronRight
} from 'lucide-react';
import { 
  PRIMARY_DISPLAY_PHONE, 
  SECONDARY_DISPLAY_PHONE,
  getWhatsAppInquiryUrl
} from '../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    const url = getWhatsAppInquiryUrl(customMsg.trim());
    window.open(url, '_blank');
    setCustomMsg('');
    setIsOpen(false);
  };

  const quickPrompts = [
    { text: '🌿 Inquire about 6-in-1 Vermicompost Mix', prompt: 'Hello! I want to inquire about your 6-in-1 Enriched Vermicompost Mix and current offers.' },
    { text: '👨‍🌾 Book an on-demand Maali visit', prompt: 'Hello! I need a professional Maali service for my balcony/terrace garden. What slots are available?' },
    { text: '🩺 Ask Plant Doctor for sick plant help', prompt: 'Hello Plant Doctor! My plants are showing yellowing leaves/pests. Can I share photos for diagnosis?' }
  ];

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
      
      {/* Popover Chat Card */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[calc(100vw-2rem)] max-w-sm sm:w-96 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-charcoal-pure via-[#122218] to-charcoal-pure text-white p-4 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3.5 right-3.5 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
              aria-label="Close chat card"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#25D366] text-charcoal-pure flex items-center justify-center font-black">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <span className="w-3 h-3 bg-emerald-400 border-2 border-charcoal-pure rounded-full absolute bottom-0 right-0"></span>
              </div>
              <div>
                <h4 className="text-sm font-extrabold flex items-center gap-1.5">
                  Green Leaves Organics
                  <span className="text-[10px] bg-emerald/60 text-emerald-200 px-1.5 py-0.2 rounded font-normal">Active</span>
                </h4>
                <p className="text-[11px] text-gray-300">
                  Direct Agronomist Line ({PRIMARY_DISPLAY_PHONE})
                </p>
              </div>
            </div>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-botanical-50/70 space-y-3">
            {/* Greeting Bubble */}
            <div className="bg-white p-3 rounded-2xl rounded-tl-xs shadow-xs border border-gray-100 text-xs text-gray-700 leading-relaxed">
              👋 <strong>Namaste! Welcome to Green Leaves Organics.</strong> How can our master agronomists assist you today?
            </div>

            {/* Quick Inquiry Buttons */}
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Quick Inquiries:
              </p>
              {quickPrompts.map((item, idx) => (
                <a
                  key={idx}
                  href={getWhatsAppInquiryUrl(item.prompt)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-left bg-white hover:bg-emerald-50 border border-gray-200/80 hover:border-emerald/40 p-2 rounded-xl text-xs font-semibold text-gray-800 transition flex items-center justify-between group shadow-2xs cursor-pointer"
                >
                  <span className="truncate">{item.text}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                </a>
              ))}
            </div>

            {/* Custom Input */}
            <form onSubmit={handleSendCustom} className="pt-2">
              <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl p-1.5 focus-within:border-emerald shadow-2xs">
                <input
                  type="text"
                  placeholder="Type a custom message..."
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  className="flex-1 text-xs px-2 py-1 outline-none text-gray-800"
                />
                <button
                  type="submit"
                  className="bg-[#25D366] hover:bg-[#20ba5a] text-charcoal-pure p-1.5 rounded-lg transition cursor-pointer"
                  aria-label="Send WhatsApp message"
                >
                  <Send className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </form>

            {/* Dual Contact Footer */}
            <div className="pt-2 border-t border-gray-200/60 text-[10px] text-gray-500 flex justify-between items-center">
              <span>Lines: {PRIMARY_DISPLAY_PHONE}</span>
              <span>Alt: {SECONDARY_DISPLAY_PHONE}</span>
            </div>
          </div>

        </div>
      )}

      {/* Floating Action Bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 relative group cursor-pointer border-2 border-white ring-4 ring-[#25D366]/30"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        
        {/* Pulsing indicator */}
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold flex items-center justify-center text-[10px] font-black text-charcoal-pure shadow-sm animate-pulse">
          1
        </span>

        {/* Hover Tooltip (Desktop only) */}
        {!isOpen && (
          <span className="hidden md:block absolute right-16 top-1/2 -translate-y-1/2 bg-charcoal-pure text-white text-xs font-bold py-1.5 px-3 rounded-xl whitespace-nowrap shadow-lg border border-gold/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Chat on WhatsApp ({PRIMARY_DISPLAY_PHONE})
          </span>
        )}
      </button>

    </div>
  );
};
