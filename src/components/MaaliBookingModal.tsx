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
  AlertCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { MAALI_SERVICES } from '../data/services';
import { MaaliBookingFormData } from '../types';
import { sanitizeInput, isValidIndianPhone } from '../utils/security';
import { getWhatsAppMaaliBookingUrl, PRIMARY_DISPLAY_PHONE } from '../utils/whatsapp';

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

  // Sync serviceId when modal opens with selected service
  useEffect(() => {
    if (selectedMaaliServiceId) {
      setFormData(prev => ({ ...prev, serviceId: selectedMaaliServiceId }));
    }
    // Set default tomorrow date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, preferredDate: prev.preferredDate || dateStr }));
  }, [selectedMaaliServiceId, isMaaliModalOpen]);

  if (!isMaaliModalOpen) return null;

  const currentService = MAALI_SERVICES.find(s => s.id === formData.serviceId) || MAALI_SERVICES[0];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error
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

    // Sanitize all inputs
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 my-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-charcoal-pure via-[#132019] to-charcoal-pure text-white p-6 sm:p-8 relative">
          <button
            onClick={handleResetAndClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Green Leaves Verified Gardening Experts</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Book a Professional Maali Visit
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-1">
            Doorstep garden makeover, plant repotting, pruning, & organic soil care in Delhi NCR, Gurgaon & major cities.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {isSubmitted ? (
            /* Confirmation State */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>
              
              <h3 className="text-2xl font-black text-charcoal">
                Appointment Request Received!
              </h3>
              
              <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-charcoal">{formData.fullName}</strong>. Our supervisor has logged your appointment for{' '}
                <span className="font-semibold text-emerald">{formData.preferredDate}</span> ({formData.preferredTimeSlot}) at{' '}
                <span className="font-semibold text-charcoal">{formData.societyCity}</span>.
              </p>

              <div className="bg-botanical-50 border border-botanical-200/80 rounded-2xl p-4 text-left max-w-md mx-auto text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Service:</span>
                  <span className="font-bold text-gray-800">{currentService.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Estimated Cost:</span>
                  <span className="font-bold text-emerald">{currentService.priceDisplay}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Phone:</span>
                  <span className="font-bold text-gray-800">{formData.phone}</span>
                </div>
              </div>

              {/* Instant WhatsApp Dispatch CTA */}
              <div className="pt-4 space-y-3 max-w-md mx-auto">
                <a
                  href={submittedWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-charcoal-pure font-black py-3.5 px-6 rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  <span>Dispatch via WhatsApp to +91 8826078720</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <p className="text-[11px] text-gray-400">
                  Clicking the button opens pre-filled booking details directly with our lead coordinator for instant slot locking.
                </p>

                <button
                  onClick={handleResetAndClose}
                  className="text-xs text-gray-500 hover:text-gray-800 font-bold underline pt-2"
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
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Choose Service Type:
                </label>
                <select
                  name="serviceId"
                  value={formData.serviceId}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-800 focus:outline-none focus:border-emerald focus:bg-white"
                >
                  {MAALI_SERVICES.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.title} ({s.priceDisplay})
                    </option>
                  ))}
                </select>
              </div>

              {/* Name & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
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
                      className={`w-full bg-gray-50 border rounded-xl pl-10 pr-3.5 py-2.5 text-sm focus:outline-none focus:bg-white ${
                        errors.fullName ? 'border-red-500 bg-red-50/50' : 'border-gray-200 focus:border-emerald'
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-red-500 text-[11px] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
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
                      className={`w-full bg-gray-50 border rounded-xl pl-10 pr-3.5 py-2.5 text-sm focus:outline-none focus:bg-white ${
                        errors.phone ? 'border-red-500 bg-red-50/50' : 'border-gray-200 focus:border-emerald'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-[11px] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Society / Sector / City & Garden Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Society, Sector & City *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      name="societyCity"
                      placeholder="e.g. The Magnolias, Golf Course Rd, GGN"
                      value={formData.societyCity}
                      onChange={handleInputChange}
                      className={`w-full bg-gray-50 border rounded-xl pl-10 pr-3.5 py-2.5 text-sm focus:outline-none focus:bg-white ${
                        errors.societyCity ? 'border-red-500 bg-red-50/50' : 'border-gray-200 focus:border-emerald'
                      }`}
                    />
                  </div>
                  {errors.societyCity && (
                    <p className="text-red-500 text-[11px] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.societyCity}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Garden Type
                  </label>
                  <select
                    name="gardenType"
                    value={formData.gardenType}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-emerald focus:bg-white"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Preferred Visit Date *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      className={`w-full bg-gray-50 border rounded-xl pl-10 pr-3.5 py-2.5 text-sm focus:outline-none focus:bg-white ${
                        errors.preferredDate ? 'border-red-500 bg-red-50/50' : 'border-gray-200 focus:border-emerald'
                      }`}
                    />
                  </div>
                  {errors.preferredDate && (
                    <p className="text-red-500 text-[11px] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.preferredDate}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Preferred Time Window
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <select
                      name="preferredTimeSlot"
                      value={formData.preferredTimeSlot}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-3.5 py-2.5 text-sm focus:outline-none focus:border-emerald focus:bg-white"
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
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Special Notes or Plant Concerns (Optional)
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  placeholder="e.g. 15 balcony pots need soil refresh; hibiscus has white mealybugs..."
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs focus:outline-none focus:border-emerald focus:bg-white"
                ></textarea>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-emerald hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span>Confirm Booking & Send to Coordinator</span>
                </button>

                <p className="text-center text-[11px] text-gray-500 mt-2">
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
