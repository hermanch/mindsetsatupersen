import React from 'react';
import { Wallet, PiggyBank, ShieldAlert, TrendingUp, Sparkles, Target, Compass } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      icon: <Wallet className="w-6 h-6 text-[#FF2B2B]" />,
      title: "Mengatur Gaji",
      description: "Belajar mengalokasikan penghasilan dengan rumus 50/30/20 agar kebutuhan terpenuhi tanpa kehabisan uang di tengah bulan."
    },
    {
      icon: <PiggyBank className="w-6 h-6 text-[#FF2B2B]" />,
      title: "Tips Menabung",
      description: "Membangun dana darurat secara konsisten walau dari nominal kecil, sebagai benteng utama pertahanan finansial kamu."
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-[#FF2B2B]" />,
      title: "Strategi Bebas Hutang",
      description: "Panduan praktis melunasi hutang konsumtif dan pinjol dengan metode terstruktur seperti Snowball dan Avalanche."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-[#FF2B2B]" />,
      title: "Investasi Pemula",
      description: "Mengenal instrumen investasi risiko terukur seperti Reksa Dana, Emas, dan Saham untuk menjaga nilai aset dari inflasi."
    }
  ];

  return (
    <section id="tentang" className="py-16 md:py-24 bg-white relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 text-[#FF2B2B] font-bold text-xs uppercase tracking-wider border border-red-100">
            <Sparkles className="w-3.5 h-3.5" />
            Tentang Mindset Satu Persen
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Edukasi Keuangan Sederhana untuk Semua Orang
          </h2>
        </div>

        {/* Highlight Description Box */}
        <div className="mt-10 max-w-4xl mx-auto bg-gradient-to-r from-red-50 via-white to-red-50 p-6 sm:p-10 rounded-3xl border border-red-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-100/50 rounded-full blur-2xl pointer-events-none" />
          
          <p className="text-lg sm:text-xl md:text-2xl text-slate-800 font-medium leading-relaxed text-center">
            "Selamat datang di <span className="font-bold text-[#FF2B2B] font-display">Mindset Satu Persen 🌱</span>. Kami membahas edukasi keuangan dan ekonomi dengan cara sederhana. Mulai dari cara mengatur gaji, tips menabung, strategi keluar dari hutang, hingga investasi pemula."
          </p>

          <div className="mt-6 pt-6 border-t border-red-200/60 flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-full bg-[#FF2B2B] text-white flex items-center justify-center shrink-0 shadow-md">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Misi Utama Kami</span>
              <p className="text-base sm:text-lg font-bold text-slate-900">
                Tujuan kami: membantu kamu membangun mindset finansial sehat dan perlahan menuju kebebasan finansial.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Pillars Cards Grid */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50 hover:bg-white p-6 rounded-2xl border border-slate-200 hover:border-red-200 shadow-2xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-red-100/80 group-hover:bg-[#FF2B2B] group-hover:text-white transition-colors flex items-center justify-center mb-5">
                  {React.cloneElement(item.icon, {
                    className: "w-6 h-6 text-[#FF2B2B] group-hover:text-white transition-colors"
                  })}
                </div>
                <h3 className="text-xl font-display font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center text-xs font-bold text-[#FF2B2B] group-hover:translate-x-1 transition-transform">
                <span>Pelajari Topik Ini</span>
                <span className="ml-1">&rarr;</span>
              </div>
            </div>
          ))}
        </div>

        {/* The 1% Rule Concept Banner */}
        <div className="mt-12 bg-slate-900 text-white rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#FF2B2B] flex items-center justify-center md:justify-start gap-2">
              <Compass className="w-4 h-4" />
              Filosofi Mindset 1%
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              Tidak Perlu Luar Biasa Dalam Sehari. Cukup 1% Lebih Baik Setiap Hari.
            </h3>
            <p className="text-slate-300 text-sm max-w-2xl">
              Perubahan finansial yang bertahan lama terjadi lewat kebiasaan kecil yang dilakukan secara konsisten, bukan hasil spektakuler yang sekejap musnah.
            </p>
          </div>
          <a
            href="#kalkulator"
            className="shrink-0 bg-[#FF2B2B] hover:bg-[#D91D1D] text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all text-center"
          >
            Coba Kalkulator Finansial
          </a>
        </div>

      </div>
    </section>
  );
};
