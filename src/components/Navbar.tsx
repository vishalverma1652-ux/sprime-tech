import React, { useState } from 'react';
import {
  Zap,
  Phone,
  MessageSquare,
  FileSpreadsheet,
  Calculator,
  Copy,
  Check,
  Menu,
  X,
  MapPin,
  ShieldCheck,
  Layers
} from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

interface NavbarProps {
  boqCount: number;
  onOpenBoq: () => void;
  onOpenCalculator: () => void;
  compareCount: number;
  onOpenCompare: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  boqCount,
  onOpenBoq,
  onOpenCalculator,
  compareCount,
  onOpenCompare,
}) => {
  const [copiedGst, setCopiedGst] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCopyGst = () => {
    navigator.clipboard.writeText(COMPANY_INFO.gstin);
    setCopiedGst(true);
    setTimeout(() => setCopiedGst(false), 2200);
  };

  const navLinks = [
    { label: 'Products', href: '#products' },
    { label: 'Brands', href: '#brands' },
    { label: 'Applications', href: '#applications' },
    { label: 'Standards', href: '#compliance' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact & Godown', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top utility ticker banner */}
      <div className="bg-[#0b1a33] text-slate-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-amber-400 font-semibold text-[11px] uppercase tracking-wider bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              Wholesale Stockist
            </span>
            <span className="hidden sm:inline text-slate-300">
              Energy Meters (Secure • L&T • HPL) & Halonix Commercial LED Lighting
            </span>
            <span className="sm:hidden text-slate-300 truncate max-w-[210px]">
              Wholesale Meters & LED Lighting
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={handleCopyGst}
              className="flex items-center gap-1 text-slate-300 hover:text-amber-400 transition-colors"
              title="Click to copy GSTIN"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>GSTIN: <strong className="font-mono text-white">{COMPANY_INFO.gstin}</strong></span>
              {copiedGst ? (
                <Check className="w-3 h-3 text-emerald-400 ml-0.5" />
              ) : (
                <Copy className="w-3 h-3 text-slate-400 ml-0.5" />
              )}
            </button>

            <span className="hidden md:inline text-slate-600">|</span>

            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="hidden md:flex items-center gap-1 font-medium text-amber-300 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>Direct: {COMPANY_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group py-1">
            <div className="h-11 sm:h-12 aspect-16/10 rounded-xl overflow-hidden border border-slate-200 shadow-xs bg-slate-900 group-hover:shadow-md group-hover:scale-105 transition-all flex items-center justify-center shrink-0">
              <img
                src={COMPANY_INFO.logoUrl}
                alt="Sprime Tech Logo"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-2xl font-extrabold tracking-tight text-[#0b1a33] font-heading leading-tight">
                  SPRIME<span className="text-[#1677c9]">TECH</span>
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold bg-blue-100 text-[#1677c9] px-1.5 py-0.5 rounded-sm">
                  Faridabad
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-none tracking-wide">
                Shivam Prime Enterprises
              </p>
              <p className="text-[9px] font-bold text-[#1677c9] tracking-wider uppercase hidden sm:block mt-0.5">
                Innovate • Connect • Evolve
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-700 hover:text-[#1677c9] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#1677c9] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Energy Savings Calculator Button */}
            <button
              onClick={onOpenCalculator}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-all border border-slate-200"
              title="LED Energy Savings & CT Calculator"
            >
              <Calculator className="w-3.5 h-3.5 text-[#1677c9]" />
              <span>Calculators</span>
            </button>

            {/* Compare trigger button (if items selected) */}
            {compareCount > 0 && (
              <button
                onClick={onOpenCompare}
                className="inline-flex items-center gap-1 px-2.5 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-all border border-indigo-200"
                title="Compare Products"
              >
                <Layers className="w-3.5 h-3.5 text-indigo-600" />
                <span>Compare</span>
                <span className="ml-1 w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center font-bold">
                  {compareCount}
                </span>
              </button>
            )}

            {/* BOQ / Quotation Drawer Button */}
            <button
              onClick={onOpenBoq}
              className="relative inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-[#0b1a33] hover:bg-[#12284b] rounded-lg transition-all shadow-sm active:scale-95"
            >
              <FileSpreadsheet className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Project BOQ</span>
              <span className="sm:hidden">BOQ</span>
              {boqCount > 0 ? (
                <span className="ml-1 px-1.5 py-0.5 text-[11px] font-extrabold bg-amber-500 text-white rounded-full">
                  {boqCount}
                </span>
              ) : null}
            </button>

            {/* Direct WhatsApp Quote CTA */}
            <a
              href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent(
                'Hello Sprime Tech,\nI am reaching out regarding bulk electrical supplies (meters / LED lighting) from your website.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-emerald-800 bg-emerald-100/90 hover:bg-emerald-200 rounded-lg transition-all border border-emerald-300/80 active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-700 fill-emerald-600" />
              <span>WhatsApp RFQ</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 shadow-xl">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
            <button
              onClick={() => {
                onOpenCalculator();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 p-2.5 text-xs font-semibold text-slate-800 bg-slate-100 rounded-lg"
            >
              <Calculator className="w-4 h-4 text-[#1677c9]" />
              <span>LED & CT Calc</span>
            </button>
            <button
              onClick={() => {
                onOpenBoq();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 p-2.5 text-xs font-semibold text-white bg-[#0b1a33] rounded-lg"
            >
              <FileSpreadsheet className="w-4 h-4 text-amber-400" />
              <span>BOQ Cart ({boqCount})</span>
            </button>
          </div>

          <nav className="flex flex-col space-y-2 pt-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="truncate">{COMPANY_INFO.shortAddress}</span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="flex items-center gap-1.5 font-bold text-[#0b1a33]"
              >
                <Phone className="w-4 h-4 text-amber-500" />
                <span>Call {COMPANY_INFO.phoneDisplay}</span>
              </a>
              <button
                onClick={handleCopyGst}
                className="text-xs text-blue-600 font-semibold"
              >
                {copiedGst ? '✓ GSTIN Copied' : 'Copy GSTIN'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
