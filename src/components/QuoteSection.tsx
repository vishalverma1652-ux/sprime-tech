import React, { useState } from 'react';
import {
  MessageSquare,
  Mail,
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { ProductCategory } from '../types';

interface QuoteSectionProps {
  initialCategory?: ProductCategory | 'all';
  initialRequirement?: string;
}

export const QuoteSection: React.FC<QuoteSectionProps> = ({
  initialCategory = 'all',
  initialRequirement = '',
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [category, setCategory] = useState<string>(
    initialCategory !== 'all' ? initialCategory : 'LED lighting'
  );
  const [quantity, setQuantity] = useState('20');
  const [urgency, setUrgency] = useState('immediate');
  const [requirement, setRequirement] = useState(initialRequirement);
  const [submitted, setSubmitted] = useState(false);

  // Sync if initialRequirement changes from outside
  React.useEffect(() => {
    if (initialRequirement) {
      setRequirement(initialRequirement);
    }
    if (initialCategory && initialCategory !== 'all') {
      setCategory(initialCategory);
    }
  }, [initialRequirement, initialCategory]);

  const generateRfqMessage = () => {
    let msg = `*SPRIME TECH - WHOLESALE QUOTATION REQUEST*\n`;
    msg += `------------------------------------\n`;
    msg += `*Name / Firm:* ${name || 'Prospective Buyer'}\n`;
    msg += `*Contact Phone:* ${phone || 'Not provided'}\n`;
    msg += `*Delivery City:* ${city || 'Delhi-NCR'}\n`;
    msg += `*Category:* ${category}\n`;
    msg += `*Estimated Quantity:* ${quantity} units\n`;
    msg += `*Urgency:* ${
      urgency === 'immediate'
        ? 'Immediate Dispatch Required (<24 hrs)'
        : urgency === 'week'
        ? 'Within 7 Days'
        : 'Project / Tender BOQ'
    }\n\n`;
    msg += `*Specific Requirements:*\n${
      requirement || 'Please share product catalog and wholesale rate sheet.'
    }\n`;
    msg += `------------------------------------\n`;
    msg += `Generated from Sprime Tech website.`;
    return msg;
  };

  const handleSendWhatsapp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone && !name) {
      alert('Please enter your name/firm and contact number.');
      return;
    }
    const url = `${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent(
      generateRfqMessage()
    )}`;
    window.open(url, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Quotation Request - ${name || 'Buyer'} - ${category}`
    );
    const body = encodeURIComponent(generateRfqMessage());
    window.location.href = `mailto:${COMPANY_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <span>Fast Wholesale Turnaround</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Request Formal Wholesale Quotation
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Tell us your project bill of materials. We dispatch official quotations with GST input
            tax breakdown within 30 minutes during business hours.
          </p>
        </div>

        {/* 2-Column Layout: Form & Office Card */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold font-heading text-slate-900">
                Direct Project RFQ Form
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Fill the details below to dispatch instantly via WhatsApp or Email.
              </p>
            </div>

            <form onSubmit={handleSendWhatsapp} className="space-y-4 text-xs sm:text-sm">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Your Name / Firm Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sharma Electricals / Acme Infotech"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1677c9]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Phone / WhatsApp Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9811XXXXXX"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1677c9]"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Delivery City / Project Site
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Faridabad, Gurugram, Noida, Delhi"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1677c9]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Primary Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1677c9] font-medium"
                  >
                    <option value="LED lighting">Commercial LED Lighting (Halonix)</option>
                    <option value="Energy meters">Energy Meters (Secure / L&T / HPL)</option>
                    <option value="ABT & multifunction">ABT &amp; Multifunction Meters (Class 0.2S)</option>
                    <option value="Current transformers">Current Transformers (11kV / 33kV CTs)</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Estimated Quantity
                  </label>
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="e.g. 50 units, 200 units"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1677c9]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Delivery Urgency
                  </label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1677c9] font-medium"
                  >
                    <option value="immediate">Immediate Dispatch (within 24 Hours)</option>
                    <option value="week">Within 7 Days</option>
                    <option value="tender">Upcoming Project / Tender BOQ</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Product Names, Wattages or Technical Specifications
                </label>
                <textarea
                  rows={4}
                  value={requirement}
                  onChange={(e) => setRequirement(e.target.value)}
                  placeholder="e.g. Require 50x Halonix 50W Ceramic Street Lights, 20x Secure Saral 10-60A Single Phase Meters, and 3x 11kV Cast Resin CTs."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1677c9] leading-relaxed"
                ></textarea>
              </div>

              {submitted && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-2 text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>WhatsApp inquiry opened. Our sales team will respond shortly.</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all active:scale-95"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Send via WhatsApp (+91 81306 69395)</span>
                </button>

                <button
                  type="button"
                  onClick={handleSendEmail}
                  className="inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-semibold text-xs sm:text-sm bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-all active:scale-95"
                >
                  <Mail className="w-4 h-4 text-slate-600" />
                  <span>Send Email</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right: Office & Godown Contact Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600">
                  Registered Office &amp; Godown
                </span>
                <h3 className="text-xl font-bold font-heading text-slate-900 mt-0.5">
                  Shivam Prime Enterprises
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Trade Name: Sprime Tech • Established wholesale electrical supplier
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-blue-50 text-[#1677c9] shrink-0 border border-blue-100">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-semibold">Warehouse &amp; Dispatch Address:</strong>
                    <span className="text-slate-600 leading-relaxed block mt-0.5">
                      {COMPANY_INFO.address}
                    </span>
                    <a
                      href={COMPANY_INFO.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#1677c9] font-bold hover:underline mt-1.5"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-amber-50 text-amber-600 shrink-0 border border-amber-100">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-semibold">Direct Wholesale Hotline:</strong>
                    <a
                      href={`tel:${COMPANY_INFO.phone}`}
                      className="text-slate-800 font-bold block hover:text-[#1677c9] mt-0.5"
                    >
                      {COMPANY_INFO.phoneDisplay}
                    </a>
                    <span className="text-[11px] text-slate-500 block">
                      WhatsApp available 24/7 on this number
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-purple-50 text-purple-600 shrink-0 border border-purple-100">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-semibold">Official Business Email:</strong>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="text-slate-800 font-semibold block hover:text-[#1677c9] mt-0.5"
                    >
                      {COMPANY_INFO.email}
                    </a>
                    <span className="text-[11px] text-slate-500 block">
                      PO orders &amp; tender documents
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 shrink-0 border border-emerald-100">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-semibold">Working Hours:</strong>
                    <span className="text-slate-600 block mt-0.5">
                      {COMPANY_INFO.workingHours}
                    </span>
                  </div>
                </div>
              </div>

              {/* Verified Legal entity badge */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>GSTIN: <strong className="font-mono text-slate-800">{COMPANY_INFO.gstin}</strong></span>
                </div>
                <span className="text-[11px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
                  Verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
