import { Product } from '../types';
import vermicompostHandsPouchImg from '../assets/images/vermicompost-showcase-hands-pouch.jpg';
import vermicompost2kgOfficialImg from '../assets/images/vermicompost-2kg-official.jpg';
import vermicompostSquareImg from '../assets/images/vermicompost-organic-square.jpg';
import vermicompost5kgImg from '../assets/images/vermicompost-5kg-showcase.jpg';
import vermicompost10kgImg from '../assets/images/vermicompost-10kg-showcase.jpg';
import vermicompost1kgStarterImg from '../assets/images/vermicompost-1kg-starter.jpg';
import vermicompostLivingSoilDuoImg from '../assets/images/vermicompost-living-soil-duo.jpg';
import vermicompostGardenDuoImg from '../assets/images/vermicompost-garden-duo.jpg';
import vermicompostPouchesGrassImg from '../assets/images/vermicompost-pouches-grass.jpg';
import brandPosterImg from '../assets/images/brand-promotional-poster.jpg';
import deodapVermicompostSoilImg from '../assets/images/deodap-vermicompost-soil.jpg';
import deodapVermicompostPackImg from '../assets/images/deodap-vermicompost-pack.jpg';
import kitchenHerbTrioImg from '../assets/images/kitchen-herb-trio.jpg';
import trichodermaBioFungicideImg from '../assets/images/trichoderma-bio-fungicide.jpg';

