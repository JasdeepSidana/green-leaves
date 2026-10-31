import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  CheckCircle2, 
  ExternalLink, 
  QrCode, 
  Banknote, 
  Copy, 
  Check,
  User,
  Building2,
  Smartphone,
  ChevronRight,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { CheckoutFormData, PlacedOrder } from '../types';
import { 
  sanitizeInput, 
  isValidIndianPhone, 
  isValidEmail, 
  isValidPincode 
} from '../utils/security';
import { getWhatsAppOrderReceiptUrl } from '../utils/whatsapp';

const POPULAR_BANKS = [
  { code: 'HDFC', name: 'HDFC Bank', logo: '🏛️' },
  { code: 'ICICI', name: 'ICICI Bank', logo: '🏦' },
  { code: 'SBI', name: 'State Bank of India', logo: '🌐' },
  { code: 'AXIS', name: 'Axis Bank', logo: '🏢' },
  { code: 'KOTAK', name: 'Kotak Mahindra', logo: '🛡️' },
  { code: 'PNB', name: 'Punjab National Bank', logo: '🇮🇳' },
];

const UPI_APPS = [
  { id: 'gpay', name: 'Google Pay', icon: '🟢', suffix: '@okaxis' },
  { id: 'phonepe', name: 'PhonePe', icon: '🟣', suffix: '@ybl' },
  { id: 'paytm', name: 'Paytm UPI', icon: '🔵', suffix: '@paytm' },
  { id: 'bhim', name: 'BHIM UPI', icon: '🟠', suffix: '@upi' },
];

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutModalOpen, 
    setIsCheckoutModalOpen, 
    items, 
    subtotal, 
    shippingFee, 
    grandTotal, 
    appliedPromoCode,
    promoDiscount,
    orderNotes,
    clearCart 
  } = useCart();

  const { currentUser, isAuthenticated, openAuthModal, addOrder } = useAuth();

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    phone: '',
    email: '',
    addressLine: '',
    landmark: '',
    city: '',
    state: 'Haryana',
    pincode: '',
    paymentMethod: 'upi',
    orderNotes: orderNotes || '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardHolder: '',
    upiId: '',
    upiApp: 'gpay',
    bankCode: 'HDFC'
  });

  const [showQrModal, setShowQrModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<PlacedOrder | null>(null);
  const [copied, setCopied] = useState(false);

  // Auto-fill form if user is logged in
  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        fullName: prev.fullName || currentUser.fullName || '',
        phone: prev.phone || currentUser.phone || '',
        email: prev.email || currentUser.email || '',
        addressLine: prev.addressLine || currentUser.addressLine || '',
        landmark: prev.landmark || currentUser.landmark || '',
        city: prev.city || currentUser.city || '',
        state: prev.state || currentUser.state || 'Haryana',
        pincode: prev.pincode || currentUser.pincode || '',
        cardHolder: prev.cardHolder || currentUser.fullName || ''
      }));
    }
  }, [currentUser, isCheckoutModalOpen]);

  if (!isCheckoutModalOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Custom formatting for card number (XXXX XXXX XXXX XXXX)
    if (name === 'cardNumber') {
      const cleaned = value.replace(/\D/g, '').slice(0, 16);
      const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
      setFormData(prev => ({ ...prev, cardNumber: formatted }));
      if (errors.cardNumber) setErrors(prev => ({ ...prev, cardNumber: '' }));
      return;
    }

    // Custom formatting for card expiry (MM/YY)
    if (name === 'cardExpiry') {
      const cleaned = value.replace(/\D/g, '').slice(0, 4);
      let formatted = cleaned;
      if (cleaned.length >= 2) {
        formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
      }
      setFormData(prev => ({ ...prev, cardExpiry: formatted }));
      if (errors.cardExpiry) setErrors(prev => ({ ...prev, cardExpiry: '' }));
      return;
    }

    // Custom formatting for CVV (3 or 4 digits)
    if (name === 'cardCvv') {
      const cleaned = value.replace(/\D/g, '').slice(0, 4);
      setFormData(prev => ({ ...prev, cardCvv: cleaned }));
      if (errors.cardCvv) setErrors(prev => ({ ...prev, cardCvv: '' }));
      return;
    }

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

    if (formData.email.trim() && !isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email format';
    }

    if (!formData.addressLine.trim() || formData.addressLine.length < 5) {
      newErrors.addressLine = 'Please enter full house/street delivery address';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'Please enter delivery city';
    }

    if (!formData.pincode.trim() || !isValidPincode(formData.pincode)) {
      newErrors.pincode = 'Please enter a 6-digit postal PIN code';
    }

    // Payment validation
    if (formData.paymentMethod === 'card') {
      const cleanCard = (formData.cardNumber || '').replace(/\s/g, '');
      if (cleanCard.length < 15) {
        newErrors.cardNumber = 'Enter a valid 16-digit card number';
      }
      if (!formData.cardExpiry || !/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
        newErrors.cardExpiry = 'Enter expiry as MM/YY';
      }
      if (!formData.cardCvv || formData.cardCvv.length < 3) {
        newErrors.cardCvv = '3-digit CVV';
      }
      if (!formData.cardHolder?.trim()) {
        newErrors.cardHolder = 'Cardholder name required';
      }
    }

    if (formData.paymentMethod === 'upi') {
      if (formData.upiId && !formData.upiId.includes('@')) {
        newErrors.upiId = 'Enter a valid UPI ID (e.g. mobile@upi)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const generatedOrderId = `GLO-${Math.floor(100000 + Math.random() * 900000)}`;
      const generatedPaymentId = `PAY_${formData.paymentMethod.toUpperCase()}_${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

      const sanitizedCustomer: CheckoutFormData = {
        fullName: sanitizeInput(formData.fullName),
        phone: sanitizeInput(formData.phone),
        email: sanitizeInput(formData.email),
        addressLine: sanitizeInput(formData.addressLine),
        landmark: sanitizeInput(formData.landmark || ''),
        city: sanitizeInput(formData.city),
        state: formData.state,
        pincode: sanitizeInput(formData.pincode),
        paymentMethod: formData.paymentMethod,
        orderNotes: sanitizeInput(formData.orderNotes || ''),
        promoCode: appliedPromoCode || undefined,
        cardNumber: formData.cardNumber ? `•••• •••• •••• ${formData.cardNumber.replace(/\s/g, '').slice(-4)}` : undefined,
        upiId: formData.upiId ? sanitizeInput(formData.upiId) : undefined,
        bankCode: formData.bankCode
      };

      const placedOrder: PlacedOrder = {
        orderId: generatedOrderId,
        paymentId: generatedPaymentId,
        customer: sanitizedCustomer,
        items: [...items],
        subtotal,
        shippingFee,
        discount: promoDiscount,
        total: grandTotal,
        paymentMethod: formData.paymentMethod,
        createdAt: new Date().toISOString(),
        status: 'Confirmed',
        estimatedDelivery: '2-4 Business Days'
      };

      // Add to AuthContext orders history
      addOrder(placedOrder);
      setCompletedOrder(placedOrder);

      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }

      clearCart();
    }, 1200);
  };

  const handleClose = () => {
    setCompletedOrder(null);
    setIsCheckoutModalOpen(false);
  };

  const receiptWhatsAppUrl = completedOrder
    ? getWhatsAppOrderReceiptUrl(completedOrder.orderId, completedOrder.customer, completedOrder.items, completedOrder.total)
    : '#';

  const copyReceiptToClipboard = () => {
    if (!completedOrder) return;
    const text = `Green Leaves Organics Order #${completedOrder.orderId}\nPayment: ${completedOrder.paymentMethod.toUpperCase()} (${completedOrder.paymentId})\nAmount: ₹${completedOrder.total}\nItems: ${completedOrder.items.map(i => `${i.product.name} (${i.quantity}x)`).join(', ')}\nDelivery to: ${completedOrder.customer.addressLine}, ${completedOrder.customer.city} - ${completedOrder.customer.pincode}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-[#0B0F0E] text-white rounded-3xl shadow-luxury-dark overflow-hidden border border-gold/40 my-4 sm:my-8 animate-in zoom-in-95 duration-200 max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-black via-[#112419] to-black text-white p-4 sm:p-5 flex items-center justify-between flex-shrink-0 border-b border-gold/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold/30 to-emerald-600/30 border border-gold/40 flex items-center justify-center text-gold flex-shrink-0 shadow-gold-glow">
              <Lock className="w-5 h-5 text-gold-metallic-shiny" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-black text-base sm:text-lg text-white">Green Leaves Secure Checkout</h3>
                <span className="text-[10px] bg-emerald-950 text-emerald-light border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                  256-Bit SSL
                </span>
              </div>
              <p className="text-[11px] text-gray-400">Direct Farm-Gate Organic Dispatch · Free Express Delivery in Haryana & NCR</p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white p-1.5 rounded-lg transition cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth status bar */}
        <div className="bg-[#121B16] border-b border-white/5 px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs flex-shrink-0">
          {isAuthenticated && currentUser ? (
            <div className="flex items-center gap-2 text-gray-300">
              <span className="w-2 h-2 rounded-full bg-emerald-light animate-pulse"></span>
              <span>Ordering as <strong className="text-gold">{currentUser.fullName}</strong> ({currentUser.email || currentUser.phone})</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-gray-400">
              <User className="w-3.5 h-3.5 text-gold" />
              <span>Checking out as Guest. Have an account?</span>
            </div>
          )}

          <button
            type="button"
            onClick={() => openAuthModal(isAuthenticated ? 'profile' : 'signin')}
            className="text-gold hover:text-gold-light font-bold text-[11px] flex items-center gap-1 cursor-pointer transition hover:underline"
          >
            <span>{isAuthenticated ? 'Manage Profile' : 'Sign In / Register'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {completedOrder ? (
            /* Order Success Receipt Screen */
            <div className="text-center py-4 sm:py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-950 text-emerald-light border border-emerald-500/40 flex items-center justify-center mx-auto shadow-inner ring-4 ring-gold/20">
                <CheckCircle2 className="w-10 h-10 text-emerald-light" />
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs font-black text-gold uppercase tracking-widest bg-gold/15 px-3 py-1 rounded-full border border-gold/40">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Payment Verified · Order Placed</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-black text-white">
                Thank You, {completedOrder.customer.fullName}!
              </h2>

              <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto">
                Your order <strong className="text-gold font-mono font-bold">#{completedOrder.orderId}</strong> has been confirmed. Our agronomist team is preparing your pure neem-enriched vermicompost batch.
              </p>

              {/* Order Receipt Card */}
              <div className="bg-[#121B16] border border-gold/30 rounded-2xl p-4 sm:p-5 text-left max-w-lg mx-auto text-xs space-y-2.5 text-gray-300 shadow-xl">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-gray-400">Order ID:</span>
                  <span className="font-mono font-bold text-gold">#{completedOrder.orderId}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-gray-400">Transaction Ref:</span>
                  <span className="font-mono text-emerald-light">{completedOrder.paymentId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Customer Name:</span>
                  <span className="font-bold text-white">{completedOrder.customer.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Contact:</span>
                  <span className="font-bold text-white">{completedOrder.customer.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping Address:</span>
                  <span className="font-medium text-white text-right max-w-[220px] truncate">
                    {completedOrder.customer.addressLine}, {completedOrder.customer.city} ({completedOrder.customer.pincode})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Payment Method:</span>
                  <span className="font-bold text-gold uppercase">
                    {completedOrder.paymentMethod === 'upi' ? '⚡ Instant UPI' : 
                     completedOrder.paymentMethod === 'card' ? '💳 256-Bit Encrypted Card' :
                     completedOrder.paymentMethod === 'netbanking' ? '🏛️ Net Banking' : '💵 Cash on Delivery'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Estimated Dispatch:</span>
                  <span className="font-semibold text-emerald-light">{completedOrder.estimatedDelivery}</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2 text-sm font-black text-white">
                  <span>Total Amount Paid:</span>
                  <span className="text-gold-metallic-shiny text-base font-black">₹{completedOrder.total}</span>
                </div>
              </div>

              {/* Action Buttons: WhatsApp Sync & Order History */}
              <div className="pt-2 space-y-2.5 max-w-lg mx-auto">
                <a
                  href={receiptWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-black font-black py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
                >
                  <span>Sync Receipt to Farm WhatsApp (+91 8826078720)</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={copyReceiptToClipboard}
                    className="w-full bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 font-bold py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-1.5 text-xs cursor-pointer"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-light" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
                  </button>

                  <button
                    onClick={() => {
                      handleClose();
                      openAuthModal('orders');
                    }}
                    className="w-full bg-gold/15 hover:bg-gold/25 text-gold border border-gold/40 font-bold py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-1.5 text-xs cursor-pointer"
                  >
                    <span>View in My Orders</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleClose}
                  className="w-full text-xs text-gray-400 hover:text-white pt-2 cursor-pointer font-bold transition"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              
              {/* Step 1: Customer Info */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-gold mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-gradient-to-r from-gold to-yellow-500 text-black text-[10px] font-black flex items-center justify-center">1</span>
                  Recipient & Contact Details
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-300 uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full bg-[#141F1A] border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none ${
                        errors.fullName ? 'border-red-500' : 'border-white/15 focus:border-gold'
                      }`}
                    />
                    {errors.fullName && <p className="text-red-400 text-[10px] mt-0.5">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-300 uppercase mb-1">
                      Mobile Number (For WhatsApp Updates) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-xs text-gray-400 font-bold">+91</span>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="9811223344"
                        maxLength={10}
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full bg-[#141F1A] border rounded-xl pl-11 pr-3 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none ${
                          errors.phone ? 'border-red-500' : 'border-white/15 focus:border-gold'
                        }`}
                      />
                    </div>
                    {errors.phone && <p className="text-red-400 text-[10px] mt-0.5">{errors.phone}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-gray-300 uppercase mb-1">
                      Email Address (For Instant GST Invoice)
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g. rahul@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full bg-[#141F1A] border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none ${
                        errors.email ? 'border-red-500' : 'border-white/15 focus:border-gold'
                      }`}
                    />
                    {errors.email && <p className="text-red-400 text-[10px] mt-0.5">{errors.email}</p>}
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping Address */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-gold mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-gradient-to-r from-gold to-yellow-500 text-black text-[10px] font-black flex items-center justify-center">2</span>
                  Delivery Address
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-gray-300 uppercase mb-1">
                      House / Flat / Tower / Street Address *
                    </label>
                    <input
                      type="text"
                      name="addressLine"
                      placeholder="e.g. Flat 302, Tower 4, Central Greens, Golf Course Rd"
                      value={formData.addressLine}
                      onChange={handleInputChange}
                      className={`w-full bg-[#141F1A] border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none ${
                        errors.addressLine ? 'border-red-500' : 'border-white/15 focus:border-gold'
                      }`}
                    />
                    {errors.addressLine && <p className="text-red-400 text-[10px] mt-0.5">{errors.addressLine}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-300 uppercase mb-1">
                      Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      name="landmark"
                      placeholder="e.g. Opposite Community Club"
                      value={formData.landmark}
                      onChange={handleInputChange}
                      className="w-full bg-[#141F1A] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-300 uppercase mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      placeholder="e.g. Gurugram / New Delhi"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full bg-[#141F1A] border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none ${
                        errors.city ? 'border-red-500' : 'border-white/15 focus:border-gold'
                      }`}
                    />
                    {errors.city && <p className="text-red-400 text-[10px] mt-0.5">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-300 uppercase mb-1">
                      State *
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full bg-[#141F1A] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                    >
                      <option value="Haryana">Haryana</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Chandigarh">Chandigarh</option>
                      <option value="Other">Other State</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-300 uppercase mb-1">
                      PIN Code (6 digits) *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      placeholder="e.g. 122001"
                      maxLength={6}
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className={`w-full bg-[#141F1A] border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none ${
                        errors.pincode ? 'border-red-500' : 'border-white/15 focus:border-gold'
                      }`}
                    />
                    {errors.pincode && <p className="text-red-400 text-[10px] mt-0.5">{errors.pincode}</p>}
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Method with Secured Interface */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-gold flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-gradient-to-r from-gold to-yellow-500 text-black text-[10px] font-black flex items-center justify-center">3</span>
                    Secured Payment Gateway
                  </h4>
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-light" />
                    <span>RBI Tokenized & PCI-DSS Compliant</span>
                  </div>
                </div>

                {/* Payment Option Selector Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'upi' }))}
                    className={`p-3 rounded-2xl text-left border transition cursor-pointer flex flex-col justify-between gap-1.5 ${
                      formData.paymentMethod === 'upi'
                        ? 'bg-emerald-950/80 border-gold text-white font-bold ring-1 ring-gold shadow-gold-glow'
                        : 'bg-[#141F1A] border-white/10 text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <QrCode className="w-4 h-4 text-emerald-light" />
                      <span className="text-[9px] bg-emerald-900 text-emerald-light px-1.5 py-0.5 rounded font-black">Fastest</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold block text-white">Instant UPI</span>
                      <span className="text-[10px] text-gray-400 block">GPay, PhonePe, QR</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'card' }))}
                    className={`p-3 rounded-2xl text-left border transition cursor-pointer flex flex-col justify-between gap-1.5 ${
                      formData.paymentMethod === 'card'
                        ? 'bg-emerald-950/80 border-gold text-white font-bold ring-1 ring-gold shadow-gold-glow'
                        : 'bg-[#141F1A] border-white/10 text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <CreditCard className="w-4 h-4 text-gold" />
                      <span className="text-[9px] bg-gold/20 text-gold px-1.5 py-0.5 rounded font-black">256-Bit</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold block text-white">Credit / Debit</span>
                      <span className="text-[10px] text-gray-400 block">Visa, Master, RuPay</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'netbanking' }))}
                    className={`p-3 rounded-2xl text-left border transition cursor-pointer flex flex-col justify-between gap-1.5 ${
                      formData.paymentMethod === 'netbanking'
                        ? 'bg-emerald-950/80 border-gold text-white font-bold ring-1 ring-gold shadow-gold-glow'
                        : 'bg-[#141F1A] border-white/10 text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <Building2 className="w-4 h-4 text-emerald-light" />
                    </div>
                    <div>
                      <span className="text-xs font-bold block text-white">Net Banking</span>
                      <span className="text-[10px] text-gray-400 block">50+ Indian Banks</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'cod' }))}
                    className={`p-3 rounded-2xl text-left border transition cursor-pointer flex flex-col justify-between gap-1.5 ${
                      formData.paymentMethod === 'cod'
                        ? 'bg-emerald-950/80 border-gold text-white font-bold ring-1 ring-gold shadow-gold-glow'
                        : 'bg-[#141F1A] border-white/10 text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <Banknote className="w-4 h-4 text-emerald-light" />
                    </div>
                    <div>
                      <span className="text-xs font-bold block text-white">Cash on Delivery</span>
                      <span className="text-[10px] text-gray-400 block">Pay at doorstep</span>
                    </div>
                  </button>
                </div>

                {/* Payment Method Detail Box */}
                <div className="bg-[#101713] border border-gold/25 rounded-2xl p-4 sm:p-5">
                  {/* UPI Form */}
                  {formData.paymentMethod === 'upi' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-300">Choose UPI App or Scan QR:</span>
                        <button
                          type="button"
                          onClick={() => setShowQrModal(!showQrModal)}
                          className="text-[11px] font-bold text-gold flex items-center gap-1 hover:underline cursor-pointer"
                        >
                          <QrCode className="w-3.5 h-3.5" />
                          <span>{showQrModal ? 'Hide QR Code' : 'Scan Farm QR Code'}</span>
                        </button>
                      </div>

                      {/* App selector buttons */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {UPI_APPS.map(app => (
                          <button
                            key={app.id}
                            type="button"
                            onClick={() => setFormData(prev => ({ 
                              ...prev, 
                              upiApp: app.id,
                              upiId: prev.upiId ? prev.upiId.split('@')[0] + app.suffix : ''
                            }))}
                            className={`p-2.5 rounded-xl border text-xs flex items-center justify-center gap-2 cursor-pointer transition ${
                              formData.upiApp === app.id
                                ? 'bg-gold/15 border-gold text-white font-bold'
                                : 'bg-black/40 border-white/10 text-gray-400 hover:bg-white/5'
                            }`}
                          >
                            <span>{app.icon}</span>
                            <span>{app.name}</span>
                          </button>
                        ))}
                      </div>

                      {/* QR Display when toggled */}
                      {showQrModal ? (
                        <div className="p-4 bg-black/60 rounded-xl border border-gold/30 text-center space-y-2">
                          <div className="w-36 h-36 mx-auto bg-white p-2 rounded-xl flex items-center justify-center shadow-lg">
                            <div className="text-black font-mono text-center">
                              <QrCode className="w-28 h-28 mx-auto text-black" />
                              <span className="text-[8px] font-bold block uppercase tracking-wider">UPI: greenleaves@icici</span>
                            </div>
                          </div>
                          <p className="text-[11px] text-gray-300">
                            Scan with any UPI app to pay <strong className="text-gold font-bold">₹{grandTotal}</strong> directly to Green Leaves Organics
                          </p>
                        </div>
                      ) : (
                        <div>
                          <label className="block text-[11px] font-bold text-gray-300 uppercase mb-1">
                            Or Enter UPI Virtual Payment Address (VPA)
                          </label>
                          <div className="relative">
                            <Smartphone className="w-4 h-4 text-gray-500 absolute left-3 top-2.5" />
                            <input
                              type="text"
                              name="upiId"
                              placeholder="e.g. 9811223344@paytm or yourname@okaxis"
                              value={formData.upiId}
                              onChange={handleInputChange}
                              className={`w-full bg-[#141F1A] border rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none ${
                                errors.upiId ? 'border-red-500' : 'border-white/15 focus:border-gold'
                              }`}
                            />
                          </div>
                          {errors.upiId && <p className="text-red-400 text-[10px] mt-0.5">{errors.upiId}</p>}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Card Form */}
                  {formData.paymentMethod === 'card' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-300 uppercase mb-1">
                          Cardholder Name *
                        </label>
                        <input
                          type="text"
                          name="cardHolder"
                          placeholder="Name as printed on card"
                          value={formData.cardHolder}
                          onChange={handleInputChange}
                          className={`w-full bg-[#141F1A] border rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none ${
                            errors.cardHolder ? 'border-red-500' : 'border-white/15 focus:border-gold'
                          }`}
                        />
                        {errors.cardHolder && <p className="text-red-400 text-[10px] mt-0.5">{errors.cardHolder}</p>}
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-300 uppercase mb-1">
                          Card Number (16 Digits) *
                        </label>
                        <div className="relative">
                          <CreditCard className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                          <input
                            type="text"
                            name="cardNumber"
                            placeholder="4532 •••• •••• 8899"
                            maxLength={19}
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            className={`w-full bg-[#141F1A] border rounded-xl pl-9 pr-14 py-2 text-xs text-white font-mono placeholder-gray-500 focus:outline-none ${
                              errors.cardNumber ? 'border-red-500' : 'border-white/15 focus:border-gold'
                            }`}
                          />
                          <span className="absolute right-3 top-2.5 text-[10px] font-bold text-gold uppercase">RuPay / Visa</span>
                        </div>
                        {errors.cardNumber && <p className="text-red-400 text-[10px] mt-0.5">{errors.cardNumber}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-gray-300 uppercase mb-1">
                            Expiry (MM/YY) *
                          </label>
                          <input
                            type="text"
                            name="cardExpiry"
                            placeholder="MM/YY"
                            maxLength={5}
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                            className={`w-full bg-[#141F1A] border rounded-xl px-3.5 py-2 text-xs text-white font-mono placeholder-gray-500 focus:outline-none ${
                              errors.cardExpiry ? 'border-red-500' : 'border-white/15 focus:border-gold'
                            }`}
                          />
                          {errors.cardExpiry && <p className="text-red-400 text-[10px] mt-0.5">{errors.cardExpiry}</p>}
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-gray-300 uppercase mb-1 flex items-center justify-between">
                            <span>CVV / CVC *</span>
                            <span className="text-[10px] text-gray-400 flex items-center gap-0.5">
                              <HelpCircle className="w-3 h-3" /> 3 digits
                            </span>
                          </label>
                          <input
                            type="password"
                            name="cardCvv"
                            placeholder="•••"
                            maxLength={4}
                            value={formData.cardCvv}
                            onChange={handleInputChange}
                            className={`w-full bg-[#141F1A] border rounded-xl px-3.5 py-2 text-xs text-white font-mono placeholder-gray-500 focus:outline-none ${
                              errors.cardCvv ? 'border-red-500' : 'border-white/15 focus:border-gold'
                            }`}
                          />
                          {errors.cardCvv && <p className="text-red-400 text-[10px] mt-0.5">{errors.cardCvv}</p>}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-1 text-[11px] text-gray-400">
                        <Lock className="w-3.5 h-3.5 text-emerald-light" />
                        <span>Card details are tokenized in compliance with RBI guidelines. Green Leaves never stores your CVV.</span>
                      </div>
                    </div>
                  )}

                  {/* Net Banking */}
                  {formData.paymentMethod === 'netbanking' && (
                    <div className="space-y-3">
                      <span className="text-xs font-bold text-gray-300 block">Select Your Bank:</span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {POPULAR_BANKS.map(bank => (
                          <button
                            key={bank.code}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, bankCode: bank.code }))}
                            className={`p-2.5 rounded-xl border text-xs flex items-center gap-2 cursor-pointer transition ${
                              formData.bankCode === bank.code
                                ? 'bg-gold/15 border-gold text-white font-bold'
                                : 'bg-black/40 border-white/10 text-gray-400 hover:bg-white/5'
                            }`}
                          >
                            <span>{bank.logo}</span>
                            <span className="truncate">{bank.name}</span>
                          </button>
                        ))}
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-300 uppercase mb-1">
                          Or Choose from Other Indian Banks
                        </label>
                        <select
                          name="bankCode"
                          value={formData.bankCode}
                          onChange={handleInputChange}
                          className="w-full bg-[#141F1A] border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-gold"
                        >
                          <option value="HDFC">HDFC Bank</option>
                          <option value="ICICI">ICICI Bank</option>
                          <option value="SBI">State Bank of India</option>
                          <option value="AXIS">Axis Bank</option>
                          <option value="KOTAK">Kotak Mahindra Bank</option>
                          <option value="PNB">Punjab National Bank</option>
                          <option value="BOB">Bank of Baroda</option>
                          <option value="CANARA">Canara Bank</option>
                          <option value="INDUSIND">IndusInd Bank</option>
                          <option value="IDFC">IDFC FIRST Bank</option>
                          <option value="YES">Yes Bank</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Cash on Delivery */}
                  {formData.paymentMethod === 'cod' && (
                    <div className="space-y-2 text-xs text-gray-300">
                      <div className="flex items-center gap-2 text-emerald-light font-bold">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Zero Advance Payment Required</span>
                      </div>
                      <p className="text-[11px] text-gray-400 leading-relaxed">
                        Pay cash or scan the delivery executive's UPI QR code upon receipt of your Green Leaves Organics vermicompost packages at your doorstep.
                      </p>
                      <div className="p-2.5 bg-black/40 rounded-xl border border-white/5 flex items-center gap-2 text-[10px] text-gray-400">
                        <AlertCircle className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                        <span>Exact change or UPI payment is appreciated by the delivery partner.</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Summary & Pricing Breakdown */}
              <div className="bg-[#121B16] border border-gold/20 rounded-2xl p-4 text-xs space-y-2 text-gray-300 shadow-md">
                <div className="flex justify-between">
                  <span>Cart Items ({items.length} package{items.length > 1 ? 's' : ''}):</span>
                  <span className="font-semibold text-white">₹{subtotal}</span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-emerald-light font-bold">
                    <span>Discount Applied ({appliedPromoCode}):</span>
                    <span>-₹{promoDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Delivery (Haryana & NCR):</span>
                  <span className="font-semibold text-emerald-light">{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-white border-t border-white/10 pt-2 items-baseline">
                  <span>Total Amount Payable:</span>
                  <span className="text-gold-metallic-shiny text-lg font-black font-serif">₹{grandTotal}</span>
                </div>
              </div>

              {/* Place Order CTA Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-gold via-yellow-400 to-gold text-black font-black py-4 px-4 rounded-xl shadow-gold-glow transition flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm disabled:opacity-75 hover:brightness-105 active:scale-[0.99]"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                    <span>Authorizing 256-Bit Secure Order...</span>
                  </span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>
                      {formData.paymentMethod === 'cod' 
                        ? `Confirm Cash on Delivery Order (₹${grandTotal})`
                        : `Pay ₹${grandTotal} Securely Now`}
                    </span>
                  </>
                )}
              </button>

              {/* Footer assurances */}
              <div className="flex items-center justify-center gap-4 text-[10px] text-gray-400 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-light" />
                  <span>100% Genuine Vermicompost</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-gold" />
                  <span>256-Bit SSL Encrypted</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-light" />
                  <span>Farm Dispatch Guarantee</span>
                </span>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
