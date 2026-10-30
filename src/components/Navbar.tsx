import React, { useState, useRef, useEffect } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  PhoneCall, 
  Sparkles, 
  Leaf, 
  ShieldCheck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { PRIMARY_DISPLAY_PHONE, PRIMARY_WHATSAPP_NUMBER } from '../utils/whatsapp';

interface NavbarProps {
  onSelectCategory?: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectCategory }) => {
  const { totalItems, setIsCartOpen, openQuickView, openMaaliBooking } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Detect scroll for subtle shadow & sticky styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle outside click to close search dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter products for autocomplete
  const searchResults: Product[] = searchQuery.trim().length > 1
    ? PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.ingredients && p.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase())))
      ).slice(0, 5)
    : [];

  const handleNavClick = (sectionId: string, categoryFilter?: string) => {
    setMobileMenuOpen(false);
    setIsSearchOpen(false);
    setSearchQuery('');
    if (categoryFilter && onSelectCategory) {
      onSelectCategory(categoryFilter);
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`sticky top-0 z-30 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100' 
        : 'bg-white border-b border-gray-100'
    }`}>
      {/* Top micro bar for direct contact */}
      <div className="bg-botanical-50/70 border-b border-botanical-100/60 text-[10px] sm:text-xs text-gray-600 py-1 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="flex items-center gap-1 text-emerald-800 font-bold truncate">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald flex-shrink-0" /> 100% Certified Organic Formulas
            </span>
            <span className="hidden md:inline text-gray-300">|</span>
            <span className="hidden md:inline text-gray-500">
              India's Premier Urban Gardening Brand
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            <div className="flex items-center gap-1 font-medium text-gray-700 text-[10px] sm:text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse hidden xs:inline-block"></span>
              <span className="hidden xs:inline">Agronomist Line:</span>
              <a 
                href={`tel:${PRIMARY_WHATSAPP_NUMBER}`} 
                className="text-emerald hover:text-emerald-700 font-extrabold hover:underline"
              >
                {PRIMARY_DISPLAY_PHONE}
              </a>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-gray-500 font-mono">
              <span className="font-semibold text-gray-800 bg-gray-100 px-1.5 py-0.5 rounded text-[10px]">₹ INR</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-4">
          
          {/* Brand Logo */}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2 sm:gap-2.5 group flex-shrink-0"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-charcoal-pure flex items-center justify-center shadow-md border border-gold/40 group-hover:scale-105 transition-transform duration-300">
              <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-light group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-2xl tracking-tight text-charcoal group-hover:text-emerald transition-colors leading-none flex items-center gap-0.5">
                Green Leaves
                <span className="text-emerald font-black">.</span>
              </span>
              <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-gold-dark mt-0.5">
                Organics
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-8 text-sm font-semibold text-gray-700">
            <button 
              onClick={() => handleNavClick('products-catalog', 'all')}
              className="hover:text-emerald transition py-1 cursor-pointer"
            >
              All Products
            </button>
            <button 
              onClick={() => handleNavClick('products-catalog', 'manures')}
              className="hover:text-emerald transition py-1 flex items-center gap-1 cursor-pointer"
            >
              Organic Fertilizers
              <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full font-bold uppercase">
                6-in-1
              </span>
            </button>
            <button 
              onClick={() => handleNavClick('products-catalog', 'plants')}
              className="hover:text-emerald transition py-1 cursor-pointer"
            >
              Shop Plants
            </button>
            <button 
              onClick={() => handleNavClick('products-catalog', 'medicines')}
              className="hover:text-emerald transition py-1 cursor-pointer"
            >
              Bio-Medicines
            </button>
            <button 
              onClick={() => handleNavClick('products-catalog', 'kits')}
              className="hover:text-emerald transition py-1 cursor-pointer"
            >
              Combos & Kits
            </button>
            <button 
              onClick={() => handleNavClick('maali-services')}
              className="text-emerald-900 bg-botanical-100 hover:bg-botanical-200 px-3 py-1.5 rounded-full font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              Maali Services
            </button>
            <button 
              onClick={() => handleNavClick('gardeners-handbook')}
              className="hover:text-emerald transition py-1 cursor-pointer"
            >
              Handbook
            </button>
          </nav>

          {/* Right Action Cluster: Search, Contact Pill, Cart Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Live Search Bar (Desktop & iPad landscape) */}
            <div className="relative hidden md:block" ref={searchContainerRef}>
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 focus-within:border-emerald focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald/20 transition-all w-44 lg:w-60">
                <Search className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search vermicompost, neem..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  className="bg-transparent border-none outline-none text-xs w-full text-gray-800 placeholder-gray-400"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Autocomplete Dropdown */}
              {isSearchOpen && searchResults.length > 0 && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-2 border-b border-gray-100 bg-botanical-50 text-[11px] font-bold text-gray-600 flex justify-between items-center">
                    <span>Matching Products ({searchResults.length})</span>
                    <span className="text-emerald">Instant Search</span>
                  </div>
                  <div className="divide-y divide-gray-50 max-h-80 overflow-y-auto">
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          openQuickView(product);
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="p-3 hover:bg-emerald-50/60 cursor-pointer flex items-center gap-3 transition"
                      >
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-11 h-11 object-cover rounded-lg border border-gray-100 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-gray-900 truncate">{product.name}</p>
                          <p className="text-[11px] text-gray-500 truncate">{product.subtitle}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs font-bold text-emerald">₹{product.price}</span>
                            <span className="text-[10px] text-gray-400 line-through">₹{product.mrp}</span>
                            {product.isFlagship && (
                              <span className="text-[9px] bg-gold/20 text-gold-dark font-bold px-1 rounded">Flagship</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 bg-gray-50 text-center border-t border-gray-100">
                    <button
                      onClick={() => {
                        handleNavClick('products-catalog');
                        setIsSearchOpen(false);
                      }}
                      className="text-xs text-emerald font-bold hover:underline cursor-pointer"
                    >
                      View all results in Catalog →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Call Agronomist Button (Desktop) */}
            <a
              href={`tel:${PRIMARY_WHATSAPP_NUMBER}`}
              className="hidden xl:inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-emerald border border-gray-200 hover:border-emerald/40 px-3 py-2 rounded-full transition shadow-xs bg-white cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald" />
              <span>Call Expert</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-1.5 sm:gap-2 bg-charcoal-pure hover:bg-black text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-full transition shadow-md border border-gold/30 hover:shadow-luxury group cursor-pointer"
              aria-label="View shopping cart"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-light group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline text-xs font-bold tracking-wide">Cart</span>
              
              {/* Dynamic Badge */}
              <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-gold text-charcoal-pure text-[11px] font-black shadow-sm group-hover:bg-gold-light transition-colors">
                {totalItems}
              </span>
            </button>

            {/* Mobile / iPad Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-emerald rounded-lg hover:bg-gray-100 transition cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white shadow-xl animate-in slide-in-from-top-4 duration-200 max-h-[80vh] overflow-y-auto">
          <div className="px-4 pt-3 pb-6 space-y-3">
            
            {/* Mobile Search Input */}
            <div className="relative mb-2">
              <input
                type="text"
                placeholder="Search vermicompost, plants, medicines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm outline-none focus:border-emerald focus:bg-white"
              />
              <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-3" />
            </div>

            {/* Instant mobile search results dropdown */}
            {searchResults.length > 0 && (
              <div className="bg-botanical-50 border border-botanical-200 rounded-2xl p-2 space-y-1.5 max-h-56 overflow-y-auto mb-2">
                <span className="text-[10px] font-bold text-gray-500 uppercase px-2">Quick Matches:</span>
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openQuickView(product);
                      setSearchQuery('');
                    }}
                    className="flex items-center gap-2.5 p-2 bg-white rounded-xl shadow-xs cursor-pointer hover:bg-emerald-50 transition"
                  >
                    <img src={product.image} alt={product.name} className="w-9 h-9 rounded-lg object-cover flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-gray-900 truncate">{product.name}</p>
                      <p className="text-[10px] text-emerald font-extrabold">₹{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quick Links Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm font-semibold">
              <button
                onClick={() => handleNavClick('products-catalog', 'all')}
                className="p-3 text-left bg-gray-50 hover:bg-botanical-50 rounded-xl text-gray-800 transition cursor-pointer"
              >
                🌿 All Products
              </button>
              <button
                onClick={() => handleNavClick('products-catalog', 'manures')}
                className="p-3 text-left bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-xl transition font-bold cursor-pointer"
              >
                ⭐ 6-in-1 Compost
              </button>
              <button
                onClick={() => handleNavClick('products-catalog', 'plants')}
                className="p-3 text-left bg-gray-50 hover:bg-botanical-50 rounded-xl text-gray-800 transition cursor-pointer"
              >
                🪴 Air Plants
              </button>
              <button
                onClick={() => handleNavClick('products-catalog', 'medicines')}
                className="p-3 text-left bg-gray-50 hover:bg-botanical-50 rounded-xl text-gray-800 transition cursor-pointer"
              >
                🛡️ Bio-Medicines
              </button>
              <button
                onClick={() => handleNavClick('products-catalog', 'kits')}
                className="p-3 text-left bg-gray-50 hover:bg-botanical-50 rounded-xl text-gray-800 transition cursor-pointer"
              >
                🎁 Garden Kits
              </button>
              <button
                onClick={() => handleNavClick('gardeners-handbook')}
                className="p-3 text-left bg-gray-50 hover:bg-botanical-50 rounded-xl text-gray-800 transition cursor-pointer"
              >
                📖 Handbook
              </button>
            </div>

            {/* Maali Action Button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openMaaliBooking();
                }}
                className="w-full bg-emerald text-white font-bold py-3 px-4 rounded-xl shadow-md hover:bg-emerald-700 flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
              >
                <Sparkles className="w-4 h-4 text-gold" />
                Book Verified Maali Service
              </button>
            </div>

            {/* Direct Contact Bar */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
              <span>Expert Support:</span>
              <a href={`tel:${PRIMARY_WHATSAPP_NUMBER}`} className="font-bold text-emerald hover:underline">
                {PRIMARY_DISPLAY_PHONE}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
