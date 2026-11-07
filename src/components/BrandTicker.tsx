import React from 'react';
import { COMPANY_INFO } from '../data/company';
import { Package, Clock, Users, Receipt } from 'lucide-react';

export const BrandTicker: React.FC = () => {
  const statIcons = [
    <Package className="w-5 h-5 text-amber-500" key="pkg" />,
    <Clock className="w-5 h-5 text-blue-500" key="clk" />,
    <Users className="w-5 h-5 text-emerald-500" key="usr" />,
    <Receipt className="w-5 h-5 text-purple-500" key="rcp" />,
  ];

  return (
    <section id="brands" className="bg-slate-100/80 border-b border-slate-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Metric stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {COMPANY_INFO.stats.map((stat, idx) => (
            <div
              key={stat.label}
              className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex items-center gap-3.5 hover:shadow-md transition-shadow"
            >
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 shrink-0">
                {statIcons[idx]}
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-slate-900 font-heading block leading-none">
                  {stat.value}
                </span>
                <span className="text-xs font-bold text-slate-700 block mt-1">
                  {stat.label}
                </span>
                <span className="text-[11px] text-slate-500 hidden sm:block">
                  {stat.subtext}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Brand marquee */}
        <div>
          <div className="text-center mb-4">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
              Authorized Stockist &amp; Project Distribution Channels
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            {COMPANY_INFO.brands.map((b) => (
              <div
                key={b.name}
                className="px-4 py-2.5 bg-white rounded-xl border border-slate-200/80 shadow-2xs hover:border-[#1677c9] hover:shadow-sm transition-all text-center flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-[#1677c9]"></span>
                <div>
                  <span className="text-xs sm:text-sm font-extrabold text-slate-800 tracking-wide font-heading block">
                    {b.name}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium block">
                    {b.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
