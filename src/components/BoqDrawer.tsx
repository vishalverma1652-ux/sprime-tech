import React, { useState } from 'react';
import {
  X,
  FileSpreadsheet,
  Trash2,
  Plus,
  Minus,
  MessageSquare,
  Download,
  Copy,
  Check,
  Building,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { BoqItem } from '../types';
import { COMPANY_INFO } from '../data/company';

interface BoqDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: BoqItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearBoq: () => void;
}

export const BoqDrawer: React.FC<BoqDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearBoq,
}) => {
  const [contractorFirm, setContractorFirm] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [gstinInput, setGstinInput] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  // Determine bulk tier badge
  let tierLabel = 'Standard Wholesale Tier';
  let tierColor = 'bg-blue-100 text-blue-800 border-blue-200';
  if (totalQuantity >= 100) {
    tierLabel = 'Mega Tender Slab (Max Discount + Freight Subsidy)';
    tierColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
  } else if (totalQuantity >= 25) {
    tierLabel = 'Contractor Project Slab (Special Project Discount)';
    tierColor = 'bg-amber-100 text-amber-800 border-amber-300';
  }

  // Format WhatsApp Message
  const formatWhatsappMessage = () => {
    let msg = `*SPRIME TECH - PROJECT BOQ INQUIRY*\n`;
    msg += `------------------------------------\n`;
    if (contractorFirm) msg += `*Firm/Contractor:* ${contractorFirm}\n`;
    if (deliveryLocation) msg += `*Delivery Site:* ${deliveryLocation}\n`;
    if (gstinInput) msg += `*Buyer GSTIN:* ${gstinInput}\n`;
    msg += `*Total Line Items:* ${items.length} | *Total Units:* ${totalQuantity}\n\n`;
    msg += `*REQUIRED BILL OF QUANTITIES (BOQ):*\n`;

    items.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.product.name}*\n`;
      msg += `   • Category: ${item.product.category}\n`;
      msg += `   • Quantity: ${item.quantity} units\n`;
      if (item.product.hsnCode) msg += `   • HSN: ${item.product.hsnCode}\n`;
      msg += `\n`;
    });

    msg += `------------------------------------\n`;
    msg += `Please send a formal wholesale tax-invoice quotation with delivery timelines to our site.`;
    return msg;
  };

  const handleSendWhatsapp = () => {
    const url = `${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent(
      formatWhatsappMessage()
    )}`;
    window.open(url, '_blank');
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(formatWhatsappMessage());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Export to CSV
  const handleDownloadCsv = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'S.No,Product Name,Category,Brand,HSN Code,Quantity,Testing Standard\n';

    items.forEach((item, idx) => {
      const row = [
        idx + 1,
        `"${item.product.name.replace(/"/g, '""')}"`,
        `"${item.product.category}"`,
        `"${item.product.brand || 'OEM'}"`,
        `"${item.product.hsnCode || 'N/A'}"`,
        item.quantity,
        `"${item.product.standard || 'IS Approved'}"`,
      ].join(',');
      csvContent += row + '\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `Sprime_Tech_BOQ_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end">
      <div
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 bg-[#0b1a33] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-400/30">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-heading text-white">
                Project BOQ Builder
              </h2>
              <p className="text-xs text-slate-300">
                {items.length} line items • {totalQuantity} total units
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

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {items.length > 0 ? (
            <>
              {/* Wholesale Tier Notice */}
              <div
                className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 ${tierColor}`}
              >
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>{tierLabel}</span>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 flex items-center gap-3"
                  >
                    <div className="w-16 h-16 rounded-xl bg-white p-1 border border-slate-200/80 shrink-0 flex items-center justify-center">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-[#1677c9] uppercase tracking-wider block">
                        {item.product.category}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {item.product.name}
                      </h4>
                      <span className="text-[11px] text-slate-500 block truncate">
                        HSN: {item.product.hsnCode || 'N/A'} • {item.product.brand || 'OEM'}
                      </span>

                      {/* Quantity adjuster */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden shadow-2xs">
                          <button
                            onClick={() =>
                              onUpdateQuantity(
                                item.product.id,
                                Math.max(1, item.quantity - 5)
                              )
                            }
                            className="p-1 px-2 text-slate-600 hover:bg-slate-100 font-bold text-xs"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              onUpdateQuantity(
                                item.product.id,
                                Math.max(1, parseInt(e.target.value) || 1)
                              )
                            }
                            className="w-12 text-center text-xs font-bold py-0.5 border-x border-slate-200 focus:outline-hidden"
                          />
                          <button
                            onClick={() =>
                              onUpdateQuantity(
                                item.product.id,
                                item.quantity + 5
                              )
                            }
                            className="p-1 px-2 text-slate-600 hover:bg-slate-100 font-bold text-xs"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-[11px] text-slate-500 font-medium">
                          units
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Project / Site Metadata Details form */}
              <div className="pt-2 border-t border-slate-200 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                  Project &amp; Delivery Details (Optional)
                </span>

                <div className="relative">
                  <Building className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    value={contractorFirm}
                    onChange={(e) => setContractorFirm(e.target.value)}
                    placeholder="Contractor / Firm / Project Name"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1677c9]"
                  />
                </div>

                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    placeholder="Delivery Site City / Pincode (e.g. Faridabad, Gurugram)"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1677c9]"
                  />
                </div>

                <input
                  type="text"
                  value={gstinInput}
                  onChange={(e) => setGstinInput(e.target.value.toUpperCase())}
                  placeholder="Buyer GSTIN (For 18% ITC Invoice)"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1677c9] font-mono"
                />
              </div>
            </>
          ) : (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <FileSpreadsheet className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-800">
                Your Project BOQ is Empty
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Browse our 14 products in energy meters, Halonix commercial LED lights, and
                CTs, and click &ldquo;Add to BOQ&rdquo; to build your bulk quotation.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-[#0b1a33] text-white text-xs font-bold rounded-xl"
              >
                Browse Catalog
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer Actions */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 space-y-3">
            {/* Primary WhatsApp Dispatch */}
            <button
              onClick={handleSendWhatsapp}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Send BOQ via WhatsApp (+91 81306 69395)</span>
            </button>

            {/* Secondary actions: CSV, Copy, Clear */}
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                onClick={handleDownloadCsv}
                className="flex items-center justify-center gap-1.5 py-2 px-2 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg font-semibold text-slate-700"
                title="Download CSV for Excel / Tender"
              >
                <Download className="w-3.5 h-3.5 text-blue-600" />
                <span>Export CSV</span>
              </button>

              <button
                onClick={handleCopyText}
                className="flex items-center justify-center gap-1.5 py-2 px-2 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg font-semibold text-slate-700"
                title="Copy formatted text for email"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>

              <button
                onClick={onClearBoq}
                className="flex items-center justify-center gap-1.5 py-2 px-2 bg-white border border-rose-200 hover:bg-rose-50 rounded-lg font-semibold text-rose-600"
                title="Clear all items"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
