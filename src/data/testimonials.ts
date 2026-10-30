import { Testimonial } from '../types';

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Ananya Sharma',
    location: 'Golf Course Road, Gurgaon',
    verifiedBuyer: true,
    rating: 5,
    comment: 'The 6-in-1 Enriched Vermicompost completely brought my dying balcony hibiscus and bougainvillea back to life within 12 days! Not a single synthetic chemical smell, and the black packaging looks super premium. Plus their Maali service is punctual and super knowledgeable.',
    productMentioned: '6-in-1 Enriched Vermicompost (5kg Pack)',
    avatarText: 'AS',
    avatarBg: 'bg-emerald-700',
    plantImage: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 't-2',
    name: 'Vikramaditya Roy',
    location: 'Indiranagar, Bangalore',
    verifiedBuyer: true,
    rating: 5,
    comment: 'I ordered the Balcony Plant Revival Kit and booked the Maali service for our terrace apartment. The agronomist who came explained how Trichoderma works to prevent root rot. It’s been 3 weeks and our money plant and peace lily are sprouting huge, glossy new leaves!',
    productMentioned: 'Balcony Plant Revival Kit + Maali Service',
    avatarText: 'VR',
    avatarBg: 'bg-green-800',
    plantImage: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 't-3',
    name: 'Pooja Venkatesh',
    location: 'Hiranandani, Mumbai',
    verifiedBuyer: true,
    rating: 5,
    comment: 'The WhatsApp ordering is lightning fast. I clicked the button, received instant confirmation from Green Leaves team on +91 8826078720, and received the 10kg pack in 2 days. The compost is dark, crumbly, and earthy with zero foul odor. Best vermicompost in India hands down.',
    productMentioned: '6-in-1 Enriched Vermicompost (10kg Value Pack)',
    avatarText: 'PV',
    avatarBg: 'bg-emerald-800',
    plantImage: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22513?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 't-4',
    name: 'Col. Rajesh Bakshi (Retd.)',
    location: 'Sector 15, Chandigarh',
    verifiedBuyer: true,
    rating: 5,
    comment: 'I have been gardening for over 35 years. Most commercial compost sold online is just raw cow dung or adulterated peat. Green Leaves Vermicompost with Trichoderma, Neem Khali and Steamed Bone Meal is genuine gold standard. My roses haven’t bloomed this heavily in years.',
    productMentioned: 'Steamed Bone Meal + Enriched Vermicompost',
    avatarText: 'RB',
    avatarBg: 'bg-stone-700',
    plantImage: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=400&q=80'
  }
];

export interface TrustBadgeItem {
  id: string;
  iconName: 'ShieldCheck' | 'Truck' | 'Leaf' | 'Lock' | 'Clock' | 'Award';
  title: string;
  description: string;
}

export const TRUST_BADGES: TrustBadgeItem[] = [
  {
    id: 'b-1',
    iconName: 'Leaf',
    title: '100% Bio-Organic Certified',
    description: 'No chemical urea, synthetic hormones or filler sand. Pure microbial soil health.'
  },
  {
    id: 'b-2',
    iconName: 'ShieldCheck',
    title: 'Pet & Child Safe',
    description: 'Non-toxic biological formulations safe for curious cats, dogs, and children.'
  },
  {
    id: 'b-3',
    iconName: 'Truck',
    title: 'Safe Doorstep Delivery',
    description: 'Fast, secure packaging across India with free delivery on orders above ₹499.'
  },
  {
    id: 'b-4',
    iconName: 'Award',
    title: 'Expert Agronomist Support',
    description: 'Direct phone & WhatsApp guidance from certified plant doctors on +91 8826078720.'
  }
];
