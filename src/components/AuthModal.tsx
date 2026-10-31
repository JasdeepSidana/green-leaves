import React, { useState } from 'react';
import { 
  X, 
  User, 
  Lock, 
  Mail, 
  Phone, 
  MapPin, 
  ShoppingBag, 
  LogOut, 
  Sparkles, 
  Eye, 
  EyeOff, 
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Package
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { isValidIndianPhone, isValidEmail, isValidPincode } from '../utils/security';
import { getWhatsAppOrderReceiptUrl } from '../utils/whatsapp';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    authModalTab, 
    setAuthModalTab, 
    currentUser, 
    isAuthenticated,
    signIn, 
    signUp, 
    signInDemo,
    signOut, 
    orders 
  } = useAuth();

  // Sign in state
  const [signInIdentifier, setSignInIdentifier] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [signInError, setSignInError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sign up state
  const [signUpData, setSignUpData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    addressLine: '',
    city: 'Gurugram',
    state: 'Haryana',
    pincode: '122001'
  });
  const [signUpErrors, setSignUpErrors] = useState<Record<string, string>>({});

  if (!isAuthModalOpen) return null;

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignInError('');
    if (!signInIdentifier.trim()) {
      setSignInError('Please enter your mobile number or email');
      return;
    }

    setIsSubmitting(true);
    const result = await signIn(signInIdentifier, signInPassword);
    setIsSubmitting(false);

    if (result.success) {
      closeAuthModal();
    } else {
      setSignInError(result.message);
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!signUpData.fullName.trim() || signUpData.fullName.length < 2) {
      newErrors.fullName = 'Please enter your full name';
    }
    if (!signUpData.phone.trim() || !isValidIndianPhone(signUpData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number';
    }
    if (signUpData.email.trim() && !isValidEmail(signUpData.email)) {
      newErrors.email = 'Please enter a valid email format';
    }
    if (signUpData.pincode.trim() && !isValidPincode(signUpData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit PIN code';
    }

    if (Object.keys(newErrors).length > 0) {
      setSignUpErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    const result = await signUp(signUpData);
    setIsSubmitting(false);

    if (result.success) {
      closeAuthModal();
    } else {
      setSignUpErrors({ general: result.message });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#0E1512] text-white rounded-3xl shadow-luxury-dark overflow-hidden border-2 border-gold/40 my-4 sm:my-8 animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-black via-[#112419] to-black text-white p-4 sm:p-5 flex items-center justify-between border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gold-gradient text-charcoal-pure flex items-center justify-center shadow-gold-dubai-sm font-black flex-shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-white">
                {isAuthenticated ? `Welcome, ${currentUser?.fullName.split(' ')[0]}` : 'Green Leaves Member Club'}
              </h3>
              <p className="text-[11px] text-gold-metallic-shiny">
                {isAuthenticated ? 'Member Account & Order History' : 'Sign in to access VIP pricing & doorstep Maali history'}
              </p>
            </div>
          </div>

          <button
            onClick={closeAuthModal}
            className="text-gray-400 hover:text-white p-1.5 rounded-lg transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center bg-black/60 border-b border-white/10 px-4 pt-2 gap-2 flex-shrink-0 overflow-x-auto">
          {!isAuthenticated ? (
            <>
              <button
                onClick={() => setAuthModalTab('signin')}
                className={`py-2 px-3 text-xs font-bold border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
                  authModalTab === 'signin'
                    ? 'border-gold text-gold font-extrabold'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
              <button
                onClick={() => setAuthModalTab('signup')}
                className={`py-2 px-3 text-xs font-bold border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
                  authModalTab === 'signup'
                    ? 'border-gold text-gold font-extrabold'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Register (New Account)</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setAuthModalTab('orders')}
                className={`py-2 px-3 text-xs font-bold border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
                  authModalTab === 'orders'
                    ? 'border-gold text-gold font-extrabold'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Package className="w-3.5 h-3.5" />
                <span>My Orders ({orders.length})</span>
              </button>
              <button
                onClick={() => setAuthModalTab('profile')}
                className={`py-2 px-3 text-xs font-bold border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
                  authModalTab === 'profile'
                    ? 'border-gold text-gold font-extrabold'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Delivery Profile</span>
              </button>
            </>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 text-xs">
          
          {/* ===================== TAB 1: SIGN IN ===================== */}
          {!isAuthenticated && authModalTab === 'signin' && (
            <form onSubmit={handleSignInSubmit} className="space-y-4">
              
              {/* Quick 1-Click Demo Login Banner */}
              <div className="bg-emerald-950/70 border border-emerald-500/40 rounded-2xl p-3 flex items-center justify-between gap-2 shadow-inner">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🪴</span>
                  <div>
                    <h5 className="font-bold text-white text-[11px]">Quick 1-Click Testing</h5>
                    <p className="text-[10px] text-emerald-300">Sign in instantly as Jasdeep Sidana</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    signInDemo();
                    closeAuthModal();
                  }}
                  className="btn-dubai-gold-shiny text-[10px] py-1.5 px-3 rounded-lg font-black cursor-pointer shadow-gold-dubai-sm flex-shrink-0"
                >
                  Quick Sign In
                </button>
              </div>

              {signInError && (
                <div className="p-2.5 rounded-xl bg-red-950/70 border border-red-500/40 text-red-200 text-[11px]">
                  {signInError}
                </div>
              )}

              <div>
                <label className="block font-bold text-gray-300 mb-1">
                  Mobile Number or Email Address <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. 8826078720 or your@email.com"
                    value={signInIdentifier}
                    onChange={(e) => setSignInIdentifier(e.target.value)}
                    className="w-full bg-black/60 border border-white/20 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white placeholder-gray-500 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-bold text-gray-300">
                    Password <span className="text-gray-400 text-[10px]">(Optional for Quick Login)</span>
                  </label>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    className="w-full bg-black/60 border border-white/20 rounded-xl py-2.5 pl-9 pr-10 text-xs text-white placeholder-gray-500 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald hover:bg-emerald-600 text-white font-extrabold py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer text-xs"
              >
                <span>{isSubmitting ? 'Signing In...' : 'Sign In To Account'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="text-center pt-2">
                <span className="text-gray-400">New to Green Leaves Organics? </span>
                <button
                  type="button"
                  onClick={() => setAuthModalTab('signup')}
                  className="text-gold font-bold hover:underline cursor-pointer"
                >
                  Create an account
                </button>
              </div>

            </form>
          )}

          {/* ===================== TAB 2: REGISTER / SIGN UP ===================== */}
          {!isAuthenticated && authModalTab === 'signup' && (
            <form onSubmit={handleSignUpSubmit} className="space-y-3">
              
              {signUpErrors.general && (
                <div className="p-2.5 rounded-xl bg-red-950/70 border border-red-500/40 text-red-200 text-[11px]">
                  {signUpErrors.general}
                </div>
              )}

              <div>
                <label className="block font-bold text-gray-300 mb-1">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Jasdeep Sidana"
                    value={signUpData.fullName}
                    onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                    className="w-full bg-black/60 border border-white/20 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-gray-500 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition"
                    required
                  />
                </div>
                {signUpErrors.fullName && <p className="text-[10px] text-red-400 mt-0.5">{signUpErrors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-bold text-gray-300 mb-1">
                    Mobile Number <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="9876543210"
                      value={signUpData.phone}
                      onChange={(e) => setSignUpData({ ...signUpData, phone: e.target.value.replace(/\D/g, '') })}
                      className="w-full bg-black/60 border border-white/20 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-gray-500 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition"
                      required
                    />
                  </div>
                  {signUpErrors.phone && <p className="text-[10px] text-red-400 mt-0.5">{signUpErrors.phone}</p>}
                </div>

                <div>
                  <label className="block font-bold text-gray-300 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={signUpData.email}
                      onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                      className="w-full bg-black/60 border border-white/20 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-gray-500 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition"
                    />
                  </div>
                  {signUpErrors.email && <p className="text-[10px] text-red-400 mt-0.5">{signUpErrors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-300 mb-1">
                  Default Delivery Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="text"
                    placeholder="House/Flat No, Apartment, Sector"
                    value={signUpData.addressLine}
                    onChange={(e) => setSignUpData({ ...signUpData, addressLine: e.target.value })}
                    className="w-full bg-black/60 border border-white/20 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-gray-500 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-bold text-gray-300 mb-1">City</label>
                  <input
                    type="text"
                    value={signUpData.city}
                    onChange={(e) => setSignUpData({ ...signUpData, city: e.target.value })}
                    className="w-full bg-black/60 border border-white/20 rounded-xl py-2 px-3 text-xs text-white placeholder-gray-500 focus:border-gold outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-300 mb-1">PIN Code</label>
                  <input
                    type="text"
                    maxLength={6}
                    value={signUpData.pincode}
                    onChange={(e) => setSignUpData({ ...signUpData, pincode: e.target.value.replace(/\D/g, '') })}
                    className="w-full bg-black/60 border border-white/20 rounded-xl py-2 px-3 text-xs text-white placeholder-gray-500 focus:border-gold outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-dubai-gold-shiny text-charcoal-pure font-black py-2.5 px-4 rounded-xl shadow-gold-dubai transition flex items-center justify-center gap-2 cursor-pointer text-xs"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isSubmitting ? 'Registering...' : 'Create Green Leaves Account'}</span>
                </button>
              </div>

              <div className="text-center pt-1">
                <span className="text-gray-400">Already have an account? </span>
                <button
                  type="button"
                  onClick={() => setAuthModalTab('signin')}
                  className="text-gold font-bold hover:underline cursor-pointer"
                >
                  Sign In
                </button>
              </div>

            </form>
          )}

          {/* ===================== TAB 3: MY ORDERS (AUTHENTICATED) ===================== */}
          {isAuthenticated && authModalTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <div>
                  <h4 className="font-extrabold text-sm text-white">Order Placement History</h4>
                  <p className="text-[11px] text-gray-400">All orders linked to your phone {currentUser?.phone}</p>
                </div>
                <span className="badge-dubai-gold font-mono font-bold text-[10px] px-2 py-0.5 rounded-full">
                  {orders.length} Placed
                </span>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-8 bg-black/40 rounded-2xl border border-white/10 p-6 space-y-3">
                  <ShoppingBag className="w-10 h-10 text-gray-600 mx-auto" />
                  <h5 className="font-bold text-white text-sm">No Orders Placed Yet</h5>
                  <p className="text-xs text-gray-400 max-w-xs mx-auto">
                    Try our flagship 6-in-1 Enriched Vermicompost Mix starting at just ₹149 with doorstep delivery!
                  </p>
                  <button
                    onClick={closeAuthModal}
                    className="btn-dubai-gold-shiny text-xs py-2 px-4 rounded-xl font-bold cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                  {orders.map((order) => {
                    const trackingUrl = getWhatsAppOrderReceiptUrl(
                      order.orderId,
                      order.customer,
                      order.items,
                      order.total
                    );

                    return (
                      <div
                        key={order.orderId}
                        className="bg-black/60 border border-gold/30 rounded-2xl p-3.5 space-y-2.5 shadow-gold-dubai-sm hover:border-gold transition"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-mono text-gold font-black text-xs">#{order.orderId}</span>
                            <p className="text-[10px] text-gray-400">
                              Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                              {order.status || 'Confirmed'} 🟢
                            </span>
                            <div className="text-xs font-black text-white mt-1">₹{order.total}</div>
                          </div>
                        </div>

                        {/* Items preview */}
                        <div className="bg-white/5 rounded-xl p-2 text-[11px] text-gray-300 space-y-1">
                          {order.items.map((it, idx) => (
                            <div key={idx} className="flex justify-between truncate">
                              <span className="truncate">
                                {it.quantity}x {it.product.name} ({it.selectedPack.size})
                              </span>
                              <span className="text-gray-400 ml-2 font-mono">₹{it.selectedPack.price * it.quantity}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[10px] text-gray-400">
                            Payment: <strong className="text-white uppercase">{order.paymentMethod}</strong>
                          </span>
                          <a
                            href={trackingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-emerald-light hover:text-white font-bold flex items-center gap-1 hover:underline"
                          >
                            <span>WhatsApp Tracking</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="pt-2 border-t border-white/10 flex justify-between items-center">
                <button
                  onClick={signOut}
                  className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 font-bold cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
                <button
                  onClick={closeAuthModal}
                  className="text-xs text-gray-400 hover:text-white cursor-pointer"
                >
                  Continue Shopping &rarr;
                </button>
              </div>
            </div>
          )}

          {/* ===================== TAB 4: PROFILE (AUTHENTICATED) ===================== */}
          {isAuthenticated && authModalTab === 'profile' && (
            <div className="space-y-3.5">
              <div className="bg-black/60 border border-gold/30 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                  <div className="w-12 h-12 rounded-full bg-gold-gradient text-charcoal-pure font-black text-lg flex items-center justify-center shadow-gold-dubai-sm">
                    {currentUser?.fullName.charAt(0) || 'U'}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-base text-white">{currentUser?.fullName}</h4>
                    <p className="text-[11px] text-gray-400">{currentUser?.email}</p>
                    <p className="text-[11px] text-gold font-mono">+91 {currentUser?.phone}</p>
                  </div>
                </div>

                <div className="text-[11px] space-y-1.5 text-gray-300">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-light flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white">Default Address:</span>
                      <p className="text-gray-400">
                        {currentUser?.addressLine ? `${currentUser.addressLine}, ${currentUser.city} - ${currentUser.pincode}` : 'No default address saved yet.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-emerald-950/60 border border-emerald-500/30 rounded-xl flex items-center gap-2 text-[11px] text-emerald-300">
                <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Your details are safely encrypted and automatically pre-fill at checkout.</span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={signOut}
                  className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 font-bold cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
                <button
                  onClick={() => setAuthModalTab('orders')}
                  className="btn-dubai-gold-shiny text-xs py-2 px-3 rounded-xl font-bold cursor-pointer"
                >
                  View Order History
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
