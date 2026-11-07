import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/company';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1677c9] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Procurement &amp; Supply Answers</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Everything electrical contractors, EPC builders, and OEMs need to know about
            ordering from Shivam Prime Enterprises.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {COMPANY_INFO.faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-slate-200 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-4 sm:p-5 text-left bg-slate-50/70 hover:bg-slate-100/80 flex items-center justify-between gap-4 transition-colors"
                >
                  <span className="font-bold text-slate-900 text-sm sm:text-base font-heading">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#1677c9]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="p-4 sm:p-5 bg-white text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
          <h3 className="font-bold text-slate-900 text-sm sm:text-base font-heading">
            Have a custom tender specification or need an urgent quote?
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Our technical sales team is available on WhatsApp and call Monday through Saturday to
            review your bill of materials.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="px-4 py-2 bg-[#0b1a33] text-white text-xs font-bold rounded-xl hover:bg-[#12284b] transition-all"
            >
              Call {COMPANY_INFO.phoneDisplay}
            </a>
            <a
              href="https://wa.me/918130669395?text=Hello%20Sprime%20Tech,%20I%20have%20a%20technical%20question%20regarding%20meters%20and%20lighting."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-500 transition-all"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
