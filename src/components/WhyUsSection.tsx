import React from 'react';
import {
  FileText,
  BadgePercent,
  CheckCheck,
  Truck,
  ShieldCheck,
  Headphones,
  Award,
  Zap,
} from 'lucide-react';

export const WhyUsSection: React.FC = () => {
  const workflowSteps = [
    {
      num: '01',
      title: 'Submit BOQ or Specs',
      desc: 'Use our online BOQ builder or message your line-item requirements via WhatsApp or email.',
      icon: <FileText className="w-6 h-6 text-amber-500" />,
    },
    {
      num: '02',
      title: 'Direct Wholesale Quote',
      desc: 'Receive competitive slab-discounted project pricing with confirmed dispatch lead times within 30 mins.',
      icon: <BadgePercent className="w-6 h-6 text-blue-500" />,
    },
    {
      num: '03',
      title: 'Testing & Verification',
      desc: 'Factory-sealed OEM products inspected with available NABL calibration test reports and discom approvals.',
      icon: <CheckCheck className="w-6 h-6 text-emerald-500" />,
    },
    {
      num: '04',
      title: 'Same-Day Dispatch',
      desc: 'Loaded from our Faridabad godown with full GST tax invoice and e-way bill for immediate site delivery.',
      icon: <Truck className="w-6 h-6 text-purple-500" />,
    },
  ];

  const perks = [
    {
      title: '100% Genuine OEM Factory Stock',
      desc: 'Direct distribution line with Secure, L&T, HPL, and Halonix ensures zero counterfeit risk and valid manufacturer warranty.',
      icon: <Award className="w-5 h-5 text-amber-600" />,
    },
    {
      title: 'Full 18% GST Input Credit (ITC)',
      desc: 'We are a fully registered tax entity. Every purchase is backed with authentic B2B tax invoice and GST e-Way bills.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
    },
    {
      title: 'Technical Sizing Guidance',
      desc: 'Our electrical engineers assist with CT primary ratio selection, voltage drop analysis, and lux calculations for outdoor projects.',
      icon: <Zap className="w-5 h-5 text-blue-600" />,
    },
    {
      title: 'Contractor Hotline Support',
      desc: 'Dedicated account manager for ongoing electrical contractors and real estate builders with expedited repeat orders.',
      icon: <Headphones className="w-5 h-5 text-purple-600" />,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <span>Seamless Project Procurement</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-heading">
            How Electrical Contractors Procure from Sprime Tech
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Simple, transparent 4-step procurement workflow designed to keep your project sites
            running on schedule with zero delivery delays.
          </p>
        </div>

        {/* 4-Step Workflow */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {workflowSteps.map((step) => (
            <div
              key={step.num}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 hover:bg-white/10 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-white/10 border border-white/15 group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                  <span className="font-mono text-2xl font-black text-slate-500 group-hover:text-amber-400 transition-colors">
                    {step.num}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2 font-heading">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  Guaranteed SLA
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Wholesale Perks Grid */}
        <div className="pt-10 border-t border-white/10">
          <div className="text-center mb-10">
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
              Why 450+ Electrical Contractors &amp; OEMs Choose Us
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((perk) => (
              <div
                key={perk.title}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5"
              >
                <div className="p-2.5 rounded-lg bg-white/10 w-fit">
                  {perk.icon}
                </div>
                <h4 className="font-bold text-sm text-white font-heading">
                  {perk.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {perk.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
