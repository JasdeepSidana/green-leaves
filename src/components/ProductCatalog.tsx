import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  Star, 
  ExternalLink, 
  Eye, 
  Sparkles, 
  ShieldCheck, 
  Plus, 
  Minus,
  Check
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { Product, ProductCategory, PackSize } from '../types';
import { getWhatsAppProductOrderUrl } from '../utils/whatsapp';
import { SafeImage } from './SafeImage';

interface ProductCatalogProps {
  initialCategory?: ProductCategory;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ initialCategory = 'all' }) => {
  const { addItem, openQuickView } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(initialCategory);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [searchFilter, setSearchFilter] = useState('');
  
  const [cardSelectedPacks, setCardSelectedPacks] = useState<Record<string, number>>({});
  const [cardQuantities, setCardQuantities] = useState<Record<string, number>>({});
  const [addedAnimation, setAddedAnimation] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', label: 'All Products', icon: '🌿' },
    { id: 'diwali', label: 'Diwali Gifts & Hampers', icon: '🪔' },
    { id: 'manures', label: 'Plant Manures & Soil', icon: '🌱' },
    { id: 'plants', label: 'Healthy Plants', icon: '🪴' },
    { id: 'medicines', label: 'Bio-Medicines & Tonics', icon: '🛡️' },
    { id: 'kits', label: 'Gardening Kits & Combos', icon: '🎁' },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = searchFilter === '' || 
        product.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchFilter.toLowerCase()) ||
        product.subtitle.toLowerCase().includes(searchFilter.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: Flagship and bestsellers first
      if (a.isFlagship) return -1;
      if (b.isFlagship) return 1;
      if (a.isDiwaliSpecial && !b.isDiwaliSpecial) return -1;
      if (!a.isDiwaliSpecial && b.isDiwaliSpecial) return 1;
      if (a.bestSeller && !b.bestSeller) return -1;
      if (!a.bestSeller && b.bestSeller) return 1;
      return 0;
    });
  }, [selectedCategory, sortBy, searchFilter]);

  const getPackForProduct = (product: Product): PackSize => {
    const packIndex = cardSelectedPacks[product.id] || 0;
    if (product.packSizes && product.packSizes[packIndex]) {
      return product.packSizes[packIndex];
    }
    return { size: 'Standard Unit', price: product.price, mrp: product.mrp };
  };

  const getQuantityForProduct = (productId: string): number => {
    return cardQuantities[productId] || 1;
  };

  const handlePackChange = (productId: string, packIndex: number) => {
    setCardSelectedPacks(prev => ({ ...prev, [productId]: packIndex }));
  };

  const handleQuantityChange = (productId: string, delta: number) => {
    setCardQuantities(prev => {
      const current = prev[productId] || 1;
      const next = Math.max(1, Math.min(20, current + delta));
      return { ...prev, [productId]: next };
    });
  };

  const handleAddToCart = (product: Product) => {
    const pack = getPackForProduct(product);
    const qty = getQuantityForProduct(product.id);
    addItem(product, pack, qty);

    setAddedAnimation(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedAnimation(prev => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <section id="products-catalog" className="py-12 sm:py-16 bg-[#0B0F0E] text-white border-b border-gold/20 max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-light border border-emerald-500/30 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              Pure Botanical Catalog
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Shop Organic Plant Nutrition & Care
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-gray-300">
              Formulated specifically for Indian balcony gardens, terrace pots, and festive green gifting.
            </p>
          </div>

          {/* Quick Sort Dropdown */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#141F1A] border border-white/20 text-white text-xs sm:text-sm font-semibold rounded-xl px-3 py-2 sm:py-2.5 focus:outline-none focus:border-gold shadow-2xs cursor-pointer"
            >
              <option value="featured">Featured & Best Sellers</option>
              <option value="rating">Highest Customer Rating</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar scroll-smooth">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as ProductCategory)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all shadow-2xs cursor-pointer ${
                  isActive
                    ? 'badge-dubai-gold font-black shadow-gold-dubai-sm scale-102'
                    : 'bg-[#141F1A] text-gray-300 border border-white/10 hover:border-gold hover:text-white'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {filteredProducts.map((product) => {
            const currentPack = getPackForProduct(product);
            const currentQty = getQuantityForProduct(product.id);
            const hasMultiplePacks = product.packSizes && product.packSizes.length > 1;
            const currentPackIndex = cardSelectedPacks[product.id] || 0;
            const discount = Math.round(((currentPack.mrp - currentPack.price) / currentPack.mrp) * 100);
            const isAdded = addedAnimation[product.id];
            const whatsappUrl = getWhatsAppProductOrderUrl(product, currentPack, currentQty);

            return (
              <div
                key={product.id}
                className="bg-[#121A16] rounded-2xl border border-emerald-500/20 hover:border-gold/60 shadow-luxury-dark hover:shadow-gold-dubai-sm transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1 text-white"
              >
                {/* Product Card Image & Badges */}
                <div className="relative aspect-square overflow-hidden bg-black/60">
                  <SafeImage
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
                    {product.isDiwaliSpecial && (
                      <span className="badge-dubai-gold text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                        <span>🪔</span> Diwali Special
                      </span>
                    )}
                    {product.isFlagship && !product.isDiwaliSpecial && (
                      <span className="badge-dubai-gold text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-sm">
                        Flagship
                      </span>
                    )}
                    {product.bestSeller && !product.isFlagship && !product.isDiwaliSpecial && (
                      <span className="badge-dubai-gold text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-sm">
                        Best Seller
                      </span>
                    )}
                    {product.organicCertified && (
                      <span className="bg-emerald text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1 border border-emerald-400/30">
                        <ShieldCheck className="w-3 h-3" /> 100% Organic
                      </span>
                    )}
                  </div>

                  {/* Discount percentage tag */}
                  {discount > 0 && (
                    <div className="absolute top-2.5 right-2.5 bg-red-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md shadow-sm">
                      {discount}% OFF
                    </div>
                  )}

                  {/* Quick View Hover Button */}
                  <button
                    onClick={() => openQuickView(product)}
                    className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/90 hover:bg-black text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md border border-gold/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1.5 hover:text-gold cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Quick View</span>
                  </button>
                </div>

                {/* Product Details Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Rating & Reviews */}
                    <div className="flex items-center gap-1 mb-1">
                      <div className="flex text-[#FFD700]">
                        <Star className="w-3.5 h-3.5 fill-[#FFD700] drop-shadow-[0_0_4px_rgba(255,215,0,0.5)]" />
                      </div>
                      <span className="text-xs font-bold text-white">{product.rating}</span>
                      <span className="text-[10px] text-gray-400">({product.reviewCount})</span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 
                      onClick={() => openQuickView(product)}
                      className="font-extrabold text-white text-sm sm:text-base hover:text-gold cursor-pointer transition line-clamp-1"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">
                      {product.subtitle}
                    </p>

                    {/* Pack Size Selector (if multiple exist) */}
                    {hasMultiplePacks && (
                      <div className="mt-2.5">
                        <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar">
                          {product.packSizes?.map((pack, idx) => (
                            <button
                              key={idx}
                              onClick={() => handlePackChange(product.id, idx)}
                              className={`text-[10px] px-2 py-0.5 rounded-md font-bold transition border cursor-pointer ${
                                currentPackIndex === idx
                                  ? 'bg-emerald-900/80 border-gold text-gold font-black shadow-xs'
                                  : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                              }`}
                            >
                              {pack.size.split(' ')[0]}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Price, Quantity & CTA Actions */}
                  <div className="pt-3 mt-2 border-t border-white/10">
                    <div className="flex items-baseline justify-between mb-2.5">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-base sm:text-lg font-black text-gold-metallic-shiny">₹{currentPack.price}</span>
                        <span className="text-xs text-gray-500 line-through">₹{currentPack.mrp}</span>
                      </div>

                      {/* Micro Quantity Selector */}
                      <div className="flex items-center border border-white/20 rounded-lg overflow-hidden bg-black/40">
                        <button
                          onClick={() => handleQuantityChange(product.id, -1)}
                          className="px-2 py-0.5 text-gray-300 hover:bg-white/10 transition cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-1.5 text-xs font-bold text-white">{currentQty}</span>
                        <button
                          onClick={() => handleQuantityChange(product.id, 1)}
                          className="px-2 py-0.5 text-gray-300 hover:bg-white/10 transition cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons: Add to Cart + WhatsApp */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className={`w-full py-2 px-1.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 shadow-2xs cursor-pointer ${
                          isAdded 
                            ? 'bg-emerald text-white' 
                            : 'bg-emerald hover:bg-emerald-600 text-white hover:shadow-xs'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-white" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5 text-gold" />
                            <span>Add</span>
                          </>
                        )}
                      </button>

                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-charcoal-pure font-black py-2 px-1.5 rounded-xl text-xs transition flex items-center justify-center gap-1 cursor-pointer shadow-sm"
                      >
                        <span>WhatsApp</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
