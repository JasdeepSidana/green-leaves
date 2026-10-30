import { MaaliService } from '../types';

export const MAALI_SERVICES: MaaliService[] = [
  {
    id: 'balcony-garden-setup',
    title: 'Balcony Garden Complete Makeover',
    subtitle: 'Turn your bare urban balcony into a thriving green sanctuary',
    startingPrice: 999,
    priceDisplay: 'From ₹999 / session',
    duration: '2.5 - 3.5 Hours',
    iconName: 'Sparkles',
    description: 'Our experienced gardening artisan visits your home, assesses your balcony sunlight orientation, arranges your planters aesthetically, replenishes tired soil with Green Leaves 6-in-1 enriched compost, and installs organic nutrition stakes.',
    features: [
      'Sunlight analysis & space-saving layout design',
      'Nutrient top-dressing with 6-in-1 Vermicompost for up to 10 pots',
      'Deadhead pruning, leaf cleansing & branch shaping',
      'Organic Neem & bio-fungicide preventive treatment',
      'Personalized care schedule card for your family'
    ],
    recommendedFor: 'Apartment balconies, window sills, and study patio spaces',
    popular: true
  },
  {
    id: 'routine-maintenance',
    title: 'Routine Plant Doctor & Maintenance Visit',
    subtitle: 'Periodic checkup, soil aeration, pruning & organic fertilizing',
    startingPrice: 499,
    priceDisplay: '₹499 / single visit',
    duration: '1.5 - 2 Hours',
    iconName: 'Scissors',
    description: 'Keep your beloved plant parents flourishing year-round. Our verified Maali cleans every leaf, clears stubborn weeds, loosens hardened pot soil, and doses custom micronutrients.',
    features: [
      'Complete de-weeding & root-zone soil loosening (gudai)',
      'Precision pruning to trigger vibrant new foliage and buds',
      'Drenching with micro-nutrient seaweed booster',
      'Visual pest inspection & early disease eradication',
      'Cleanup & sweeping of the gardening area before leaving'
    ],
    recommendedFor: 'Bi-weekly or monthly upkeep for homes with 10–25 potted plants',
    popular: false
  },
  {
    id: 'repotting-pest-eradication',
    title: 'Seasonal Repotting & Intensive Pest Treatment',
    subtitle: 'Root rejuvenation, larger planter upgrades & mealybug wipeout',
    startingPrice: 699,
    priceDisplay: '₹699 / session (up to 8 pots)',
    duration: '2 Hours',
    iconName: 'ShieldAlert',
    description: 'Plants outgrowing their pots or fighting a stubborn mealybug/fungus outbreak? Our specialist repots them into larger planters with fresh organic substrate and applies hospital-grade bio-sanitizers.',
    features: [
      'Gentle root ball untangling & root rot surgery',
      'Fresh potting mix blending (Vermicompost + Cocopeat + Perlite)',
      'Intense double-spray of cold-pressed Neem Oil + Trichoderma',
      'Sanitization of pot saucers and planter drainage holes',
      'Post-repotting shock prevention treatment'
    ],
    recommendedFor: 'Root-bound plants, sick foliage, or post-monsoon revival',
    popular: true
  },
  {
    id: 'lawn-mowing-lawncare',
    title: 'Lawn Mowing & Turf De-Weeding Care',
    subtitle: 'Precision edge cutting, dethatching, and green carpet feeding',
    startingPrice: 1299,
    priceDisplay: 'From ₹1,299 / visit',
    duration: '3 - 4 Hours',
    iconName: 'Layers',
    description: 'Professional electric/engine lawn mowing, border edging along walkways, removal of invasive crabgrass, and application of organic nitrogen lawn fertilizer for a golf-course finish.',
    features: [
      'Even-height mowing with grass catcher disposal',
      'Sharp edging along walkways, driveways & flower beds',
      'Manual removal of deep-taproot weeds and wild clovers',
      'Spread of Green Leaves aged compost & bone meal top-layer',
      'Sprinkler & drip emitter nozzle inspection'
    ],
    recommendedFor: 'Villas, bungalows, farmhouses, and ground-floor gardens',
    popular: false
  },
  {
    id: 'terrace-turnkey-care',
    title: 'Terrace Garden Turnkey Seasonal Overhaul',
    subtitle: 'Heavy-duty care for fruit trees, vegetable grow bags & climbers',
    startingPrice: 1799,
    priceDisplay: 'From ₹1,799 / full day overhaul',
    duration: '4 - 5 Hours (2 Maalis)',
    iconName: 'Home',
    description: 'Two dedicated gardening specialists will overhaul your entire terrace garden: heavy pot shifting, deep seasonal fertilization, trellis fastening, drip line flushing, and full bio-spraying.',
    features: [
      'Two trained agronomist-led Maalis for half a day',
      'Deep fertilization of up to 30 pots / grow bags with 6-in-1 compost',
      'Staking and tying of tall tomato/creeper vines',
      'Full terrace canopy trimming and solar exposure optimization',
      'Free 1kg Green Leaves Neem Khali pack included'
    ],
    recommendedFor: 'Terrace kitchen gardens, container orchards, and rooftop lounges',
    popular: false
  }
];
