"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuoteModal } from './components/QuoteModal';
import { MobileStickyBar } from './components/MobileStickyBar';
import { TrustpilotFloatingTab } from './components/TrustpilotWidget';

// Pages
import { HomePage } from './views/HomePage';
import { CategoryPage } from './views/CategoryPage';
import { ProductDetailPage } from './views/ProductDetailPage';
import { BrandPage } from './views/BrandPage';
import { VenuePage } from './views/VenuePage';
import { DeliveryPage } from './views/DeliveryPage';
import { GuidesPage } from './views/GuidesPage';
import { TradePage } from './views/TradePage';
import { WarrantyPage } from './views/WarrantyPage';
import { ComparePage } from './views/ComparePage';
import { ReviewsPage } from './views/ReviewsPage';
import { 
  DealsPage, 
  FinancePage, 
  AboutPage, 
  ContactPage, 
  CheckoutPage, 
  SearchPage, 
  NotFoundPage 
} from './views/StaticPages';

const MainContent: React.FC = () => {
  const { routeMatch } = useRouter();
  const { notification } = useCart();

  const renderRoute = () => {
    switch (routeMatch.routeType) {
      case 'home':
        return <HomePage />;
      case 'category':
        return <CategoryPage />;
      case 'product':
        return <ProductDetailPage />;
      case 'brand':
        return <BrandPage />;
      case 'venue':
        return <VenuePage />;
      case 'delivery':
        return <DeliveryPage />;
      case 'guide':
      case 'guides-hub':
        return <GuidesPage />;
      case 'trade':
      case 'quote':
        return <TradePage />;
      case 'warranty':
        return <WarrantyPage />;
      case 'deals':
        return <DealsPage />;
      case 'compare':
        return <ComparePage />;
      case 'reviews':
        return <ReviewsPage />;
      case 'finance':
        return <FinancePage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
      case 'faq':
      case 'returns':
        return <ContactPage />;
      case 'checkout':
      case 'cart':
        return <CheckoutPage />;
      case 'search':
        return <SearchPage />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between relative selection:bg-amber-500 selection:text-slate-950 pb-16 lg:pb-0">
      
      {/* Toast Notification Notification Pill */}
      {notification && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-lg shadow-xl border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Primary Header */}
      <Header />

      {/* Dynamic View Body */}
      <main className="flex-1 w-full" id="main-content">
        {renderRoute()}
      </main>

      {/* Global Interactive Overlays */}
      <CartDrawer />
      <QuoteModal />

      {/* Persistent Floating Trustpilot Badge (Desktop) */}
      <TrustpilotFloatingTab />

      {/* Sticky Mobile Quick Action Bar (Under 15% mobile viewport cap) */}
      <MobileStickyBar />

      {/* Global Trade Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <CartProvider>
        <MainContent />
      </CartProvider>
    </RouterProvider>
  );
}
