import React from 'react';
import { COMPANY_INFO } from '../data/company';
import { Zap, ShieldCheck, MapPin, Phone, Mail } from 'lucide-react';
import { ProductCategory } from '../types';

interface FooterProps {
  onSelectCategory: (cat: ProductCategory) => void;
  onOpenCalculator: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenCalculator,
}) => {
  return (
    <footer className="bg-[#070f1e] text-slate-400 text-xs sm:text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Company Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 aspect-16/10 rounded-xl overflow-hidden border border-slate-700/80 shadow-md bg-slate-900 flex items-center justify-center shrink-0">
                <img
                  src={COMPANY_INFO.logoUrl}
                  alt="Sprime Tech Logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-white font-heading">
                  SPRIME<span className="text-blue-400">TECH</span>
                </span>
                <p className="text-[11px] text-slate-400 font-medium">
                  Shivam Prime Enterprises • Faridabad, Haryana
                </p>
                <p className="text-[10px] font-bold text-cyan-400 tracking-wider uppercase mt-0.5">
                  Innovate • Connect • Evolve
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              Wholesale supplier &amp; stockist of BIS-certified Secure, L&amp;T, and HPL single &amp;
              three-phase static energy meters, ABT grid tariff meters, instrument current
              transformers, and industrial Halonix commercial LED luminaires.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-slate-300">
                GSTIN: <strong className="font-mono text-amber-300">{COMPANY_INFO.gstin}</strong>
              </span>
            </div>
          </div>

          {/* Quick Categories Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold font-heading text-sm uppercase tracking-wider">
              Product Catalog
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="#products"
                  onClick={() => onSelectCategory('Energy meters')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Single &amp; Three-Phase Energy Meters
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  onClick={() => onSelectCategory('LED lighting')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Halonix Commercial LED Street &amp; Flood Lights
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  onClick={() => onSelectCategory('ABT & multifunction')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Secure Apex ABT Grid &amp; Elite 500 Meters
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  onClick={() => onSelectCategory('Current transformers')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Cast Resin &amp; Oil-Cooled CTs (11kV / 33kV)
                </a>
              </li>
              <li className="pt-1">
                <button
                  onClick={onOpenCalculator}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  ⚡ LED Savings &amp; CT Sizing Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Warehouse & Dispatch Column */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-white font-bold font-heading text-sm uppercase tracking-wider">
              Warehouse &amp; Dispatch
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="hover:text-white font-bold text-slate-300"
                >
                  {COMPANY_INFO.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="hover:text-white"
                >
                  {COMPANY_INFO.email}
                </a>
              </div>
              <p className="text-[11px] text-slate-500 pt-1">
                Dispatches daily to Faridabad, Gurugram, Delhi, Noida, Greater Noida, and all
                industrial transport hubs.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} Shivam Prime Enterprises (Sprime Tech). All rights reserved.
          </p>
          <p className="text-center sm:text-right">
            All trademarks, logos (Secure, L&amp;T, HPL, Halonix) belong to their respective OEM owners.
          </p>
        </div>
      </div>
    </footer>
  );
};
