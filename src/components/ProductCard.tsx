import React from 'react';
import {
  FilePlus2,
  SlidersHorizontal,
  MessageSquare,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onOpenSpecs: (product: Product) => void;
  onAddToBoq: (product: Product) => void;
  isCompared: boolean;
  onToggleCompare: (product: Product) => void;
  onDirectQuote: (product: Product) => void;
  inBoq: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenSpecs,
  onAddToBoq,
  isCompared,
  onToggleCompare,
  onDirectQuote,
  inBoq,
}) => {
  const categoryColors: Record<string, string> = {
    'LED lighting': 'bg-amber-500/10 text-amber-700 border-amber-500/20',
    'Energy meters': 'bg-blue-500/10 text-blue-700 border-blue-500/20',
    'ABT & multifunction': 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
    'Current transformers': 'bg-purple-500/10 text-purple-700 border-purple-500/20',
  };

  // Extract primary key spec entries for preview
  const specEntries = Object.entries(product.specs).slice(0, 2);

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Top Header Strip: Category & Compare */}
      <div className="p-3.5 pb-0 flex items-center justify-between gap-2">
        <span
          className={`text-[11px] font-bold px-2.5 py-1 rounded-md border uppercase tracking-wider ${
            categoryColors[product.category] || 'bg-slate-100 text-slate-700 border-slate-200'
          }`}
        >
          {product.category}
        </span>

        {/* Compare Checkbox */}
        <label
          className={`cursor-pointer inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-md transition-colors select-none ${
            isCompared
              ? 'bg-indigo-100 text-indigo-700 font-bold'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
          }`}
          title="Select to compare specs side-by-side"
        >
          <input
            type="checkbox"
            checked={isCompared}
            onChange={() => onToggleCompare(product)}
            className="w-3.5 h-3.5 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 cursor-pointer"
          />
          <span>Compare</span>
        </label>
      </div>

      {/* Product Image Stage */}
      <div
        onClick={() => onOpenSpecs(product)}
        className="cursor-pointer relative aspect-4/3 w-full bg-[#f4f7fa] p-4 flex items-center justify-center overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
        />

        {product.brand && (
          <span className="absolute bottom-2 left-2 text-[10px] font-bold bg-white/90 backdrop-blur-xs text-slate-800 px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
            {product.brand}
          </span>
        )}

        {product.standard && (
          <span className="absolute bottom-2 right-2 text-[10px] font-medium bg-slate-900/80 backdrop-blur-xs text-white px-2 py-0.5 rounded-md flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>{product.standard.split('/')[0]}</span>
          </span>
        )}
      </div>

      {/* Product Body Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3
            onClick={() => onOpenSpecs(product)}
            className="cursor-pointer text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#1677c9] transition-colors leading-snug font-heading"
          >
            {product.name}
          </h3>

          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {product.subtitle}
          </p>

          {/* Tag Pills */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Quick Specifications preview box */}
          {specEntries.length > 0 && (
            <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-1.5 text-[11px]">
              {specEntries.map(([key, val]) => (
                <div key={key} className="flex justify-between items-baseline gap-2">
                  <span className="text-slate-400 truncate">{key}:</span>
                  <span className="text-slate-700 font-semibold text-right truncate">
                    {val}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onOpenSpecs(product)}
              className="inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/90 rounded-xl transition-all"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
              <span>Full Specs</span>
            </button>

            <button
              onClick={() => onAddToBoq(product)}
              className={`inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold rounded-xl transition-all shadow-xs ${
                inBoq
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-[#0b1a33] hover:bg-[#12284b] text-white active:scale-95'
              }`}
            >
              {inBoq ? (
                <>
                  <Check className="w-3.5 h-3.5 text-amber-700" />
                  <span>In BOQ</span>
                </>
              ) : (
                <>
                  <FilePlus2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Add to BOQ</span>
                </>
              )}
            </button>
          </div>

          {/* Instant Direct Quote CTA */}
          <button
            onClick={() => onDirectQuote(product)}
            className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 text-[11px] font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200"
          >
            <MessageSquare className="w-3 h-3 text-emerald-600 fill-emerald-600" />
            <span>Instant WhatsApp Rate for {product.name.split(' ')[0]}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
