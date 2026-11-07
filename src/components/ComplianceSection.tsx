import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/company';
import { ShieldCheck, Copy, Check, CheckCircle2, FileCheck2 } from 'lucide-react';

export const ComplianceSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyGstin = () => {
    navigator.clipboard.writeText(COMPANY_INFO.gstin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="compliance" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Bureau of Indian Standards &amp; Grid Testing</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Tested to National Standards &amp; Tax Compliant
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Every energy meter, current transformer, and LED luminaire supplied by Shivam Prime
            Enterprises complies with mandatory BIS safety guidelines and state discom protocols.
          </p>
        </div>

        {/* 2-Column Grid: Certifications List & GSTIN Card */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left: Certifications Grid */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {COMPANY_INFO.certifications.map((cert) => (
              <div
                key={cert.code}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-shadow flex items-start gap-3.5"
              >
                <div className="p-2.5 rounded-xl bg-blue-50 text-[#1677c9] shrink-0 border border-blue-100">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono font-bold text-xs text-[#1677c9] bg-blue-50 px-2 py-0.5 rounded-md inline-block mb-1">
                    {cert.code}
                  </span>
                  <h4 className="font-bold text-slate-900 text-xs leading-snug">
                    {cert.title}
                  </h4>
                  <div className="flex items-center gap-1 mt-2 text-[11px] text-emerald-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>NABL Verified</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: GSTIN Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0b1a33] to-[#12284b] text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider">
                  Verified Legal Entity
                </span>
                <h3 className="text-xl font-bold font-heading text-white">
                  Shivam Prime Enterprises
                </h3>
                <span className="text-xs text-slate-300">Trade Name: Sprime Tech</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
            </div>

            {/* GSTIN Box with Copy */}
            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-2">
              <span className="text-xs text-slate-300 font-medium block">
                Goods and Services Tax Identification Number (GSTIN):
              </span>
              <div className="flex items-center justify-between gap-3 bg-black/30 p-2.5 rounded-xl border border-white/10">
                <span className="font-mono text-base sm:text-lg font-black tracking-wider text-amber-300">
                  {COMPANY_INFO.gstin}
                </span>
                <button
                  onClick={handleCopyGstin}
                  className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-xs font-bold transition-colors flex items-center gap-1.5 text-white"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <span className="text-[11px] text-emerald-400 font-semibold block">
                ● Active Registration (State: Haryana, Code 06)
              </span>
            </div>

            {/* HSN Directory */}
            <div className="space-y-2 text-xs">
              <span className="text-slate-300 font-bold uppercase tracking-wider block text-[11px]">
                HSN Tax Codes &amp; GST Rates:
              </span>
              <div className="space-y-1.5 bg-white/5 p-3 rounded-xl border border-white/10 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-300">• HSN 9028 (Energy &amp; Smart Meters):</span>
                  <span className="font-bold text-amber-300">18% GST (Eligible for ITC)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">• HSN 9405 (LED Street &amp; Flood Lights):</span>
                  <span className="font-bold text-amber-300">18% GST (Eligible for ITC)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">• HSN 8504 (Current Transformers / CTs):</span>
                  <span className="font-bold text-amber-300">18% GST (Eligible for ITC)</span>
                </div>
              </div>
            </div>

            {/* Registered address reminder */}
            <div className="text-[11px] text-slate-300 pt-2 border-t border-white/10">
              <strong className="text-white">Registered Address:</strong> {COMPANY_INFO.address}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
