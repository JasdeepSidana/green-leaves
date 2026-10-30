import React, { useState } from 'react';
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
  Check 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { CheckoutFormData } from '../types';
import { 
  sanitizeInput, 
  isValidIndianPhone, 
  isValidEmail, 
  isValidPincode 
} from '../utils/security';
import { getWhatsAppOrderReceiptUrl } from '../utils/whatsapp';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutModalOpen, 
    setIsCheckoutModalOpen, 
    items, 
    subtotal, 
    shippingFee, 
    grandTotal, 
    orderNotes,
    clearCart 
  } = useCart();

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
    orderNotes: orderNotes || ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{
    orderId: string;
    customer: CheckoutFormData;
    total: number;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isCheckoutModalOpen) return null;

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
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.phone.trim() || !isValidIndianPhone(formData.phone)) {
      newErrors.phone = 'Valid 10-digit mobile number required';
    }

    if (formData.email && !isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.addressLine.trim() || formData.addressLine.length < 5) {
      newErrors.addressLine = 'Street address / House # is required';
    }

    if (!formData.city.trim() || formData.city.length < 2) {
      newErrors.city = 'City is required';
    }

    if (!formData.pincode.trim() || !isValidPincode(formData.pincode)) {
      newErrors.pincode = 'Valid 6-digit Indian Pincode required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsProcessing(true);

    setTimeout(() => {
      const sanitizedCustomer: CheckoutFormData = {
        fullName: sanitizeInput(formData.fullName),
        phone: sanitizeInput(formData.phone),
        email: sanitizeInput(formData.email),
        addressLine: sanitizeInput(formData.addressLine),
        landmark: sanitizeInput(formData.landmark),
        city: sanitizeInput(formData.city),
        state: sanitizeInput(formData.state),
        pincode: sanitizeInput(formData.pincode),
        paymentMethod: formData.paymentMethod,
        orderNotes: sanitizeInput(formData.orderNotes)
      };

      const generatedOrderId = `GLO-${Date.now().toString().slice(-6)}`;
      setCompletedOrder({
        orderId: generatedOrderId,
        customer: sanitizedCustomer,
        total: grandTotal
      });

      setIsProcessing(false);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
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
    ? getWhatsAppOrderReceiptUrl(completedOrder.orderId, completedOrder.customer, items, completedOrder.total)
    : '#';

  const copyReceiptToClipboard = () => {
    if (!completedOrder) return;
    const text = `Green Leaves Organics Order Receipt #${completedOrder.orderId}\nTotal: ₹${completedOrder.total}\nItems: ${items.map(i => `${i.product.name} (${i.quantity})`).join(', ')}\nDelivery to: ${completedOrder.customer.addressLine}, ${completedOrder.customer.city} (${completedOrder.customer.pincode})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 my-4 sm:my-8 animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-charcoal-pure via-[#112419] to-charcoal-pure text-white p-4 sm:p-6 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald flex items-center justify-center text-white flex-shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">Secure Web Checkout</h3>
              <p className="text-[10px] sm:text-[11px] text-gray-300">256-Bit SSL Encrypted Mock Gateway</p>
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

        {/* Content Body */}
        <div className="p-4 sm:p-8 overflow-y-auto flex-1">
          {completedOrder ? (
            /* Order Success Receipt Screen */
            <div className="text-center py-4 sm:py-6 space-y-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-100 text-emerald flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>

              <span className="text-xs font-bold text-gold-dark uppercase tracking-wider bg-gold/15 px-3 py-1 rounded-full">
                Payment Authorized & Confirmed
              </span>

              <h2 className="text-xl sm:text-3xl font-black text-charcoal">
                Thank You For Your Order!
              </h2>

              <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
                Your order <strong className="text-charcoal font-mono">#{completedOrder.orderId}</strong> has been logged. Our dispatch team is packaging your organic plant nutrition with love.
              </p>

              {/* Order Receipt Box */}
              <div className="bg-botanical-50 border border-botanical-200 rounded-2xl p-4 sm:p-5 text-left max-w-md mx-auto text-xs space-y-2.5">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Order ID:</span>
                  <span className="font-mono font-bold text-gray-800">#{completedOrder.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Customer:</span>
                  <span className="font-bold text-gray-800">{completedOrder.customer.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Phone:</span>
                  <span className="font-bold text-gray-800">{completedOrder.customer.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping Address:</span>
                  <span className="font-medium text-gray-800 text-right max-w-[180px] sm:max-w-[220px] truncate">
                    {completedOrder.customer.addressLine}, {completedOrder.customer.city} - {completedOrder.customer.pincode}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment Option:</span>
                  <span className="font-bold text-emerald uppercase">{completedOrder.customer.paymentMethod}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2 text-sm font-black text-charcoal">
                  <span>Total Amount:</span>
                  <span className="text-emerald">₹{completedOrder.total}</span>
                </div>
              </div>

              {/* Action Buttons: WhatsApp Sync & Copy */}
              <div className="pt-3 space-y-2.5 max-w-md mx-auto">
                <a
                  href={receiptWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-charcoal-pure font-black py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
                >
                  <span>Sync Receipt to WhatsApp (+91 8826078720)</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={copyReceiptToClipboard}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-1.5 text-xs cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Receipt Copied to Clipboard!' : 'Copy Order Summary'}</span>
                </button>

                <button
                  onClick={handleClose}
                  className="w-full text-xs text-gray-500 hover:text-charcoal font-bold underline pt-2 cursor-pointer"
                >
                  Back to Green Leaves Organics
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handlePlaceOrder} className="space-y-5 sm:space-y-6">
              
              {/* Step 1: Customer Info */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-charcoal mb-2.5 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-emerald text-white text-[10px] font-bold flex items-center justify-center">1</span>
                  Contact Information
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="e.g. Rahul Verma"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full bg-gray-50 border rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:bg-white ${
                        errors.fullName ? 'border-red-500 bg-red-50/50' : 'border-gray-200 focus:border-emerald'
                      }`}
                    />
                    {errors.fullName && <p className="text-red-500 text-[10px] mt-0.5">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                      Mobile Number (WhatsApp Preferred) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="e.g. 9811223344"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full bg-gray-50 border rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:bg-white ${
                        errors.phone ? 'border-red-500 bg-red-50/50' : 'border-gray-200 focus:border-emerald'
                      }`}
                    />
                    {errors.phone && <p className="text-red-500 text-[10px] mt-0.5">{errors.phone}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                      Email Address (For Tax Invoice)
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g. rahul@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-emerald focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping Address */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-charcoal mb-2.5 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-emerald text-white text-[10px] font-bold flex items-center justify-center">2</span>
                  Delivery Address
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                      House / Flat / Tower & Street Name *
                    </label>
                    <input
                      type="text"
                      name="addressLine"
                      placeholder="e.g. Flat 402, Tower B, Palm Springs"
                      value={formData.addressLine}
                      onChange={handleInputChange}
                      className={`w-full bg-gray-50 border rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:bg-white ${
                        errors.addressLine ? 'border-red-500 bg-red-50/50' : 'border-gray-200 focus:border-emerald'
                      }`}
                    />
                    {errors.addressLine && <p className="text-red-500 text-[10px] mt-0.5">{errors.addressLine}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      placeholder="e.g. Gurgaon / New Delhi"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full bg-gray-50 border rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:bg-white ${
                        errors.city ? 'border-red-500 bg-red-50/50' : 'border-gray-200 focus:border-emerald'
                      }`}
                    />
                    {errors.city && <p className="text-red-500 text-[10px] mt-0.5">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                      PIN Code (6 digits) *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      placeholder="e.g. 122002"
                      maxLength={6}
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className={`w-full bg-gray-50 border rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:bg-white ${
                        errors.pincode ? 'border-red-500 bg-red-50/50' : 'border-gray-200 focus:border-emerald'
                      }`}
                    />
                    {errors.pincode && <p className="text-red-500 text-[10px] mt-0.5">{errors.pincode}</p>}
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Method */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-charcoal mb-2.5 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-emerald text-white text-[10px] font-bold flex items-center justify-center">3</span>
                  Select Payment Method
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'upi' }))}
                    className={`p-3 rounded-2xl text-left border transition cursor-pointer flex items-center sm:flex-col sm:items-start justify-between gap-2 ${
                      formData.paymentMethod === 'upi'
                        ? 'bg-emerald-50 border-emerald text-emerald-950 font-bold ring-1 ring-emerald'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-2 sm:w-full sm:justify-between">
                      <QrCode className="w-4 h-4 text-emerald" />
                      <span className="text-[9px] bg-emerald-200 text-emerald-900 px-1.5 py-0.2 rounded font-black">Fastest</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold block">UPI / QR Code</span>
                      <span className="text-[10px] text-gray-500 block">GPay, PhonePe, Paytm</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'card' }))}
                    className={`p-3 rounded-2xl text-left border transition cursor-pointer flex items-center sm:flex-col sm:items-start justify-between gap-2 ${
                      formData.paymentMethod === 'card'
                        ? 'bg-emerald-50 border-emerald text-emerald-950 font-bold ring-1 ring-emerald'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-emerald" />
                    </div>
                    <div>
                      <span className="text-xs font-bold block">Card / NetBanking</span>
                      <span className="text-[10px] text-gray-500 block">Debit, Credit & RuPay</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'cod' }))}
                    className={`p-3 rounded-2xl text-left border transition cursor-pointer flex items-center sm:flex-col sm:items-start justify-between gap-2 ${
                      formData.paymentMethod === 'cod'
                        ? 'bg-emerald-50 border-emerald text-emerald-950 font-bold ring-1 ring-emerald'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-emerald" />
                    </div>
                    <div>
                      <span className="text-xs font-bold block">Cash on Delivery</span>
                      <span className="text-[10px] text-gray-500 block">Pay on arrival</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Order Summary & Submit Button */}
              <div className="bg-botanical-50/70 border border-botanical-200/80 rounded-2xl p-4 text-xs space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Cart Items ({items.length}):</span>
                  <span className="font-semibold text-gray-800">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping:</span>
                  <span className="font-semibold text-emerald">{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-charcoal border-t border-gray-200 pt-2">
                  <span>Total Amount Payable:</span>
                  <span className="text-emerald text-base">₹{grandTotal}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-emerald hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm disabled:opacity-75"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Authorizing Secure Order...
                  </span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-gold" />
                    <span>Authorize & Place Order (₹{grandTotal})</span>
                  </>
                )}
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
