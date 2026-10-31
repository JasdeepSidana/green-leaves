import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, PlacedOrder } from '../types';
import { safeGetStorage, safeSetStorage, sanitizeInput } from '../utils/security';

const USER_STORAGE_KEY = 'green_leaves_auth_user_v1';
const USERS_LIST_STORAGE_KEY = 'green_leaves_registered_users_v1';
const ORDERS_STORAGE_KEY = 'green_leaves_orders_history_v1';

// Seed demo user so user can test immediately with 1 click
const DEMO_USER: UserProfile = {
  id: 'usr_demo_101',
  fullName: 'Jasdeep Sidana',
  email: 'jasdeep@greenleavesorganics.in',
  phone: '8826078720',
  addressLine: 'House #42, Sector 14, Urban Estate',
  landmark: 'Near Central Park',
  city: 'Gurugram',
  state: 'Haryana',
  pincode: '122001',
  createdAt: '2026-10-15T10:00:00.000Z'
};

interface StoredUserAccount extends UserProfile {
  passwordHash?: string;
}

interface AuthContextType {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  orders: PlacedOrder[];
  isAuthModalOpen: boolean;
  authModalTab: 'signin' | 'signup' | 'orders' | 'profile';
  openAuthModal: (tab?: 'signin' | 'signup' | 'orders' | 'profile') => void;
  closeAuthModal: () => void;
  setAuthModalTab: (tab: 'signin' | 'signup' | 'orders' | 'profile') => void;
  signIn: (emailOrPhone: string, password?: string) => Promise<{ success: boolean; message: string }>;
  signUp: (userData: {
    fullName: string;
    email: string;
    phone: string;
    password?: string;
    addressLine?: string;
    landmark?: string;
    city?: string;
    state?: string;
    pincode?: string;
  }) => Promise<{ success: boolean; message: string }>;
  signInDemo: () => void;
  signOut: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  addOrder: (order: PlacedOrder) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    return safeGetStorage<UserProfile | null>(USER_STORAGE_KEY, null);
  });

  const [orders, setOrders] = useState<PlacedOrder[]>(() => {
    return safeGetStorage<PlacedOrder[]>(ORDERS_STORAGE_KEY, []);
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'signin' | 'signup' | 'orders' | 'profile'>('signin');

  useEffect(() => {
    safeSetStorage(USER_STORAGE_KEY, currentUser);
  }, [currentUser]);

  useEffect(() => {
    safeSetStorage(ORDERS_STORAGE_KEY, orders);
  }, [orders]);

  const openAuthModal = (tab: 'signin' | 'signup' | 'orders' | 'profile' = 'signin') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const signIn = async (emailOrPhone: string, _password?: string): Promise<{ success: boolean; message: string }> => {
    const cleanIdentifier = sanitizeInput(emailOrPhone.trim().toLowerCase());
    if (!cleanIdentifier) {
      return { success: false, message: 'Please enter your email or 10-digit mobile number' };
    }

    // Check demo match
    if (
      cleanIdentifier === DEMO_USER.email.toLowerCase() ||
      cleanIdentifier === DEMO_USER.phone ||
      cleanIdentifier === 'demo'
    ) {
      setCurrentUser(DEMO_USER);
      return { success: true, message: `Welcome back, ${DEMO_USER.fullName}!` };
    }

    // Check registered accounts
    const allUsers = safeGetStorage<StoredUserAccount[]>(USERS_LIST_STORAGE_KEY, [DEMO_USER]);
    const found = allUsers.find(
      u => u.email.toLowerCase() === cleanIdentifier || u.phone === cleanIdentifier
    );

    if (found) {
      setCurrentUser(found);
      return { success: true, message: `Welcome back, ${found.fullName}!` };
    }

    // For effortless UX, create instant account if valid format
    const isPhone = /^[6-9]\d{9}$/.test(cleanIdentifier);
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanIdentifier);

    if (isPhone || isEmail) {
      const newUser: UserProfile = {
        id: `usr_${Date.now()}`,
        fullName: isEmail ? cleanIdentifier.split('@')[0] : 'Green Leaves Member',
        email: isEmail ? cleanIdentifier : `${cleanIdentifier}@greenleavesorganics.in`,
        phone: isPhone ? cleanIdentifier : '9876543210',
        city: 'New Delhi',
        state: 'Delhi',
        createdAt: new Date().toISOString()
      };
      const updatedList = [...allUsers, newUser];
      safeSetStorage(USERS_LIST_STORAGE_KEY, updatedList);
      setCurrentUser(newUser);
      return { success: true, message: `Account created successfully! Welcome, ${newUser.fullName}!` };
    }

    return { success: false, message: 'Invalid credentials. Enter your 10-digit phone or registered email.' };
  };

  const signUp = async (userData: {
    fullName: string;
    email: string;
    phone: string;
    password?: string;
    addressLine?: string;
    landmark?: string;
    city?: string;
    state?: string;
    pincode?: string;
  }): Promise<{ success: boolean; message: string }> => {
    if (!userData.fullName.trim()) {
      return { success: false, message: 'Please enter your full name' };
    }
    if (!userData.phone.trim() || !/^[6-9]\d{9}$/.test(userData.phone.trim())) {
      return { success: false, message: 'Please enter a valid 10-digit Indian mobile number' };
    }

    const cleanEmail = sanitizeInput(userData.email.trim().toLowerCase());
    const cleanPhone = sanitizeInput(userData.phone.trim());

    const allUsers = safeGetStorage<StoredUserAccount[]>(USERS_LIST_STORAGE_KEY, [DEMO_USER]);
    const existing = allUsers.find(u => u.email.toLowerCase() === cleanEmail || u.phone === cleanPhone);

    if (existing) {
      setCurrentUser(existing);
      return { success: true, message: `Account already exists. Signed in as ${existing.fullName}!` };
    }

    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      fullName: sanitizeInput(userData.fullName),
      email: cleanEmail || `${cleanPhone}@greenleavesorganics.in`,
      phone: cleanPhone,
      addressLine: sanitizeInput(userData.addressLine || ''),
      landmark: sanitizeInput(userData.landmark || ''),
      city: sanitizeInput(userData.city || 'Gurugram'),
      state: userData.state || 'Haryana',
      pincode: sanitizeInput(userData.pincode || '122001'),
      createdAt: new Date().toISOString()
    };

    const updatedList = [...allUsers, newUser];
    safeSetStorage(USERS_LIST_STORAGE_KEY, updatedList);
    setCurrentUser(newUser);

    return { success: true, message: `Registration successful! Welcome to Green Leaves, ${newUser.fullName}!` };
  };

  const signInDemo = () => {
    setCurrentUser(DEMO_USER);
  };

  const signOut = () => {
    setCurrentUser(null);
    closeAuthModal();
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!currentUser) return;
    const updated: UserProfile = {
      ...currentUser,
      ...updates
    };
    setCurrentUser(updated);

    // Also persist in users list
    const allUsers = safeGetStorage<StoredUserAccount[]>(USERS_LIST_STORAGE_KEY, []);
    const idx = allUsers.findIndex(u => u.id === currentUser.id);
    if (idx !== -1) {
      allUsers[idx] = { ...allUsers[idx], ...updated };
      safeSetStorage(USERS_LIST_STORAGE_KEY, allUsers);
    }
  };

  const addOrder = (order: PlacedOrder) => {
    setOrders(prev => [order, ...prev]);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        orders,
        isAuthModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal,
        setAuthModalTab,
        signIn,
        signUp,
        signInDemo,
        signOut,
        updateProfile,
        addOrder
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
