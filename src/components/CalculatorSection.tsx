import React, { useState } from 'react';
import { Calculator, DollarSign, PiggyBank, ShieldCheck, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

export const CalculatorSection: React.FC = () => {
  const [income, setIncome] = useState<number>(5000000);
  const [emergencyTargetMonths, setEmergencyTargetMonths] = useState<number>(6);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const needs = income * 0.5;
  const wants = income * 0.3;
  const savings = income * 0.2;
  const emergencyFundTarget = needs * emergencyTargetMonths;
  const monthsToEmergencyGoal = savings > 0 ? Math.ceil(emergencyFundTarget / savings) : 0;
  const yearlySavingsPotential = savings * 12;

  return (
    <section id="kalkulator" className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 text-[#FF2B2B] font-bold text-xs uppercase tracking-wider border border-red-100">
            <Calculator className="w-4 h-4" />
            Interaktif Tool Gratis
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Kalkulator Alokasi Gaji & Dana Darurat
          </h2>
          <p className="text-slate-600 text-base">
            Hitung pembagian gaji ideal dengan rumus 50/30/20 dan estimasi waktu membentuk dana darurat pertama kamu.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-800 grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Inputs Column */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-display font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Sparkles className="w-5 h-5 text-[#FF2B2B]" />
              Input Gaji Bulanan Kamu
            </h3>

            {/* Income Slider & Input */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Penghasilan / Gaji Bersih Bulanan (Rp)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">
                  Rp
                </span>
                <input
                  type="number"
                  step="500000"
                  min="1000000"
                  max="50000000"
                  value={income}
                  onChange={(e) => setIncome(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-800 border border-slate-700 rounded-xl text-lg font-bold text-white focus:outline-hidden focus:ring-2 focus:ring-[#FF2B2B]"
                />
              </div>

              {/* Preset Income Buttons */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[3000000, 5000000, 8000000, 10000000].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setIncome(preset)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      income === preset
                        ? 'bg-[#FF2B2B] text-white font-bold'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {formatRupiah(preset).replace(',00', '')}
                  </button>
                ))}
              </div>
            </div>

            {/* Emergency Target Selector */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Target Dana Darurat
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { months: 3, label: '3 Bulan (Single)' },
                  { months: 6, label: '6 Bulan (Aman)' },
                  { months: 12, label: '12 Bulan (Menikah)' }
                ].map((item) => (
                  <button
                    key={item.months}
                    onClick={() => setEmergencyTargetMonths(item.months)}
                    className={`p-2.5 rounded-xl text-xs font-bold transition-all text-center border cursor-pointer ${
                      emergencyTargetMonths === item.months
                        ? 'bg-[#FF2B2B] text-white border-[#FF2B2B]'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Rule Tip */}
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 text-xs text-slate-300 space-y-1">
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> Prinsip Mindset Satu Persen:
              </span>
              <p>
                Sebelum mulai investasi saham atau aset berisiko, prioritaskan mengumpulkan Dana Darurat setidaknya 6x alokasi kebutuhan pokok.
              </p>
            </div>

          </div>

          {/* Right Results Column */}
          <div className="lg:col-span-7 bg-slate-800/60 rounded-2xl p-6 sm:p-8 border border-slate-700/80 space-y-6">
            <div className="flex justify-between items-center border-b border-slate-700 pb-4">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Hasil Alokasi Metode 50/30/20
                </span>
                <h4 className="text-2xl font-display font-extrabold text-white mt-1">
                  {formatRupiah(income)} <span className="text-xs text-slate-400 font-normal">/ bulan</span>
                </h4>
              </div>
              <div className="text-right">
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-1 rounded-full uppercase border border-emerald-500/30">
                  Status Finansial Sehat
                </span>
              </div>
            </div>

            {/* Allocation Breakdown Cards */}
            <div className="grid sm:grid-cols-3 gap-4">
              
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-700">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                  <span>50% Kebutuhan</span>
                  <span className="text-blue-400">Pokok</span>
                </div>
                <div className="text-lg font-bold text-white mt-2">
                  {formatRupiah(needs)}
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  Makan, kost/cicilan, listrik, transport
                </div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-700">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                  <span>30% Keinginan</span>
                  <span className="text-amber-400">Hiburan</span>
                </div>
                <div className="text-lg font-bold text-white mt-2">
                  {formatRupiah(wants)}
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  Jajan, belanja, langganan, hobi
                </div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-red-900/50 bg-red-950/20">
                <div className="flex items-center justify-between text-xs font-bold text-[#FF2B2B]">
                  <span>20% Tabungan</span>
                  <span className="text-[#FF2B2B]">Prioritas</span>
                </div>
                <div className="text-lg font-bold text-white mt-2">
                  {formatRupiah(savings)}
                </div>
                <div className="text-[10px] text-slate-300 mt-1">
                  Dana darurat & investasi masa depan
                </div>
              </div>

            </div>

            {/* Target Emergency Fund Summary */}
            <div className="bg-gradient-to-br from-red-950/40 via-slate-900 to-slate-900 p-5 rounded-2xl border border-red-900/50 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs text-red-300 font-bold uppercase tracking-wider">
                    Target Dana Darurat ({emergencyTargetMonths} Bulan Kebutuhan)
                  </div>
                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
                    {formatRupiah(emergencyFundTarget)}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#FF2B2B] text-white flex items-center justify-center shrink-0 shadow-md">
                  <PiggyBank className="w-5 h-5" />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400">Estimasi Waktu Terkumpul:</span>
                  <div className="text-sm font-bold text-emerald-400 mt-0.5">
                    ~ {monthsToEmergencyGoal} Bulan ({Math.ceil(monthsToEmergencyGoal / 12)} Tahun)
                  </div>
                </div>
                <div>
                  <span className="text-slate-400">Potensi Tabungan 1 Tahun:</span>
                  <div className="text-sm font-bold text-white mt-0.5">
                    {formatRupiah(yearlySavingsPotential)}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA to Premium Course */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <p className="text-xs text-slate-400 text-center sm:text-left">
                Ingin template spreadsheet keuangan lengkap siap pakai?
              </p>
              <a
                href="#premium"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF2B2B] hover:bg-[#D91D1D] text-white rounded-xl text-xs font-bold transition-all shadow-md shrink-0"
              >
                Dapatkan Template di Premium Course
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
