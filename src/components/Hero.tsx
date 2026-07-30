import React from 'react';
import { Play, ArrowRight, ShieldCheck, TrendingUp, Users, Youtube, CheckCircle2 } from 'lucide-react';
import { YOUTUBE_CHANNEL_URL, CHANNEL_STATS } from '../data/mockData';

interface HeroProps {
  onOpenVideoModal?: (videoUrl: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenVideoModal }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-red-50/30 to-slate-50 pt-8 pb-16 md:pt-16 md:pb-24 border-b border-slate-200">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial from-red-200/40 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Subheadline, CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/80 border border-red-200 text-[#FF2B2B] font-semibold text-xs tracking-wide uppercase">
              <span className="flex h-2 w-2 rounded-full bg-[#FF2B2B] animate-pulse" />
              Official YouTube Channel
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Membantu Kamu Membangun{' '}
              <span className="relative inline-block text-[#FF2B2B]">
                Mindset Finansial Sehat.
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-red-300/80 -z-10" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0 8 text-red-400 Q 50 0, 100 8" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-lg sm:text-xl text-slate-600 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Perlahan menuju kebebasan finansial melalui edukasi keuangan dan ekonomi yang sederhana dan mudah dipahami.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#topik"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-[#FF2B2B] hover:bg-[#D91D1D] rounded-xl shadow-lg hover:shadow-red-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                Mulai Belajar Gratis
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href={YOUTUBE_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 text-base font-bold text-slate-800 bg-white hover:bg-slate-100 rounded-xl border border-slate-300 shadow-xs hover:border-slate-400 transition-all cursor-pointer"
              >
                <Youtube className="w-5 h-5 text-[#FF2B2B] fill-[#FF2B2B]" />
                Kunjungi YouTube
              </a>
            </div>

            {/* Trust points */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-600 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Tanpa Istilah Rumit
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                100% Bebas Riba & Abal-Abal
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Metode Praktis & Teruji
              </div>
            </div>

            {/* Channel Stats Row */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl font-display font-extrabold text-slate-900">
                  {CHANNEL_STATS.totalViews}
                </div>
                <div className="text-xs text-slate-500 font-semibold uppercase">Total Ditonton</div>
              </div>
              <div className="text-center lg:text-left border-x border-slate-200 px-2">
                <div className="text-xl sm:text-2xl font-display font-extrabold text-[#FF2B2B]">
                  {CHANNEL_STATS.subscribers}
                </div>
                <div className="text-xs text-slate-500 font-semibold uppercase">Subscriber</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl font-display font-extrabold text-slate-900">
                  {CHANNEL_STATS.totalVideos}
                </div>
                <div className="text-xs text-slate-500 font-semibold uppercase">Video Edukasi</div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Youtube Preview Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Card Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#FF2B2B] to-rose-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>

              {/* Main Card */}
              <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden">
                
                {/* Header Banner */}
                <div className="bg-[#FF2B2B] text-white p-6 relative">
                  <div className="flex justify-between items-start">
                    <div className="bg-white/15 backdrop-blur-md px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-white">
                      Official YouTube Channel
                    </div>
                    <a
                      href={YOUTUBE_CHANNEL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-white bg-black/20 hover:bg-black/30 px-2.5 py-1 rounded-md transition-colors"
                    >
                      <span>@mindsetsatupersen05</span>
                    </a>
                  </div>

                  <div className="mt-6 flex items-center gap-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center p-2 text-center border-2 border-white">
                      <span className="font-display font-black text-[#FF2B2B] text-xs leading-none">MINDSET</span>
                      <span className="font-display font-black text-[#FF2B2B] text-xs leading-none">SATU</span>
                      <span className="font-display font-black text-[#FF2B2B] text-xs leading-none">PERSEN.</span>
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white leading-tight">
                        Mindset Satu Persen 🌱
                      </h3>
                      <p className="text-xs text-red-100 mt-1 font-medium">
                        Edukasi Keuangan & Ekonomi Sederhana
                      </p>
                    </div>
                  </div>
                </div>

                {/* Video Preview Box */}
                <div className="p-5 space-y-4 bg-slate-50">
                  <div className="relative rounded-xl overflow-hidden group aspect-video bg-slate-900 border border-slate-200 shadow-inner">
                    <img
                      src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80"
                      alt="Preview Video Channel Mindset Satu Persen"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                      <a
                        href={YOUTUBE_CHANNEL_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-14 h-14 bg-[#FF2B2B] text-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform"
                      >
                        <Play className="w-6 h-6 fill-white ml-1" />
                      </a>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 bg-black/75 backdrop-blur-md p-2.5 rounded-lg text-white text-xs">
                      <div className="font-bold truncate">Atur Gaji UMR 3 Juta Biar Tetap BISA MENABUNG</div>
                      <div className="text-slate-300 text-[10px] mt-0.5">342K views • Sederhana & Langsung Praktik</div>
                    </div>
                  </div>

                  {/* Highlights Bullet Cards */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                      <div className="text-slate-400 font-semibold">Fokus Utama</div>
                      <div className="font-bold text-slate-800 mt-0.5">Atur Gaji & Menabung</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                      <div className="text-slate-400 font-semibold">Tujuan Akhir</div>
                      <div className="font-bold text-[#FF2B2B] mt-0.5">Kebebasan Finansial</div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
