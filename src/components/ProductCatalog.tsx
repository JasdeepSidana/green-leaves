import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  Star, 
  ExternalLink, 
  Eye, 
  Sparkles, 
  SlidersHorizontal, 
  ShieldCheck, 
  Plus, 
  Minus,
  Check
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { Product, ProductCategory, PackSize } from '../types';
import { getWhatsAppProductOrderUrl } from '../utils/whatsapp';

interface ProductCatalogProps {
  initialCategory?: ProductCategory;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ initialCategory = 'all' }) => {
  const { addItem, openQuickView } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(initialCategory);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [searchFilter, setSearchFilter] = useState('');
  
  // Track selected pack size and quantities per card
  const [cardSelectedPacks, setCardSelectedPacks] = useState<Record<string, number>>({});
  const [cardQuantities, setCardQuantities] = useState<Record<string, number>>({});
  const [addedAnimation, setAddedAnimation] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', label: 'All Products', icon: '🌿' },
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

    // Trigger visual check animation
    setAddedAnimation(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedAnimation(prev => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <section id="products-catalog" className="py-16 sm:py-20 bg-warmWhite border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald" />
              Pure Botanical Catalog
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight">
              Shop Organic Plant Nutrition & Care
            </h2>
            <p className="mt-1 text-sm sm:text-base text-gray-600">
              Formulated specifically for Indian balcony gardens, terrace pots, and indoor air spaces.
            </p>
          </div>

          {/* Quick Sort Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-gray-200 text-gray-700 text-xs sm:text-sm font-semibold rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-emerald shadow-xs"
            >
              <option value="featured">Featured & Best Sellers</option>
              <option value="rating">Highest Customer Rating</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as ProductCategory)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all shadow-xs cursor-pointer ${
                  isActive
                    ? 'bg-charcoal-pure text-white border border-gold/50 shadow-md scale-102'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-emerald hover:text-emerald hover:bg-botanical-50'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
              >
                {/* Product Card Image & Badges */}
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                    {product.isFlagship && (
                      <span className="bg-charcoal-pure text-gold border border-gold/50 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-sm">
                        Flagship
                      </span>
                    )}
                    {product.bestSeller && !product.isFlagship && (
                      <span className="bg-amber-500 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-sm">
                        Best Seller
                      </span>
                    )}
                    {product.organicCertified && (
                      <span className="bg-emerald text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> 100% Organic
                      </span>
                    )}
                  </div>

                  {/* Discount percentage tag */}
                  {discount > 0 && (
                    <div className="absolute top-3 right-3 bg-red-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md shadow-sm">
                      {discount}% OFF
                    </div>
                  )}

                  {/* Quick View Hover Button */}
                  <button
                    onClick={() => openQuickView(product)}
                    className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/95 hover:bg-white text-gray-900 text-xs font-bold px-4 py-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1.5 hover:text-emerald"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Quick View</span>
                  </button>
                </div>

                {/* Product Details Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Rating & Reviews */}
                    <div className="flex items-center gap-1 mb-1.5">
                      <div className="flex text-gold">
                        <Star className="w-3.5 h-3.5 fill-gold" />
                      </div>
                      <span className="text-xs font-bold text-gray-800">{product.rating}</span>
                      <span className="text-[11px] text-gray-400">({product.reviewCount})</span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 
                      onClick={() => openQuickView(product)}
                      className="font-extrabold text-charcoal text-base hover:text-emerald cursor-pointer transition line-clamp-1"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                      {product.subtitle}
                    </p>

                    {/* Pack Size Selector (if multiple exist) */}
                    {hasMultiplePacks && (
                      <div className="mt-3">
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                          {product.packSizes?.map((pack, idx) => (
                            <button
                              key={idx}
                              onClick={() => handlePackChange(product.id, idx)}
                              className={`text-[10px] px-2 py-1 rounded-md font-bold transition border ${
                                currentPackIndex === idx
                                  ? 'bg-emerald-50 border-emerald text-emerald-900'
                                  : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
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
                  <div className="pt-4 mt-2 border-t border-gray-100">
                    <div className="flex items-baseline justify-between mb-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-black text-charcoal">₹{currentPack.price}</span>
                        <span className="text-xs text-gray-400 line-through">₹{currentPack.mrp}</span>
                      </div>

                      {/* Micro Quantity Selector */}
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                        <button
                          onClick={() => handleQuantityChange(product.id, -1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-200 transition"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-gray-800">{currentQty}</span>
                        <button
                          onClick={() => handleQuantityChange(product.id, 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-200 transition"
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
                        className={`w-full py-2.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer ${
                          isAdded 
                            ? 'bg-emerald text-white' 
                            : 'bg-charcoal-pure hover:bg-black text-white hover:shadow-md'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-white" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5 text-emerald-light" />
                            <span>Add</span>
                          </>
                        )}
                      </button>

                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-charcoal-pure font-bold py-2.5 px-2 rounded-xl text-xs transition flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                        title="Order instantly on WhatsApp"
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