export const PRODUCTS: Product[] = [
  // =========================================================
  // --- DIWALI FESTIVE CAMPAIGN COLLECTION (UGAOO INSPIRED) ---
  // =========================================================
  {
    id: 'diwali-shubh-labh-jade-plant',
    name: '"Shubh Labh" Festive Jade Good Luck Plant',
    subtitle: 'Auspicious Crassula Ovata in Matte Brass Pot + Free Diya 🪔',
    slug: 'diwali-shubh-labh-jade-plant',
    category: 'diwali',
    shortDescription: 'The ultimate Diwali green gift. According to Vastu and Feng Shui, Jade brings financial abundance and positive chi into the home. Comes with a handcrafted terracotta diya.',
    fullDescription: 'This Diwali, replace sugar-heavy mithai with "The Gift That Keeps Growing". Our Shubh Labh Jade plant is organically nurtured with Green Leaves 6-in-1 Enriched Vermicompost in a premium matte gold/brass-finish planter. Includes an authentic artisanal terracotta diya and organic starter feed.',
    price: 449,
    mrp: 699,
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.98,
    reviewCount: 420,
    badges: ['🪔 Diwali Bestseller', 'Good Luck Vastu', 'Free Diya Included'],
    bestSeller: true,
    isDiwaliSpecial: true,
    organicCertified: true,
    inStock: true,
    packSizes: [
      { size: 'Single Gift Planter + Diya', price: 449, mrp: 699, perks: 'Free Brass Diya' },
      { size: 'Corporate Gift Pack of 3', price: 1199, mrp: 1999, perks: 'Save ₹800 + Free Delivery' },
      { size: 'Family Utsav Pack of 5', price: 1899, mrp: 3200, perks: 'Mega Saver + Free 2kg Compost' },
    ],
    benefits: [
      'Symbol of perpetual wealth, joy, and vitality',
      'Extremely hardy succulent that requires minimal watering',
      'Includes celebratory festive packaging ready for gifting'
    ],
    usageInstructions: [
      'Place in bright indirect light near the main entrance or southeast living corner.',
      'Water once every 7–10 days only when the topsoil is completely dry.'
    ]
  },
  {
    id: 'diwali-laxmi-kuber-duo',
    name: 'Laxmi-Kuber Prosperity Green Duo',
    subtitle: 'Golden Money Plant + Jade Plant in Royal Gold Planters',
    slug: 'diwali-laxmi-kuber-duo',
    category: 'diwali',
    shortDescription: 'Double the auspicious festive blessings. Paired together in festive gold ceramic planters with 2 organic clay diyas and festive gold ribbon.',
    fullDescription: 'Celebrate Diwali with the iconic duo of natural prosperity. Golden Money Plant trails vibrant emerald-gold leaves, while the Jade succulent anchors stability and wealth. Fed with 6-in-1 biological compost to ensure luxuriant festive growth without chemical fertilizers.',
    price: 699,
    mrp: 1099,
    image: 'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?auto=format&fit=crop&w=800&q=80',
    rating: 4.95,
    reviewCount: 310,
    badges: ['🪔 Festive Duo', 'Save ₹400', 'Bestseller'],
    bestSeller: true,
    isDiwaliSpecial: true,
    inStock: true,
    packSizes: [
      { size: 'Twin Festive Hamper (2 Plants + 2 Diyas)', price: 699, mrp: 1099, perks: 'Free Delivery' },
    ],
    benefits: [
      'Auspicious Vastu placement for living rooms and puja mandirs',
      'Filters airborne pollutants and volatile organic toxins',
      'Includes 2 handcrafted Diwali earthen diyas'
    ],
    usageInstructions: [
      'Money Plant: Thrives in bright indirect light or semi-shade.',
      'Jade Plant: Loves morning sun on balconies or well-lit windowsills.'
    ]
  },
  {
    id: 'diwali-fragrant-mogra-hamper',
    name: 'Diwali Fragrant Flowering Hamper',
    subtitle: 'Sweet Arabian Jasmine + 2kg 6-in-1 Compost + Brass Diya',
    slug: 'diwali-fragrant-mogra-hamper',
    category: 'diwali',
    shortDescription: 'Fill your home with heavenly natural Mogra perfume this Diwali. Comes with our flagship 2kg 6-in-1 Vermicompost Mix to guarantee dense blooms.',
    fullDescription: 'The traditional festive flower of India. Our bushy sweet Arabian Mogra bush is accompanied by a 2kg pouch of 6-in-1 Enriched Vermicompost Mix and a brass puja diya. The ultimate sensory festive delight for your family.',
    price: 549,
    mrp: 850,
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 195,
    badges: ['🪔 Divine Fragrance', 'Diwali Special'],
    isDiwaliSpecial: true,
    inStock: true,
    packSizes: [
      { size: 'Fragrant Hamper (Plant + 2kg Compost + Diya)', price: 549, mrp: 850 },
    ],
    benefits: [
      'Intoxicating natural floral perfume for Diwali evenings',
      'Fresh blossoms for morning puja rituals',
      'Comes with full 2kg 6-in-1 Vermicompost bag'
    ],
    usageInstructions: [
      'Give 4–6 hours of direct sunlight on balconies.',
      'Feed 3 spoons of 6-in-1 vermicompost every two weeks.'
    ]
  },
  {
    id: 'diwali-air-purifier-detox-box',
    name: 'Diwali Clean Air Detox Box (Peace Lily + Snake Plant)',
    subtitle: 'Combat Festive Post-Firecracker Smog with NASA-Tested Plants',
    slug: 'diwali-air-purifier-detox-box',
    category: 'diwali',
    shortDescription: 'Shield your family against festive smoke and winter particulate smog. Includes flowering Peace Lily and 24/7 oxygen-releasing Snake Plant.',
    fullDescription: 'Post-Diwali air in North India can be severe. Protect elderly family members and children with our Clean Air Detox Box. The Peace Lily absorbs airborne toxins and mold spores, while the Sansevieria pumps clean oxygen through the night.',
    price: 799,
    mrp: 1299,
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80',
    rating: 4.96,
    reviewCount: 280,
    badges: ['🪔 Smog Defense', 'NASA Purifier', 'Top Festive Gift'],
    isDiwaliSpecial: true,
    inStock: true,
    packSizes: [
      { size: 'Duo Purifier Box + 2 Brass Diyas', price: 799, mrp: 1299, perks: 'Free Shipping' },
    ],
    benefits: [
      'Filters benzene, formaldehyde, and smoke micro-particles',
      'Continuous 24-hour oxygen release in bedrooms',
      'Includes festive gift wrap and greeting card'
    ],
    usageInstructions: [
      'Peace Lily: Keep soil lightly moist in filtered light.',
      'Snake Plant: Water sparingly once every 12–15 days.'
    ]
  },

  // =========================================================
  // --- FLAGSHIP PRODUCT ---
  // =========================================================
  {
    id: 'enriched-vermicompost-mix',
    name: '6-in-1 Enriched Vermicompost Mix',
    subtitle: 'Signature Black & Gold 2kg Pouch | 100% Organic Soil Booster',
    slug: '6-in-1-enriched-vermicompost-mix',
    category: 'manures',
    shortDescription: 'Our flagship 6-in-1 supercharged formula blending aged vermicompost, cold-pressed neem khali, processed banana leaves, Trichoderma viride, steamed bone meal, and rock phosphate.',
    fullDescription: 'Crafted specifically for urban Indian balconies, terrace gardens, and potted plants. Green Leaves Organics 6-in-1 Enriched Vermicompost Mix is aged for 90 days with Eisenia foetida earthworms and enriched with high microbial flora. It delivers slow-release nitrogen, soluble phosphorus, humic acid, and natural bio-fungicide protection that revitalizes tired pot soil and triggers lush vegetative growth and blooming.',
    price: 149,
    mrp: 249,
    image: vermicompost2kgOfficialImg,
    gallery: [
      vermicompost1kgStarterImg,
      vermicompost2kgOfficialImg,
      vermicompost5kgImg,
      vermicompost10kgImg,
      vermicompostLivingSoilDuoImg,
      vermicompostGardenDuoImg,
      vermicompostHandsPouchImg,
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
      deodapVermicompostSoilImg,
    ],
    rating: 4.95,
    reviewCount: 348,
    badges: ['Flagship Formula', '100% Organic', 'Best Seller', 'Lab Tested'],
    isFlagship: true,
    bestSeller: true,
    organicCertified: true,
    inStock: true,
    packSizes: [
      { size: '1 kg Starter Pack', weightKg: 1, price: 149, mrp: 249, perks: 'Organic Trial Pack', image: vermicompost1kgStarterImg },
      { size: '2kg Official Garden Pouch', weightKg: 2, price: 249, mrp: 399, perks: 'Official 2kg Pouch + Free Plant', image: vermicompost2kgOfficialImg },
      { size: '5kg Value Pack', weightKg: 5, price: 549, mrp: 850, perks: 'Save ₹301 + Free Delivery', image: vermicompost5kgImg },
      { size: '10kg Terrace Pack', weightKg: 10, price: 999, mrp: 1600, perks: 'Mega Saver + Free 250ml Neem Spray', image: vermicompost10kgImg },
    ],
    ingredients: [
      'Pure Eisenia Foetida Vermicompost (Aged 90 Days)',
      'Cold-Pressed Neem Khali (Organic Pest Shield)',
      'Fermented Banana Leaves (Rich in Potassium & Micro-minerals)',
      'Trichoderma Viride +++ (Anti-Root Rot Bio-Fungus)',
      'Steamed Bone Meal (Slow-Release Phosphorus & Calcium)',
      'Natural Rock Phosphate (Root Expansion Mineral)'
    ],
    benefits: [
      'Multiplies blooming and fruit yield by up to 3x',
      'Recharges depleted pot soil without chemical burns',
      'Protects root system against fungal die-back and damping off',
      'Safe for pets, earthworms, indoor spaces, and edible herbs',
      'Locks moisture, reducing urban watering frequency by 30%'
    ],
    usageInstructions: [
      'Small to Medium Pots (6–8 inch): Apply 3–4 tablespoons (approx. 50g) around the root zone once every 20 days.',
      'Large Pots & Shrubs (10–14 inch): Apply 100g to 150g, gently fork into top 2 inches of soil, and water thoroughly.',
      'New Potting Mix Ratio: Mix 30% Enriched Vermicompost Mix with 40% Garden Soil and 30% Cocopeat.'
    ]
  },

  // =========================================================
  // --- PLANT MANURES & SOIL AMENDMENTS ---
  // =========================================================
  {
    id: 'pure-neem-khali-1kg',
    name: 'Pure Cold-Pressed Neem Khali',
    subtitle: '100% Organic Pest Shield & Soil Conditioner (1kg)',
    slug: 'pure-neem-khali-1kg',
    category: 'manures',
    shortDescription: 'Pure neem seed cake rich in azadirachtin. Shields root systems from nematodes, white grubs, and subterranean pests while nourishing soil.',
    fullDescription: 'Green Leaves Organics Neem Khali is derived from de-oiled neem seed kernels through cold-pressed mechanical extraction. It acts as both a slow-acting organic nitrogen fertilizer and a natural bio-pesticide.',
    price: 180,
    mrp: 260,
    image: 'https://images.unsplash.com/photo-1604762524889-3e2fcc145683?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewCount: 112,
    badges: ['Pest Shield', '100% Organic'],
    organicCertified: true,
    inStock: true,
    packSizes: [
      { size: '1kg Pouch', weightKg: 1, price: 180, mrp: 260 },
      { size: '3kg Saver Pack', weightKg: 3, price: 470, mrp: 720 },
    ],
    benefits: [
      'Eliminates soil-borne nematodes, white grubs, and root maggots',
      'Supplies organic nitrogen, phosphorus, and potassium',
      'Enhances soil aeration and water retention capacity'
    ],
    usageInstructions: [
      'Sprinkle 20-30g around pot perimeter once every month.',
      'Mix 50g per 5kg of potting soil when repotting.'
    ]
  },
  {
    id: 'steamed-bone-meal-1kg',
    name: 'Steamed Bone Meal Powder',
    subtitle: 'Slow-Release Phosphorus & Calcium for Heavy Blooms (1kg)',
    slug: 'steamed-bone-meal-1kg',
    category: 'manures',
    shortDescription: 'Sterilized steamed bone meal fine granules for vigorous root proliferation and explosive flower budding in roses, hibiscus, and bougainvillea.',
    fullDescription: 'Finely milled, heat-sterilized bone meal that provides an abundant supply of organic phosphorus (18-20%) and calcium (22-25%). Essential for heavy bloomers.',
    price: 199,
    mrp: 280,
    image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=800&q=80',
    rating: 4.85,
    reviewCount: 89,
    badges: ['Bloom Booster', 'High Phosphorus'],
    organicCertified: true,
    inStock: true,
    packSizes: [
      { size: '1kg Pack', weightKg: 1, price: 199, mrp: 280 },
      { size: '2kg Pack', weightKg: 2, price: 360, mrp: 520 },
    ],
    benefits: [
      'Essential for roses, hibiscus, bougainvillea, and fruit plants',
      'Provides continuous phosphorus release over 3-4 months',
      'Prevents blossom-end rot with high bioavailability calcium'
    ],
    usageInstructions: [
      'Apply 1-2 tablespoons per 10-inch pot once every 45 days.',
      'Gently rake into soil and water immediately.'
    ]
  },
  {
    id: 'natural-rock-phosphate-1kg',
    name: 'Natural Soft Rock Phosphate',
    subtitle: 'Mineral Rich Root Expander & Soil Mineralizer (1kg)',
    slug: 'natural-rock-phosphate-1kg',
    category: 'manures',
    shortDescription: 'Pure sedimentary rock phosphate powder. Releases trace minerals, silica, and phosphorus without altering soil pH.',
    fullDescription: 'Natural sedimentary soft rock phosphate mined and processed to 200-mesh fineness. It acts as a permanent soil builder that prevents phosphorus lockout.',
    price: 160,
    mrp: 220,
    image: 'https://images.unsplash.com/photo-1617173944883-6ffbd35d584d?auto=format&fit=crop&w=800&q=80',
    rating: 4.75,
    reviewCount: 64,
    badges: ['100% Mineral', 'Root Expansion'],
    organicCertified: true,
    inStock: true,
    packSizes: [
      { size: '1kg Pack', weightKg: 1, price: 160, mrp: 220 },
      { size: '5kg Value Pack', weightKg: 5, price: 680, mrp: 990 },
    ],
    benefits: [
      'Expands feeder root surface area for better water uptake',
      'Builds permanent mineral reserves in terrace garden soils',
      'Safe from salt burns and non-leaching'
    ],
    usageInstructions: [
      'Incorporate 30g per pot during repotting or seasonal turning.'
    ]
  },

  // =========================================================
  // --- HEALTHY PLANTS ---
  // =========================================================
  {
    id: 'sansevieria-snake-plant',
    name: 'Sansevieria Golden Snake Plant',
    subtitle: 'Futura Superba | NASA-Certified 24/7 Oxygen Plant',
    slug: 'sansevieria-snake-plant',
    category: 'plants',
    shortDescription: 'Indestructible indoor air purifier that releases oxygen at night. Striking sword-like leaves with vivid golden-yellow variegation.',
    fullDescription: 'The Sansevieria Trifasciata Laurentii is widely acclaimed as the ultimate beginner-friendly air purifier. Tested by NASA to filter benzene, formaldehyde, and trichloroethylene.',
    price: 349,
    mrp: 499,
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 215,
    badges: ['Air Purifier', 'Low Maintenance', 'Night Oxygen'],
    bestSeller: true,
    inStock: true,
    packSizes: [
      { size: 'Standard 6-inch Nursery Pot', price: 349, mrp: 499 },
      { size: 'In Ceramic Deco Planter', price: 599, mrp: 850 },
    ],
    benefits: [
      'Filters air toxins and releases oxygen 24 hours a day',
      'Tolerates low light and requires watering only once every 10-14 days',
      'Thrives in bedroom, home office, or air-conditioned living rooms'
    ],
    usageInstructions: [
      'Light: Low to bright indirect sunlight.',
      'Water: Allow soil to dry out completely between waterings.'
    ]
  },
  {
    id: 'peace-lily-spathiphyllum',
    name: 'Peace Lily (Spathiphyllum)',
    subtitle: 'Lush Foliage with Elegant White Hood Blooms',
    slug: 'peace-lily-spathiphyllum',
    category: 'plants',
    shortDescription: 'Graceful glossy green foliage that blooms angelic white spathes. Excellent natural indoor humidifier and air detoxifier.',
    fullDescription: 'Peace Lilies are renowned for their air-cleaning prowess and expressive leaves. Potted in our organic bio-rich compost with Trichoderma to safeguard against root rot.',
    price: 429,
    mrp: 599,
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80',
    rating: 4.85,
    reviewCount: 140,
    badges: ['Air Detox', 'Flowering Indoor'],
    inStock: true,
    packSizes: [
      { size: 'Standard 6-inch Pot', price: 429, mrp: 599 },
      { size: 'Self-Watering Planter', price: 679, mrp: 899 },
    ],
    benefits: [
      'Removes airborne mold spores and acetone vapors',
      'Regular blooming under filtered daylight',
      'Includes Green Leaves organic starter feed'
    ],
    usageInstructions: [
      'Light: Medium to bright indirect light.',
      'Water: Keep soil consistently moist but never waterlogged.'
    ]
  },
  {
    id: 'sweet-mogra-jasmine-shrub',
    name: 'Sweet Indian Mogra (Arabian Jasmine)',
    subtitle: 'Intensely Fragrant White Blossoms for Balcony & Pooja',
    slug: 'sweet-mogra-jasmine-shrub',
    category: 'plants',
    shortDescription: 'Hardy perennial flowering shrub producing heavenly scented white flowers throughout summer, monsoon, and festive season.',
    fullDescription: 'Green Leaves Organics hand-propagated Jasminum sambac bush. Pre-conditioned with our 6-in-1 Enriched Vermicompost for guaranteed dense budding.',
    price: 320,
    mrp: 450,
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 182,
    badges: ['Aromatic', 'Pooja Favorite', 'Sun Loving'],
    bestSeller: true,
    inStock: true,
    packSizes: [
      { size: 'Established 7-inch Bush', price: 320, mrp: 450 },
      { size: 'Trellis Trained Shrub', price: 499, mrp: 699 },
    ],
    benefits: [
      'Incredible intoxicating natural floral perfume',
      'Continuous bloom cycles with our Bone Meal + Vermicompost regimen',
      'Loves bright Indian sunshine on balconies and terraces'
    ],
    usageInstructions: [
      'Light: At least 4–6 hours of direct sunlight daily.',
      'Water: Water deeply when top inch of soil feels dry.'
    ]
  },
  {
    id: 'kitchen-garden-herb-trio',
    name: 'Kitchen Herb Trio (Tulsi, Basil, Mint)',
    subtitle: 'Holy Krishna Tulsi + Sweet Basil + Organic Spearmint',
    slug: 'kitchen-garden-herb-trio',
    category: 'plants',
    shortDescription: 'Three fragrant culinary and wellness herbs in individual pots. Fresh immunity leaves right by your kitchen window.',
    fullDescription: 'Kickstart your edible urban garden with our triple herb bundle. Grown without synthetic pesticides, fertilized purely with our aged compost and neem extracts.',
    price: 399,
    mrp: 599,
    image: kitchenHerbTrioImg,
    gallery: [
      kitchenHerbTrioImg,
      'https://images.unsplash.com/photo-1669131080043-f69be198e64f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534944645004-bf75556ce377?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.88,
    reviewCount: 95,
    badges: ['Edible & Fresh', 'Immunity Trio', '100% Organic'],
    inStock: true,
    packSizes: [
      { size: '3 Pots Set (Tulsi, Basil, Mint)', price: 399, mrp: 599 },
    ],
    benefits: [
      'Daily morning fresh tea leaves & Italian cooking basil',
      'Natural mosquito repellent aroma on balconies',
      'Comes with step-by-step herb pruning guide'
    ],
    usageInstructions: [
      'Pinch top leaves regularly to encourage bushy side shoots.',
      'Give morning sun and moderate watering.'
    ]
  },
  {
    id: 'cherry-tomato-starter-plant',
    name: 'Organic Cherry Tomato Plant (Fruiting Bush)',
    subtitle: 'High-Yielding Sweet Red Clusters for Pots & Balconies',
    slug: 'cherry-tomato-starter-plant',
    category: 'plants',
    shortDescription: 'Healthy, sturdy young cherry tomato plant already showing initial flowering clusters. Guaranteed sweet homegrown harvest.',
    fullDescription: 'Our organically nurtured cherry tomato saplings are bred for container gardening. High disease resistance, supported by our bio-fungicides.',
    price: 249,
    mrp: 349,
    image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80',
    rating: 4.79,
    reviewCount: 78,
    badges: ['Kitchen Garden', 'Fast Harvest'],
    inStock: true,
    packSizes: [
      { size: 'Single Potted Sapling', price: 249, mrp: 349 },
      { size: 'Duo Pack (2 Fruiting Bushes)', price: 449, mrp: 650 },
    ],
    benefits: [
      'Produces dozens of juicy sweet cherry tomatoes',
      'Ideal for 10-12 inch pots on sunny balconies',
      'Includes bamboo support stake'
    ],
    usageInstructions: [
      'Provide 5+ hours of direct sunlight.',
      'Feed 2 tablespoons of 6-in-1 Vermicompost every two weeks.'
    ]
  },

  // =========================================================
  // --- PLANT MEDICINES & BIO-CARE ---
  // =========================================================
  {
    id: 'trichoderma-viride-bio-fungicide',
    name: 'Trichoderma Viride +++ Bio-Fungicide',
    subtitle: 'Pure Biological Anti-Root Rot & Wilt Protector (500g)',
    slug: 'trichoderma-viride-bio-fungicide',
    category: 'medicines',
    shortDescription: 'High-potency biological fungus (2 x 10^8 CFU/g) that parasitizes harmful root rot fungi, Fusarium wilt, damping-off, and collar rot.',
    fullDescription: 'The single most critical natural medicine for urban potted plants in India, especially during monsoon and high humidity. Trichoderma viride colonizes root hairs, creating a biological shield against Phytophthora, Pythium, and Rhizoctonia.',
    price: 299,
    mrp: 420,
    image: trichodermaBioFungicideImg,
    gallery: [
      trichodermaBioFungicideImg,
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1777554886285-391eab7f4260?auto=format&fit=crop&w=800&q=80',
      deodapVermicompostSoilImg
    ],
    rating: 4.96,
    reviewCount: 167,
    badges: ['Essential Bio-Shield', 'Anti-Root Rot', '100% Bio-Organic'],
    bestSeller: true,
    organicCertified: true,
    inStock: true,
    packSizes: [
      { size: '500g Bio-Pack', weightKg: 0.5, price: 299, mrp: 420 },
      { size: '1kg Farm Pack', weightKg: 1, price: 520, mrp: 780 },
    ],
    benefits: [
      'Stops root rot and fungal dieback before it destroys potted plants',
      'Stimulates root branching and natural plant immunity',
      'Completely non-toxic to humans, children, and pets'
    ],
    usageInstructions: [
      'Soil Drench: Dissolve 5g (1 tsp) in 1 litre of water and drench root zone every 20-30 days.',
      'Potting Mix: Blend 10g per 5kg of soil when potting or repotting.'
    ]
  },
  {
    id: 'pure-cold-pressed-neem-oil-spray',
    name: 'Pure Cold-Pressed Neem Oil Spray (Emulsified)',
    subtitle: 'Ready-to-Use 250ml Organic Pest & Mealybug Eradicator',
    slug: 'pure-cold-pressed-neem-oil-spray',
    category: 'medicines',
    shortDescription: 'High-azadirachtin cold-pressed neem oil pre-emulsified with organic soap nut extract. Eliminates mealybugs, aphids, spider mites, and whiteflies.',
    fullDescription: 'Say goodbye to sticky white mealybugs and spider mites without toxic synthetic chemicals. Green Leaves Organics Neem Oil Spray is 100% triple-filtered, cold-pressed from fresh neem seeds.',
    price: 249,
    mrp: 350,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
    rating: 4.87,
    reviewCount: 224,
    badges: ['Ready to Use', 'Mealybug Shield', 'Pet-Safe'],
    organicCertified: true,
    inStock: true,
    packSizes: [
      { size: '250ml Spray Bottle', price: 249, mrp: 350 },
      { size: '500ml Refill Pack', price: 399, mrp: 580 },
    ],
    benefits: [
      'Eliminates mealybugs, thrips, scale insects, and fungus gnats',
      'Disrupts pest reproductive cycles naturally',
      'Leaves foliage with a radiant, protective organic sheen'
    ],
    usageInstructions: [
      'Shake well before use.',
      'Spray liberally on both upper and lower leaf surfaces in the early morning or evening.'
    ]
  },
  {
    id: 'seaweed-extract-liquid-tonic',
    name: 'Ascophyllum Seaweed Extract Liquid Tonic',
    subtitle: 'Cold-Extracted Kelp Bio-Stimulant & Stress Shield (250ml)',
    slug: 'seaweed-extract-liquid-tonic',
    category: 'medicines',
    shortDescription: 'Concentrated marine kelp elixir loaded with 60+ trace minerals, cytokinins, and amino acids. Reverses heat stress and yellowing foliage.',
    fullDescription: 'Green Leaves Organics Seaweed Bio-Tonic provides rapid foliar absorption. Boosts chlorophyll synthesis, revives shock-stressed plants after transit or repotting.',
    price: 320,
    mrp: 450,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    rating: 4.82,
    reviewCount: 88,
    badges: ['Plant Tonic', 'Micro-Nutrients'],
    organicCertified: true,
    inStock: true,
    packSizes: [
      { size: '250ml Concentrate Bottle', price: 320, mrp: 450 },
      { size: '500ml Economy Bottle', price: 549, mrp: 799 },
    ],
    benefits: [
      'Rapidly turns dull yellowing leaves to deep emerald green',
      'Speeds up post-repotting shock recovery',
      'Triggers dense lateral branching and active flower buds'
    ],
    usageInstructions: [
      'Mix 3ml (half cap) in 1 litre of fresh water.',
      'Spray on foliage once every 15 days.'
    ]
  },

  // =========================================================
  // --- GARDENING KITS & COMBOS ---
  // =========================================================
  {
    id: 'terrace-starter-super-kit',
    name: 'Terrace Garden Master Starter Kit',
    subtitle: '10kg Enriched Mix + Neem Oil + Pruner + 5 Coir Pots + 3 Seed Kits',
    slug: 'terrace-starter-super-kit',
    category: 'kits',
    shortDescription: 'The ultimate all-in-one setup kit for starting a high-producing organic terrace or balcony garden. Everything you need from day 1.',
    fullDescription: 'Curated by master agronomists at Green Leaves Organics. Includes our signature 10kg 6-in-1 Enriched Vermicompost Mix, 250ml Cold-Pressed Neem Oil Spray, ergonomic brass-riveted pruning shears, 5 eco-friendly coconut coir seedling pots, and 3 heritage non-GMO vegetable seed packets.',
    price: 1499,
    mrp: 2199,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80',
      vermicompostPouchesGrassImg,
      vermicompostLivingSoilDuoImg,
      vermicompostGardenDuoImg
    ],
    rating: 4.97,
    reviewCount: 156,
    badges: ['All-In-One Kit', 'Save ₹700', 'Free Delivery'],
    bestSeller: true,
    inStock: true,
    packSizes: [
      { size: 'Complete Master Kit (12+ items)', price: 1499, mrp: 2199, perks: 'Free Phone Maali Consultation' },
    ],
    benefits: [
      'Zero guesswork - complete organic gardening ecosystem in one box',
      'Includes high-grade carbon-steel pruning cutter',
      'Saves ₹700 compared to buying items individually'
    ],
    usageInstructions: [
      'Follow the included step-by-step Green Leaves Gardener Handbook.'
    ]
  },
  {
    id: 'balcony-plant-revival-kit',
    name: 'Balcony Plant Revival & SOS Kit',
    subtitle: '5kg Enriched Mix + Trichoderma Viride + Seaweed Tonic + Hand Trowel',
    slug: 'balcony-plant-revival-kit',
    category: 'kits',
    shortDescription: 'Emergency revival pack for dull, dying, or root-bound balcony plants. Guaranteed visible recovery in 14 days.',
    fullDescription: 'Is your balcony garden struggling with yellow leaves, compacted soil, or mysterious root rot? Our Balcony Revival Kit packs 5kg of our 6-in-1 Enriched Vermicompost, 500g Trichoderma bio-fungicide, 250ml Seaweed liquid tonic, and an ergonomic heavy-duty stainless steel hand trowel.',
    price: 899,
    mrp: 1299,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80',
      trichodermaBioFungicideImg,
      vermicompost5kgImg
    ],
    rating: 4.92,
    reviewCount: 128,
    badges: ['Plant Doctor Pick', 'Visible Result in 14 Days'],
    inStock: true,
    packSizes: [
      { size: 'Complete SOS Revival Pack', price: 899, mrp: 1299 },
    ],
    benefits: [
      'Revitalizes up to 10-15 standard balcony pots',
      'Eradicates root rot and re-energizes root respiration',
      'Includes free 1-on-1 WhatsApp plant diagnosis by our team'
    ],
    usageInstructions: [
      'Gently aerate topsoil with hand trowel, apply 100g 6-in-1 mix, drench with diluted Trichoderma, and spray Seaweed on leaves.'
    ]
  }
];
