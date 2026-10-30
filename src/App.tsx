import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DiwaliCampaignSection } from './components/DiwaliCampaignSection';
import { FlagshipSection } from './components/FlagshipSection';
import { ProductCatalog } from './components/ProductCatalog';
import { MaaliServicesSection } from './components/MaaliServicesSection';
import { GardenersHandbook } from './components/GardenersHandbook';
import { TestimonialsTrust } from './components/TestimonialsTrust';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { MaaliBookingModal } from './components/MaaliBookingModal';
import { CheckoutModal } from './components/CheckoutModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ProductCategory } from './types';

const MainApp: React.FC = () => {
  const [activeCatalogCategory, setActiveCatalogCategory] = useState<ProductCategory>('all');

  const handleSelectCategory = (category: string) => {
    setActiveCatalogCategory(category as ProductCategory);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F0E] text-white font-sans max-w-full overflow-x-hidden selection:bg-gold selection:text-black">
      {/* 1. Announcement Bar with Live Countdown & Diwali Offer Ticker */}
      <AnnouncementBar />

      {/* 2. Sticky Glass Navigation Header */}
      <Navbar onSelectCategory={handleSelectCategory} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-full overflow-x-hidden">
        {/* 3. Hero Section with 3D/Floating Showcase & Glowing Formula Chips */}
        <Hero />

        {/* 4. 🪔 Ugaoo-Inspired Diwali Campaign: "The Gift That Keeps Growing" */}
        <DiwaliCampaignSection />

        {/* 5. Flagship Product Highlight ("6-in-1 Enriched Vermicompost Mix") */}
        <FlagshipSection />

        {/* 6. Product Catalog & Collections (Grid with category filters & sort) */}
        <ProductCatalog initialCategory={activeCatalogCategory} />

        {/* 7. "Maali Services" On-Demand Booking Module */}
        <MaaliServicesSection />

        {/* 8. Educational Section ("Gardener's Handbook" & Plant Doctor SOS) */}
        <GardenersHandbook />

        {/* 9. Customer Testimonials & Trust Badges */}
        <TestimonialsTrust />
      </main>

      {/* 10. Footer with Support, Quick Links, Newsletter */}
      <Footer />

      {/* Slide-over Cart & Modals */}
      <CartDrawer />
      <ProductQuickViewModal />
      <MaaliBookingModal />
      <CheckoutModal />

      {/* Floating Action WhatsApp Widget */}
      <FloatingWhatsApp />
    </div>
  );
};

export function App() {
  return (
    <CartProvider>
      <MainApp />
    </CartProvider>
  );
}

export default App;
