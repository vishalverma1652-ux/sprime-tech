import React from 'react';
import { COMPANY_INFO } from '../data/company';
import {
  Factory,
  Building2,
  Home,
  Sun,
  Warehouse,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { ProductCategory } from '../types';

interface ApplicationsSectionProps {
  onSelectCategory: (cat: ProductCategory) => void;
}

export const ApplicationsSection: React.FC<ApplicationsSectionProps> = ({
  onSelectCategory,
}) => {
  const iconMap: Record<string, React.ReactNode> = {
    Road: <Zap className="w-5 h-5 text-amber-500" />,
    Factory: <Factory className="w-5 h-5 text-blue-500" />,
    Building2: <Building2 className="w-5 h-5 text-indigo-500" />,
    Home: <Home className="w-5 h-5 text-emerald-500" />,
    Sun: <Sun className="w-5 h-5 text-amber-500" />,
    Warehouse: <Warehouse className="w-5 h-5 text-purple-500" />,
  };

  const categoryMapping: Record<string, ProductCategory> = {
    Infrastructure: 'LED lighting',
    'Heavy Industry': 'Current transformers',
    Commercial: 'LED lighting',
    Residential: 'Energy meters',
    Renewables: 'ABT & multifunction',
    Logistics: 'LED lighting',
  };

  return (
    <section id="applications" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1677c9] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Proven In The Field</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Project Applications &amp; Installation Sectors
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            From smart city municipal lighting to heavy 33kV substation feeder metering, our
            products power mission-critical electrical infrastructure across North India.
          </p>
        </div>

        {/* Application Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMPANY_INFO.applications.map((app) => (
            <div
              key={app.title}
              className="p-6 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-[#1677c9]/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs group-hover:scale-110 transition-transform">
                    {iconMap[app.icon] || <Zap className="w-5 h-5 text-blue-500" />}
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 bg-slate-200/70 px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                    {app.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#1677c9] transition-colors font-heading mb-2">
                  {app.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {app.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center justify-between">
                <a
                  href="#products"
                  onClick={() => onSelectCategory(categoryMapping[app.category] || 'LED lighting')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1677c9] hover:text-[#0b1a33] transition-colors"
                >
                  <span>Explore Suitable Equipment</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
