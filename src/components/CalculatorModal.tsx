import React, { useState, useMemo } from 'react';
import {
  X,
  Calculator,
  Lightbulb,
  Zap,
  TrendingDown,
  Leaf,
  IndianRupee,
  CheckCircle2,
  FilePlus2,
  ArrowRight,
} from 'lucide-react';
import { Product } from '../types';

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddToBoq: (product: Product, quantity: number) => void;
}

export const CalculatorModal: React.FC<CalculatorModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddToBoq,
}) => {
  const [activeTab, setActiveTab] = useState<'led' | 'ct'>('led');

  // LED Calc State
  const [fixturePreset, setFixturePreset] = useState<'hpsv150' | 'hpsv250' | 'mh400' | 'tube72'>('hpsv150');
  const [conventionalWattage, setConventionalWattage] = useState(150);
  const [ledWattage, setLedWattage] = useState(50);
  const [fixtureCount, setFixtureCount] = useState(20);
  const [hoursPerDay, setHoursPerDay] = useState(12);
  const [tariffRate, setTariffRate] = useState(8.5);

  // CT Calc State
  const [transformerKva, setTransformerKva] = useState<number>(500);
  const [voltageLevel, setVoltageLevel] = useState<11000 | 415>(11000);

  if (!isOpen) return null;

  // Handler for LED presets
  const handlePresetChange = (preset: 'hpsv150' | 'hpsv250' | 'mh400' | 'tube72') => {
    setFixturePreset(preset);
    if (preset === 'hpsv150') {
      setConventionalWattage(150);
      setLedWattage(50);
    } else if (preset === 'hpsv250') {
      setConventionalWattage(250);
      setLedWattage(90);
    } else if (preset === 'mh400') {
      setConventionalWattage(400);
      setLedWattage(150);
    } else if (preset === 'tube72') {
      setConventionalWattage(72);
      setLedWattage(36);
    }
  };

  // LED Savings Calculations
  const conventionalKw = (conventionalWattage * fixtureCount) / 1000;
  const ledKw = (ledWattage * fixtureCount) / 1000;
  const kwSaved = conventionalKw - ledKw;
  const percentSaved = Math.round((kwSaved / conventionalKw) * 100);

  const dailyKwhSaved = kwSaved * hoursPerDay;
  const monthlyKwhSaved = dailyKwhSaved * 30;
  const annualKwhSaved = dailyKwhSaved * 365;

  const monthlyRupeesSaved = Math.round(monthlyKwhSaved * tariffRate);
  const annualRupeesSaved = Math.round(annualKwhSaved * tariffRate);
  const annualCo2SavedKg = Math.round(annualKwhSaved * 0.82); // 0.82 kg CO2 per kWh grid avg in India

  // CT Sizing Calculations
  // I = (kVA * 1000) / (sqrt(3) * V)
  const fullLoadCurrent = useMemo(() => {
    const denom = Math.sqrt(3) * voltageLevel;
    const current = (transformerKva * 1000) / denom;
    return parseFloat(current.toFixed(2));
  }, [transformerKva, voltageLevel]);

  // Standard CT secondary is 5A. Recommending primary rating
  const recommendedPrimaryCt = useMemo(() => {
    const standardRatings = [
      10, 15, 20, 25, 30, 40, 50, 75, 100, 150, 200, 250, 300, 400, 500, 600,
      800, 1000, 1200, 1600, 2000, 2500, 3000,
    ];
    // Next standard size at least 1.1x full load
    const target = fullLoadCurrent * 1.1;
    const matched = standardRatings.find((r) => r >= target);
    return matched || standardRatings[standardRatings.length - 1];
  }, [fullLoadCurrent]);

  // Find matching product to quickly add to BOQ
  const recommendedLedProduct =
    products.find((p) => p.category === 'LED lighting' && p.id === 'p2') || products[0];
  const recommendedCtProduct =
    voltageLevel === 11000
      ? products.find((p) => p.id === 'p13') || products[12]
      : products.find((p) => p.id === 'p14') || products[13];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0b1a33] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/30">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                Electrical Engineering Calculators
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Commercial LED ROI, monthly ₹ power savings &amp; CT ratio selection helper
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

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('led')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'led'
                ? 'border-amber-500 text-amber-700 bg-white rounded-t-xl'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>Commercial LED Energy Savings &amp; ROI</span>
          </button>

          <button
            onClick={() => setActiveTab('ct')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'ct'
                ? 'border-blue-600 text-[#1677c9] bg-white rounded-t-xl'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Zap className="w-4 h-4 text-[#1677c9]" />
            <span>Transformer &amp; CT Ratio Sizing</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto">
          {activeTab === 'led' ? (
            <div className="space-y-6">
              {/* Presets */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">
                  1. Select Common Replacement Scenario:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    {
                      id: 'hpsv150',
                      label: '150W Street Light',
                      sub: 'Replace with 50W LED',
                    },
                    {
                      id: 'hpsv250',
                      label: '250W HPSV Highway',
                      sub: 'Replace with 90W LED',
                    },
                    {
                      id: 'mh400',
                      label: '400W High Mast Flood',
                      sub: 'Replace with 150W LED',
                    },
                    {
                      id: 'tube72',
                      label: '2x36W Panel / Grid',
                      sub: 'Replace with 36W LED',
                    },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handlePresetChange(p.id as any)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all ${
                        fixturePreset === p.id
                          ? 'border-amber-500 bg-amber-50 text-amber-950 font-bold shadow-xs'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <strong className="block text-xs">{p.label}</strong>
                      <span className="text-[10px] text-slate-500 block mt-0.5">{p.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sliders Input Grid */}
              <div className="grid sm:grid-cols-2 gap-5 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
                {/* Conventional vs LED Wattage */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-700">Existing Fixture Wattage:</span>
                    <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                      {conventionalWattage} W
                    </span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="500"
                    step="10"
                    value={conventionalWattage}
                    onChange={(e) => setConventionalWattage(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />

                  <div className="flex justify-between items-center text-xs pt-1">
                    <span className="font-semibold text-slate-700">Halonix LED Replacement:</span>
                    <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {ledWattage} W
                    </span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="200"
                    step="5"
                    value={ledWattage}
                    onChange={(e) => setLedWattage(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>

                {/* Fixtures & Operating hours */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-700">Total Quantity of Fixtures:</span>
                    <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                      {fixtureCount} units
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="200"
                    value={fixtureCount}
                    onChange={(e) => setFixtureCount(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <span className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Hours / Day:
                      </span>
                      <input
                        type="number"
                        min="1"
                        max="24"
                        value={hoursPerDay}
                        onChange={(e) => setHoursPerDay(Math.min(24, Math.max(1, Number(e.target.value))))}
                        className="w-full p-1.5 text-xs font-bold text-center border border-slate-200 rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <span className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Tariff (₹ / kWh):
                      </span>
                      <input
                        type="number"
                        min="4"
                        max="18"
                        step="0.5"
                        value={tariffRate}
                        onChange={(e) => setTariffRate(Math.max(1, Number(e.target.value)))}
                        className="w-full p-1.5 text-xs font-bold text-center border border-slate-200 rounded-lg bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Real-time Calculation Result Cards */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-3">
                  Projected Energy &amp; Cost Savings:
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
                    <div className="flex items-center gap-1.5 text-emerald-800 text-xs font-bold">
                      <IndianRupee className="w-4 h-4" />
                      <span>Monthly Savings</span>
                    </div>
                    <span className="text-xl sm:text-2xl font-black text-emerald-950 font-heading block mt-2">
                      ₹{monthlyRupeesSaved.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-emerald-700 block mt-0.5">
                      Direct bill reduction
                    </span>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200">
                    <div className="flex items-center gap-1.5 text-blue-800 text-xs font-bold">
                      <TrendingDown className="w-4 h-4" />
                      <span>Annual Savings</span>
                    </div>
                    <span className="text-xl sm:text-2xl font-black text-blue-950 font-heading block mt-2">
                      ₹{annualRupeesSaved.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-blue-700 block mt-0.5">
                      Every year recurring
                    </span>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
                    <div className="flex items-center gap-1.5 text-amber-800 text-xs font-bold">
                      <Zap className="w-4 h-4" />
                      <span>Power Reduction</span>
                    </div>
                    <span className="text-xl sm:text-2xl font-black text-amber-950 font-heading block mt-2">
                      {percentSaved}% <span className="text-xs font-bold">({kwSaved.toFixed(1)} kW)</span>
                    </span>
                    <span className="text-[10px] text-amber-700 block mt-0.5">
                      Less load on transformer
                    </span>
                  </div>

                  <div className="bg-teal-50 p-4 rounded-2xl border border-teal-200">
                    <div className="flex items-center gap-1.5 text-teal-800 text-xs font-bold">
                      <Leaf className="w-4 h-4" />
                      <span>CO2 Avoided</span>
                    </div>
                    <span className="text-xl sm:text-2xl font-black text-teal-950 font-heading block mt-2">
                      {(annualCo2SavedKg / 1000).toFixed(1)} <span className="text-xs font-bold">Tons</span>
                    </span>
                    <span className="text-[10px] text-teal-700 block mt-0.5">
                      Green ESG compliance
                    </span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-4 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm font-heading text-white">
                    Ready to order Halonix {ledWattage}W LED Luminaires?
                  </h4>
                  <p className="text-xs text-slate-300">
                    Add {fixtureCount} fixtures to your BOQ cart for immediate wholesale dispatch from Faridabad.
                  </p>
                </div>

                <button
                  onClick={() => {
                    onAddToBoq(recommendedLedProduct, fixtureCount);
                    onClose();
                  }}
                  className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
                >
                  <FilePlus2 className="w-4 h-4" />
                  <span>Add {fixtureCount}x LEDs to BOQ</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* CT Sizing Helper */}
              <div className="grid sm:grid-cols-2 gap-5 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-2">
                    Transformer Capacity (kVA):
                  </label>
                  <select
                    value={transformerKva}
                    onChange={(e) => setTransformerKva(Number(e.target.value))}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-bold text-slate-800"
                  >
                    {[100, 160, 200, 250, 315, 400, 500, 630, 750, 1000, 1250, 1600, 2000, 2500].map(
                      (k) => (
                        <option key={k} value={k}>
                          {k} kVA Distribution Transformer
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-2">
                    Operating Primary Voltage:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setVoltageLevel(11000)}
                      className={`p-2.5 rounded-xl border text-xs font-bold text-center ${
                        voltageLevel === 11000
                          ? 'bg-[#0b1a33] text-white border-[#0b1a33]'
                          : 'bg-white border-slate-300 text-slate-700'
                      }`}
                    >
                      11 kV (HT Primary)
                    </button>
                    <button
                      onClick={() => setVoltageLevel(415)}
                      className={`p-2.5 rounded-xl border text-xs font-bold text-center ${
                        voltageLevel === 415
                          ? 'bg-[#0b1a33] text-white border-[#0b1a33]'
                          : 'bg-white border-slate-300 text-slate-700'
                      }`}
                    >
                      415 V (LT Secondary)
                    </button>
                  </div>
                </div>
              </div>

              {/* CT Sizing Results */}
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
                    Full Load Primary Current
                  </span>
                  <span className="text-2xl font-black text-slate-900 font-heading block mt-2">
                    {fullLoadCurrent} A
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1">
                    Calculated for {transformerKva} kVA @ {voltageLevel} V
                  </span>
                </div>

                <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200">
                  <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wide block">
                    Recommended CT Ratio
                  </span>
                  <span className="text-2xl font-black text-[#1677c9] font-heading block mt-2">
                    {recommendedPrimaryCt} / 5 A
                  </span>
                  <span className="text-[10px] text-blue-700 block mt-1">
                    Secondary: 5A (or 1A for long lead runs)
                  </span>
                </div>

                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
                  <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide block">
                    Recommended Class &amp; Burden
                  </span>
                  <span className="text-lg font-bold text-emerald-950 font-heading block mt-2">
                    Class 0.5 (15 VA)
                  </span>
                  <span className="text-[10px] text-emerald-700 block mt-1">
                    Class 0.2S for ABT / Tariff billing
                  </span>
                </div>
              </div>

              {/* Sizing Recommendations Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-700">
                <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Technical Recommendations for {transformerKva} kVA Installation:</span>
                </h4>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  <li>
                    For HT Metering (11 kV): Use <strong>Cast Resin CT (11 kV grade)</strong> with
                    dual core (Core 1: Class 0.5 Revenue Metering, Core 2: 5P10 Protection).
                  </li>
                  <li>
                    For Substation Yard (33 kV): Use <strong>Outdoor Oil-Cooled CT</strong> with
                    hermetic sealing and nitrogen cushion.
                  </li>
                  <li>
                    Connect with <strong>Secure Elite 500</strong> or <strong>Sprint 350</strong> for
                    live kW/kVA/kVARh logging via RS485.
                  </li>
                </ul>
              </div>

              {/* CT Action */}
              <div className="p-4 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm font-heading text-white">
                    Order Recommended {voltageLevel === 11000 ? '11 kV' : 'LT'} Current Transformer
                  </h4>
                  <p className="text-xs text-slate-300">
                    Ready stock tested as per IS 2705 with NABL test certificates.
                  </p>
                </div>

                <button
                  onClick={() => {
                    onAddToBoq(recommendedCtProduct, 3); // set of 3 for 3-phase
                    onClose();
                  }}
                  className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 bg-[#1677c9] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
                >
                  <FilePlus2 className="w-4 h-4 text-amber-400" />
                  <span>Add Set of 3 CTs to BOQ</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl"
          >
            Close Calculator
          </button>
        </div>
      </div>
    </div>
  );
};
