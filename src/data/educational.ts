import { GuideArticle } from '../types';

export const GARDENER_GUIDES: GuideArticle[] = [
  {
    id: 'vermicompost-blooms',
    title: 'How to Use 6-in-1 Vermicompost for Maximum Blooms & Growth',
    category: 'Soil & Nutrition',
    readTime: '3 min read',
    summary: 'Discover the exact dosing schedule and aeration technique ("Gudai") used by master nursery growers to trigger 3x more flower buds on roses, hibiscus, and bougainvillea without chemical burns.',
    steps: [
      'Gently scrape the top 1.5 to 2 inches of soil away from the main plant stem using a hand trowel without damaging the primary taproot.',
      'Sprinkle 50g (3 rounded tablespoons) of Green Leaves 6-in-1 Enriched Vermicompost evenly in the peripheral ring (the "drip line").',
      'Mix the compost lightly with the loosened topsoil to protect beneficial microbial colonies from direct sunlight.',
      'Water thoroughly until a few drops seep out of the drainage hole to activate microbial humic acids.'
    ],
    proTip: 'Always fertilize in early morning (7–9 AM) or evening (5–7 PM). Never fertilize dry, bone-hard soil—moisten it lightly 2 hours prior.'
  },
  {
    id: 'preventing-root-rot',
    title: 'Preventing Root Rot in Monsoon & High Humidity Conditions',
    category: 'Plant Health SOS',
    readTime: '4 min read',
    summary: 'Root rot is the #1 killer of urban potted plants. Learn how Trichoderma viride biological fungus shields delicate roots when heavy rain or overwatering drowns soil oxygen.',
    steps: [
      'Ensure every pot has unblocked drainage holes. Clear clogged saucers immediately—plants should never sit in stagnant standing water.',
      'Add 20% coarse perlite or river sand to your potting mix to accelerate water percolation.',
      'Dissolve 5g of Trichoderma Viride +++ powder in 1 litre of clean water.',
      'Drench the root zone once at the beginning of monsoon and once at peak humidity. The friendly fungus colonizes the rhizosphere and devours rotting pathogens.'
    ],
    proTip: 'If leaves turn yellow and stems become mushy near the soil line, stop watering immediately, move to indirect breeze, and treat with Trichoderma.'
  },
  {
    id: 'weekly-watering-checklist',
    title: 'The Foolproof Weekly Watering & Sunlight Checklist for Apartments',
    category: 'Daily Care',
    readTime: '3 min read',
    summary: 'More houseplants die from excessive love (overwatering) than neglect. Master the "Knuckle Test" and adjust watering based on seasonal light cycles.',
    steps: [
      'The Knuckle Test: Insert your index finger 1 to 1.5 inches deep into the soil. If it feels cool and moist with soil sticking to your skin, do NOT water.',
      'Watering Technique: When watering, water deeply and slowly until water flows out of the drainage hole, rather than splashing shallow spoonfuls daily.',
      'Dusting Foliage: Wipe leaf surfaces weekly with a damp microfiber cloth to remove dust particles so stomata can absorb filtered sunlight.',
      'Seasonal Rhythm: In winter, cut watering frequency in half as indoor plants enter semi-dormancy.'
    ],
    proTip: 'Indoor air-purifiers like Snake Plants and ZZ Plants only need water once every 12–15 days in typical air-conditioned apartments.'
  },
  {
    id: 'organic-pest-control-neem',
    title: 'Wiping Out Mealybugs, Spider Mites & Thrips with Cold-Pressed Neem',
    category: 'Pest Management',
    readTime: '3 min read',
    summary: 'How to apply emulsified cold-pressed neem oil effectively without scorching delicate foliage or letting pests develop chemical immunity.',
    steps: [
      'Isolate the infected plant immediately to prevent bugs jumping to neighboring pots.',
      'Prune severely infested leaves or manually wipe off dense cottony mealybug clusters with a cotton swab soaked in isopropyl alcohol.',
      'Shake Green Leaves Cold-Pressed Neem Oil Spray bottle vigorously and spray all crevices, nodes, and leaf undersides thoroughly.',
      'Repeat spray every 4 days for two consecutive weeks to break the 14-day pest egg hatching cycle.'
    ],
    proTip: 'Never spray neem oil in direct midday sun—oil droplets act like tiny magnifying lenses that can burn foliage. Spray strictly at dusk.'
  }
];

export interface PlantSymptom {
  symptom: string;
  causes: string;
  solution: string;
  recommendedProductSlug: string;
  recommendedProductName: string;
}

export const PLANT_DOCTOR_SYMPTOMS: PlantSymptom[] = [
  {
    symptom: 'Yellowing lower leaves with soft, mushy stem base',
    causes: 'Overwatering combined with poor drainage, leading to early fungal root rot (Pythium/Phytophthora).',
    solution: 'Halt watering immediately. Loosen topsoil, inspect drainage holes, and drench with biological Trichoderma bio-fungicide.',
    recommendedProductSlug: 'trichoderma-viride-bio-fungicide',
    recommendedProductName: 'Trichoderma Viride +++ Bio-Fungicide'
  },
  {
    symptom: 'White cotton-like fuzzy clusters on leaf nodes & stem tips',
    causes: 'Mealybug infestation feeding on plant sap and stunting new growth.',
    solution: 'Wipe visible bugs with cotton swab and spray emulsified Cold-Pressed Neem Oil Spray on all nodes every 4 days.',
    recommendedProductSlug: 'pure-cold-pressed-neem-oil-spray',
    recommendedProductName: 'Pure Cold-Pressed Neem Oil Spray'
  },
  {
    symptom: 'Lush green foliage but zero flowers on Hibiscus, Rose, or Bougainvillea',
    causes: 'Phosphorus and calcium deficiency or excessive synthetic nitrogen fertilizer.',
    solution: 'Top-dress with Steamed Bone Meal and Green Leaves 6-in-1 Enriched Vermicompost to trigger heavy bloom bud formation.',
    recommendedProductSlug: 'steamed-bone-meal-1kg',
    recommendedProductName: 'Steamed Bone Meal Powder'
  },
  {
    symptom: 'Pale, washed-out leaves with prominent green veins (Chlorosis)',
    causes: 'Micronutrient (iron, magnesium, zinc) lockup or tired depleted pot soil.',
    solution: 'Apply Seaweed Liquid Bio-Tonic foliar spray and refresh root layer with aged Vermicompost mix.',
    recommendedProductSlug: 'seaweed-extract-liquid-tonic',
    recommendedProductName: 'Ascophyllum Seaweed Extract Liquid Tonic'
  },
  {
    symptom: 'Soil is hard like brick, water stays floating on top or runs down edges',
    causes: 'Severely compacted, hydrophobic soil with depleted organic humus and earthworm activity.',
    solution: 'Aerate soil thoroughly with hand trowel, mix in 30% 6-in-1 Enriched Vermicompost + Cocopeat, and apply light mulch.',
    recommendedProductSlug: 'enriched-vermicompost-mix',
    recommendedProductName: '6-in-1 Enriched Vermicompost Mix'
  }
];
