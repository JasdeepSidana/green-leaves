import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  CheckCircle, 
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { MAALI_SERVICES } from '../data/services';
import { MaaliBookingFormData } from '../types';
import { getWhatsAppMaaliBookingUrl } from '../utils/whatsapp';
import { sanitizeInput, isValidIndianPhone } from '../utils/security';

export const MaaliBookingModal: React.FC = () => {
  const { isMaaliModalOpen, closeMaaliBooking, selectedMaaliServiceId } = useCart();
  
  const [formData, setFormData] = useState<MaaliBookingFormData>({
    fullName: '',
    phone: '',
    address: '',
    societyCity: '',
    gardenType: 'Balcony',
    serviceId: selectedMaaliServiceId || MAALI_SERVICES[0].id,
    preferredDate: '',
    preferredTimeSlot: 'Morning (8:30 AM - 11:30 AM)',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedWhatsAppUrl, setSubmittedWhatsAppUrl] = useState('');

  useEffect(() => {
    if (selectedMaaliServiceId) {
      setFormData(prev => ({ ...prev, serviceId: selectedMaaliServiceId }));
    }
  }, [selectedMaaliServiceId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMaaliBooking();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeMaaliBooking]);

  if (!isMaaliModalOpen) return null;

  const currentService = MAALI_SERVICES.find(s => s.id === formData.serviceId) || MAALI_SERVICES[0];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.length < 2) {
      newErrors.fullName = 'Please enter your full name';
    }

    if (!formData.phone.trim() || !isValidIndianPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.societyCity.trim() || formData.societyCity.length < 3) {
      newErrors.societyCity = 'Please enter your Society / Sector & City (e.g. DLF Phase 5, Gurgaon)';
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Please select your preferred date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const sanitizedData: MaaliBookingFormData = {
      fullName: sanitizeInput(formData.fullName),
      phone: sanitizeInput(formData.phone),
      address: sanitizeInput(formData.address),
      societyCity: sanitizeInput(formData.societyCity),
      gardenType: formData.gardenType,
      serviceId: formData.serviceId,
      preferredDate: sanitizeInput(formData.preferredDate),
      preferredTimeSlot: sanitizeInput(formData.preferredTimeSlot),
      notes: sanitizeInput(formData.notes)
    };

    const whatsappUrl = getWhatsAppMaaliBookingUrl(sanitizedData, currentService.title);
    setSubmittedWhatsAppUrl(whatsappUrl);
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    closeMaaliBooking();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#0E1512] text-white rounded-3xl shadow-luxury-dark overflow-hidden border-2 border-gold/40 my-4 sm:my-8 animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-black via-[#132019] to-black text-white p-5 sm:p-8 relative flex-shrink-0 border-b border-white/10">
          <button
            onClick={handleResetAndClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Green Leaves Verified Gardening Experts</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight text-white">
            Book a Professional Maali Visit
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-1">
            Doorstep garden makeover, plant repotting, pruning, & organic soil care in Delhi NCR, Gurgaon & major cities.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1">
          {isSubmitted ? (
            /* Confirmation State */
            <div className="text-center py-4 sm:py-6 space-y-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-950 text-emerald-light border border-emerald-500/40 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Appointment Request Received!
              </h3>
              
              <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-gold">{formData.fullName}</strong>. Our supervisor has logged your appointment for{' '}
                <span className="font-semibold text-emerald-light">{formData.preferredDate}</span> ({formData.preferredTimeSlot}) at{' '}
                <span className="font-semibold text-white">{formData.societyCity}</span>.
              </p>

              <div className="bg-black/50 border border-gold/30 rounded-2xl p-4 text-left max-w-md mx-auto text-xs space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span className="text-gray-400">Service:</span>
                  <span className="font-bold text-white">{currentService.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Estimated Cost:</span>
                  <span className="font-bold text-gold">{currentService.priceDisplay}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Phone:</span>
                  <span className="font-bold text-white">{formData.phone}</span>
                </div>
              </div>

              {/* Instant WhatsApp Dispatch CTA */}
              <div className="pt-3 space-y-2.5 max-w-md mx-auto">
                <a
                  href={submittedWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-charcoal-pure font-black py-3.5 px-6 rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
                >
                  <span>Dispatch via WhatsApp to +91 8826078720</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <p className="text-[11px] text-gray-400">
                  Clicking opens pre-filled booking details directly with our lead coordinator for instant slot confirmation.
                </p>

                <button
                  onClick={handleResetAndClose}
                  className="text-xs text-gold hover:underline pt-2 cursor-pointer"
                >
                  Close & Return to Store
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Select Service Dropdown */}
              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  Choose Service Type:
                </label>
                <select
                  name="serviceId"
                  value={formData.serviceId}
                  onChange={handleInputChange}
                  className="w-full bg-[#141F1A] border border-white/20 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-gold"
                >
                  {MAALI_SERVICES.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.title} ({s.priceDisplay})
                    </option>
                  ))}
                </select>
              </div>

              {/* Name & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] sm:text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      name="fullName"
                      placeholder="e.g. Ananya Sharma"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full bg-[#141F1A] border rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none ${
                        errors.fullName ? 'border-red-500' : 'border-white/20 focus:border-gold'
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">
                    WhatsApp / Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="e.g. 9811223344"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full bg-[#141F1A] border rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none ${
                        errors.phone ? 'border-red-500' : 'border-white/20 focus:border-gold'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Society / Sector / City & Garden Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] sm:text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">
                    Society, Sector & City *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      name="societyCity"
                      placeholder="e.g. DLF Phase 5, Gurgaon"
                      value={formData.societyCity}
                      onChange={handleInputChange}
                      className={`w-full bg-[#141F1A] border rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none ${
                        errors.societyCity ? 'border-red-500' : 'border-white/20 focus:border-gold'
                      }`}
                    />
                  </div>
                  {errors.societyCity && (
                    <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.societyCity}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">
                    Garden Type
                  </label>
                  <select
                    name="gardenType"
                    value={formData.gardenType}
                    onChange={handleInputChange}
                    className="w-full bg-[#141F1A] border border-white/20 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-gold"
                  >
                    <option value="Balcony">Apartment Balcony</option>
                    <option value="Terrace">Terrace / Rooftop Garden</option>
                    <option value="Lawn">Ground Floor Lawn / Yard</option>
                    <option value="Indoor">Indoor Plants & Living Room</option>
                    <option value="Kitchen Garden">Edible Kitchen Garden</option>
                  </select>
                </div>
              </div>

              {/* Preferred Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] sm:text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">
                    Preferred Visit Date *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      className={`w-full bg-[#141F1A] border rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none ${
                        errors.preferredDate ? 'border-red-500' : 'border-white/20 focus:border-gold'
                      }`}
                    />
                  </div>
                  {errors.preferredDate && (
                    <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.preferredDate}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">
                    Preferred Time Window
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <select
                      name="preferredTimeSlot"
                      value={formData.preferredTimeSlot}
                      onChange={handleInputChange}
                      className="w-full bg-[#141F1A] border border-white/20 rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-gold"
                    >
                      <option value="Morning (8:30 AM - 11:30 AM)">Morning (8:30 AM - 11:30 AM)</option>
                      <option value="Afternoon (12:00 PM - 3:00 PM)">Afternoon (12:00 PM - 3:00 PM)</option>
                      <option value="Evening (3:30 PM - 6:30 PM)">Evening (3:30 PM - 6:30 PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Optional Notes */}
              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">
                  Special Notes or Plant Concerns (Optional)
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  placeholder="e.g. 15 balcony pots need soil refresh; hibiscus has white mealybugs..."
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full bg-[#141F1A] border border-white/20 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-gold"
                ></textarea>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-gold hover:bg-gold-light text-charcoal-pure font-black py-3.5 px-6 rounded-xl shadow-gold-glow transition flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Confirm Booking & Send to Coordinator</span>
                </button>

                <p className="text-center text-[11px] text-gray-400 mt-2">
                  🔒 Zero advance fee required. Pay post-service inspection via UPI or Cash.
                </p>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
