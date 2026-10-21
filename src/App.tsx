"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import dynamic from 'next/dynamic';
import { RouterProvider, useRouter } from './context/RouterContext';
import { CartProvider, useCart } from './context/CartContext';
import { ProductDetailProvider, ProductDetail } from './context/ProductDetailContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
const CartDrawer = dynamic(() => import('./components/CartDrawer').then((m) => m.CartDrawer), { ssr: false });
const QuoteModal = dynamic(() => import('./components/QuoteModal').then((m) => m.QuoteModal), { ssr: false });
import { MobileStickyBar } from './components/MobileStickyBar';
import { TrustpilotFloatingTab } from './components/TrustpilotWidget';

// Pages are split into their own chunks so a visitor only downloads the code for the page they open.
// They are still rendered on the server, so the HTML is unchanged.
const HomePage = dynamic(() => import('./views/HomePage').then((m) => m.HomePage));
const CategoryPage = dynamic(() => import('./views/CategoryPage').then((m) => m.CategoryPage));
const ProductDetailPage = dynamic(() => import('./views/ProductDetailPage').then((m) => m.ProductDetailPage));
const BrandPage = dynamic(() => import('./views/BrandPage').then((m) => m.BrandPage));
const VenuePage = dynamic(() => import('./views/VenuePage').then((m) => m.VenuePage));
const DeliveryPage = dynamic(() => import('./views/DeliveryPage').then((m) => m.DeliveryPage));
const GuidesPage = dynamic(() => import('./views/GuidesPage').then((m) => m.GuidesPage));
const TradePage = dynamic(() => import('./views/TradePage').then((m) => m.TradePage));
const WarrantyPage = dynamic(() => import('./views/WarrantyPage').then((m) => m.WarrantyPage));
const ComparePage = dynamic(() => import('./views/ComparePage').then((m) => m.ComparePage));
const ReviewsPage = dynamic(() => import('./views/ReviewsPage').then((m) => m.ReviewsPage));
const DealsPage = dynamic(() => import('./views/DealsPage').then((m) => m.DealsPage));
const FinancePage = dynamic(() => import('./views/InfoPages').then((m) => m.FinancePage));
const AboutPage = dynamic(() => import('./views/InfoPages').then((m) => m.AboutPage));
const ContactPage = dynamic(() => import('./views/InfoPages').then((m) => m.ContactPage));
const CheckoutPage = dynamic(() => import('./views/InfoPages').then((m) => m.CheckoutPage));
const SearchPage = dynamic(() => import('./views/StaticPages').then((m) => m.SearchPage));
const NotFoundPage = dynamic(() => import('./views/InfoPages').then((m) => m.NotFoundPage));
const PaymentMethodsPage = dynamic(() => import('./views/InfoPages').then((m) => m.PaymentMethodsPage));
const FaqPage = dynamic(() => import('./views/InfoPages').then((m) => m.FaqPage));
const ReturnsPage = dynamic(() => import('./views/InfoPages').then((m) => m.ReturnsPage));

const MainContent: React.FC<{ below?: React.ReactNode }> = ({ below }) => {
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
        return <ContactPage />;
      case 'faq':
        return <FaqPage />;
      case 'returns':
        return <ReturnsPage />;
      case 'payment-methods':
        return <PaymentMethodsPage />;
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
        {below}
      </main>

      {/* Global Interactive Overlays */}
      <CartDrawer />
      <QuoteModal />

      {/* Persistent Floating Trustpilot Badge (Desktop) */}
      <TrustpilotFloatingTab />

      {/* Sticky Mobile Quick Action Bar (Under 15% mobile viewport cap) */}
      <MobileStickyBar />

      {/* Global Trade Footer (rendered with the app so its markup is not also sent as server data) */}
      <Footer />
    </div>
  );
};

export default function App({ productDetail = null, below = null }: { productDetail?: ProductDetail | null; below?: React.ReactNode }) {
  return (
    <RouterProvider>
      <CartProvider>
        <ProductDetailProvider detail={productDetail}>
          <MainContent below={below} />
        </ProductDetailProvider>
      </CartProvider>
    </RouterProvider>
  );
}
