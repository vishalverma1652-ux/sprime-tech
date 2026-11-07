import React from 'react';
import { X, Layers, Trash2, FilePlus2, MessageSquare } from 'lucide-react';
import { Product } from '../types';
import { COMPANY_INFO } from '../data/company';

interface ProductCompareModalProps {
  products: Product[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onAddToBoq: (product: Product) => void;
}

export const ProductCompareModal: React.FC<ProductCompareModalProps> = ({
  products,
  onClose,
  onRemove,
  onAddToBoq,
}) => {
  if (products.length === 0) return null;

  // Collect all unique specification keys across comparing products
  const allSpecKeys = Array.from(
    new Set(products.flatMap((p) => Object.keys(p.specs)))
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0b1a33] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-400/30">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading">
                Compare Technical Specifications
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Side-by-side comparison matrix for {products.length} selected electrical products
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Matrix Table */}
        <div className="p-4 sm:p-6 max-h-[75vh] overflow-x-auto overflow-y-auto">
          <table className="w-full text-xs text-left border-collapse min-w-[600px]">
            {/* Top Cards row */}
            <thead>
              <tr className="border-b border-slate-200">
                <th className="p-3 w-1/4 text-slate-500 font-bold uppercase tracking-wider">
                  Product Overview
                </th>
                {products.map((p) => (
                  <th key={p.id} className="p-3 w-1/4 align-top">
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 relative space-y-2">
                      <button
                        onClick={() => onRemove(p.id)}
                        className="absolute top-2 right-2 p-1 text-slate-400 hover:text-rose-600 rounded-md hover:bg-white"
                        title="Remove from compare"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="aspect-4/3 w-full bg-white rounded-xl p-2 flex items-center justify-center border border-slate-100">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="max-h-24 max-w-full object-contain"
                        />
                      </div>

                      <span className="text-[10px] font-bold text-[#1677c9] uppercase tracking-wide block">
                        {p.category}
                      </span>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-tight">
                        {p.name}
                      </h4>

                      <div className="pt-2 space-y-1.5">
                        <button
                          onClick={() => onAddToBoq(p)}
                          className="w-full inline-flex items-center justify-center gap-1 py-1.5 px-2 bg-[#0b1a33] text-white rounded-lg font-bold text-[11px] hover:bg-[#12284b]"
                        >
                          <FilePlus2 className="w-3 h-3 text-amber-400" />
                          <span>Add to BOQ</span>
                        </button>

                        <a
                          href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent(
                            `Hello Sprime Tech, what is the bulk price for: ${p.name}?`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-1 py-1 px-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg font-semibold text-[10px] hover:bg-emerald-100"
                        >
                          <MessageSquare className="w-3 h-3 fill-emerald-600" />
                          <span>WhatsApp RFQ</span>
                        </a>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Spec rows */}
            <tbody className="divide-y divide-slate-100">
              <tr className="bg-slate-50/60 font-semibold">
                <td className="p-3 text-slate-700">Brand / OEM</td>
                {products.map((p) => (
                  <td key={p.id} className="p-3 text-slate-900 font-bold">
                    {p.brand || 'Standard OEM'}
                  </td>
                ))}
              </tr>

              <tr className="bg-white font-medium">
                <td className="p-3 text-slate-700">Standards &amp; Testing</td>
                {products.map((p) => (
                  <td key={p.id} className="p-3 text-blue-700 font-semibold">
                    {p.standard || 'IS Compliant'}
                  </td>
                ))}
              </tr>

              <tr className="bg-slate-50/60 font-medium">
                <td className="p-3 text-slate-700">HSN Code</td>
                {products.map((p) => (
                  <td key={p.id} className="p-3 font-mono text-slate-700">
                    {p.hsnCode || 'N/A'} (18% GST)
                  </td>
                ))}
              </tr>

              {allSpecKeys.map((key, idx) => (
                <tr
                  key={key}
                  className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}
                >
                  <td className="p-3 font-semibold text-slate-700">{key}</td>
                  {products.map((p) => (
                    <td key={p.id} className="p-3 text-slate-800">
                      {p.specs[key] || (
                        <span className="text-slate-300 font-mono">-</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs">
          <span className="text-slate-500 font-medium">
            Tip: You can add individual items to your Project BOQ or clear items anytime.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl"
          >
            Close Matrix
          </button>
        </div>
      </div>
    </div>
  );
};
