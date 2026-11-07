import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  MessageSquare,
  FilePlus2,
  ShieldCheck,
  Layers,
  Sparkles,
} from 'lucide-react';
import { Product } from '../types';
import { COMPANY_INFO } from '../data/company';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToBoq: (product: Product, quantity: number) => void;
  inBoq: boolean;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToBoq,
  inBoq,
}) => {
  const [copied, setCopied] = useState(false);
  const [quantity, setQuantity] = useState(10); // default wholesale batch

  if (!product) return null;

  const handleCopySpecs = () => {
    const text = `Sprime Tech Product: ${product.name}\nCategory: ${product.category}\nHSN: ${
      product.hsnCode || 'N/A'
    }\nStandard: ${product.standard || 'N/A'}\n\nTechnical Specifications:\n${Object.entries(
      product.specs
    )
      .map(([k, v]) => `• ${k}: ${v}`)
      .join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappInquiryUrl = `${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent(
    `*SPRIME TECH - PRODUCT INQUIRY*\n` +
      `Product: ${product.name}\n` +
      `Category: ${product.category}\n` +
      `Target Quantity: ${quantity} units\n\n` +
      `Please share wholesale price, availability, and NABL test report status for delivery in Delhi-NCR.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-[#0b1a33] to-[#12284b] text-white p-5 sm:p-6 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase tracking-wider">
                {product.category}
              </span>
              {product.brand && (
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  OEM: {product.brand}
                </span>
              )}
              {product.hsnCode && (
                <span className="text-[11px] font-mono text-slate-300 bg-white/10 px-2 py-0.5 rounded-sm">
                  HSN: {product.hsnCode}
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
              {product.name}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
              {product.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[70vh] overflow-y-auto space-y-6">
          {/* Top section: Image + Quick badges */}
          <div className="grid sm:grid-cols-12 gap-6 items-center">
            <div className="sm:col-span-5 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex items-center justify-center aspect-4/3">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-56 max-w-full object-contain drop-shadow-md"
              />
            </div>

            <div className="sm:col-span-7 space-y-3">
              {product.desc && (
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {product.desc}
                </p>
              )}

              {/* Tag Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md border border-blue-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Wholesale procurement perks */}
              <div className="pt-2 grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-200/60">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Genuine OEM</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-200/60">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>GST 18% Input Credit</span>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specifications Sheet */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#1677c9]" />
                <span>Technical Specifications Data Sheet</span>
              </h3>

              <button
                onClick={handleCopySpecs}
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Specs</span>
                  </>
                )}
              </button>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
              <table className="w-full text-xs text-left">
                <tbody>
                  {Object.entries(product.specs).map(([param, value], index) => (
                    <tr
                      key={param}
                      className={index % 2 === 0 ? 'bg-slate-50/70' : 'bg-white'}
                    >
                      <td className="py-2.5 px-3.5 font-bold text-slate-700 w-2/5 border-r border-slate-200/60">
                        {param}
                      </td>
                      <td className="py-2.5 px-3.5 font-medium text-slate-900 w-3/5">
                        {value}
                      </td>
                    </tr>
                  ))}
                  {product.standard && (
                    <tr className="bg-blue-50/40">
                      <td className="py-2.5 px-3.5 font-bold text-slate-700 border-r border-slate-200/60">
                        Testing Standard / Approval
                      </td>
                      <td className="py-2.5 px-3.5 font-bold text-blue-700">
                        {product.standard}
                      </td>
                    </tr>
                  )}
                  {product.hsnCode && (
                    <tr className="bg-slate-50/70">
                      <td className="py-2.5 px-3.5 font-bold text-slate-700 border-r border-slate-200/60">
                        HSN Classification
                      </td>
                      <td className="py-2.5 px-3.5 font-mono text-slate-900">
                        {product.hsnCode} (18% GST Applicable)
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Quantity selector for BOQ */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-slate-600">Qty:</span>
            <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 5))}
                className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 font-bold"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-14 text-center text-xs font-bold py-1 border-x border-slate-200 focus:outline-hidden"
              />
              <button
                onClick={() => setQuantity(quantity + 5)}
                className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 font-bold"
              >
                +
              </button>
            </div>
            <span className="text-[11px] text-slate-500">units</span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => {
                onAddToBoq(product, quantity);
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0b1a33] hover:bg-[#12284b] text-white text-xs font-bold rounded-xl shadow-xs transition-all active:scale-95"
            >
              <FilePlus2 className="w-4 h-4 text-amber-400" />
              <span>{inBoq ? 'Update in BOQ' : 'Add to Project BOQ'}</span>
            </button>

            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-xs transition-all active:scale-95"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Get WhatsApp Rate</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
