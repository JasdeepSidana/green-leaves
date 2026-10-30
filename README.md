# 🌿 Green Leaves Organics

> **"Healthy Soil, Happy Plants, Greener Future"**  
> *Production-ready, secure, modern D2C gardening and plant care e-commerce web application inspired by Ugaoo.com's clean aesthetic and high-converting flow.*

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🌟 Highlights & Key Features

### 1. Brand Identity & Visual System
- **Emerald Botanical Luxury Aesthetic**: Clean white background (`#FFFFFF`) with warm botanical surfaces (`#F9FAF8` / `#F3F6F2`).
- **Signature Packaging Complement**: Matte graphite and charcoal tones (`#111827`, `#0B0F0E`) matching the signature black-and-gold 2kg pouch packaging.
- **Accents & CTAs**: Forest emerald (`#166534`, `#22C55E`) and warm gold/amber highlights (`#EAB308`).
- **Taglines**:
  - *"Healthy Plants | Happy Tomorrow"*
  - *"Healthy Soil, Happy Plants, Greener Future"*
  - *"We Bring Nature Closer to You"*

### 2. Contact & Dynamic WhatsApp Integration
- **Customer Support & Orders Desk**: Direct phone & WhatsApp routing to **`+91 8826078720`** (Secondary: **`+91 8556889924`**).
- **Persistent Floating WhatsApp Widget**: Bottom-right floating badge with instant inquiry triggers (*Ask Plant Doctor*, *Book Maali*, *Inquire about Vermicompost*).
- **Dynamic WhatsApp Message Generator**: Pre-populates structured orders with itemized breakdown, variants, quantities, delivery prompts, and unlocked perks.

### 3. Core Modules & Flow
- **Announcement Bar**: Special offer announcement with a live countdown timer.
- **Sticky Glass Navigation Bar**: Instant autocomplete live search, currency display (₹ INR), hotline link, and live cart item count badge.
- **Split Hero**: Benefit badges (100% Certified Organic, Doorstep Delivery, Expert Advice), Dual CTAs (*Explore Products*, *Book Maali Service*), and a floating flagship showcase card with 6 glowing formula inspection chips.
- **Flagship 6-in-1 Enriched Vermicompost Mix**: 
  - Formula breakdown: Aged Eisenia Foetida Vermicompost, Cold-Pressed Neem Khali, Processed Banana Leaves, Trichoderma Viride +++, Steamed Bone Meal, Natural Rock Phosphate.
  - Pack size selector: 2kg Signature Pack (₹249), 5kg Family Garden Pack (₹549), 10kg Terrace Value Pack (₹999).
  - Bundle perk banner: *1 Pack = Free Plant + Free Maali Consultation + Free Shipping*.
- **Comprehensive Product Catalog**: Filterable by categories (*Plant Manures & Soil, Healthy Plants, Bio-Medicines & Tonics, Gardening Kits & Combos*), sorting options, star ratings, and quick view modals.
- **Product Quick View Modal**: High-res imagery, formula breakdown, benefits, usage instructions, and instant buy buttons.
- **On-Demand Maali Services**: Balcony Garden Setup, Routine Maintenance, Seasonal Repotting & Pest Treatment, Lawn Mowing & Turf Care with an interactive booking modal and automated WhatsApp dispatch.
- **Gardener's Handbook & Plant Doctor SOS**: Accordion care guides and an interactive diagnostic tool matching plant symptoms with biological remedies.
- **Customer Testimonials & Trust Badges**: Real reviews from urban plant parents across Delhi NCR, Bangalore, Mumbai, and Chandigarh with 4 trust pillars.
- **Slide-Over Cart Drawer**: Free delivery progress meter, order notes, item modifiers, and dual checkout:
  1. *Order via WhatsApp* (1-click structured summary)
  2. *Secure Web Checkout* (256-bit SSL simulated gateway with Razorpay/UPI/Card/COD, validation, and celebratory confetti receipt)

### 4. Security & Hardening
- **XSS & Injection Sanitization**: Custom sanitizer stripping malicious scripts, HTML tags, and event handlers.
- **Input Validation**: Strict Indian mobile (+91), email, and 6-digit PIN code regex validators.
- **Safe State Storage**: Schema validation and prototype pollution defense in `localStorage`.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or later recommended)
- npm or pnpm

### Installation

```bash
# Clone repository
git clone https://github.com/JasdeepSidana/green-leaves.git

# Navigate to directory
cd green-leaves

# Install dependencies
npm install

# Start local development server
npm run dev
```

The application will be live at `http://localhost:3000` (or `http://localhost:3001`).

### Production Build

```bash
# Type-check and build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Tooling**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Delight & Animations**: Canvas Confetti, Tailwind Animations
- **State Management**: React Context with schema-hardened local storage persistence

---

## 📞 Support & Inquiries

- **Primary Order Desk**: `+91 8826078720`
- **Secondary Hotline**: `+91 8556889924`
- **Operating Hours**: 8:00 AM – 8:00 PM (Monday to Sunday)
- **Head Office**: Delhi NCR & Pan-India Dispatch Hub

---

*Made with 💚 for Green Leaves Organics.*
