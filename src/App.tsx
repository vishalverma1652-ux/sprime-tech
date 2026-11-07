import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './data/products';
import { Product, ProductCategory, BoqItem } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandTicker } from './components/BrandTicker';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductModal } from './components/ProductModal';
import { ProductCompareModal } from './components/ProductCompareModal';
import { BoqDrawer } from './components/BoqDrawer';
import { CalculatorModal } from './components/CalculatorModal';
import { ApplicationsSection } from './components/ApplicationsSection';
import { WhyUsSection } from './components/WhyUsSection';
import { ComplianceSection } from './components/ComplianceSection';
import { FaqSection } from './components/FaqSection';
import { QuoteSection } from './components/QuoteSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { COMPANY_INFO } from './data/company';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [comparedIds, setComparedIds] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isBoqOpen, setIsBoqOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Quote form state prefilling
  const [quoteRequirement, setQuoteRequirement] = useState('');
  const [quoteCategory, setQuoteCategory] = useState<ProductCategory | 'all'>('all');

  // BOQ Cart with local storage persistence
  const [boqItems, setBoqItems] = useState<BoqItem[]>(() => {
    try {
      const saved = localStorage.getItem('sprime_boq');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sprime_boq', JSON.stringify(boqItems));
    } catch {
      // ignore
    }
  }, [boqItems]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  // Add / Update BOQ Item
  const handleAddToBoq = (product: Product, quantity: number = 10) => {
    setBoqItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`✓ Added ${quantity}x "${product.name}" to Project BOQ`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setBoqItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
    );
  };

  const handleRemoveBoqItem = (productId: string) => {
    setBoqItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const handleClearBoq = () => {
    setBoqItems([]);
    showToast('BOQ cleared');
  };

  // Toggle Compare
  const handleToggleCompare = (product: Product) => {
    setComparedIds((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter((id) => id !== product.id);
      }
      if (prev.length >= 3) {
        showToast('You can compare maximum 3 products at a time.');
        return prev;
      }
      const next = [...prev, product.id];
      if (next.length >= 2) {
        showToast(`Added to compare (${next.length}/3 items).`);
      }
      return next;
    });
  };

  const handleRemoveCompared = (id: string) => {
    setComparedIds((prev) => prev.filter((item) => item !== id));
  };

  // Direct Quote from Product Card
  const handleDirectQuote = (product: Product) => {
    const text = `Inquiry for wholesale supply:\n• Model: ${product.name}\n• Category: ${product.category}\n• Estimated Quantity: 20 units\n• Delivery Location: `;
    setQuoteRequirement(text);
    setQuoteCategory(product.category);

    // Scroll to contact form
    const elem = document.getElementById('contact');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const comparedProducts = PRODUCTS.filter((p) => comparedIds.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800 antialiased selection:bg-amber-400 selection:text-slate-950">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-5 z-50 bg-[#0b1a33] text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-3">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          <span>{toast}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        boqCount={boqItems.length}
        onOpenBoq={() => setIsBoqOpen(true)}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        compareCount={comparedIds.length}
        onOpenCompare={() => setIsCompareModalOpen(true)}
      />

      {/* Hero Section with Category Quick-Nav */}
      <main className="flex-1">
        <Hero
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            const el = document.getElementById('products');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenBoq={() => setIsBoqOpen(true)}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
        />

        {/* Brand Stockist & Metrics Ticker */}
        <BrandTicker />

        {/* Product Catalog with Search, Filters & Comparison */}
        <ProductCatalog
          products={PRODUCTS}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          onOpenSpecs={(p) => setSelectedProduct(p)}
          onAddToBoq={(p) => handleAddToBoq(p, 10)}
          comparedIds={comparedIds}
          onToggleCompare={handleToggleCompare}
          onDirectQuote={handleDirectQuote}
          boqItemIds={boqItems.map((i) => i.product.id)}
        />

        {/* Real-World Applications Grid */}
        <ApplicationsSection
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            const el = document.getElementById('products');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Procurement Workflow & Contractor Benefits */}
        <WhyUsSection />

        {/* Compliance Standards & Verified GSTIN */}
        <ComplianceSection />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Quotation Request Form & Godown Address */}
        <QuoteSection
          initialCategory={quoteCategory}
          initialRequirement={quoteRequirement}
        />
      </main>

      {/* Comprehensive Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          const el = document.getElementById('products');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
      />

      {/* Floating Action Buttons (WhatsApp + BOQ Cart + Scroll-Top) */}
      <FloatingActions
        boqCount={boqItems.length}
        onOpenBoq={() => setIsBoqOpen(true)}
      />

      {/* Modals & Drawers */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToBoq={handleAddToBoq}
          inBoq={boqItems.some((i) => i.product.id === selectedProduct.id)}
        />
      )}

      {isCompareModalOpen && (
        <ProductCompareModal
          products={comparedProducts}
          onClose={() => setIsCompareModalOpen(false)}
          onRemove={handleRemoveCompared}
          onAddToBoq={(p) => handleAddToBoq(p, 10)}
        />
      )}

      <BoqDrawer
        isOpen={isBoqOpen}
        onClose={() => setIsBoqOpen(false)}
        items={boqItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveBoqItem}
        onClearBoq={handleClearBoq}
      />

      <CalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        products={PRODUCTS}
        onAddToBoq={handleAddToBoq}
      />
    </div>
  );
}
