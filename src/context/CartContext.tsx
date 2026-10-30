import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { Product, PackSize, CartItem } from '../types';
import { safeGetStorage, safeSetStorage, sanitizeInput } from '../utils/security';

const CART_STORAGE_KEY = 'green_leaves_cart_v1';
const FREE_DELIVERY_THRESHOLD = 499;
const DEFAULT_SHIPPING_FEE = 49;

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, pack?: PackSize, quantity?: number) => void;
  removeItem: (productId: string, packSize: string) => void;
  updateQuantity: (productId: string, packSize: string, quantity: number) => void;
  clearCart: () => void;
  
  // UI states
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;
  isMaaliModalOpen: boolean;
  setIsMaaliModalOpen: (open: boolean) => void;
  selectedMaaliServiceId: string | null;
  openMaaliBooking: (serviceId?: string) => void;
  closeMaaliBooking: () => void;
  
  // Quick View
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  
  // Notes
  orderNotes: string;
  setOrderNotes: (notes: string) => void;
  
  // Computations
  totalItems: number;
  subtotal: number;
  shippingFee: number;
  grandTotal: number;
  freeDeliveryThreshold: number;
  freeDeliveryRemaining: number;
  hasFlagship: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = safeGetStorage<CartItem[]>(CART_STORAGE_KEY, []);
    // Validate schema
    if (Array.isArray(saved)) {
      return saved.filter(item => item && item.product && item.selectedPack && typeof item.quantity === 'number');
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false);
  const [isMaaliModalOpen, setIsMaaliModalOpen] = useState<boolean>(false);
  const [selectedMaaliServiceId, setSelectedMaaliServiceId] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [orderNotes, setOrderNotesState] = useState<string>('');

  // Persist to safe storage whenever cart changes
  useEffect(() => {
    safeSetStorage(CART_STORAGE_KEY, items);
  }, [items]);

  const setOrderNotes = (notes: string) => {
    setOrderNotesState(sanitizeInput(notes));
  };

  const addItem = (product: Product, pack?: PackSize, quantity: number = 1) => {
    const chosenPack = pack || (product.packSizes && product.packSizes.length > 0 
      ? product.packSizes[0] 
      : { size: 'Standard Unit', price: product.price, mrp: product.mrp });

    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(
        i => i.product.id === product.id && i.selectedPack.size === chosenPack.size
      );

      if (existingIndex > -1) {
        const next = [...prevItems];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: Math.min(99, next[existingIndex].quantity + quantity)
        };
        return next;
      } else {
        return [...prevItems, { product, selectedPack: chosenPack, quantity: Math.min(99, Math.max(1, quantity)) }];
      }
    });

    setIsCartOpen(true);
  };

  const removeItem = (productId: string, packSize: string) => {
    setItems(prev => prev.filter(i => !(i.product.id === productId && i.selectedPack.size === packSize)));
  };

  const updateQuantity = (productId: string, packSize: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, packSize);
      return;
    }
    setItems(prev => prev.map(item => {
      if (item.product.id === productId && item.selectedPack.size === packSize) {
        return { ...item, quantity: Math.min(99, quantity) };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setItems([]);
  };

  const openMaaliBooking = (serviceId?: string) => {
    if (serviceId) setSelectedMaaliServiceId(serviceId);
    setIsMaaliModalOpen(true);
  };

  const closeMaaliBooking = () => {
    setIsMaaliModalOpen(false);
  };

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  // Computations
  const totalItems = useMemo(() => {
    return items.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((acc, curr) => acc + (curr.selectedPack.price * curr.quantity), 0);
  }, [items]);

  const hasFlagship = useMemo(() => {
    return items.some(item => item.product.isFlagship);
  }, [items]);

  const shippingFee = useMemo(() => {
    if (items.length === 0) return 0;
    if (subtotal >= FREE_DELIVERY_THRESHOLD || hasFlagship) return 0;
    return DEFAULT_SHIPPING_FEE;
  }, [items.length, subtotal, hasFlagship]);

  const grandTotal = useMemo(() => {
    return subtotal + shippingFee;
  }, [subtotal, shippingFee]);

  const freeDeliveryRemaining = useMemo(() => {
    if (hasFlagship) return 0;
    return Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  }, [subtotal, hasFlagship]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        isMaaliModalOpen,
        setIsMaaliModalOpen,
        selectedMaaliServiceId,
        openMaaliBooking,
        closeMaaliBooking,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        orderNotes,
        setOrderNotes,
        totalItems,
        subtotal,
        shippingFee,
        grandTotal,
        freeDeliveryThreshold: FREE_DELIVERY_THRESHOLD,
        freeDeliveryRemaining,
        hasFlagship
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
