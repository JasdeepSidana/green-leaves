export type ProductCategory = 
  | 'all'
  | 'manures'
  | 'plants'
  | 'medicines'
  | 'kits';

export interface PackSize {
  size: string; // e.g. "2kg Pack", "5kg Pack", "10kg Value Pack"
  weightKg?: number;
  price: number;
  mrp: number;
  perks?: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  slug: string;
  category: 'manures' | 'plants' | 'medicines' | 'kits';
  shortDescription: string;
  fullDescription: string;
  price: number;
  mrp: number;
  image: string;
  gallery?: string[];
  rating: number;
  reviewCount: number;
  badges: string[];
  isFlagship?: boolean;
  packSizes?: PackSize[];
  ingredients?: string[];
  benefits: string[];
  usageInstructions: string[];
  inStock: boolean;
  bestSeller?: boolean;
  organicCertified?: boolean;
}

export interface CartItem {
  product: Product;
  selectedPack: PackSize;
  quantity: number;
}

export interface MaaliService {
  id: string;
  title: string;
  subtitle: string;
  startingPrice: number;
  priceDisplay: string;
  duration: string;
  iconName: string;
  description: string;
  features: string[];
  recommendedFor: string;
  popular?: boolean;
}

export interface MaaliBookingFormData {
  fullName: string;
  phone: string;
  email?: string;
  address: string;
  societyCity: string;
  gardenType: 'Balcony' | 'Terrace' | 'Lawn' | 'Indoor' | 'Kitchen Garden';
  serviceId: string;
  preferredDate: string;
  preferredTimeSlot: string;
  notes?: string;
}

export interface CheckoutFormData {
  fullName: string;
  phone: string;
  email: string;
  addressLine: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: 'upi' | 'cod' | 'card';
  orderNotes?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  verifiedBuyer: boolean;
  rating: number;
  comment: string;
  productMentioned: string;
  avatarText: string;
  avatarBg: string;
  plantImage?: string;
}

export interface GuideArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  steps: string[];
  proTip: string;
}
