import React, { useState, useMemo } from 'react';
import { Product, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  activeCategory: ProductCategory | 'all';
  onCategoryChange: (cat: ProductCategory | 'all') => void;
  onOpenSpecs: (product: Product) => void;
  onAddToBoq: (product: Product) => void;
  comparedIds: string[];
  onToggleCompare: (product: Product) => void;
  onDirectQuote: (product: Product) => void;
  boqItemIds: string[];
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  activeCategory,
  onCategoryChange,
  onOpenSpecs,
  onAddToBoq,
  comparedIds,
  onToggleCompare,
  onDirectQuote,
  boqItemIds,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'default' | 'name-asc' | 'name-desc'>('default');

  const categories: { label: string; value: ProductCategory | 'all'; count: number }[] = [
    { label: 'All Products', value: 'all', count: products.length },
    {
      label: 'LED Lighting',
      value: 'LED lighting',
      count: products.filter((p) => p.category === 'LED lighting').length,
    },
    {
      label: 'Energy Meters',
      value: 'Energy meters',
      count: products.filter((p) => p.category === 'Energy meters').length,
    },
    {
      label: 'ABT & Multifunction',
      value: 'ABT & multifunction',
      count: products.filter((p) => p.category === 'ABT & multifunction').length,
    },
    {
      label: 'Current Transformers',
      value: 'Current transformers',
      count: products.filter((p) => p.category === 'Current transformers').length,
    },
  ];

  // Unique brands
  const brands = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.brand) {
        p.brand.split('/').forEach((b) => set.add(b.trim()));
      }
    });
    return Array.from(set);
  }, [products]);

  // Highlight popular quick tags
  const popularTags = ['30W', '50W', '90W', 'IP66 Weatherproof', 'Class 0.2S', 'DLMS/COSEM', '11 kV'];

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (activeCategory !== 'all' && p.category !== activeCategory) {
          return false;
        }

        // Brand filter
        if (selectedBrand !== 'all') {
          if (!p.brand || !p.brand.toLowerCase().includes(selectedBrand.toLowerCase())) {
            return false;
          }
        }

        // Tag filter
        if (selectedTag !== 'all') {
          const matchTag = p.tags.some((t) => t.toLowerCase().includes(selectedTag.toLowerCase()));
          const matchSpecs = Object.values(p.specs).some((s) =>
            s.toLowerCase().includes(selectedTag.toLowerCase())
          );
          if (!matchTag && !matchSpecs) return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = p.name.toLowerCase().includes(q);
          const matchSubtitle = p.subtitle.toLowerCase().includes(q);
          const matchDesc = p.desc?.toLowerCase().includes(q) || false;
          const matchTags = p.tags.some((t) => t.toLowerCase().includes(q));
          const matchSpecs = Object.values(p.specs).some((v) => v.toLowerCase().includes(q));
          const matchBrand = p.brand?.toLowerCase().includes(q) || false;

          return matchName || matchSubtitle || matchDesc || matchTags || matchSpecs || matchBrand;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
        return 0;
      });
  }, [products, activeCategory, selectedBrand, selectedTag, searchQuery, sortBy]);

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedBrand('all');
    setSelectedTag('all');
    onCategoryChange('all');
    setSortBy('default');
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedBrand !== 'all' ||
    selectedTag !== 'all' ||
    activeCategory !== 'all';

  return (
    <section id="products" className="py-14 sm:py-20 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#1677c9] text-xs font-bold uppercase tracking-wider mb-2">
              <span>Complete Procurement Catalog</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
              Energy Meters &amp; Commercial LED Lighting
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1.5 max-w-2xl">
              Heavy-duty roadway luminaires, single/three-phase smart static meters, ABT grid
              meters, and substation instrument transformers ready for immediate contractor dispatch.
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Showing Results
            </span>
            <span className="text-2xl font-black text-[#0b1a33] font-heading">
              {filteredProducts.length} <span className="text-sm font-semibold text-slate-400">/ 14</span>
            </span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          {/* Top Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => onCategoryChange(cat.value)}
                className={`shrink-0 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  activeCategory === cat.value
                    ? 'bg-[#0b1a33] text-white shadow-md'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                    activeCategory === cat.value
                      ? 'bg-amber-400 text-slate-950 font-black'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search, Brand, Sort Controls row */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2 border-t border-slate-100">
            {/* Search Input */}
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by model, wattage (e.g. 50W), IS 13779, class..."
                className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#1677c9] focus:bg-white transition-all text-slate-800"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Brand Dropdown */}
            <div className="sm:col-span-3">
              <div className="relative">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full pl-8 pr-8 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#1677c9] focus:bg-white transition-all text-slate-700 font-medium"
                >
                  <option value="all">All Brands</option>
                  {brands.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="sm:col-span-3">
              <div className="relative">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full pl-8 pr-8 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#1677c9] focus:bg-white transition-all text-slate-700 font-medium"
                >
                  <option value="default">Default Order</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quick Tag Pills & Reset */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-slate-400 font-medium text-[11px] mr-1">Quick Filter:</span>
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? 'all' : tag)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                    selectedTag === tag
                      ? 'bg-[#1677c9] text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 inline-flex items-center gap-1 ml-auto"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenSpecs={onOpenSpecs}
                onAddToBoq={onAddToBoq}
                isCompared={comparedIds.includes(product.id)}
                onToggleCompare={onToggleCompare}
                onDirectQuote={onDirectQuote}
                inBoq={boqItemIds.includes(product.id)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              No products found matching your filters
            </h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              We couldn&apos;t find any item matching &ldquo;{searchQuery || selectedBrand || selectedTag}&rdquo;. Try another
              keyword, select &ldquo;All Products&rdquo;, or contact us directly for custom supply.
            </p>
            <button
              onClick={resetAllFilters}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#0b1a33] text-white text-xs font-bold rounded-xl hover:bg-[#12284b] transition-all"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
