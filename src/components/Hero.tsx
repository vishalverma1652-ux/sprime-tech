import React from 'react';
import {
  ShieldCheck,
  Truck,
  ArrowRight,
  FileSpreadsheet,
  Calculator,
  CheckCircle2,
  Gauge,
  Lightbulb,
  Cpu,
  Zap,
} from 'lucide-react';
import { ProductCategory } from '../types';
import { COMPANY_INFO } from '../data/company';

interface HeroProps {
  onSelectCategory: (cat: ProductCategory | 'all') => void;
  onOpenBoq: () => void;
  onOpenCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSelectCategory,
  onOpenBoq,
  onOpenCalculator,
}) => {
  const quickCategories: {
    name: string;
    category: ProductCategory;
    subtitle: string;
    icon: React.ReactNode;
    color: string;
    tag: string;
  }[] = [
    {
      name: 'Single & 3-Phase Meters',
      category: 'Energy meters',
      subtitle: 'Secure Saral, Premier 300, Sprint 350, L&T EX300P, HPL PP300',
      icon: <Gauge className="w-5 h-5 text-blue-400" />,
      color: 'border-blue-500/30 hover:border-blue-400 bg-blue-950/40',
      tag: 'IS 13779 / 14697',
    },
    {
      name: 'Halonix LED Lighting',
      category: 'LED lighting',
      subtitle: 'Ceramic Street Lights (30W-90W), IP66 Flood Lights, 2x2 Panels',
      icon: <Lightbulb className="w-5 h-5 text-amber-400" />,
      color: 'border-amber-500/30 hover:border-amber-400 bg-amber-950/30',
      tag: 'Up to 140 lm/W',
    },
    {
      name: 'ABT & Multifunction',
      category: 'ABT & multifunction',
      subtitle: 'Secure Apex 100/150 (Grid 0.2S) & Elite 500 Modbus RS485',
      icon: <Cpu className="w-5 h-5 text-emerald-400" />,
      color: 'border-emerald-500/30 hover:border-emerald-400 bg-emerald-950/30',
      tag: 'Class 0.2S / RS485',
    },
    {
      name: 'Current Transformers',
      category: 'Current transformers',
      subtitle: 'Cast Resin CTs (3.3-11kV) & Outdoor Oil-Cooled (up to 33kV)',
      icon: <Zap className="w-5 h-5 text-purple-400" />,
      color: 'border-purple-500/30 hover:border-purple-400 bg-purple-950/30',
      tag: 'IS 2705 / Dual Core',
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-[#070f1e] via-[#0b1a33] to-[#0d2040] text-white pt-12 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
      {/* Background ambient decorative grid */}
      <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:36px_36px]"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main top hero grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs sm:text-sm font-medium text-slate-200">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              <span className="text-amber-400 font-bold">Faridabad Supply Hub</span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-200">Delhi-NCR & Pan-India Dispatch</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15] font-heading">
              Wholesale Supplier of{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-200">
                Energy Meters
              </span>{' '}
              & Commercial{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                LED Lighting
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              Shivam Prime Enterprises (<strong>Sprime Tech</strong>) supplies state-discom-approved
              Secure, L&amp;T, and HPL static energy meters, ABT grid meters, CTs, and
              industrial Halonix roadway luminaires to electrical contractors, builders, and OEMs.
            </p>

            {/* Key trust checklist */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Genuine OEM Stock</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>IS 13779 / 14697 / 2705</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>18% GST Input Credit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>NABL Test Reports</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Same-Day NCR Vehicle</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Tiered Wholesale Rates</span>
              </div>
            </div>

            {/* Call to actions */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <a
                href="#products"
                onClick={() => onSelectCategory('all')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-95"
              >
                <span>View 14 Products Catalog</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </a>

              <button
                onClick={onOpenBoq}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-all active:scale-95"
              >
                <FileSpreadsheet className="w-4 h-4 text-amber-400" />
                <span>Build Project BOQ</span>
              </button>

              <button
                onClick={onOpenCalculator}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl font-medium text-xs sm:text-sm text-cyan-300 hover:text-white hover:bg-cyan-500/10 border border-cyan-500/30 transition-all active:scale-95"
              >
                <Calculator className="w-4 h-4 text-cyan-400" />
                <span>LED ROI Calc</span>
              </button>
            </div>
          </div>

          {/* Right Hero Feature Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-white/10 to-white/5 p-5 sm:p-6 border border-white/15 shadow-2xl backdrop-blur-xl space-y-5">
              {/* Official Brand Logo Banner */}
              <div className="rounded-xl overflow-hidden border border-white/20 shadow-lg bg-slate-950 aspect-16/9 relative group">
                <img
                  src={COMPANY_INFO.logoUrl}
                  alt="Sprime Tech - Innovate | Connect | Evolve"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-2.5 right-2.5 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] text-amber-300 font-bold border border-white/15 shadow-md flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Official Stockist</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="text-xs uppercase font-extrabold tracking-wider text-amber-400">
                    Direct Wholesale Supply
                  </span>
                  <h3 className="text-lg font-bold font-heading text-white">
                    Shivam Prime Enterprises
                  </h3>
                  <p className="text-[11px] text-cyan-300 font-bold tracking-wider uppercase mt-0.5">
                    {COMPANY_INFO.motto}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4 text-blue-300" />
                </div>
              </div>

              {/* Quick Specs highlights */}
              <div className="space-y-3.5 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 flex items-start justify-between gap-3">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Primary Categories</span>
                    <strong className="text-white text-sm">Static Energy Meters &amp; LED Lighting</strong>
                  </div>
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-sm font-semibold">
                    In Stock
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 flex items-start justify-between gap-3">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Major OEM Brands</span>
                    <strong className="text-slate-200">Secure, L&amp;T, HPL, Halonix, Havells</strong>
                  </div>
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 flex items-start justify-between gap-3">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Registered Godown</span>
                    <span className="text-slate-300 text-xs">
                      108 Titu Enclave, Dheeraj Nagar, 44 Foot Rd, Faridabad - 121003
                    </span>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp RFQ button inside card */}
              <a
                href="https://wa.me/918130669395?text=Hello%20Sprime%20Tech,%20I%20need%20a%20wholesale%20quotation%20for%20project%20supply."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md active:scale-95"
              >
                <span>Direct WhatsApp Inquiries (+91 81306 69395)</span>
              </a>
            </div>
          </div>
        </div>

        {/* 4 Interactive Category Quick-Nav Cards */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="text-xs uppercase font-extrabold tracking-widest text-slate-400 mb-4 flex items-center gap-2">
            <span>Browse By Core Product Segment:</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickCategories.map((item) => (
              <a
                key={item.name}
                href="#products"
                onClick={() => onSelectCategory(item.category)}
                className={`group p-4 rounded-xl border ${item.color} backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                      {item.tag}
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-sm group-hover:text-amber-300 transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-slate-400 text-xs mt-1 leading-snug line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-slate-300 group-hover:text-white">
                  <span>View Products</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
